'use client'
import { Avatar, Box, Typography, IconButton, Button, TextField } from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { useState } from "react";
import { sendRequest } from "@/utils/api";
import { useRouter } from 'next/navigation';
import { useWaveSurfer } from "../track/context.wavetrack";
import dayjs from "../lib/dayjs"


interface IProp {
    comment: IComment[];
    token: string;
    songID: string;
}

const CommentItem = ({ comment, token, songID }: IProp) => {
    const router = useRouter();
    const [content, setContent] = useState('');
    const { wavesurferRef } = useWaveSurfer();


    const handleSubmitComment = async () => {
        try {
            if (wavesurferRef?.current) {
                await sendRequest<IBackendRes<IComment>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments`,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: {
                        songID: songID,
                        content: content,
                        ghimSecond: Math.round(wavesurferRef?.current?.getCurrentTime())
                    }
                });

                setContent('');
                router.refresh()
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSeekTo = (ghimSecond: number) => {
        const ws = wavesurferRef.current;
        if (ws) {
            const duration = ws.getDuration();
            if (duration > 0) {
                const percent = ghimSecond / duration;
                ws.seekTo(percent);
                ws.play();
            }
        }
    }


    return (
        <Box sx={{ mr: 4 }}>

            <TextField
                fullWidth
                label="Bình luận..."
                value={content}
                variant="standard"
                sx={{ mb: 3 }}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmitComment();
                    }
                }}
            />


            {comment.map((cmt) => (
                <Box
                    key={cmt._id}
                    display="flex"
                    gap={2}
                    py={2}
                    borderBottom="1px solid #eee"
                >

                    <Avatar
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${cmt.userID.avatar}`}
                        sx={{ width: 40, height: 40 }}
                    />


                    <Box flex={1}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2
                            }}>
                                <Typography fontWeight="bold">{cmt.userID?.name}</Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    onClick={() => handleSeekTo(cmt.ghimSecond)}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    {cmt.ghimSecond}s
                                </Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                                {dayjs(cmt.createdAt).fromNow()}
                            </Typography>

                        </Box>

                        <Typography sx={{ mt: 0.5, mb: 1 }}>
                            {cmt.content}
                        </Typography>

                        <Box display="flex" alignItems="center" gap={2}>
                            <Button
                                startIcon={<ReplyOutlinedIcon fontSize="small" />}
                                size="small"
                                sx={{ textTransform: "none" }}
                            >
                                Phản hồi
                            </Button>
                        </Box>
                    </Box>
                </Box>
            ))
            }
        </Box >
    );
};

export default CommentItem;