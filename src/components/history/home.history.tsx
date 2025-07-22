'use client'
import { Box, Typography, IconButton } from "@mui/material";
import Link from "next/link";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { sendRequest } from "@/utils/api";

interface ITitle {
    title: string;
    data: IHistory[];
}
const HomeHistory = () => {

    const { data: session } = useSession();
    const [history, setHistory] = useState<IHistory[]>([]);


    useEffect(() => {
        const fetchHistory = async () => {
            if (!session?.user?._id) return;

            try {
                const res = await sendRequest<IBackendRes<IHistory[]>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/historys/user/${session.user._id}`,
                    method: "GET",
                });
                if (res?.data)
                    setHistory(res?.data);
            } catch (err) {
                console.error("Lỗi lấy lịch sử:", err);
            }
        };

        fetchHistory();
    }, [session]);


    return (
        <Box sx={{ mt: 3 }} >

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>Lịch sử</Typography>
                <Link href="#" style={{ textDecoration: 'unset', color: 'unset' }}>Tất cả</Link>
            </Box>


            {history?.map((tem) => (
                <Box key={tem._id} sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                    <Box sx={{
                        position: 'relative',
                        mr: 2,

                    }}>
                        <Link href={`/track/${tem?.songID[0]._id}?audio=${tem?.songID[0].audio}&id=${tem?.songID[0]._id}`}>
                            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/song/${tem?.songID[0]?.cover}`} alt="" width={50} height={50} style={{ borderRadius: 4 }} />
                        </Link>
                    </Box>

                    <Box sx={{
                        flexGrow: 1,
                        "a": {
                            textDecoration: 'unset',
                            color: 'unset',
                        }
                    }}>
                        <Link href={`/track/${tem?.songID[0]._id}?audio=${tem?.songID[0].audio}&id=${tem?.songID[0]._id}`}
                        // onClick={() => setSong({ ...song, isPlayCurrent: false })}
                        >
                            {tem?.songID[0].name}

                        </Link>
                        <Box sx={{

                            fontSize: 12,

                        }}>
                            {tem?.songID[0]?.users.map(user => {
                                return (
                                    <Link href={`/detail/${user._id}`}>{user.name} </Link>
                                )
                            })}
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5, alignItems: 'center', fontSize: '12px', color: '#888' }}>
                            <FavoriteBorderIcon fontSize="inherit" /> {tem?.songID[0]?.like?.length || 0}
                            <ThumbDownOffAltIcon fontSize="small" /> {tem?.songID[0]?.dislike?.length || 0}
                            <VisibilityIcon fontSize="inherit" /> {tem?.songID[0].totalListen?.length || 0}

                        </Box>
                    </Box>
                </Box >
            ))
            }
        </Box >
    );
};

export default HomeHistory;
