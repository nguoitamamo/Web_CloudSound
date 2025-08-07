"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";

import { useSession } from "next-auth/react";
import { tokenProvider } from "actions/stream.actions";
import Loader from "@/components/Loader";
import { disconnectStreamClient, getStreamVideoClient } from "./stream-video-client";
import { UserState } from "@/components/redux/userSlice";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";




const StreamVideoProvider = ({ children }: { children: ReactNode }) => {


    const [videoClient, setVideoClient] = useState<StreamVideoClient>();
    // const { user, isLoaded } = useUser();
    const { data: session } = useSession()
    const { isLoaderOwner }: UserState = useSelector((state: any) => state.user);
    const router = useRouter()

    useEffect(() => {
        console.log('>> check ádasjdasdas', isLoaderOwner);
    }, [isLoaderOwner])


    const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;


    useEffect(() => {


        if (!session?.user) return;

        if (!API_KEY) throw new Error("Stream API key is missing");

        // const client = new StreamVideoClient({
        //     apiKey: API_KEY,
        //     user: {
        //         id: session.user?._id,
        //         name: session.user?.name,
        //         image: `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${session.user.avatar}`,
        //     },
        //     tokenProvider,
        // });

        const client = getStreamVideoClient(
            {
                id: session.user?._id,
                name: session.user?.name,
                image: `${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${session.user.avatar}`,
            }
        )

        setVideoClient(client);

    }, [session?.user]);


    if (!videoClient) return <Loader />;

    return (
        <Container>
            <StreamVideo client={videoClient}>{children}</StreamVideo>;
        </Container>
    )
};

export default StreamVideoProvider;
