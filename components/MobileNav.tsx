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
                        <SheetClose asChild>
                            <Link
                                className={cn(currentStyle, pathname === "/" && activeStyle)}
                                href="/"
                            >
                                <Home />
                                <p className="font-semibold">Home</p>
                            </Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link
                                className={cn(
                                    currentStyle,
                                    pathname.startsWith("/upcoming") && activeStyle
                                )}
                                href="/upcoming"
                            >
                                <PhoneIncoming />
                                <p className="font-semibold">Upcoming</p>
                            </Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link
                                className={cn(
                                    currentStyle,
                                    pathname.startsWith("/previous") && activeStyle
                                )}
                                href="/previous"
                            >
                                <History />
                                <p className="font-semibold">Previous</p>
                            </Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link
                                className={cn(
                                    currentStyle,
                                    pathname.startsWith("/records") && activeStyle
                                )}
                                href="/records"
                            >
                                <Voicemail />
                                <p className="font-semibold">Records</p>
                            </Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link
                                className={cn(
                                    currentStyle,
                                    pathname.startsWith("/room") && activeStyle
                                )}
                                href="/room"
                            >
                                <SquareActivity />
                                <p className="font-semibold">Room</p>
                            </Link>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
};

export default MobileNav;
