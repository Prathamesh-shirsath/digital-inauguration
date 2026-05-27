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
} from "firebase/firestore";

import { db } from "../../firebase/config";

import {
    FaUniversity,
    FaUserTie,
    FaCalendarAlt,
    FaMapMarkerAlt,
} from "react-icons/fa";

import {
    useNavigate,
} from "react-router-dom";

function Dashboard() {
    const navigate =
        useNavigate();

    const [liveEvent, setLiveEvent] =
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
                    const doc =
                        snapshot.docs[0];

                    setLiveEvent({
                        id: doc.id,
                        ...doc.data(),
                    });
                }
            });

        return () => unsub();
    }, []);

    return (
        <div className="min-h-screen bg-[#F5F7FF]">

            <Sidebar />

            <div className="p-4 sm:p-6 md:p-8 lg:p-10">

                {/* Header */}
                <div className="mb-8 mt-16 lg:mt-0">

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800">
                        Admin Dashboard
                    </h1>

                    <p className="text-gray-500 mt-2 text-sm sm:text-base">
                        Manage digital inauguration
                        events professionally
                    </p>

                </div>

                {!liveEvent ? (
                    <div className="bg-white rounded-[30px] shadow-lg p-10 text-center">

                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-600">
                            No Live Event
                        </h1>

                        <p className="text-gray-400 mt-3">
                            Set a live event from
                            Manage Events
                        </p>

                    </div>
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                        {/* LEFT EVENT CARD */}
                        <div className="bg-white rounded-[35px] shadow-xl p-6 md:p-8">

                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">

                                <div className="w-24 h-24 rounded-[30px] bg-gradient-to-br from-indigo-600 to-purple-700 flex justify-center items-center text-white text-4xl shadow-lg flex-shrink-0">
                                    🚀
                                </div>

                                <div>
                                    <h2 className="text-2xl md:text-4xl font-bold text-slate-800">
                                        {
                                            liveEvent.eventName
                                        }
                                    </h2>

                                    <p className="text-gray-500 mt-2">
                                        Live Event
                                    </p>
                                </div>
                            </div>

                            {/* Event Details */}
                            <div className="mt-8 space-y-4">

                                <div className="bg-slate-50 rounded-2xl p-5 flex items-center gap-4">

                                    <FaUniversity className="text-purple-600 text-xl flex-shrink-0" />

                                    <div>
                                        <p className="text-gray-400 text-sm">
                                            College
                                        </p>

                                        <h3 className="font-semibold text-sm sm:text-base">
                                            CSMSS College
                                        </h3>
                                    </div>

                                </div>

                                <div className="bg-slate-50 rounded-2xl p-5 flex items-center gap-4">

                                    <FaUserTie className="text-purple-600 text-xl flex-shrink-0" />

                                    <div>
                                        <p className="text-gray-400 text-sm">
                                            Chief Guest
                                        </p>

                                        <h3 className="font-semibold text-sm sm:text-base">
                                            {
                                                liveEvent.chiefGuest
                                            }
                                        </h3>
                                    </div>

                                </div>

                                <div className="bg-slate-50 rounded-2xl p-5 flex items-center gap-4">

                                    <FaCalendarAlt className="text-purple-600 text-xl flex-shrink-0" />

                                    <div>
                                        <p className="text-gray-400 text-sm">
                                            Event Date
                                        </p>

                                        <h3 className="font-semibold text-sm sm:text-base">
                                            {
                                                liveEvent.eventDate
                                            }
                                        </h3>
                                    </div>

                                </div>

                                <div className="bg-slate-50 rounded-2xl p-5 flex items-center gap-4">

                                    <FaMapMarkerAlt className="text-purple-600 text-xl flex-shrink-0" />

                                    <div>
                                        <p className="text-gray-400 text-sm">
                                            Venue
                                        </p>

                                        <h3 className="font-semibold text-sm sm:text-base">
                                            Main Auditorium
                                        </h3>
                                    </div>

                                </div>

                            </div>
                        </div>

                        {/* RIGHT ACTION PANEL */}
                        <div className="bg-gradient-to-br from-[#4338CA] to-[#7C3AED] rounded-[35px] shadow-2xl p-6 md:p-10 text-white flex flex-col justify-center">

                            <div className="text-center">

                                <div className="text-[70px] sm:text-[90px]">
                                    🎉
                                </div>

                                <h2 className="text-3xl sm:text-4xl font-bold mt-4">
                                    Ready to
                                    Inaugurate?
                                </h2>

                                <p className="mt-4 text-white/80 text-sm sm:text-base leading-7 max-w-sm mx-auto">
                                    Click below to start
                                    inauguration on
                                    display screen.
                                </p>

                            </div>

                            <div className="mt-10">

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/inaugurate-event"
                                        )
                                    }
                                    className="w-full bg-white text-purple-700 py-4 sm:py-5 rounded-2xl text-base sm:text-lg font-bold shadow-lg hover:scale-[1.02] transition"
                                >
                                    🚀 INAUGURATE NOW
                                </button>

                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;