import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface IconProps extends LucideProps {
    name: keyof typeof dynamicIconImports;
}

export const sidebarLinks: {
    name: string;
    href: string;
    icon: keyof typeof dynamicIconImports;
}[] = [
    {
        name: "Home",
        href: "/",
        icon: "home",
    },
    {
        name: "Upcoming",
        href: "/upcoming",
        icon: "phone-incoming",
    },
    {
        name: "Previous",
        href: "/previous",
        icon: "history",
    },
    {
        name: "Records",
        href: "/records",
        icon: "voicemail",
    },
    {
        name: "Room",
        href: "/room",
        icon: "square-activity",
    },
];
