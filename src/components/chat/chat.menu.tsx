'use client'
import * as React from 'react';
import {
    Button, Menu, TextField,
    IconButton, Badge, List, ListItem,
    ListItemText, ListItemAvatar, Avatar, Divider
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useSession } from 'next-auth/react';

import { sendRequest } from '@/utils/api';
import FloatingChatBox from './chat.user';

import SearChChatUser from './search/search.user';


export default function Chat() {
    const { data: session } = useSession();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [search, setSearch] = React.useState('');
    const open = Boolean(anchorEl);

    const [users, setUsers] = React.useState<UserType[]>([])
    const [chat, setChat] = React.useState<ChatType[]>([])
    const [selectedUser, setSelectedUser] = React.useState<any | null>(null);


    const handleGetAllUser = async () => {
        const res = await sendRequest<IBackendRes<UserType[]>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/all`,
            method: "GET",
        })
        if (res?.data) {
            setUsers(res.data)
        }

    }



    const handleGetChatWithUser = async () => {
        const res = await sendRequest<IBackendRes<ChatType[]>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/chats`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${session?.user?.access_token}`
            },
        })
        if (res?.data) {
            setChat(res.data);
            const allUsers = res.data.flatMap(chat => chat.users);
            const uniqueUsers = Array.from(
                new Map(
                    allUsers
                        .filter(user => user._id !== session?.user?._id)
                        .map(user => [user._id, user])
                ).values()
            );

            setUsers(uniqueUsers);
        }
    }


    React.useEffect(() => {
        handleGetChatWithUser();
    }, [])



    // const handleUnReadCount = () => {
    //     let cnt = 0;
    //     chat.map((tmp: IChat) => {
    //         cnt += tmp?.unreadCounts?.length | 0;
    //     })
    //     console.log(">> check cnt", cnt);
    //     return cnt;

    // }


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <div>
            <Button
                id="chat-button"
                aria-controls={open ? 'chat-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <IconButton>
                    <Badge badgeContent={0} color="error">
                        <ChatIcon />
                    </Badge>
                </IconButton>
            </Button>

            <Menu
                id="chat-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                sx={{ width: 450 }}
            >
                <div style={{ padding: '8px 16px', width: 450 }}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Tìm kiếm người dùng"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                
                            }
                        }}
                    />
                </div>
                <Divider />


                <SearChChatUser users={users} setSelectedUser={setSelectedUser} setAnchorEl={setAnchorEl} search={search} chats={chat} />
            </Menu>
            {selectedUser && (
                <FloatingChatBox
                    onClose={() => setSelectedUser(null)}

                />
            )}
        </div>
    );
}
