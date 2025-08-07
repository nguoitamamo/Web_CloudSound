"use client";
import { useEffect, useState } from "react";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

// import Alert from "./Alert";
// import { Button } from "./ui/button";
import { Box, Button, Container } from "@mui/material";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();

  if (!call) {
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );
  }

  // https://getstream.io/video/docs/react/ui-cookbook/replacing-call-controls/
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  //   if (callTimeNotArrived)
  //     return (
  //       <Alert
  //         title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
  //       />
  //     );

  //   if (callHasEnded)
  //     return (
  //       <Alert
  //         title="The call has been ended by the host"
  //         iconUrl="/icons/call-ended.svg"
  //       />
  //     );

  return (
    <Container sx={{ mt: 2 }}>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
        <Box sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <VideoPreview />
        </Box>
        <div className="flex h-16 items-center justify-center gap-3">
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

            <label className="flex items-center justify-center gap-2 font-medium">
              <input
                type="checkbox"
                checked={isMicCamToggled}
                onChange={(e) => setIsMicCamToggled(e.target.checked)}
              />
              Join with mic and camera off
            </label>

            <DeviceSettings />
          </Box>
        </div>


        <Box mt="auto" pt={2}>
          <Button
            variant="outlined"
            fullWidth
            sx={{ background: "black", color: "white" }}
            onClick={() => {
              call.join();

              setIsSetupComplete(true);
            }}
          >
            Join metting
          </Button>
        </Box>
        {/* <Button
          className="rounded-md bg-green-500 px-4 py-2.5"
          onClick={() => {
            call.join();

            setIsSetupComplete(true);
          }}
        >
          <Box mt="auto" pt={2} sx={{ background: "black", color: "white", fontWeight: 'bold', borderRadius: '5', width: 100 }}>

            Join metting

          </Box>

        </Button> */}
      </div>
    </Container>
  );
};

export default MeetingSetup;
