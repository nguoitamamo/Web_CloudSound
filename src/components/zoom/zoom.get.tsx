'use client'
import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
    Grid,
    Button,
    Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import CreateZoom from "./zoom.create";
import socket from "@/config/socket";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { sendRequest } from "@/utils/api";
import Link from "next/link";

const GetAllCAll = () => {

    const { data: session } = useSession();
    const router = useRouter();


    const [CallGroups, setCallGroups] = useState<ICall[]>([])
    const handleSubmitPartOf = (call: ICall) => {


        router.push(`home/meeting/${call.callID}`)
    }

    useEffect(() => {
        const GetAllZoom = async () => {
            const res = await sendRequest<IBackendRes<ICall[]>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/calls`,
                method: "GET",
            })

            if (res?.data) {
                setCallGroups(res?.data);
            }
        }
        GetAllZoom();

    }, [])

    return (
        <>
            <Grid container spacing={3} mt={4}>
                {CallGroups?.map((call) => (
                    <Grid item xs={12} sm={6} md={4} key={call._id}>
                        <Card
                            sx={{
                                border: "2px dashed",
                                minHeight: 240,
                                borderRadius: 3,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    flexGrow: 1,
                                    "a": {
                                        display: 'flex',
                                        textDecoration: 'unset',
                                        color: 'unset',
                                        alignItems: 'center'
                                    },
                                    "img": {
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20
                                    }
                                }}
                            >
                                <Link href={`/detail/${call.adminID._id}`}

                                >
                                    <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${call.adminID.avatar}`} alt="" />
                                    {call.adminID.name}
                                </Link>
                                <Typography variant="h6">{call.callID}</Typography>

                                {/* Button ở cuối */}
                                <Box mt="auto" pt={2}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        sx={{ background: "black", color: "white" }}
                                        onClick={() => handleSubmitPartOf(call)}
                                    >
                                        Tham gia
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid >

        </>
    )
}


export default GetAllCAll;