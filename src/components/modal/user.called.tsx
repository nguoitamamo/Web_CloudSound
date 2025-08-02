'use client';

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Avatar, Button } from '@mui/material';
import socket from '@/config/socket';
import CallScreen from '../call/app.calll';
import Link from 'next/link';


interface IProps {
    open: boolean;
    onClose: () => void;
    callerName: string;
    callerAvatar?: string;
    incomingCall: InfoCallUser;
    setIncomingCall: (v: InfoCallUser | null) => void;

}

const CallEd = ({ open, callerName, callerAvatar, incomingCall, setIncomingCall, onClose }: IProps) => {

    const [openCall, setOpenCall] = useState(false);

    const handleReject = () => {
        if (!socket.connected) {
            socket.connect();
        }

        socket.emit('reject-call', incomingCall);
    };

    const handleAccept = () => {
        if (!socket.connected) {
            socket.connect();
        }

        socket.emit('call-accepted', incomingCall);
        onClose();
        setOpenCall(true)
    }

    const handleDecline = () => {
        if (open) {
            setIncomingCall(null);
            onClose();
            handleReject();
        }
    };
    return (

        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Cuộc gọi đến</DialogTitle>
            <DialogContent style={{ textAlign: 'center' }}>
                <Avatar
                    src={
                        `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${callerAvatar}`
                    }
                    alt={callerName}
                    sx={{ width: 80, height: 80, margin: '0 auto' }}
                />
                <h3>{callerName}</h3>
                <div style={{ marginTop: 20 }}>
                    <Link href={`call`} onClick={() => handleAccept()}>
                        <Button variant="contained" color="success" sx={{ marginRight: 2 }}>
                            Chấp nhận
                        </Button>
                    </Link>
                    <Button variant="outlined" color="error" onClick={() => handleDecline()}>
                        Từ chối
                    </Button>
                </div>
            </DialogContent>
        </Dialog>




    );
};

export default CallEd;
