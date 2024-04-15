import Link from "next/link";
import { ScanEye } from "lucide-react";
import React from "react";
import MobileNav from "./MobileNav";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center fixed z-50 w-full px-6 py-4 lg:px-10 bg-zinc-950 text-white">
            <Link className="flex gap-4 items-center" href="/">
                <ScanEye size={36} />
                <p>MY ZOOM</p>
            </Link>
            <div className="flex justify-between items-center gap-5 ">
                <SignedIn>
                    <UserButton />
                </SignedIn>

                <MobileNav />
            </div>
        </nav>
    );
};

export default Navbar;
