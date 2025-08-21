'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
    Box,
    IconButton,
    Typography,
    Avatar,
    Tooltip,
} from '@mui/material';
import {
    CallEnd,
    Videocam,
    VideocamOff,
    Mic,
    MicOff,
} from '@mui/icons-material';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import { useSelector, useDispatch } from 'react-redux';
import { CallState, setIncomingCall, clearIncomingCall } from '../redux/callSlice';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Peer from 'simple-peer';
import socket from '@/config/socket';

const CallScreen = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerRef = useRef<Peer.Instance | null>(null);

    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [callStarted, setCallStarted] = useState(false);

    const toggleMic = () => setIsMicOn(prev => !prev);
    const toggleCamera = () => setIsCameraOn(prev => !prev);

    const dispatch = useDispatch();
    const { incomingCall }: CallState = useSelector((state: any) => state.call);
    const { data: session } = useSession();

    // Khởi tạo local stream, phát video local
    useEffect(() => {
        async function getLocalMedia() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true,
                });
                setLocalStream(stream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Lỗi khi lấy media:', error);
            }
        }
        getLocalMedia();
    }, []);

    // Mở / tắt mic và camera theo trạng thái
    useEffect(() => {
        if (!localStream) return;
        localStream.getAudioTracks().forEach(track => (track.enabled = isMicOn));
    }, [isMicOn, localStream]);

    useEffect(() => {
        if (!localStream) return;
        localStream.getVideoTracks().forEach(track => (track.enabled = isCameraOn));
    }, [isCameraOn, localStream]);

    // Khởi tạo kết nối peer khi incomingCall và localStream sẵn sàng
    useEffect(() => {
        if (!incomingCall || !localStream || !session) return;

        // Tránh khởi tạo nhiều peer
        if (peerRef.current) return;

        const isCaller = session.user._id === incomingCall.fromUserID;
        const remoteUserId = isCaller ? incomingCall.ToUserID : incomingCall.fromUserID;

        // Tạo peer
        const peer = new Peer({
            initiator: isCaller,
            trickle: false, // disable trickle để tránh lỗi SDP setRemoteDescription wrong state
            stream: localStream,
        });

        peer.on('signal', signalData => {
            // Gửi signal data đến server để forward tới peer bên kia
            socket.emit('conn-signal', {
                signal: signalData,
                to: remoteUserId,
            });
        });

        peer.on('stream', remoteStream => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
            }
        });

        peerRef.current = peer;
        setCallStarted(true);

        // Khi nhận tín hiệu signal từ server
        const handleConnSignal = (data: { signal: any; to: string }) => {
            // Kiểm tra xem data có phải của peer hiện tại
            if (data.to === session.user._id) {
                peer.signal(data.signal);
            }
        };

        socket.on('conn-signal', handleConnSignal);

        return () => {
            peer.destroy();
            peerRef.current = null;
            socket.off('conn-signal', handleConnSignal);
            setCallStarted(false);
        };
    }, [incomingCall, localStream, session]);

    // Khi người nhận chấp nhận cuộc gọi, trigger mở peer
    useEffect(() => {
        if (!incomingCall || !session) return;

        const isCaller = session.user._id === incomingCall.fromUserID;
        const remoteUserId = isCaller ? incomingCall.ToUserID : incomingCall.fromUserID;

        // Lắng nghe event server báo call accepted
        const onCallAccepted = (info: any) => {
            if (info.fromUserID === remoteUserId) {
                // Nếu người gọi nhận được tín hiệu accept thì bắt đầu conn-init (tạo kết nối)
                if (isCaller) {
                    socket.emit('conn-init', { to: remoteUserId });
                }
            }
        };

        socket.on('received-call-accepted', onCallAccepted);

        return () => {
            socket.off('received-call-accepted', onCallAccepted);
        };
    }, [incomingCall, session]);

    // Gọi hàm reject call
    const rejectCall = () => {
        if (!incomingCall || !session) return;

        socket.emit('reject-call', {
            fromUserID: session.user._id,
            toUserID: session.user._id === incomingCall.fromUserID ? incomingCall.ToUserID : incomingCall.fromUserID,
        });
        dispatch(clearIncomingCall());
    };

    // Gọi hàm accept call
    const acceptCall = () => {
        if (!incomingCall || !session) return;

        socket.emit('accept-call', {
            fromUserID: session.user._id,
            toUserID: session.user._id === incomingCall.fromUserID ? incomingCall.ToUserID : incomingCall.fromUserID,
        });
    };

    // Kết thúc cuộc gọi (dọn dẹp state)
    const endCall = () => {
        peerRef.current?.destroy();
        peerRef.current = null;
        setCallStarted(false);
        dispatch(clearIncomingCall());
    };

    if (!incomingCall) return null;

    return (
        <Box
            sx={{
                position: 'fixed',
                inset: 0,
                bgcolor: 'black',
                color: 'white',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Video remote */}
            <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor: '#000' }}
            />

            {/* Video local preview */}
            <video
                ref={localVideoRef}
                muted
                autoPlay
                playsInline
                style={{
                    position: 'absolute',
                    bottom: 100,
                    right: 16,
                    width: 150,
                    height: 100,
                    borderRadius: 8,
                    objectFit: 'cover',
                    backgroundColor: '#333',
                    zIndex: 10,
                }}
            />

            {/* Caller info */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    zIndex: 10,
                }}
            >
                <Avatar
                    src={
                        session?.user._id === incomingCall.fromUserID
                            ? `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${incomingCall.receivedAvatar}`
                            : `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${incomingCall.callerAvatar}`
                    }
                />
                <Typography variant="h6">
                    {session?.user._id === incomingCall.fromUserID ? incomingCall.receivedName : incomingCall.callerName}
                </Typography>
            </Box>

            {/* Controls */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 20,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 3,
                    zIndex: 10,
                }}
            >
                <Tooltip title={isMicOn ? 'Tắt mic' : 'Bật mic'}>
                    <IconButton onClick={toggleMic} sx={{ bgcolor: '#fff' }}>
                        {isMicOn ? <Mic color="primary" /> : <MicOff color="error" />}
                    </IconButton>
                </Tooltip>

                {!callStarted ? (
                    <>
                        <Tooltip title="Chấp nhận cuộc gọi">
                            <IconButton onClick={acceptCall} sx={{ bgcolor: 'green' }}>
                                <Videocam />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Từ chối cuộc gọi">
                            <IconButton onClick={rejectCall} sx={{ bgcolor: 'red' }}>
                                <CallEnd sx={{ color: '#fff' }} />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <Tooltip title="Kết thúc cuộc gọi">
                            <IconButton onClick={endCall} sx={{ bgcolor: 'red' }}>
                                <CallEnd sx={{ color: '#fff' }} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title={isCameraOn ? 'Tắt camera' : 'Bật camera'}>
                            <IconButton onClick={toggleCamera} sx={{ bgcolor: '#fff' }}>
                                {isCameraOn ? <Videocam color="primary" /> : <VideocamOff color="error" />}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={isMicOn ? 'Tắt mic' : 'Bật mic'}>
                            <IconButton onClick={toggleMic} sx={{ bgcolor: '#fff' }}>
                                {isMicOn ? <Mic color="primary" /> : <MicOff color="error" />}
                            </IconButton>
                        </Tooltip>
                    </>
                )}

                <Tooltip title="Giơ tay">
                    <IconButton sx={{ bgcolor: '#fff' }}>
                        <PanToolAltIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default CallScreen;
