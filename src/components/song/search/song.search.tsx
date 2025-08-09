'use client'
import StatusSong from "@/components/status/app.status";
import { Box, Container, Divider, IconButton, Tooltip } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";


interface IProps {
    data: ISong[]
}

const SearchSongItem = ({ data }: IProps) => {

    const { data: session } = useSession();

    return (
        <Container>
            {data?.map(song => {
                return (
                    <>
                        <Box key={song._id}
                            display='flex'
                            sx={{
                                "> div > div > a": {
                                    color: 'unset',
                                    textDecoration: 'unset',

                                },
                                "img": {
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: 2,
                                }
                            }}
                        >
                            <Box sx={{ position: 'relative' }}>
                                <Link href={`/track/${song._id}?audio=${song.audio}&id=${song._id}`}>
                                    <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/song/${song.cover}`} alt="" />
                                    {song?.isVip && <Tooltip title="bài hát này thuộc bài hát VIP">
                                        <IconButton
                                            sx={{
                                                position: 'absolute',
                                                top: 8,
                                                left: 5,
                                                background: 'rgba(255, 255, 255, 0.7)',
                                                '&:hover': { background: 'white' },
                                            }}
                                            size="small"
                                        >
                                            VIP
                                        </IconButton>
                                    </Tooltip>}
                                </Link>
                            </Box>
                            <Box sx={{ ml: 3 }}>
                                <Box>
                                    <Link href={`/track/${song._id}?audio=${song.audio}&id=${song._id}`}>{song?.name}</Link>
                                    <Box sx={{
                                        "a": {
                                            textDecoration: 'unset',
                                            color: '#aaa',
                                            fontSize: 12,
                                        }
                                    }}>
                                        {song?.users.map(user => {
                                            return (
                                                <Link href={`/detail/${user._id}`}>{user.name} </Link>
                                            )
                                        })}
                                    </Box>
                                </Box>

                                {session?.user && <StatusSong song={song} session={session?.user} />}

                            </Box>
                        </Box>
                        <Divider></Divider>
                    </>
                )
            })}


        </Container >
    )
}

export default SearchSongItem;