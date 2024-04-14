"use client";

import dynamicIconImports from "lucide-react/dynamicIconImports";

import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Sidelink from "./Sidelink";
import { cn } from "@/lib/utils";
import { Home, Link } from "lucide-react";

function Sidebar() {
    const pathname = usePathname();

    return (
        <section className="sticky left-0 top-0 flecx h-screen w-fit flex-col justify-between bg-zinc-800 p-6 pt-28 text-white max-sm:hidden lg:w-[280px]">
            <div className="flex flex-col gap-6">
                {sidebarLinks.map(async (link) => {
                    const isActive = pathname === link.href || pathname.startsWith(link.href);

                    return (
                        <Sidelink
                            key={link.name}
                            name={link.name}
                            href={link.href}
                            icon={link.icon}
                            isActive={isActive}
                        />
                    );
                })}
            </div>
        </section>
    );
}

export default Sidebar;
