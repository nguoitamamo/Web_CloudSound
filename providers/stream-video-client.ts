import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { tokenProvider } from "actions/stream.actions";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

let client: StreamVideoClient | null = null;

export const getStreamVideoClient = (user: {
    id: string;
    name?: string;
    image?: string;
}) => {
    if (!API_KEY) throw new Error("Stream API key is missing");

    if (!client) {
        client = new StreamVideoClient({
            apiKey: API_KEY,
            user: user,
            tokenProvider,
        });
    }

    return client;
};

export const disconnectStreamClient = async () => {
    if (client) {
        await client.disconnectUser();
        client = null;
    }
};
