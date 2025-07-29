

import { UserState } from "@/components/redux/userSlice";
import "./Message.css"; // 👈 import CSS thuần
import { ChatState } from "@/components/redux/chatSlice";
import { formatDateTime } from "@/components/lib/dayjs";
import { useSelector } from "react-redux";

function Message({ message }: { message: MessageType }) {
    const { currentUserData }: UserState = useSelector((state: any) => state.user);
    const { selectedChat }: ChatState = useSelector((state: any) => state.chat);

    const isLoggedInUserMessage = message.sender._id === currentUserData?._id;

    let read = false;
    if (selectedChat && selectedChat?.users?.length - 1 === message.readBy?.length) {
        read = true;
    }

    if (isLoggedInUserMessage) {
        return (
            <div className="message-row left">
                <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${message.sender.avatar}`}
                    alt="avatar"
                    className="avatar"
                />
                <div className="message-content">
                    <div className="text-message receiver">
                        <span className="sender-name">{message.sender.name}</span>
                        {message.text && <p className="text">{message.text}</p>}
                    </div>
                    {message.image && (
                        <img
                            src={message.image}
                            alt="message"
                            className="message-image receiver"
                        />
                    )}
                    <span className="timestamp">{formatDateTime(message.createdAt)}</span>
                </div>
            </div>
        );

    } else {
        return (
            <div className="message-row right">
                <div className="message-content">
                    {message.text && (
                        <p className="text-message sender">
                            {message.text}
                        </p>
                    )}
                    {message.image && (
                        <img
                            src={message.image}
                            alt="message"
                            className="message-image sender"
                        />
                    )}
                    <div className="message-footer">
                        <span className="timestamp">{formatDateTime(message.createdAt)}</span>
                        <i className={`ri-check-double-line ${read ? "read" : "unread"}`}></i>
                    </div>
                </div>
                <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ASSET}/image/user/${message.sender.avatar}`}
                    alt="avatar"
                    className="avatar"
                />
            </div>
        );
    }
}

export default Message;
