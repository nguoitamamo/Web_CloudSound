'use client'
import { Box, IconButton, Tooltip, useMediaQuery } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { useSession } from "next-auth/react"
import PauseIcon from '@mui/icons-material/Pause';
import { useWaveSurfer } from './context.wavetrack';
import { useSongContext } from './context.viewtrack';
import Link from 'next/link';
import { sendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { init } from '@/types/init';

import { useToast } from '../lib/toast';
import { isListen } from '@/utils/function';



interface IProp {
    song: ISong;
    audio: string;
    comment: IComment[]
}


const WaveTrack = (props: IProp) => {


    const waveformRef = useRef<HTMLDivElement | null>(null)
    const hoverRef = useRef<HTMLDivElement | null>(null)
    const timeRef = useRef<HTMLDivElement | null>(null)
    const durationRef = useRef<HTMLDivElement | null>(null)
    // const wavesurferRef = useRef<WaveSurfer | null>(null);

    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);


    const { wavesurferRef } = useWaveSurfer();
    const { currentSong, setCurrentSong } = useSongContext();
    const { data: session } = useSession();
    const hasTrackedViewRef = useRef(false);

    const router = useRouter();
    const toast = useToast()


    useEffect(() => {
        if (!waveformRef.current) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        const height = canvas.height * 1;

        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#656666');
        gradient.addColorStop(0.7, '#656666');
        gradient.addColorStop(0.701, '#ffffff');
        gradient.addColorStop(0.702, '#ffffff');
        gradient.addColorStop(0.703, '#B1B1B1');
        gradient.addColorStop(1, '#B1B1B1');

        const progressGradient = ctx.createLinearGradient(0, 0, 0, height);
        progressGradient.addColorStop(0, '#EE772F');
        progressGradient.addColorStop(0.7, '#EB4926');
        progressGradient.addColorStop(0.701, '#ffffff');
        progressGradient.addColorStop(0.702, '#ffffff');
        progressGradient.addColorStop(0.703, '#F6B094');
        progressGradient.addColorStop(1, '#F6B094');

        const ws = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: gradient,
            progressColor: progressGradient,
            barWidth: 2,
            url: `/api?audio=${props.audio}`,
        });
        wavesurferRef.current = ws;





        setCurrentSong({
            ...props.song,
            isPlayCurrent: false,
            duration: ws.getDuration(),
            current: 0,
            totalListen: props.song.totalListen // KHỞI TẠO TỪ PROPS BAN ĐẦU
        });

        const unsubscribeInteraction = ws.on('interaction', () => ws.playPause());

        const unsubscribeDecode = ws.on('decode', (duration: number) => {
            if (durationRef.current) {
                durationRef.current.textContent = formatTime(duration);
            }
        });

        const unsubscribeReady = ws.on('ready', () => {
            setIsReady(true);
            if (durationRef.current) {
                durationRef.current.textContent = formatTime(ws.getDuration());
            }

            hasTrackedViewRef.current = false;
        });

        const unsubscribeTimeUpdate = ws.on('timeupdate', (currentTime: number) => {
            if (timeRef.current) {
                timeRef.current.textContent = formatTime(currentTime);
            }

            //@ts-ignore
            setCurrentSong((prev: any) => ({
                ...props.song,
                isPlayCurrent: ws.isPlaying(),
                duration: ws.getDuration(),
                current: currentTime
            }));
        });


        const unsubscribeStop = ws.on('pause', () => {
            hasTrackedViewRef.current = false;
            setIsPlaying(false);

            //@ts-ignore
            setCurrentSong((prev: any) => ({
                ...props.song,
                isPlayCurrent: false,
                duration: ws.getDuration(),
                current: ws.getCurrentTime()
            }));
        });

        const unsubscribePlay = ws.on('play', () => {
            if (props.song?.isVip && (session === null || session === undefined)) {
                toast.error('Bạn chưa đăng nhập không thể nghe bài hát VIP');
                ws.pause();
            }
            if (props.song?.isVip && session?.user) {
                // const isAuthor = checkActor({ user: props.song.users, propUserID: session.user._id });
                // const isVIP = checkRole(session.user.role);



                if (!isListen({
                    user: props.song.users,
                    role: session.user.role,
                    propUserID: session.user._id,
                    songID: props.song._id,
                    shared: session.user.shared
                })) {
                    toast.error('Bài hát này chỉ dành cho người dùng VIP');
                    ws.pause();
                }
            }
        });

        const unsubscribeFinish = ws.on('finish', async () => {
            hasTrackedViewRef.current = false;
            setIsPlaying(false);


            //@ts-ignore
            setCurrentSong((prev: any) => ({
                init,
                isPlayCurrent: false,
                duration: 0,
                current: 0
            }));

            try {

                const res = await sendRequest<IBackendRes<ISongPlaylist[]>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/playlists?limit=1`,
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${session?.user?.access_token}`
                    }

                })
                if (res?.data) {

                    const songNext: ISongPlaylist[] = res?.data;

                    sendRequest<IBackendRes<any>>({
                        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/playlists/delete/${songNext[0].songID[0]._id}`,
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${session?.user?.access_token}`
                        }

                    })

                    router.push(`/track/${songNext[0].songID[0]._id}?audio=${songNext[0].songID[0].audio}&id=${songNext[0].songID[0]._id}`)
                }

            }
            catch (error) {
                console.log(error);
            }



        });
        //@ts-ignore
        setCurrentSong({
            ...props.song,
            isPlayCurrent: false,
            duration: ws.getDuration(),
            current: 0
        });

        return () => {
            unsubscribeInteraction();
            unsubscribeDecode();
            unsubscribeReady();
            unsubscribeTimeUpdate();
            unsubscribeStop();
            unsubscribeFinish();
            unsubscribePlay();
            ws.destroy();
        };
    }, [props.audio, setCurrentSong, wavesurferRef]);



    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        return `${minutes}:${secondsRemainder.toString().padStart(2, '0')}`
    }

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (hoverRef.current && waveformRef.current) {
            const rect = waveformRef.current.getBoundingClientRect()
            const offsetX = e.clientX - rect.left
            hoverRef.current.style.width = `${offsetX}px`
            hoverRef.current.style.opacity = '1'
        }
    }

    const handlePointerLeave = () => {
        if (hoverRef.current) {
            hoverRef.current.style.opacity = '0'
        }
    }

    const onPlayClick = useCallback(() => {
        const ws = wavesurferRef.current;
        if (!ws) return;

        console.log(">> check ws", ws);

        const willBePlaying = !ws.isPlaying();

        if (willBePlaying) {
            ws.play();
        } else {
            ws.pause();
        }
        setIsPlaying(willBePlaying);

        setCurrentSong({
            ...props.song,
            isPlayCurrent: willBePlaying,
            duration: ws.getDuration(),
            current: ws.getCurrentTime()
        });

    }, [props.song, setCurrentSong, wavesurferRef]);


    const handleAddHistory = useCallback(async () => {
        if (session?.user) {
            try {
                await sendRequest<IBackendRes<any>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/historys`,
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${session.user.access_token}`
                    },
                    body: {
                        songID: props.song._id,
                        start: wavesurferRef.current?.getCurrentTime()
                    }
                });


            } catch (error) {
                console.error(error);

            }
        }
        return;
    }, [wavesurferRef, props.song])


    useEffect(() => {
        if (session?.user && props.song?.totalListen?.some(listen => listen._id === session.user._id))
            return;

        const ws = wavesurferRef.current;
        if (!ws || !session) return;

        const checkAndSendView = async (currentTime: number) => {
            const duration = ws.getDuration();
            if (duration > 0 && (currentTime / duration) >= 0.1 && !hasTrackedViewRef.current) {
                try {
                    const update = await sendRequest<IBackendRes<any>>({
                        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/songs/updateview/${props.song._id}`,
                        method: 'PATCH',
                        headers: {
                            Authorization: `Bearer ${session.user.access_token}`
                        }
                    });
                    if (update.statusCode === 200) {

                        //@ts-ignore
                        setCurrentSong((prev: any) => ({
                            ...prev,
                            totalListen: update.data

                        }));
                    }

                    hasTrackedViewRef.current = true;
                    console.log(`Đã gửi yêu cầu cập nhật lượt xem cho bài hát ${props.song.name}`);

                    router.refresh();


                } catch (error) {
                    console.error(error);

                }
            }
        };
        const unsubscribeTimeUpdateForView = ws.on('timeupdate', checkAndSendView);
        return () => {
            unsubscribeTimeUpdateForView();
        };
    }, [props.song._id, session, wavesurferRef]);




    const CalSiteLeft = (time: number) => {
        if (wavesurferRef.current)
            return (time / (wavesurferRef.current?.getDuration())) * 100;

    }
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
                sx={{
                    flex: 7,
                    position: 'relative',
                    cursor: 'pointer',
                    '& #hover': {
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        zIndex: 10,
                        pointerEvents: 'none',
                        height: '100%',
                        width: 0,
                        mixBlendMode: 'overlay',
                        background: 'rgba(255, 255, 255, 0.5)',
                        opacity: 0,
                        transition: 'opacity 0.2s ease',
                    },
                    '& #time, & #duration': {
                        position: 'absolute',
                        zIndex: 11,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '11px',
                        background: 'rgba(0, 0, 0, 0.75)',
                        color: '#ddd',
                    },
                    '& #time': { left: 0 },
                    '& #duration': { right: 0 },
                }}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
            >
                <Box sx={{ display: 'flex', alignContent: 'space-around' }}>
                    <IconButton
                        disabled={
                            (props.song.isVip && (session === null || session === undefined)) ||
                            (props.song.isVip && session?.user) &&
                            !isListen({
                                user: props.song.users,
                                role: session.user.role,
                                propUserID: session.user._id,
                                songID: props.song._id,
                                shared: session.user?.shared
                            })}
                        onClick={() => {


                            onPlayClick();
                            handleAddHistory();
                        }
                        }
                        sx={{
                            backgroundColor: '#fff',
                            width: 50,
                            height: 50,
                            borderRadius: '50%',
                            marginRight: 2,
                            '&:hover': {
                                backgroundColor: '#f50',
                                color: '#fff'
                            }
                        }}
                    >
                        {
                            isPlaying ? <PauseIcon sx={{ fontSize: 30 }} />
                                : <PlayArrowIcon sx={{ fontSize: 30 }} />


                        }
                    </IconButton>



                    <Box>
                        <h3 style={{ color: '#fff', margin: 0 }}>{props?.song?.name}</h3>
                        <Box sx={{
                            "a": {
                                textDecoration: 'unset',
                                color: '#aaa',
                                fontSize: 12,
                            }
                        }}>
                            {props?.song?.users.map(user => {
                                return (
                                    <Link href={`/detail/${user._id}`}>{user.name} </Link>
                                )
                            })}
                        </Box>
                    </Box>
                </Box>

                <div id="time" ref={timeRef}>0:00</div>
                <div id="duration" ref={durationRef}>0:00</div>
                <div id="hover" ref={hoverRef}></div>
                <div id="waveform" ref={waveformRef}>

                    {isReady && props?.comment?.map((cmt, idx) => (
                        <Tooltip key={idx} title={`${cmt.content} ở ${cmt.ghimSecond}s`} arrow={true}>
                            <img
                                key={idx}
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${cmt.userID.avatar}`}
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    height: 30,
                                    width: 30,
                                    borderRadius: '50%',
                                    left: `${CalSiteLeft(cmt.ghimSecond)}%`,
                                    zIndex: 9,
                                    border: '2px solid white'
                                }}
                                alt="comment-avatar"
                            />
                        </Tooltip>
                    ))}
                </div>




            </Box >
            <Box
                sx={{
                    flex: 3,
                    width: 150,
                    height: 300,
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/song/${props?.song?.cover}`}
                    alt="cover"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>
        </Box>
    )
}

export default WaveTrack;
