"use client";

import StreamVideoProvider from "@/providers/StreamClientProvider";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return <StreamVideoProvider>{children}</StreamVideoProvider>;
};

export default RootLayout;
