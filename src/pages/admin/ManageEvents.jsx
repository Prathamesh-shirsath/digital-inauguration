import {
    useEffect,
    useState,
} from "react";

import Sidebar from "../../components/layout/Sidebar";

import {
    collection,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
    getDocs,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import {
    useNavigate,
} from "react-router-dom";

import {
    FaTrash,
    FaRocket,
    FaBroadcastTower,
} from "react-icons/fa";

function ManageEvents() {
    const navigate =
        useNavigate();

    const [events, setEvents] =
        useState([]);

    useEffect(() => {
        const unsub =
            onSnapshot(
                collection(
                    db,
                    "inaugurations"
                ),
                (snapshot) => {
                    setEvents(
                        snapshot.docs.map(
                            (doc) => ({
                                id: doc.id,
                                ...doc.data(),
                            })
                        )
                    );
                }
            );

        return () => unsub();
    }, []);

    // Set Live Event
    const setLiveEvent =
        async (
            selectedId
        ) => {
            try {
                const snapshot =
                    await getDocs(
                        collection(
                            db,
                            "inaugurations"
                        )
                    );

                for (const event of snapshot.docs) {
                    await updateDoc(
                        doc(
                            db,
                            "inaugurations",
                            event.id
                        ),
                        {
                            isLive:
                                false,
                            inaugurated:
                                false,
                        }
                    );
                }

                await updateDoc(
                    doc(
                        db,
                        "inaugurations",
                        selectedId
                    ),
                    {
                        isLive: true,
                        inaugurated:
                            false,
                    }
                );

                alert(
                    "Live Event Set"
                );
            } catch (error) {
                console.log(error);
            }
        };

    // Delete Event
    const deleteEvent =
        async (id) => {
            const confirmDelete =
                confirm(
                    "Delete this event?"
                );

            if (
                !confirmDelete
            )
                return;

            await deleteDoc(
                doc(
                    db,
                    "inaugurations",
                    id
                )
            );
        };

    return (
        <div className="min-h-screen bg-[#F5F7FF]">

            <Sidebar />

            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 pt-20 lg:pt-10 pb-10 max-w-[1700px] mx-auto">

                {/* Header */}
                <div className="mb-8">

                    <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                        EVENT MANAGEMENT
                    </span>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mt-4">
                        Manage Events
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage live inauguration
                        events professionally
                    </p>

                </div>

                {/* No Events */}
                {events.length ===
                    0 ? (
                    <div className="bg-white rounded-[35px] p-12 shadow-lg text-center">

                        <h2 className="text-2xl font-bold text-slate-700">
                            No Events Found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Create an event first
                        </p>

                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {events.map(
                            (event) => (
                                <div
                                    key={
                                        event.id
                                    }
                                    className="bg-white rounded-[35px] overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
                                >

                                    {/* Image */}
                                    <div className="relative">

                                        <img
                                            src={
                                                event.imageUrl
                                            }
                                            alt=""
                                            className="w-full h-[220px] object-cover"
                                        />

                                        {event.isLive && (
                                            <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                                LIVE
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">

                                        <h2 className="text-2xl font-bold text-slate-800">
                                            {
                                                event.eventName
                                            }
                                        </h2>

                                        <p className="text-gray-500 mt-2">
                                            {
                                                event.chiefGuest
                                            }
                                        </p>

                                        <p className="text-sm text-gray-400 mt-1">
                                            {
                                                event.designation
                                            }
                                        </p>

                                        <p className="text-sm text-gray-500 mt-4">
                                            📅{" "}
                                            {
                                                event.eventDate
                                            }
                                        </p>

                                        {/* Buttons */}
                                        <div className="mt-6 flex flex-col sm:flex-row gap-3">

                                            {/* Open */}
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        "/inaugurate-event"
                                                    )
                                                }
                                                className="flex-1 bg-gradient-to-r from-[#4338CA] to-[#9333EA] text-white py-3 rounded-2xl font-semibold hover:scale-[1.02] transition flex items-center justify-center gap-2"
                                            >
                                                <FaRocket />
                                                Open
                                            </button>

                                            {/* Set Live */}
                                            <button
                                                onClick={() =>
                                                    setLiveEvent(
                                                        event.id
                                                    )
                                                }
                                                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-semibold transition flex items-center justify-center gap-2"
                                            >
                                                <FaBroadcastTower />
                                                Live
                                            </button>

                                            {/* Delete */}
                                            <button
                                                onClick={() =>
                                                    deleteEvent(
                                                        event.id
                                                    )
                                                }
                                                className="bg-red-500 hover:bg-red-600 text-white py-3 px-5 rounded-2xl transition flex items-center justify-center"
                                            >
                                                <FaTrash />
                                            </button>

                                        </div>

                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageEvents;