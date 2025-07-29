'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from "next/link";
import { useEffect, useState } from "react";
import { sendRequest } from "@/utils/api";
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import { useSession } from "next-auth/react"
import { useToast } from "../lib/toast";
import socket from "@/config/socket";
import { useDispatch } from "react-redux";
import { SetOnlineUsers } from "../redux/userSlice";


interface IProp {
    data: ISong[];
    type: string;
}

const MainSlider = (props: IProp) => {

    const [type, setType] = useState(props.type || '');
    const [song, setSong] = useState(props.data || []);

    const { data: session } = useSession();

    const toast = useToast()
    const dispatch = useDispatch();

    useEffect(() => {
        if (session?.user) {

            if (!socket.connect()) {
                socket.connect()
            }


            socket.emit("join", {
                userID: session.user._id,
                socketId: socket.id,
            });

            socket.on("online-users-updated", (onlineUsers: string[]) => {
                dispatch(SetOnlineUsers(onlineUsers));
            });
        }
    }, [session?.user]);



    const SampleNextArrow = (props: any) => {

        return (
            <Button variant="outlined" onClick={props.onClick}
                sx={{
                    position: 'absolute',
                    zIndex: 2,
                    top: '21%',
                    right: 20,
                    minWidth: 30,
                    width: 35,
                    height: 25,
                    color: 'white',
                    background: 'black'
                }}>
                <ArrowForwardIcon />

            </Button>
        );
    }

    const SamplePrevArrow = (props: any) => {

        return (
            <Button variant="outlined" onClick={props.onClick}
                sx={{
                    position: 'absolute',
                    zIndex: 2,
                    top: '21%',
                    left: 13,
                    minWidth: 30,
                    width: 35,
                    height: 25,
                    color: 'white',
                    background: 'black'

                }}>
                <ArrowBackIcon />

            </Button >
        );
    }
    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    const ToggleButton = ({ label, isActive, onClick }: any) => (
        <Button
            style={{
                background: isActive ? 'black' : 'white',
                color: isActive ? 'white' : 'black',
            }}
            onClick={onClick
            }
        >
            {label}
        </Button>
    );

    const handleTopSong = async ({ type }: any) => {
        const songTrending = await sendRequest<IBackendRes<ISong[]>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/songs/top/${type}`,
            method: "GET",
        })
        if (songTrending?.data)
            setSong(songTrending?.data);

    }
    const handleAddPlaylist = async ({ song }: any) => {

        try {
            const addPlaylist = await sendRequest<IBackendRes<any>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/playlists`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${session?.user.access_token}`
                },
                body: {
                    songID: song
                }
            })
            if (addPlaylist?.message)
                toast.success(addPlaylist?.message)
        }
        catch (error) {
            console.log(error);
        }
    }

    return (

        <Box
            sx={{
                width: '80%',
                height: '400px',// hoặc '70%' hay 800px
                maxWidth: '800px',
                overflow: 'hidden',
                "divClass": {
                    padding: '5px'
                },
                "img": {
                    width: '180px',
                    height: '180px',
                    borderRadius: '10px'
                },
                ".title": {
                    display: 'flex',
                    gap: 2,
                    "Button": {
                        height: '35px',

                        marginTop: '20px'
                    }
                },



            }}>
            <div className="title">
                <h2>Trending</h2>
                <>
                    <ToggleButton label="tuần" isActive={type === 'week'} onClick={() => {
                        setType('week'),
                            handleTopSong({ type: 'week' });
                    }} />
                    <ToggleButton label="tháng" isActive={type === 'month'} onClick={() => {
                        setType('month'),
                            handleTopSong({ type: 'month' });
                    }
                    } />
                </>
            </div>

            <Slider {...settings} >
                {song.map(songItem => {
                    return (
                        <div className="divClass" key={songItem._id}>
                            <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                <Link href={`/track/${songItem._id}?audio=${songItem.audio}&id=${songItem._id}`} >
                                    <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/song/${songItem.cover}`} alt="" />

                                </Link>

                                {songItem?.isVip && <Tooltip title="bài hát này thuộc bài hát VIP">
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            left: 8,
                                            background: 'rgba(255, 255, 255, 0.7)',
                                            '&:hover': { background: 'white' },
                                        }}
                                        size="small"
                                    >
                                        VIP
                                    </IconButton>
                                </Tooltip>}

                                <Tooltip title="Yêu thích">
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            bottom: 8,
                                            left: 8,
                                            background: 'rgba(255, 255, 255, 0.7)',
                                            '&:hover': { background: 'white' },
                                        }}
                                        size="small"
                                    >
                                        <FavoriteBorderIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>


                                <Tooltip title="Thêm vào danh sách phát">
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            bottom: 8,
                                            right: 8,
                                            background: 'rgba(255, 255, 255, 0.7)',
                                            '&:hover': { background: 'white' },
                                        }}
                                        size="small"
                                    >
                                        <PlaylistAddIcon fontSize="small" onClick={() => handleAddPlaylist({ song: songItem._id })} />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Typography sx={{
                                display: {
                                    "> a": {
                                        color: 'unset',
                                        textDecoration: 'unset',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                    },
                                }
                            }}>

                                <Link href={`/track/${songItem._id}?audio=${songItem.audio}&id=${songItem._id}`}
                                // onClick={() => setSong({ ...song, isPlayCurrent: false })}
                                >
                                    {songItem.name}


                                </Link>




                            </Typography>
                            <Box sx={{
                                "a": {
                                    textDecoration: 'unset',
                                    color: 'unset'
                                }
                            }}>
                                {songItem.users.map(user => {
                                    return (
                                        <Link href={`/detail/${user._id}`} key={user._id}>{user.name} </Link>
                                    )
                                })}
                            </Box>



                        </div>)

                })}


            </Slider>
        </Box >

    );
}

export default MainSlider;