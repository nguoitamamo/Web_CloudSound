'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
    Box, IconButton, Typography, Avatar, Tooltip
} from '@mui/material';
import {
    CallEnd, Videocam, VideocamOff, Mic, MicOff
} from '@mui/icons-material';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import { useSelector } from 'react-redux';
import { CallState } from '../redux/callSlice';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Peer from 'simple-peer';
import socket from '@/config/socket';

const CallScreen = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isCameraOn, setIsCameraOn] = useState(true);

    const toggleMic = () => setIsMicOn(prev => !prev);
    const toggleCamera = () => setIsCameraOn(prev => !prev);

    const { incomingCall }: CallState = useSelector((state: any) => state.call);
    const { data: session } = useSession();

    useEffect(() => {
        const startLocalVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true,
                });
                setLocalStream(stream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error('Lỗi khi lấy stream:', err);
            }
        };

        startLocalVideo();
    }, []);



    useEffect(() => {

    }, [incomingCall])

    useEffect(() => {
        if (!incomingCall || !session) return;

        const isCaller = session.user._id === incomingCall.fromUserID;
        const peer = new Peer({
            initiator: isCaller,
            trickle: false,
            stream: localStream!,
        });

        // Gửi signal data đến server
        peer.on('signal', data => {
            socket.emit('conn-signal', {
                signal: data,
                to: isCaller ? incomingCall.ToUserID : incomingCall.fromUserID,
            });
        });

        // Nhận signal data từ server
        socket.on('conn-signal', (data: any) => {
            peer.signal(data.signal);
        });

        // Khi nhận stream từ đối phương
        peer.on('stream', remoteStream => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
            }
        });

        // Cleanup
        return () => {
            peer.destroy();
            socket.off('conn-signal');
        };

    }, [incomingCall, localStream]);




    useEffect(() => {
        if (!localStream) return;
        localStream.getAudioTracks().forEach(track => {
            track.enabled = isMicOn;
        });
    }, [isMicOn, localStream]);

    useEffect(() => {
        if (!localStream) return;
        localStream.getVideoTracks().forEach(track => {
            track.enabled = isCameraOn;
        });
    }, [isCameraOn, localStream]);

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
            {/* Remote video */}
            <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    backgroundColor: '#000',
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
                }}
            >
                {session?.user.name === incomingCall?.callerName ? (
                    <>
                        <Avatar
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${incomingCall?.receivedAvatar}`}
                        />
                        <Typography variant="h6">{incomingCall?.receivedName}</Typography>
                    </>
                ) : (
                    <>
                        <Avatar
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${incomingCall?.callerAvatar}`}
                        />
                        <Typography variant="h6">{incomingCall?.callerName}</Typography>
                    </>
                )}
            </Box>

            {/* Local preview */}
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
                }}
            />

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
                }}
            >
                <Tooltip title={isMicOn ? 'Tắt mic' : 'Bật mic'}>
                    <IconButton onClick={toggleMic} sx={{ bgcolor: '#fff' }}>
                        {isMicOn ? <Mic color="primary" /> : <MicOff color="error" />}
                    </IconButton>
                </Tooltip>

                <Tooltip title="Kết thúc cuộc gọi">
                    <Link href="/">
                        <IconButton sx={{ bgcolor: 'red' }}>
                            <CallEnd sx={{ color: '#fff' }} />
                        </IconButton>
                    </Link>
                </Tooltip>

                <Tooltip title={isCameraOn ? 'Tắt camera' : 'Bật camera'}>
                    <IconButton onClick={toggleCamera} sx={{ bgcolor: '#fff' }}>
                        {isCameraOn ? <Videocam color="primary" /> : <VideocamOff color="error" />}
                    </IconButton>
                </Tooltip>

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
