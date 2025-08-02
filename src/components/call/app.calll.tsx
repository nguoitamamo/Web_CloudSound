'use client';

import React, { useRef, useState } from 'react';
import { Box, IconButton, Typography, Avatar, Tooltip, Modal } from '@mui/material';
import { CallEnd, Videocam, VideocamOff, Mic, MicOff } from '@mui/icons-material';
import { CallState } from '../redux/callSlice';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useSession } from 'next-auth/react';


const CallScreen = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    const [isMicOn, setIsMicOn] = useState(true);
    const [isCameraOn, setIsCameraOn] = useState(true);

    const toggleMic = () => setIsMicOn((prev) => !prev);
    const toggleCamera = () => setIsCameraOn((prev) => !prev);


    const { incomingCall }: CallState = useSelector((state: any) => state.call);

    const { data: session } = useSession()

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

            {/* Overlay: caller info */}
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
                {session?.user.name === incomingCall?.callerName ?
                    <>
                        <Avatar src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${incomingCall?.receivedAvatar}`} />
                        <Typography variant="h6">{incomingCall?.receivedName}</Typography>
                    </>
                    : <>
                        <Avatar src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${incomingCall?.callerAvatar}`} />
                        <Typography variant="h6">{incomingCall?.callerName}</Typography>
                    </>
                }




            </Box>

            {/* Local video preview */}
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
            </Box>
        </Box>

    );
};

export default CallScreen;
