import React, { useState } from "react";
import SendMessageButton from "../../resources/images/sendMessageButton.svg";
import * as webRTCHandler from "../../../utils/webRTCHandler";
import "../RoomPage.css";
const NewMessage = () => {
    const [message, setMessage] = useState("");

    const handleTextChange = (event: any) => {
        setMessage(event.target.value);
    };

    const handleKeyPressed = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();

            // send message to other users
            sendMessage();
        }
    };

    const sendMessage = () => {
        if (message.length > 0) {
            webRTCHandler.sendMessageUsingDataChannel(message);
            setMessage("");
        }
    };

    return (
        <div className="new_message_container">
            <input
                className="new_message_input"
                value={message}
                onChange={handleTextChange}
                placeholder="Type your message ..."
                type="text"
                onKeyDown={handleKeyPressed}
            />
            <img
                className="new_message_button"
                src={SendMessageButton}
                onClick={sendMessage}
            />
        </div>
    );
};

export default NewMessage;
