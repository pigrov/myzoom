import { cn } from "@/lib/utils";
import React from "react";

interface HomeCardProps {
    icon?: React.ReactNode;
    title?: string;
    description?: string;
    handleClick?: () => void;
    color?: string;
}

const HomeCard = ({ title, description, handleClick, color, icon }: HomeCardProps) => {
    return (
        <div
            className={cn(
                "px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-2xl cursor-pointer",
                color || "bg-orange-600"
            )}
            onClick={handleClick}
        >
            <div className="glassmorphism flex justify-center items-center size-12 rounded-xl">
                {icon}
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-lg font-normal">{description}</p>
            </div>
        </div>
    );
};

export default HomeCard;
