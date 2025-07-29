'use client'

import { sendRequest } from '@/utils/api';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, IconButton, Tooltip } from '@mui/material';

import { useEffect, useState } from 'react';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

interface IProp {
    song: ISong;
    session: Session;
}

const StatusSong = ({ song, session }: IProp) => {


    const [likeCount, setLikeCount] = useState(song?.like?.length || 0);
    const [dislikeCount, setDisLikeCount] = useState(song?.dislike?.length || 0);
    const [viewCount, setViewCount] = useState(song?.totalListen?.length || 0);

    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);




    useEffect(() => {
        if (!session) return;

        const userId = session._id;

        if (song?.like?.includes(userId)) {
            setIsLiked(true);
        }

        if (song?.dislike?.includes(userId)) {
            setIsDisliked(true);
        }
    }, [session, song]);

    const handleClickLike = async () => {
        try {
            const res = await sendRequest<IBackendRes<any>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/songs/like/${song?._id}`,
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${session.access_token}`
                }
            });

            if (isDisliked) setDisLikeCount(dislikeCount - 1);

            if (res?.data) {
                setLikeCount(res?.data?.length || 0);
                setIsLiked(true);
                setIsDisliked(false); // bỏ dislike nếu đã like
            }
        } catch (error) {
            console.error("Lỗi khi like bài hát", error);
        }
    }

    const handleClickDisLike = async () => {
        try {
            const res = await sendRequest<IBackendRes<any>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/songs/dislike/${song?._id}`,
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${session.access_token}`
                }
            });

            if (isLiked) setLikeCount(likeCount - 1);

            if (res?.data) {
                setDisLikeCount(res?.data?.length || 0);
                setIsDisliked(true);
                setIsLiked(false); // bỏ like nếu đã dislike
            }


        } catch (error) {
            console.error("Lỗi khi dislike bài hát", error);
        }
    }

    return (
        <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
                {
                    isLiked ? (
                        <FavoriteIcon fontSize="small" sx={{ color: 'red' }} onClick={handleClickLike} />
                    ) : (
                        <FavoriteBorderIcon fontSize="small" onClick={handleClickLike} />
                    )
                }
                <span>{likeCount}</span>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
                {
                    isDisliked ? (
                        <ThumbDownIcon fontSize="small" sx={{ color: 'blue' }} onClick={handleClickDisLike} />
                    ) : (
                        <ThumbDownOffAltIcon fontSize="small" onClick={handleClickDisLike} />
                    )
                }
                <span>{dislikeCount}</span>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <VisibilityIcon fontSize="small" />
                <span>{viewCount}</span>
            </Box>


            {/* <Tooltip title="Yêu thích">
                <IconButton
                    sx={{
                        // position: 'absolute',
                        // top: 8,
                        // left: 8,
                        // background: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': { background: 'white' },
                    }}
                    size="small"
                >
                    <FavoriteBorderIcon fontSize="small" />
                </IconButton>
            </Tooltip> */}


            <Tooltip title="Thêm vào danh sách phát">
                <IconButton
                    sx={{
                        // position: 'absolute',
                        // top: 8,
                        // right: 8,
                        // background: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': { background: 'white' },
                    }}
                    size="small"
                >
                    <PlaylistAddIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default StatusSong;
