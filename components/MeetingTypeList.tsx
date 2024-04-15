"use client";

import { CalendarCheck, Merge, Plus, Voicemail } from "lucide-react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetngState, setMeetingState] = useState<
        "isScheduleMeeting" | "isJoinMeeting" | "isInstantMeeting" | undefined
    >();

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
        </section>
    );
};

export default MeetingTypeList;
