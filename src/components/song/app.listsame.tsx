import { Box, Typography, Avatar } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface SongItemProps {
    index: number;
    song: {
        artist: string;
        title: string;
        cover: string;
        totalListen: number;
    };
}

const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return `${num}`;
};

const SongItem = ({ index, song }: SongItemProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#fff',
                py: 1,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography width={20}>{index + 1}</Typography>
                <Avatar src={song.cover} variant="square" sx={{ width: 50, height: 50 }} />
                <Box>
                    <Typography variant="body2" sx={{ color: '#aaa' }}>{song.artist}</Typography>
                    <Typography variant="body1" fontWeight="bold">{song.title}</Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#999' }}>
                <PlayArrowIcon fontSize="small" />
                <Typography variant="body2">{formatNumber(song.totalListen)}</Typography>
            </Box>
        </Box>
    );
};

export default SongItem;
