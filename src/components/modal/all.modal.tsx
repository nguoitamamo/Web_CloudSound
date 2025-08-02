'use client';

import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Avatar,
    CircularProgress,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
    open: boolean;
    onClose: () => void;
    callee: {
        name: string;
        avatar?: string;
    };
};

const Call = ({ open, onClose, callee }: IProps) => {
    return (
        <Dialog open={open} onClose={onClose}

        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Đang gọi...
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                    src={
                        callee.avatar
                            ? `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${callee.avatar}`
                            : undefined
                    }
                    alt={callee.name}
                    sx={{ width: 80, height: 80, mb: 2 }}
                />
                <Typography variant="h6">{callee.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Đang kết nối cuộc gọi thoại...
                </Typography>
                <CircularProgress sx={{ mt: 2 }} />
            </DialogContent>
        </Dialog>
    );
};

export default Call;
