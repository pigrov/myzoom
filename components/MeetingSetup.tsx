import {
    DeviceSelectorAudioInput,
    DeviceSelectorVideo,
    DeviceSettings,
    VideoPreview,
    useCall,
} from "@stream-io/video-react-sdk";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) => {
    const [isToggled, setIsToggled] = useState(false);
    const call = useCall();

    if (!call) {
        throw new Error("useCall must be used within a <StreamCall> component");
    }

    useEffect(() => {
        if (isToggled) {
            call?.camera?.disable();
            call?.microphone?.disable();
        } else {
            call?.camera?.enable();
            call?.microphone?.enable();
        }
    }, [isToggled, call?.camera, call?.microphone]);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
            <h1 className="text-3xl text-white">Setup</h1>
            <VideoPreview />
            <div className="flex h-16 items-center justify-center gap-3">
                <label className="flex items-center justify-center gap-2 font-medium">
                    <input
                        type="checkbox"
                        checked={isToggled}
                        onChange={(e) => setIsToggled(e.target.checked)}
                    />
                    Join with mic and camera
                </label>
                <DeviceSettings />
                {/* <DeviceSelectorVideo />
                <DeviceSelectorAudioInput /> */}
            </div>
            <Button
                className="rounded-full bg-green-600 px-10 border-[1px] border-green-600"
                onClick={() => {
                    call.join();
                    setIsSetupComplete(true);
                }}
            >
                Join
            </Button>
        </div>
    );
};

export default MeetingSetup;
