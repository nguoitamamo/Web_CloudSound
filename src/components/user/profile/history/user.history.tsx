'use client'

import SongItem from "@/components/song/app.listsame";
import WaveTrack from "@/components/track/app.wavetrack";
import InfoActor from "@/components/track/info/info.actor";
import { sendRequest } from "@/utils/api";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';



const HistoryItem = () => {
    const { data: session } = useSession();
    const [history, setHistory] = useState<ISongHistory[]>([]);


    const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

    useEffect(() => {
        const handleGethistory = async () => {
            try {
                const res = await sendRequest<IBackendRes<ISongHistory[]>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/historys/user/${session?.user?._id}`,
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${session?.user?.access_token}`
                    },
                })
                if (res?.data) {
                    setHistory(res?.data);
                    console.log(res?.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        handleGethistory();
    }, [session?.user?._id]);


    const handlePlay = ({ index, start }: any) => {
        audioRefs.current.forEach((audio, i) => {
            if (audio && i !== index) {
                // audio.currentTime = start;
                audio.pause();
            }
        });
    };

    return (
        <>
            {history?.map((historyItem, index) => {
                const song = historyItem.songID[0];
                return (
                    <Box key={historyItem._id} sx={{
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
                                    if (audioRefs.current[index])
                                        audioRefs.current[index].currentTime = historyItem.start;
                                }
                            }}
                            onPlay={() => {
                                //@ts-ignore
                                handlePlay({ index: index, start: historyItem.start });
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

export default HistoryItem;
