import React from "react";
import "../RoomPage.css";

const RoomLabel = ({ roomId }: any) => {
    return (
        <div className="room_label">
            <p className="room_label_paragraph">ID: {roomId} </p>
        </div>
    );
};

export default RoomLabel;
