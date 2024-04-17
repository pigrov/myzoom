"use client";

import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import { PhoneIncoming } from "lucide-react";
import Loader from "./Loader";
import { toast } from "./ui/use-toast";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
    console.log(`CallList`);

    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);

    const getCalls = () => {
        switch (type) {
            case "ended":
                return endedCalls;
            case "upcoming":
                return upcomingCalls;
            case "recordings":
                return recordings;
            default:
                return [];
        }
    };

    const getEmptyMessage = () => {
        const messages = {
            ended: "No ended calls",
            upcoming: "No upcoming calls",
            recordings: "No recordings",
        };
        return messages[type] || "";
    };

    useEffect(() => {
        const fetchRecordings = async (): Promise<CallRecording[]> => {
            try {
                const recordings = (
                    await Promise.all(callRecordings.map((call) => call.queryRecordings()))
                ).flatMap((call) => call.recordings);

                setRecordings(recordings);

                return recordings;
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to fetch recordings",
                    variant: "destructive",
                });

                return Promise.reject(error);
            }
        };

        if (type === "recordings") fetchRecordings();
    }, [type, callRecordings]);

    const calls = getCalls();
    const noCallsMessage = getEmptyMessage();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="grid grid-cols-1 gap-4 xl:grid-flow-col-2">
            {calls && calls.length > 0 ? (
                calls.map((meeting: Call | CallRecording) => (
                    <MeetingCard
                        key={(meeting as CallRecording).url || (meeting as Call).id}
                        icon={<PhoneIncoming />}
                        title={
                            (meeting as Call).state?.custom.description.substring(0, 26) ||
                            (meeting as CallRecording).filename.substring(0, 26) ||
                            "No description"
                        }
                        date={(meeting as Call).state?.startsAt?.toLocaleString() || "No date"}
                        isPreviousMeeting={type === "ended"}
                        handleClick={
                            type === "recordings"
                                ? () => {
                                      router.push((meeting as CallRecording).url);
                                  }
                                : () => {
                                      router.push(`/meeting/${(meeting as Call).id}`);
                                  }
                        }
                        link={
                            type === "recordings"
                                ? (meeting as CallRecording).url
                                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                                      (meeting as Call).id
                                  }`
                        }
                        buttonText={type === "recordings" ? "Play Recording" : "Start Meeting"}
                    />
                ))
            ) : (
                <p className="text-center text-white">{noCallsMessage}</p>
            )}
        </div>
    );
};

export default CallList;
