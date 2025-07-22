'use client'
import { sendRequest } from "@/utils/api";
import { Avatar, Box, Typography, Paper, Stack, Tooltip } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddIcon from '@mui/icons-material/Add';
import BasicModal from "@/components/modal/app.modal";

const ListGroup = () => {
    const [data, setData] = useState<IGroup[]>([]);
    const [open, setOpen] = useState(false);

    const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null);
    const { data: session } = useSession();

    useEffect(() => {
        const handleGetGroup = async () => {
            try {
                const res = await sendRequest<IBackendRes<IGroup[]>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/groups/user`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${session?.user?.access_token}`
                    }
                });
                if (res?.data) {
                    console.log('>> check aa', res?.data);
                    setData(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (session?.user?.access_token) {
            handleGetGroup();
        }
    }, [session]);


    const handleAddMember = (group: IGroup) => {
        setSelectedGroup(group);
    };
    return (
        <Box sx={{ p: 2 }}>
            {data?.map((group) => (
                <Paper key={group._id} sx={{ p: 2, mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                        <Avatar src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/group/${group.avatar}`} alt={group.avatar} />
                        <Typography variant="body2" color="text.secondary"> {group.name}</Typography>
                        <AddIcon sx={{ cursor: 'pointer' }} onClick={() => handleAddMember(group)} />
                    </Stack>


                    <Typography variant="subtitle1">Thành viên:</Typography>
                    <Box
                        mt={2}
                        display="flex"
                        flexWrap="wrap"
                        gap={4}
                        justifyContent="flex-start"
                    >
                        {group.members.map((user) => (
                            <Box
                                key={user._id}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                width={100}
                                sx={{
                                    "a": {
                                        textDecoration: 'unset',
                                        color: 'unset',
                                    }
                                }}
                            >
                                <Avatar
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${user.avatar}`}
                                    sx={{ width: 100, height: 100, fontSize: 40 }}
                                />

                                <Link href={`/detail/${user._id}`}>
                                    {user.name}
                                </Link>

                                {user?.followers?.length > 0 &&
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <PeopleAltIcon sx={{ fontSize: 16 }} />
                                        <Typography variant="body2">{user?.followers?.length}</Typography>
                                    </Box>
                                }

                                <Tooltip title={user.name}>
                                    <Typography
                                        mt={1}
                                        textAlign="center"
                                        sx={{
                                            color: 'white',
                                            fontSize: 14,
                                            fontWeight: 500,
                                            maxWidth: 100,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {user.name}
                                    </Typography>
                                </Tooltip>
                            </Box>
                        ))}
                    </Box>
                </Paper>
            ))}
            {selectedGroup && (
                <BasicModal
                    open={Boolean(selectedGroup)}
                    setOpen={(v) => !v && setSelectedGroup(null)}
                    group={selectedGroup}
                    setData={setData}
                    dataGroup={data}
                />
            )}
        </Box>
    );
};

export default ListGroup;
