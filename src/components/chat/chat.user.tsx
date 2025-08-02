'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Avatar, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CallIcon from '@mui/icons-material/Call';
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
import Call from '../modal/all.modal';
import { SocketAddress } from 'net';
import { setIncomingCall } from '../redux/callSlice';



interface Props {
    onClose: () => void;

}

const FloatingChatBox: React.FC<Props> = ({ onClose }) => {

    const { data: session } = useSession();
    const router = useRouter();

    const [content, setContent] = React.useState('');
    const [messages, setMessages] = React.useState<MessageType[]>([]);

    const [isCalling, setIsCalling] = useState(false);

    const { selectedChat, chats }: ChatState = useSelector(
        (state: any) => state.chat
    );
    const { currentUserData }: UserState = useSelector((state: any) => state.user);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const getMessages = async () => {
        try {
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
        }
    };

    React.useEffect(() => {
        getMessages(); // get messagess của đoạn chat giữa hai người thông qua chat trong redux
    }, [currentUserData]);

    const onSend = async () => {
        try {
            if (!content) return;

            if (!socket.connect()) {
                socket.connect()
            }
            if (session?.user) {

                // const socketPayload = {
                //     text: content,
                //     image: '',
                //     socketMessageId: dayjs().unix(),
                //     chat: selectedChat,
                // };

                const socketMes = {
                    text: content,
                    image: '',
                    socketMessageId: dayjs().unix(),
                    chat: selectedChat,
                    sender: {
                        _id: session.user._id,
                        name: session.user.name,
                        email: session.user.email,
                        avatar: session.user.avatar,
                    }
                };

                // send message using socket
                socket.emit("send-new-message", socketMes);
                setContent("");

                await sendRequest<IBackendRes<any>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/messages`,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${session?.user?.access_token}`
                    },
                    body: {
                        text: content,
                        image: '',
                        chat: selectedChat?._id,
                    }
                })

                setMessages((prev: any) =>
                    [...prev, socketMes]
                );
            }



        } catch (error: any) {
            console.log(error);
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

        // socket.on("incoming-call", (data: InfoCallUser) => {
        //     dispatch(setIncomingCall(data))
        // });


        socket.on('reject-call-user', (data: boolean) => {
            console.log(">> Check reject ở client call")
            setIsCalling(data);
        })


        socket.on('received-call-accepted', (data: InfoCallUser) => {
            setIsCalling(false);
            router.push('call')
        })

    }, [selectedChat])




    useEffect(() => {

        if (messagesEndRef.current)
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight + 100;


    }, [messages]);


    const handleEmitCallUser = () => {
        if (!socket.connected) {
            socket.connect();
        }

        if (!session?.user._id || !currentUserData?._id || !selectedChat?._id) return;

        const info: InfoCallUser = {
            fromUserID: session.user._id,
            ToUserID: currentUserData._id,
            callerName: session.user.name,
            callerAvatar: session.user.avatar,
            receivedName: currentUserData.name,
            receivedAvatar: currentUserData.avatar,
            chatID: selectedChat._id,
            socketID: socket.id
        };
        dispatch(setIncomingCall(info));
        socket.emit('call-user', info);

    };


    return (
        <div className="chat-box">
            <div className="chat-header">
                <div className="chat-user">
                    <Avatar
                        alt={currentUserData?.avatar}
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${currentUserData?.avatar}`}
                    />
                    <span>{currentUserData?.name}</span>
                    <IconButton color="primary" onClick={() => {
                        setIsCalling(true),
                            handleEmitCallUser()
                    }}>
                        <CallIcon />
                    </IconButton>
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

            <Call
                open={isCalling}
                onClose={() => setIsCalling(false)}
                callee={{
                    name: currentUserData?.name || '',
                    avatar: currentUserData?.avatar || ''
                }}
            />
        </div>
    );
};

export default FloatingChatBox;
