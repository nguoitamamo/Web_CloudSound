import React, { useRef, useEffect } from "react";
import "../RoomPage.css";
const LocalScreenSharingPreview = ({ stream }: any) => {
    const localPreviewRef = useRef();

    useEffect(() => {
        const video = localPreviewRef.current;


        //@ts-ignore
        video.srcObject = stream;


        //@ts-ignore
        video.onloadedmetadata = () => {
            //@ts-ignore
            video.play();
        };
    }, [stream]);

    return (
        <div className="local_screen_share_preview">
            {localPreviewRef &&
                //@ts-ignore
                <video muted autoPlay ref={localPreviewRef}></video>
            }

        </div>
    );
};

export default LocalScreenSharingPreview;
