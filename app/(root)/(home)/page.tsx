"use client";

import MeetingTypeList from "@/components/MeetingTypeList";
import { DateTime } from "luxon";

const Home = () => {
    // const time = new Date().toLocaleTimeString("en-US", {
    //     hour: "2-digit",
    //     minute: "2-digit",
    //     hour12: true,
    // });
    // const date = new Date().toLocaleDateString("en-US", {
    //     weekday: "long",
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    // });

    // const time = DateTime.fromISO(new Date().toLocaleTimeString(), { zone: "system" })
    //     .setZone("America/New_York")
    //     .toFormat("h:mm a");

    const now = new Date();
    const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now);

    return (
        <section className="flex size-full flex-col gap-10 text-white">
            <div className="h-[300px] w-full rounded-[16px] bg-hero bg-cover">
                <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
                    <h2 className="max-w-[270px] rounded py-2 text-center text-base font-normal glassmorphism">
                        Upcoming Meeting at 13:45
                    </h2>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl lg:text-7xl font-extrabold">{time}</h1>
                        <p className="text-lg font-medium text-slate-400">{date}</p>
                    </div>
                </div>
            </div>
            <MeetingTypeList />
        </section>
    );
};

export default Home;
