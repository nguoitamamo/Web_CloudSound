'use client'

import {
    Avatar,
    Box,
    TextField,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button
} from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { useSession } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import { sendRequest } from "@/utils/api";
import { useToast } from "@/components/lib/toast";
import { useRouter } from "next/navigation";


interface Group {
    name: string;
    avatar: string;
    members: string[];
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const allMembers = [
    { id: '686e76717c55361f30426d66', name: 'Mỹ Tâm' },
    { id: '686e76717c55361f30426d77', name: 'Đen Vâu' },
    { id: '686e76717c55361f30426d88', name: 'Noo Phước Thịnh' },
];

function InputFileUpload({ group, setGroup }: { group: Group, setGroup: (v: Group) => void }) {
    const { data: session } = useSession();

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/files/upload/image`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${session?.user.access_token}`,
                        'Content-Type': 'multipart/form-data',
                        folder_type: 'group',
                        type: 'image',
                    },
                }
            );
            if (res?.data) {
                setGroup({ ...group, avatar: res?.data?.data?.fileName })
            }
        } catch (error) {
            console.error("Upload failed", error);
        }
    };

    return (
        <Button
            component="label"
            variant="contained"
            sx={{ background: 'black', mb: 2 }}
            startIcon={<CloudUploadIcon />}
        >
            Upload ảnh group
            <VisuallyHiddenInput type="file" accept="image/*" onChange={handleChange} />
        </Button>
    );
}

const GroupComponent = ({ setTab }: { setTab: (v: number) => void }) => {
    const [group, setGroup] = useState<Group>({
        name: '',
        avatar: '',
        members: [],
    });

    const toast = useToast();
    const { data: session } = useSession();

    const router = useRouter();

    const handleSubmit = async () => {
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/groups`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.user.access_token}`,
            },
            body: group
        });

        if (res?.statusCode === 201) {
            toast.success(res.message);
            setTab(4);
        } else {
            toast.error(res.message);
        }
    };

    const handleAddMember = (id: string) => {
        if (!group.members.includes(id)) {
            setGroup(prev => ({
                ...prev,
                members: [...prev.members, id]
            }));
        }
    };

    const handleRemoveMember = (id: string) => {
        setGroup(prev => ({
            ...prev,
            members: prev.members.filter(m => m !== id)
        }));
    };

    return (
        <Box sx={{ border: '2px dashed', p: 4, borderRadius: 2 }}>
            <Typography variant="h5" mb={3}>Tạo nhóm người dùng</Typography>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Box sx={{ flex: 4, pr: 2 }}>

                    <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/group/${group.avatar}`}
                        alt="Group Avatar"
                        style={{ width: 250, height: 250, borderRadius: 8 }}
                    />

                    <InputFileUpload group={group} setGroup={setGroup} />
                </Box>


                <Box flex={6}>
                    <TextField
                        label="Tên group"
                        fullWidth
                        value={group.name}
                        onChange={e => setGroup(prev => ({ ...prev, name: e.target.value }))}
                        sx={{ mb: 3 }}
                    />



                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {group.members.map(id => {
                            const member = allMembers.find(m => m.id === id);
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

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Thêm thành viên</InputLabel>
                        <Select
                            value=""
                            label="Thêm thành viên"
                            onChange={(e) => handleAddMember(e.target.value)}
                        >
                            {allMembers.map(m => (
                                <MenuItem key={m.id} value={m.id}>
                                    {m.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
 

                    <Button
                        sx={{ mt: 4, background: 'black', color: 'white', borderRadius: 2 }}
                        onClick={handleSubmit}
                    >
                        Tạo nhóm
                    </Button>
                </Box>
            </Box>
        </Box >
    );
}

export default GroupComponent;