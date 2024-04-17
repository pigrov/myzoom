"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { Copy, PhoneIncoming, User2 } from "lucide-react";

interface MeetingCardProps {
    title: string;
    date: string;
    icon: React.ReactNode;
    isPreviousMeeting?: boolean;
    buttonIcon1?: React.ReactNode;
    buttonText?: string;
    handleClick: () => void;
    link: string;
}

const MeetingCard = ({
    icon,
    title,
    date,
    isPreviousMeeting,
    buttonIcon1,
    handleClick,
    link,
    buttonText,
}: MeetingCardProps) => {
    const { toast } = useToast();

    return (
        <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-zinc-800 px-5 py-8 xl:max-w-[568px]">
            <div className="flex flex-col gap-5">
                {icon}
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p className="text-base font-normal">{date}</p>
                    </div>
                </div>
            </div>
            <div className={cn("flex justify-center relative", {})}>
                <div className="relative flex w-full max-sm:hidden">
                    {["1", "2", "3", "4", "5"].map((img, index) => (
                        <User2 key={index} className="text-white" />
                    ))}
                    <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-zinc-600 bg-zinc-800">
                        +5
                    </div>
                </div>
                {!isPreviousMeeting && (
                    <div className="flex gap-2">
                        <Button onClick={handleClick} className="rounded bg-blue-600 px-6">
                            {buttonIcon1 && buttonIcon1}
                            &nbsp; {buttonText}
                        </Button>
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(link);
                                toast({
                                    title: "Link Copied",
                                });
                            }}
                            className="bg-zinc-700 px-6"
                        >
                            <Copy size={20} />
                            &nbsp; Copy Link
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MeetingCard;
