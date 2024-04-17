import { ClerkProvider } from "@clerk/nextjs";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "MYZOOM by Pigrov Dmitry",
    description: "MYZOOM by Pigrov Dmitry",
    icons: {
        icon: "/scan-eye.png",
        shortcut: "/scan-eye.png",
        apple: "/scan-eye.png",
        other: { rel: "mask-icon", url: "/scan-eye.png" },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider
            appearance={{
                layout: {
                    logoImageUrl: "",
                },
                variables: {
                    colorText: "#fff",
                    colorBackground: "#333",
                    colorAlphaShade: "#fff",
                    colorTextSecondary: "#fff",
                    colorPrimary: "#999",
                },
            }}
        >
            <html lang="en" suppressHydrationWarning>
                <body className={`${inter.className} bg-zinc-900`}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                    <Toaster />
                </body>
            </html>
        </ClerkProvider>
    );
}
