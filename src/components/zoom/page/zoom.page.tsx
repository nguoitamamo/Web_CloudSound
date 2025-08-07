import React, { useEffect } from "react";


import * as webRTCHandler from "../../../utils/webRTCHandler"

import "../RoomPage.css";
import Overlay from "./Overlay";
import ParticipantsSection from "../ParticipantsSection/ParticipantsSection";
import VideoSection from "./VideoSection";
import ChatSection from "../chat/ChatSection";
import RoomLabel from "./RoomLabel";

const RoomPage = ({
    roomId,
    identity,
    isRoomHost,
    showOverlay,
    connectOnlyWithAudio,
}: any) => {
    useEffect(() => {
        if (!isRoomHost && !roomId) {
            const siteUrl = window.location.origin;
            window.location.href = siteUrl;
        } else {
            webRTCHandler.getLocalPreviewAndInitRoomConnection(
                isRoomHost,
                identity,
                roomId,
                connectOnlyWithAudio
            );
        }
    }, []);

    return (
        <div className="room_container">
            <ParticipantsSection />
            <VideoSection />
            <ChatSection />
            <RoomLabel roomId={roomId} />
            {showOverlay && <Overlay />}
        </div>
    );
};



export default RoomPage;
