

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "./message";

import "./Messages.css"; // 👈 CSS thuần import tại đây
import { UserState } from "@/components/redux/userSlice";
import socket from "@/config/socket";
import { ChatState, SetChats } from "@/components/redux/chatSlice";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Messages() {
    const session = await getServerSession(authOptions);
    const [messages, setMessages] = React.useState<MessageType[]>([]);
    const [loading, setLoading] = React.useState(false);
    const { selectedChat, chats }: ChatState = useSelector((state: any) => state.chat);
    const { currentUserData }: UserState = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    // const getChats = async () => {
    //     try {
    //         setLoading(true);

    //         const mes = await sendRequest<IBackendRes<MessageType[]>>({
    //             url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/chat`,
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${session?.user?.access_token}`
    //             },
    //             body: {
    //                 chatID: selectedChat?._id,
    //                 userID: currentUserData?._id
    //             }
    //         })

    //         if (mes?.data)
    //             dispatch(SetChats(mes?.data));
    //     } catch (error: any) {
    //         console.log(error)
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // React.useEffect(() => {
    //     if (currentUserData) getChats();
    // }, [currentUserData]);



    const messagesDivRef = React.useRef<HTMLDivElement>(null);



    // useEffect(() => {
    //     socket.on("new-message-received", (message: MessageType) => {
    //         if (selectedChat?._id === message.chat._id) {
    //             setMessages((prev) => {
    //                 const isMessageAlreadyExists = prev.find(
    //                     (msg) => msg.socketMessageId === message.socketMessageId
    //                 );
    //                 if (isMessageAlreadyExists) return prev;
    //                 else return [...prev, message];
    //             });
    //         }
    //     });

    //     socket.on(
    //         "user-read-all-chat-messages",
    //         ({ chatId, readByUserId }: { chatId: string; readByUserId: string }) => {
    //             if (selectedChat?._id === chatId) {
    //                 setMessages((prev) => {
    //                     const newMessages = prev.map((msg) => {
    //                         if (
    //                             msg.sender._id !== readByUserId &&
    //                             !msg.readBy.includes(readByUserId)
    //                         ) {
    //                             return { ...msg, readBy: [...msg.readBy, readByUserId] };
    //                         }
    //                         return msg;
    //                     });

    //                     return newMessages;
    //                 });
    //             }
    //         }
    //     );
    // }, [selectedChat]);

    // useEffect(() => {
    //     if (messagesDivRef.current) {
    //         messagesDivRef.current.scrollTop = messagesDivRef.current.scrollHeight + 100;
    //     }

    //     let unreadMessages = 0;
    //     let chat = chats.find((chat: ChatState) => chat._id === selectedChat?._id);
    //     if (chat && chat.unreadCounts) {
    //         unreadMessages = chat?.unreadCounts[currentUserData?._id!] || 0;
    //     }

    //     if (unreadMessages > 0) {
    //         ReadAllMessages({
    //             userId: currentUserData?._id!,
    //             chatId: selectedChat?._id!,
    //         });

    //         socket.emit("read-all-messages", {
    //             chatId: selectedChat?._id!,
    //             readByUserId: currentUserData?._id!,
    //             users: selectedChat?.users
    //                 .filter((user) => user._id !== currentUserData?._id!)
    //                 .map((user) => user._id),
    //         });
    //     }

    //     const newChats = chats.map((chat) => {
    //         if (chat._id === selectedChat?._id) {
    //             let chatData = { ...chat };
    //             chatData.unreadCounts = { ...chat.unreadCounts };
    //             chatData.unreadCounts[currentUserData?._id!] = 0;
    //             return chatData;
    //         } else return chat;
    //     });

    //     dispatch(SetChats(newChats));
    // }, [messages]);

    return (
        <div className="messages-container" ref={messagesDivRef}>
            <div className="message-list">
                {messages.map((message) => (
                    <Message key={message._id} message={message} />
                ))}
            </div>
        </div>
    );
}

export default Messages;
