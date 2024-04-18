"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";

const Row = ({ title, value, onClick }: { title: string; value: string; onClick?: () => void }) => (
    <div className="flex w-full flex-col gap-2">
        <h1 className="text-xl">{title}:</h1>
        <h1 className="text-xl truncate max-w-96"> {value}</h1>
    </div>
);

const Room = () => {
    const client = useStreamVideoClient();
    const { user } = useUser();
    const { toast } = useToast();
    const meetingId = user?.id;
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;
    const { call } = useGetCallById(meetingId!);
    const router = useRouter();

    const startRoom = async () => {
        if (!client || !user) return;

        const newCall = client.call("default", meetingId!);

        if (!call) {
            await newCall.getOrCreate({
                data: {
                    starts_at: new Date().toISOString(),
                },
            });
        }

        router.push(`/meeting/${meetingId}?personal=true`);
    };

    return (
        <section className="flex size-full flex-col gap-10 text-white">
            <h1 className="text-3xl font-bold">Personal Room</h1>

            <div className="flex w-full flex-col gap-8 bg-zinc-800 p-4 rounded-lg">
                <Row title="Meeting Title" value={`${user?.username}'s room`} />
                <Row title="Meeting ID" value={meetingId!} />
                <Row title="Meeting Password" value="123456" />
                <Row
                    title="Meeting Link"
                    value={meetingLink}
                    onClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        toast({
                            title: "Success",
                            description: "Link copied to clipboard",
                        });
                    }}
                />
            </div>

            <div className="flex gap-5">
                <Button
                    className="bg-zinc-600"
                    onClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        toast({
                            title: "Success",
                            description: "Link copied to clipboard",
                        });
                    }}
                >
                    Copy Link
                </Button>

                <Button className="bg-blue-600" onClick={startRoom}>
                    Start Room
                </Button>
            </div>
        </section>
    );
};

export default Room;
