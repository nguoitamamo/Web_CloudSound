
import WaveTrack from "@/components/track/app.wavetrack";
import { Box, Button, Container, Divider } from "@mui/material";
import StatusSong from "@/components/status/app.status";
import HomeHistory from "@/components/user/song.byuser";
import UserChannel from "@/components/user/app.user";

import { sendRequest } from "@/utils/api";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CommentItem from "@/components/comment/app.commenet";
import SongByUser from "@/components/user/song.byuser";






const DetailPageTrack = async (props: any) => {

    await new Promise(resolve => setTimeout(resolve, 1000));


    const { params } = props;

    const session = await getServerSession(authOptions);

    const res = await sendRequest<IBackendRes<ISong>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/songs/${params.slug}`,
        method: 'GET',
    })

    const comment = await sendRequest<IBackendRes<IComment[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/${res?.data?._id}`,
        method: 'GET'
    })
    const songsByUser = await sendRequest<IBackendRes<ISong[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/songs/user/${res?.data?.createBy?._id}`,
        method: 'GET'
    })



    return (
        <Container sx={{ mb: 20 }}>
            <Box
                sx={{
                    background: 'linear-gradient(90deg, #1e1e1e, #444, #1e1e1e)',
                    padding: 4,
                    borderRadius: 2,
                    margin: '10px 0'
                }}
            >

                {res?.data && <WaveTrack song={res.data} audio={res?.data.audio} comment={comment?.data ?? []} />}

            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
            }}>
                <Box sx={{ flex: 7 }}>
                    {
                        //@ts-ignore
                        res?.data && <StatusSong song={res?.data} session={session?.user} />
                    }

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <Box sx={{ flex: 3 }}>
                            {
                                //@ts-ignore
                                res?.data && <UserChannel song={res.data} session={session?.user} />
                            }

                        </Box>
                        <Box sx={{ flex: 7 }}>
                            {comment?.data && session && res?.data &&
                                <CommentItem comment={comment?.data ?? []} token={session?.user.access_token} songID={res?.data?._id} />}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ flex: 3 }}>
                    {songsByUser?.data && res?.data && <SongByUser title={`Bài hát của ${res?.data?.createBy?.name}`} data={songsByUser?.data ?? []} />}
                </Box>
            </Box>


        </Container>
    );



}

export default DetailPageTrack;