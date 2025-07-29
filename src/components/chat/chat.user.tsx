'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Avatar, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import './FloatingChatBox.css';

import { useRouter } from 'next/navigation';
import socket from '@/config/socket';
import { useSession } from 'next-auth/react';
import { ChatState, SetChats } from '../redux/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { sendRequest } from '@/utils/api';
import { SetCurrentUser, UserState } from '../redux/userSlice';
import Messages from './message/messages';
import Message from './message/message';
import dayjs from 'dayjs';

interface Props {
    onClose: () => void;

}

const FloatingChatBox: React.FC<Props> = ({ onClose }) => {

    const { data: session } = useSession();


    const [content, setContent] = React.useState('');
    const [messages, setMessages] = React.useState<MessageType[]>([]);

    const [loading, setLoading] = React.useState(false);

    const { selectedChat, chats }: ChatState = useSelector(
        (state: any) => state.chat
    );
    const { currentUserData }: UserState = useSelector((state: any) => state.user);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const getMessages = async () => {
        try {
            setLoading(true);
            console.log(">> check chat", selectedChat);

            const res = await sendRequest<IBackendRes<MessageType[]>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/chat?chatID=${selectedChat?._id}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session?.user?.access_token}`
                }
            })
            if (res?.data)
                setMessages(res.data)


        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        getMessages(); // get messagess của đoạn chat giữa hai người thông qua chat trong redux
    }, [currentUserData]);

    const onSend = async () => {
        try {
            if (!content) return;
            setLoading(true);

            if (!socket.connect()) {
                socket.connect()
            }
            // let image = "";
            // if (selectedImageFile) {
            //     image = await UploadImageToFirebaseAndReturnUrl(selectedImageFile);
            // }
            if (session?.user) {

                const socketPayload = {
                    text: content,
                    image: '',
                    socketMessageId: dayjs().unix(),
                    chat: selectedChat?._id,
                    sender: session?.user._id
                };

                // send message using socket
                socket.emit("send-new-message", socketPayload);
                setContent("");

                await sendRequest<IBackendRes<any>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/messages`,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${session?.user?.access_token}`
                    },
                    body: socketPayload
                })

                const socketMes = {
                    text: content,
                    image: '',
                    socketMessageId: dayjs().unix(),
                    chat: selectedChat?._id,
                    sender: {
                        _id: session.user._id,
                        name: session.user.name,
                        email: session.user.email,
                        avatar: session.user.avatar,
                    }
                };

                setMessages((prev: any) =>
                    [...prev, socketMes]
                );
            }



        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {

        if (!socket.connect()) {
            socket.connect()
        }

        socket.on("new-message-received", (message: MessageType) => {
            if (selectedChat?._id === message.chat._id) {
                setMessages((prev) => {
                    const isMessageAlreadyExists = prev.find(
                        (msg) => msg.socketMessageId === message.socketMessageId
                    );
                    if (isMessageAlreadyExists) return prev;
                    else return [...prev, message];
                });
            }
        });


        // listen for user-read-all-chat-messages event
        socket.on(
            "user-read-all-chat-messages",
            ({ chatId, readByUserId }: { chatId: string; readByUserId: string }) => {
                if (selectedChat?._id === chatId) {
                    setMessages((prev) => {
                        const newMessages = prev.map((msg) => {
                            if (
                                msg.sender._id !== readByUserId &&
                                !msg.readBy.includes(readByUserId)
                            ) {
                                return { ...msg, readBy: [...msg.readBy, readByUserId] };
                            }
                            return msg;
                        });

                        return newMessages;
                    });
                }
            }
        );

    }, [selectedChat])






    useEffect(() => {
        // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        if (messagesEndRef.current)
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight + 100;

        // if (!socket.connect()) {
        //     socket.connect();
        // }


        // let unreadMessages = 0;
        // let chat = chats.find((chat) => chat._id === selectedChat?._id);
        // if (chat && chat.unreadCounts) {
        //     unreadMessages = chat?.unreadCounts[currentUserData?._id!] || 0;
        // }

        // if (unreadMessages > 0) {
        //     sendRequest<IBackendRes<any>>({
        //         url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/all?chatID=${selectedChat?._id}`,
        //         method: "GET",
        //         headers: {
        //             Authorization: `Bearer ${session?.user?.access_token}`
        //         },
        //     })

        //     socket.emit("read-all-messages", { // cập nhật unread
        //         chatId: selectedChat?._id!,
        //         readByUserId: session?.user?._id!,
        //         users: selectedChat?.users
        //             .filter((user) => user._id !== session?.user?._id!)
        //             .map((user) => user._id),
        //     });
        // }

        // // set the unread messages to 0 for the selected chat
        // const newChats = chats.map((chat) => {
        //     if (chat._id === selectedChat?._id) {
        //         let chatData = { ...chat };
        //         chatData.unreadCounts = { ...chat.unreadCounts };
        //         chatData.unreadCounts[currentUserData?._id!] = 0;
        //         return chatData;
        //     } else return chat;
        // });

        // dispatch(SetChats(newChats));
    }, [messages]);


    useEffect(() => {
        if (!socket.connect()) {
            socket.connect();
        }
        socket.emit("typing", {
            chat: selectedChat,
            senderId: currentUserData?._id!,
            senderName: currentUserData?.name.split(" ")[0],
        });
    }, [selectedChat, content]);

    return (
        <div className="chat-box">
            <div className="chat-header">
                <div className="chat-user">
                    <Avatar
                        alt={currentUserData?.avatar}
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${currentUserData?.avatar}`}
                    />
                    <span>{currentUserData?.name}</span>
                </div>
                <IconButton size="small" onClick={onClose}>
                    <CloseIcon style={{ color: 'white' }} />
                </IconButton>
            </div>


            <div className="chat-messages" ref={messagesEndRef}>
                {messages && messages.map((mes: MessageType) => {
                    return (
                        <Message message={mes} />
                    )
                })}
            </div>

            <div className="chat-input">
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Aa"
                    variant="outlined"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            onSend();
                        }
                    }}
                />
                <IconButton color="primary"
                    onClick={() => onSend()}
                >
                    <SendIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default FloatingChatBox;
