import {
    useEffect,
    useState,
} from "react";

import {
    useParams,
} from "react-router-dom";

import {
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import {
    HiMenuAlt3,
} from "react-icons/hi";

import {
    FaPowerOff,
} from "react-icons/fa";

import {
    IoRefresh,
} from "react-icons/io5";

function EventControl() {
    const { id } =
        useParams();

    const [event, setEvent] =
        useState(null);

    useEffect(() => {
        getEvent();
    }, []);

    const getEvent =
        async () => {
            const ref = doc(
                db,
                "inaugurations",
                id
            );

            const snap =
                await getDoc(ref);

            if (snap.exists()) {
                setEvent({
                    id: snap.id,
                    ...snap.data(),
                });
            }
        };

    const inaugurate =
        async () => {
            await updateDoc(
                doc(
                    db,
                    "inaugurations",
                    id
                ),
                {
                    inaugurated: true,
                    isActive: true,
                }
            );

            alert(
                "Inauguration Started!"
            );
        };

    const refresh =
        () => {
            window.location.reload();
        };

    if (!event) {
        return (
            <div className="h-screen flex justify-center items-center text-2xl font-bold">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#EEF2FF] flex justify-center items-center p-4">

            {/* Mobile Frame */}
            <div className="w-[350px] bg-white rounded-[38px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-200">

                {/* Header */}
                <div className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-5 py-4 flex items-center justify-between">

                    <HiMenuAlt3
                        className="text-white text-2xl"
                    />

                    <h1 className="text-white font-semibold text-lg">
                        Admin Panel
                    </h1>

                    <div />
                </div>

                {/* Content */}
                <div className="px-8 py-10 text-center">

                    {/* Rocket */}
                    <div className="flex justify-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3212/3212608.png"
                            alt="rocket"
                            className="w-28 h-28 object-contain"
                        />
                    </div>

                    {/* Event Name */}
                    <h1 className="text-[28px] font-bold text-[#111827] mt-6">
                        {event.eventName}
                    </h1>

                    {/* Guest Name */}
                    <p className="text-[18px] font-semibold text-[#374151] mt-3">
                        {event.chiefGuest}
                    </p>

                    {/* Designation */}
                    <p className="text-[15px] text-gray-500 mt-1 leading-6">
                        {event.designation}
                    </p>

                    {/* Inaugurate Button */}
                    <button
                        onClick={inaugurate}
                        className="w-full mt-8 bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] text-white rounded-2xl py-5 text-lg font-semibold flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] transition-all duration-300"
                    >
                        <FaPowerOff />
                        INAUGURATE NOW
                    </button>

                    {/* Refresh */}
                    <button
                        onClick={refresh}
                        className="flex items-center justify-center gap-2 mx-auto mt-8 text-[#4F46E5] font-medium text-lg"
                    >
                        <IoRefresh />
                        Refresh
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EventControl;