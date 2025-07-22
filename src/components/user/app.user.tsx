'use client'
import { Box, Typography, Button, Avatar } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useEffect, useState } from 'react';
import { sendRequest } from '@/utils/api';
import { redirect } from 'next/navigation'
import Link from 'next/link';
interface IProp {
    song: ISong;
    session: Session;
}


const UserChannel = ({ song, session }: IProp) => {

    const [CountFollower, setCountFollower] = useState(song?.createBy?.followers?.length || 0);
    const [isFollowing, setFollowing] = useState(false);



    const handleFollowing = async () => {
        try {
            const res = await sendRequest<IBackendRes<any>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/follower/${song?.createBy?._id}`,
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${session.access_token}`
                }
            });

            if (res?.data) {
                setCountFollower(res?.data?.length);
                setFollowing(true);
            }

        }
        catch (error) {

        }

    }

    useEffect(() => {
        if (!session) return;
        if (song?.createBy?.followers.includes(session._id)) {
            setFollowing(true)
        }

    }, [session, song])




    return (
        <Box
            sx={{
                width: 200,
                borderRadius: 2,
                padding: 2,
                textAlign: 'center',
                mt: 5,
                border: '2px dashed'
            }}
        >
            <Avatar
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${song?.createBy.avatar}`} // thay bằng đường dẫn ảnh avatar
                sx={{ width: 80, height: 80, margin: 'auto', mb: 1 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                <Typography fontWeight="bold" noWrap>
                    {song?.createBy.name}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <Link href={`/detail/${song?.createBy?._id}`}>
                    <PeopleAltIcon sx={{ fontSize: 16 }} />
                </Link>
                <Typography variant="body2">{CountFollower}</Typography>
            </Box>

            <Button
                variant="contained"
                fullWidth
                sx={{
                    mt: 2,
                    backgroundColor: '#333',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: '#555',
                    },
                }}
                onClick={() => handleFollowing()}
            >
                {isFollowing ? 'Đang Theo dõi' : 'Theo dõi'}
            </Button>
        </Box>
    );
};

export default UserChannel;
