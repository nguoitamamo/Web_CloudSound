import { Box } from "@mui/material"
import Link from "next/link";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

interface IProps {
    song: ISong;
}

const InfoActor = ({ song }: IProps) => {
    return (
        <Box key={song._id} sx={{ display: 'flex', mb: 2, alignItems: 'center', mt: 2 }}>
            <Box sx={{ position: 'relative', mr: 2 }}>
                <Link href={`/track/${song._id}?audio=${song.audio}&id=${song._id}`}>
                    <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/song/${song.cover}`} alt="" width={60} height={60} style={{ borderRadius: 4 }} />
                </Link>
            </Box>

            <Box sx={{
                flexGrow: 1,
                "a": {
                    textDecoration: 'unset',
                    color: 'unset',

                }
            }}>
                <Link href={`/track/${song._id}?audio=${song.audio}&id=${song._id}`}
                >
                    {song.name}

                </Link>
                <Box sx={{ fontSize: 12 }}>
                    {song?.users.map(user => {
                        return (
                            <Link href={`/detail/${user._id}`}>{user.name} </Link>
                        )
                    })}
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mt: 0.5, alignItems: 'center', fontSize: '12px', color: '#888' }}>
                    <FavoriteBorderIcon fontSize="inherit" /> {song?.like?.length || 0}
                    <ThumbDownOffAltIcon fontSize="small" /> {song?.dislike?.length || 0}
                    <VisibilityIcon fontSize="inherit" /> {song?.totalListen?.length || 0}

                </Box>
            </Box>
        </Box>
    )
}


export default InfoActor;