"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { History, Home, PhoneIncoming, SquareActivity, Voicemail } from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();
    const currentStyle = "flex gap-4 p-3 rounded-lg";
    const activeStyle = "font-bold bg-blue-600";

    return (
        <section className="sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between p-6 pt-28 text-white max-sm:hidden lg:w-[264px] bg-zinc-800 ">
            <div className="flex flex-1 flex-col gap-6">
                <Link className={cn(currentStyle, pathname === "/" && activeStyle)} href="/">
                    <Home />
                    <p className="ext-lg font-semibold max-lg:hidden">Home</p>
                </Link>
                <Link
                    className={cn(currentStyle, pathname.startsWith("/upcoming") && activeStyle)}
                    href="/upcoming"
                >
                    <PhoneIncoming />
                    <p className="ext-lg font-semibold max-lg:hidden">Upcoming</p>
                </Link>
                <Link
                    className={cn(currentStyle, pathname.startsWith("/previous") && activeStyle)}
                    href="/previous"
                >
                    <History />
                    <p className="ext-lg font-semibold max-lg:hidden">Previous</p>
                </Link>
                <Link
                    className={cn(currentStyle, pathname.startsWith("/records") && activeStyle)}
                    href="/records"
                >
                    <Voicemail />
                    <p className="ext-lg font-semibold max-lg:hidden">Records</p>
                </Link>
                <Link
                    className={cn(currentStyle, pathname.startsWith("/room") && activeStyle)}
                    href="/room"
                >
                    <SquareActivity />
                    <p className="ext-lg font-semibold max-lg:hidden">Room</p>
                </Link>
            </div>
        </section>
    );
}
