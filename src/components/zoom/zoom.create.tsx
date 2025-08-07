'use client'

import socket from "@/config/socket";
import { sendRequest } from "@/utils/api";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useState } from "react";


interface IProps {
    ZoomGroups: IZoom[],
    setZoomGroups: (v: React.SetStateAction<IZoom[]>) => void;
}

const CreateZoom = ({ ZoomGroups, setZoomGroups }: IProps) => {

    const { data: session } = useSession();
    const router = useRouter()
    const [zoomName, setZoomName] = useState("");

    const handleCreateZoom = async () => {
        if (zoomName.trim()) {

            const zoomNew = await sendRequest<IBackendRes<IZoom>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/zooms`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${session?.user?.access_token}`
                },
                body: {
                    name: zoomName,
                    users: []
                }
            })
            if (zoomNew?.data)
                setZoomGroups((prev: any) => [...prev, zoomNew.data]);


            setZoomName("");

            if (!socket.connect()) {
                socket.connect()
            }

            socket.emit('create-new-zoom', {
                zoomID: zoomNew.data?._id,
                userID: session?.user._id
            })

            router.refresh()
        }
    };


    return (
        <Stack spacing={2} mb={4}>
            <TextField
                label="Zoom Name"
                value={zoomName}
                onChange={(e) => setZoomName(e.target.value)}
            />
            <Button variant="contained" onClick={handleCreateZoom} sx={{ background: 'black', color: 'white' }}>
                Tạo
            </Button>
        </Stack>
    )
}


export default CreateZoom;