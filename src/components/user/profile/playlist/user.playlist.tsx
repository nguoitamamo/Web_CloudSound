'use client'

import WaveTrack from "@/components/track/app.wavetrack";
import InfoActor from "@/components/track/info/info.actor";
import { sendRequest } from "@/utils/api";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const PlaylistItem = () => {
    const { data: session } = useSession();
    const [playlist, setPlaylist] = useState<ISongPlaylist[]>([]);


    const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

    useEffect(() => {
        const handleGetPlaylist = async () => {
            try {
                const res = await sendRequest<IBackendRes<ISongPlaylist[]>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/playlists`,
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${session?.user?.access_token}`
                    },
                })
                if (res?.data) {
                    setPlaylist(res?.data);
                    
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        handleGetPlaylist();
    }, [session?.user?._id]);


    const handlePlay = (index: number) => {
        audioRefs.current.forEach((audio, i) => {
            if (audio && i !== index) {
                audio.pause();
            }
        });
    };

    return (
        <>
            {playlist?.map((songItem, index) => {
                const song = songItem.songID[0];
                return (
                    <Box key={songItem._id} sx={{
                        display: 'flex',
                        border: '2px dashed',
                        color: 'black',
                        borderRadius: '5px',
                        justifyContent: 'space-around',
                        alignContent: 'center',
                        marginBottom: 3,
                        padding: 2,
                        gap: 5
                    }}>
                        <AudioPlayer
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/audio/${song.audio}`}
                            volume={0.5}
                            style={{
                                padding: 0,
                                flex: 7,
                                background: 'white',
                                boxShadow: 'unset'
                            }}
                            ref={(player) => {
                                if (player) {
                                    audioRefs.current[index] = player.audio.current;
                                }
                            }}
                            onPlay={() => {
                                handlePlay(index)
                            }}
                        />


                        <Box sx={{ flex: 3 }}>
                            <InfoActor song={song} />
                        </Box>

                    </Box>
                );
            })}
        </>
    );
}

export default PlaylistItem;
