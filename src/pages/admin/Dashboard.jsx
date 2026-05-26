import {
    useEffect,
    useState,
} from "react";

import Sidebar from "../../components/layout/Sidebar";

import {
    collection,
    onSnapshot,
    query,
    where,
    doc,
    updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase/config";

function Dashboard() {
    const [event, setEvent] =
        useState(null);

    useEffect(() => {
        const q = query(
            collection(
                db,
                "inaugurations"
            ),
            where(
                "isActive",
                "==",
                true
            )
        );

        const unsub =
            onSnapshot(q, (snap) => {
                snap.forEach((doc) => {
                    setEvent({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
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

    const resetEvent =
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

    return (
        <div className="flex bg-slate-100 min-h-screen">

            <Sidebar />

            <div className="ml-[280px] p-10 w-full">

                <h1 className="text-5xl font-bold mb-8">
                    Dashboard
                </h1>

                {event && (
                    <div className="bg-white rounded-[40px] shadow-xl overflow-hidden">

                        <img
                            src={event.imageUrl}
                            alt=""
                            className="w-full h-[400px] object-cover"
                        />

                        <div className="p-8">

                            <h2 className="text-4xl font-bold">
                                {event.eventName}
                            </h2>

                            <p className="text-xl mt-2 text-gray-600">
                                Chief Guest:
                                {" "}
                                {
                                    event.chiefGuest
                                }
                            </p>

                            <div className="flex gap-5 mt-8">

                                <button
                                    onClick={
                                        inaugurate
                                    }
                                    className="bg-green-600 text-white px-10 py-4 rounded-2xl text-xl"
                                >
                                    INAUGURATE
                                </button>

                                <button
                                    onClick={
                                        resetEvent
                                    }
                                    className="bg-red-500 text-white px-10 py-4 rounded-2xl text-xl"
                                >
                                    RESET
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