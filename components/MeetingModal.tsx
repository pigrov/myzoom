import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface MeetingModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    title?: string;
    buttonText?: string;
    handleClick?: () => void;
    buttonIcon?: React.ReactNode;
    children?: React.ReactNode;
}

const MeetingModal = ({
    isOpen,
    onClose,
    title,
    buttonText,
    handleClick,
    children,
    buttonIcon,
}: MeetingModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent className="bg-zinc-900 border-none">
                <DialogHeader>
                    <DialogTitle className="font-bold text-white text-center pb-2">
                        {title}
                    </DialogTitle>
                    <DialogDescription>{children}</DialogDescription>
                    <Button className="w-full bg-blue-600 ring-1" onClick={handleClick}>
                        {buttonIcon && buttonIcon}
                        {buttonText}
                    </Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default MeetingModal;
