import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <Loader2 className="w-12 h-12 animate-spin text-white" />
        </div>
    );
};

export default Loader;
