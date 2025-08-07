import React from "react";

import "../RoomPage.css";
import MicButton from "./MicButton";
import LeaveRoomButton from "./LeaveRoomButton";
import CameraButton from "./CameraButton";
import SwitchToScreenSharingButton from "./SwitchToScreenSharingButton";

const VideoButtons = (props: any) => {
  const { connectOnlyWithAudio } = props;

  return (
    <div className="video_buttons_container">
      <MicButton />
      {!connectOnlyWithAudio && <CameraButton />}
      <LeaveRoomButton />
      {!connectOnlyWithAudio && <SwitchToScreenSharingButton />}
    </div>
  );
};


export default VideoButtons;
