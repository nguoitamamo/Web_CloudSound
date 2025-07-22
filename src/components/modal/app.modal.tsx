'use client';
import * as React from 'react';
import {
    Box,
    Button,
    Typography,
    Modal,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { sendRequest } from '@/utils/api';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Height } from '@mui/icons-material';
import { useToast } from '../lib/toast';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

interface IProps {
    open: boolean;
    setOpen: (v: boolean) => void;
    group: IGroup;
    dataGroup: IGroup[];
    setData: (v: IGroup[]) => void;
}

const BasicModal = ({ open, setOpen, group, setData, dataGroup }: IProps) => {
    const { data: session } = useSession();
    const [user, setUser] = React.useState<IBasicUser[]>([])
    const toast = useToast()

    React.useEffect(() => {
        const handleGetAllUser = async () => {
            const res = await sendRequest<IBackendRes<IBasicUser[]>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/all`,
                method: "GET",
            })
            if (res?.data) {
                setUser(res.data)
            }
        }
        handleGetAllUser();

    }, [])




    const [members, setMembers] = React.useState<string[]>([]);


    const [selectedMember, setSelectedMember] = React.useState<string>("");

    const handleAddMember = (id: string) => {
        if (!members.includes(id)) {
            setMembers(prev => [...prev, id]);
        }
        setSelectedMember("");
    };

    const handleRemoveMember = (id: string) => {
        setMembers(prev => prev.filter(m => m !== id));
    };

    const handleSubmit = async () => {
        try {
            const res = await sendRequest<IBackendRes<IGroup>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/groups/add`,
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${session?.user?.access_token}`
                },
                // queryParams: {
                //     name: group.name,
                //     id: group.adminGroup
                // },
                body: {
                    members: members,
                    name: group.name,
                    id: group.adminGroup
                }
            });
            if (res?.data) {
                //@ts-ignore
                setData((prev: IGroup[]) =>
                    prev.map((g) =>
                        //@ts-ignore
                        g._id === res.data._id ? res.data : g
                    )
                );

                //setData({ ...dataGroup, group: res?.data })

                //@ts-ignore
                // setData((pre: any) => ({
                //     ...pre,
                //     group: res?.data
                // }))
                setOpen(false);


            }

            if (res?.statusCode !== 200) {
                toast.error(res?.message)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={style}
            >
                <Typography variant="h6" mb={2}>Quản lý thành viên nhóm {group.name}</Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {members.map(id => {
                        const member = user.find(m => m._id === id);
                        return (
                            <Box
                                key={id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    px: 1.5,
                                    py: 0.5,
                                    background: 'black',
                                    color: 'white',
                                    borderRadius: 2,
                                }}
                            >
                                <Typography variant="body2" sx={{ mr: 1 }}>
                                    {member?.name || id}
                                </Typography>
                                <CloseIcon
                                    fontSize="small"
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => handleRemoveMember(id)}
                                />
                            </Box>
                        );
                    })}
                </Box>

                <FormControl fullWidth>
                    <InputLabel>Thêm thành viên</InputLabel>
                    <Select
                        value={selectedMember}
                        label="Thêm thành viên"
                        onChange={(e) => handleAddMember(e.target.value)}
                    >
                        {user
                            .filter(m => !members.includes(m._id))
                            .map(m => (
                                <MenuItem key={m._id} value={m._id}>
                                    {m.name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>

                <Button
                    sx={{ mt: 3, background: 'black', color: 'white', borderRadius: 2 }}
                    onClick={handleSubmit}
                >
                    Lưu thay đổi
                </Button>
            </Box>
        </Modal>
    );
};

export default BasicModal;
