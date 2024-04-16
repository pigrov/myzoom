"use client";

import { CalendarCheck, Merge, Plus, Voicemail } from "lucide-react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "./ui/use-toast";

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetngState, setMeetingState] = useState<
        "isScheduleMeeting" | "isJoinMeeting" | "isInstantMeeting" | undefined
    >();
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: "",
        link: "",
    });
    const [callDetails, setCallDetails] = useState<Call>();
    const { toast } = useToast();

    const createMeeting = async () => {
        if (!client || !user) return;

        try {
            if (!values.dateTime) {
                toast({
                    title: "Please select a date and time",
                });
            }

            const id = crypto.randomUUID();
            const call = client.call("default", id);

            if (!call) throw new Error("Call not created");

            const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || "Instant Meeting";

            await call.getOrCreate({
                data: {
                    starts_at: startAt,
                    custom: {
                        description,
                    },
                },
            });

            setCallDetails(call);

            if (!values.description) {
                router.push(`/meeting/${call.id}`);
            }

            toast({
                title: "Meeting created successfully",
            });
        } catch (error) {
            console.log(error);
            toast({
                title: "Failed to create meeting",
            });
        }
    };

    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <HomeCard
                icon={<Plus />}
                title="New Meeting"
                description="Start a new meeting"
                color="bg-green-600"
                handleClick={() => setMeetingState("isInstantMeeting")}
            />
            <HomeCard
                icon={<CalendarCheck />}
                title="Schedule Meeting"
                description="Plan a meeting with your team"
                color="bg-blue-600"
                handleClick={() => setMeetingState("isScheduleMeeting")}
            />
            <HomeCard
                icon={<Voicemail />}
                title="Recording"
                description="Check your meeting recordings"
                handleClick={() => router.push("/records")}
                color="bg-yellow-600"
            />
            <HomeCard
                icon={<Merge />}
                title="Join Meeting"
                description="Join a meeting via link"
                color="bg-red-600"
                handleClick={() => setMeetingState("isJoinMeeting")}
            />

            <MeetingModal
                isOpen={meetngState === "isInstantMeeting"}
                onClose={() => setMeetingState(undefined)}
                title="Start an instant meeting"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
        </section>
    );
};

export default MeetingTypeList;
