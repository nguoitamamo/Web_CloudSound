'use client'
import * as React from 'react';
import {
    List, ListItem,
    ListItemText, ListItemAvatar, Avatar, Divider
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { SetCurrentUser, UserState } from '@/components/redux/userSlice';
import { sendRequest } from '@/utils/api';
import { useSession } from 'next-auth/react';
import { SetSelectedChat } from '@/components/redux/chatSlice';
import socket from '@/config/socket';


interface IProps {
    users: UserType[],
    setSelectedUser: (v: UserType) => void;
    setAnchorEl: (v: null | HTMLElement) => void;
    search: string;
    chats: ChatType[]
}



const SearChChatUser = ({ users, setSelectedUser, setAnchorEl, search, chats }: IProps) => {

    const { data: session } = useSession();


    // const filteredUsers = users.filter(user =>
    //     user.name.toLowerCase().includes(search.toLowerCase())
    // );

    const { onlineUsers }: UserState = useSelector((state: any) => state.user);

    const usedispath = useDispatch();


    const handleOnclickUser = async (user: UserType, chat: ChatType) => {
        console.log(">>> chec daon chat curr", chat);


        const res = await sendRequest<IBackendRes<boolean | ChatType>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/chats`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.user?.access_token}`
            },
            body: {
                users: [session?.user._id, user._id],
                isGroupChat: false
            }
        })

        setSelectedUser(user);
        usedispath(SetCurrentUser(user));

        if (res?.data === true) {
            usedispath(SetSelectedChat(chat));
        } else {
            usedispath(SetSelectedChat(res.data as ChatType));
        }

        setAnchorEl(null);


    }



    return (
        <List dense>
            {users.map((user, index) => (
                <ListItem
                    button
                    key={user._id}
                    onClick={() => handleOnclickUser(user, chats[index])}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <ListItemAvatar>
                            <Avatar
                                alt={user.name}
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${user.avatar}`}
                            />
                        </ListItemAvatar>
                        <div>
                            <p style={{ margin: 0 }}>{user.name}</p>
                            {chats[index]?.lastMessage?.sender && (
                                <p style={{ margin: 0, fontSize: 10 }}>
                                    {(chats[index].lastMessage.sender._id === session?.user?._id
                                        ? "Bạn"
                                        : chats[index].lastMessage.sender.name) +
                                        ": " +
                                        chats[index].lastMessage.text}
                                </p>
                            )}
                        </div>
                    </div>

                    {session?.user && onlineUsers.includes(user._id) && (
                        <div
                            style={{
                                background: "green",
                                height: 10,
                                width: 10,
                                borderRadius: "50%",
                            }}
                        />
                    )}


                </ListItem>
            ))}

            {/* {filteredUsers.length === 0 && (
                <ListItem>
                    <ListItemText primary="Không tìm thấy người dùng" />
                </ListItem>
            )} */}
        </List>
    )
}
export default SearChChatUser;