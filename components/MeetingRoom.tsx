import { cn } from "@/lib/utils";
import {
    CallControls,
    CallParticipantsList,
    CallStatsButton,
    CallingState,
    PaginatedGridLayout,
    SpeakerLayout,
    useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, User2 } from "lucide-react";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

type CallLayoutType = "speaker-left" | "speaker-right" | "grid";

const MeetingRoom = () => {
    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get("personal");
    const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
    const [showParticipantsBar, setShowParticipantsBar] = useState(false);
    const { useCallCallingState } = useCallStateHooks();

    const callingState = useCallCallingState();

    if (callingState !== CallingState.JOINED) {
        return <Loader />;
    }

    const ToggleLayout = () => {
        switch (layout) {
            case "speaker-left":
                return <SpeakerLayout participantsBarPosition="left" />;
            case "grid":
                return <PaginatedGridLayout />;
            default:
                return <SpeakerLayout participantsBarPosition="right" />;
        }
    };

    return (
        <section className="h-screen w-full relative overflow-hidden pt-4 text-white">
            <div className="relative flex size-full items-center justify-center">
                <div className="flex size-full items-center">
                    <ToggleLayout />
                </div>
                <div
                    className={cn("h-full hidden ml-2 bg-zinc-700", {
                        "show-block": showParticipantsBar,
                    })}
                >
                    <CallParticipantsList onClose={() => setShowParticipantsBar(false)} />
                </div>
            </div>
            <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
                <CallControls />

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreHorizontal className="bg-zinc-800 hover:bg-zinc-700 rounded-full w-10 h-10 p-2" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-zinc-800 text-white">
                        {["Speaker-Left", "Speaker-Right", "Grid"].map((item) => (
                            <div key={item}>
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-zinc-700"
                                    onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                                >
                                    {item}
                                </DropdownMenuItem>
                            </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <CallStatsButton />
                <Button
                    className="bg-zinc-800 hover:bg-zinc-700 rounded-full w-10 h-10 p-2"
                    onClick={() => setShowParticipantsBar((prev) => !prev)}
                >
                    <User2 />
                </Button>
                {!isPersonalRoom && <EndCallButton />}
            </div>
        </section>
    );
};

export default MeetingRoom;
