import {
    useEffect,
    useState,
} from "react";

import Sidebar from "../../components/layout/Sidebar";

import {
    collection,
    query,
    where,
    onSnapshot,
    doc,
    updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import {
    FaRocket,
    FaCalendarAlt,
    FaUserTie,
} from "react-icons/fa";

import {
    IoRefresh,
} from "react-icons/io5";

function InaugurateEvent() {
    const [event, setEvent] =
        useState(null);

    useEffect(() => {
        const q = query(
            collection(
                db,
                "inaugurations"
            ),
            where(
                "isLive",
                "==",
                true
            )
        );

        const unsub =
            onSnapshot(q, (snapshot) => {
                if (!snapshot.empty) {
                    const liveEvent =
                        snapshot.docs[0];

                    setEvent({
                        id: liveEvent.id,
                        ...liveEvent.data(),
                    });
                } else {
                    setEvent(null);
                }
            });

        return () => unsub();
    }, []);

    const inaugurate =
        async () => {
            await updateDoc(
                doc(
                    db,
                    "inaugurations",
                    event.id
                ),
                {
                    inaugurated: true,
                }
            );
        };

    const resetCurtain =
        async () => {
            await updateDoc(
                doc(
                    db,
                    "inaugurations",
                    event.id
                ),
                {
                    inaugurated: false,
                }
            );
        };

    if (!event) {
        return (
            <div className="min-h-screen bg-[#F5F7FF] flex justify-center items-center">
                <Sidebar />

                <div className="text-center">
                    <h1 className="text-4xl font-bold text-slate-700">
                        No Live Event
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Set an event live from
                        Manage Events
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F7FF]">

            <Sidebar />

            <div className="p-5 md:p-10">

                {/* Header */}
                <div className="mb-10">

                    <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                        LIVE EVENT CONTROL
                    </span>

                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mt-5">
                        Inaugurate Event
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Control inauguration on
                        smart board display
                    </p>

                </div>

                {/* Main Layout */}
                <div className="grid lg:grid-cols-2 gap-8">

                    {/* Left Info Card */}
                    <div className="bg-white rounded-[35px] shadow-lg p-8 md:p-10">

                        <div className="flex items-center gap-5">

                            <div className="w-20 h-20 rounded-[25px] bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white text-3xl shadow-lg">
                                🚀
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-slate-800">
                                    {event.eventName}
                                </h2>

                                <p className="text-gray-500 mt-1">
                                    Event Ready
                                    for Inauguration
                                </p>
                            </div>

                        </div>

                        {/* Event Details */}
                        <div className="mt-10 space-y-5">

                            <div className="bg-slate-50 rounded-2xl p-5 flex gap-4 items-center">

                                <FaUserTie className="text-purple-600 text-xl" />

                                <div>
                                    <p className="text-gray-400 text-sm">
                                        Chief Guest
                                    </p>

                                    <h3 className="font-semibold text-lg">
                                        {
                                            event.chiefGuest
                                        }
                                    </h3>
                                </div>

                            </div>

                            <div className="bg-slate-50 rounded-2xl p-5 flex gap-4 items-center">

                                <FaRocket className="text-purple-600 text-xl" />

                                <div>
                                    <p className="text-gray-400 text-sm">
                                        Designation
                                    </p>

                                    <h3 className="font-semibold text-lg">
                                        {
                                            event.designation
                                        }
                                    </h3>
                                </div>

                            </div>

                            <div className="bg-slate-50 rounded-2xl p-5 flex gap-4 items-center">

                                <FaCalendarAlt className="text-purple-600 text-xl" />

                                <div>
                                    <p className="text-gray-400 text-sm">
                                        Event Date
                                    </p>

                                    <h3 className="font-semibold text-lg">
                                        {
                                            event.eventDate
                                        }
                                    </h3>
                                </div>

                            </div>

                        </div>
                    </div>

                    {/* Right Action Panel */}
                    <div className="bg-gradient-to-br from-[#4337CA] to-[#7C3AED] rounded-[35px] shadow-2xl p-8 md:p-10 text-white flex flex-col justify-center">

                        <div className="text-center">

                            <div className="text-[90px]">
                                🚀
                            </div>

                            <h2 className="text-4xl font-bold mt-4">
                                Ready to
                                Inaugurate?
                            </h2>

                            <p className="mt-4 text-white/80 max-w-sm mx-auto leading-7">
                                Click below to start
                                inauguration ceremony
                                on the smart board.
                            </p>

                        </div>

                        {/* Buttons */}
                        <div className="mt-12 space-y-4">

                            <button
                                onClick={
                                    inaugurate
                                }
                                className="w-full bg-white text-purple-700 py-5 rounded-2xl text-lg font-bold hover:scale-[1.02] transition duration-300 shadow-lg"
                            >
                                🚀 INAUGURATE NOW
                            </button>

                            <button
                                onClick={
                                    resetCurtain
                                }
                                className="w-full bg-white/10 border border-white/20 py-5 rounded-2xl text-lg font-semibold hover:bg-white/20 transition flex justify-center items-center gap-2"
                            >
                                <IoRefresh />
                                RESET CURTAIN
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InaugurateEvent;