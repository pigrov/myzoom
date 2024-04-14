import Link from "next/link";
import React from "react";
import Icon from "./Icon";
import { cn } from "@/lib/utils";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export default function Sidelink({
    name,
    href,
    icon,
    isActive,
}: {
    name: string;
    href: string;
    icon: keyof typeof dynamicIconImports;
    isActive: boolean;
}) {
    return (
        <Link className={cn("flex gap-4", isActive && "font-bold")} key={name} href={href}>
            <Icon name={icon} />
            {name}
        </Link>
    );
}
