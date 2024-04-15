"use client";

import React from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    History,
    Home,
    Menu,
    PhoneIncoming,
    ScanEye,
    SquareActivity,
    Voicemail,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
    const pathname = usePathname();
    const currentStyle = "flex gap-4 p-3 rounded-lg";
    const activeStyle = "font-bold bg-blue-600";

    const NavItem = ({
        title,
        href,
        icon,
    }: {
        title: string;
        href: string;
        icon: React.ReactNode;
    }) => {
        return (
            <SheetClose asChild>
                <Link className={cn(currentStyle, pathname === href && activeStyle)} href={href}>
                    {icon}
                    <p className="font-semibold">{title}</p>
                </Link>
            </SheetClose>
        );
    };

    return (
        <section className="w-full mex-w-[280px]">
            <Sheet>
                <SheetTrigger asChild>
                    <Menu size={36} className="cursor-pointer sm:hidden" />
                </SheetTrigger>
                <SheetContent side="left" className="border-none bg-zinc-900 text-white">
                    <SheetClose asChild>
                        <Link className="flex gap-4 items-center text-white" href="/">
                            <ScanEye size={36} />
                            <p>MY ZOOM</p>
                        </Link>
                    </SheetClose>

                    <div className="flex flex-1 flex-col gap-6 mt-6">
                        <NavItem title="Home" href="/" icon={<Home />} />
                        <NavItem title="Upcoming" href="/upcoming" icon={<PhoneIncoming />} />
                        <NavItem title="Previous" href="/previous" icon={<History />} />
                        <NavItem title="Records" href="/records" icon={<Voicemail />} />
                        <NavItem title="Voice" href="/room" icon={<SquareActivity />} />
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
};

export default MobileNav;
