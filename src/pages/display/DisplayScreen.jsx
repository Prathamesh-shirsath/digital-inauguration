import {
    useEffect,
    useState,
} from "react";

import {
    collection,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import CurtainAnimation from "../../components/display/CurtainAnimation";

function DisplayScreen() {
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
                    setEvent(
                        doc.data()
                    );
                });
            });

        return () => unsub();
    }, []);

    if (!event)
        return (
            <div className="h-screen flex justify-center items-center">
                No Event
            </div>
        );

    return (
        <div className="relative w-screen h-screen bg-black overflow-hidden">

            <CurtainAnimation
                inaugurated={
                    event.inaugurated
                }
            />

            <img
                src={event.imageUrl}
                alt=""
                className="w-full h-full object-cover"
            />

            <div className="absolute bottom-16 left-16 text-white">

                <h1 className="text-6xl font-bold">
                    {
                        event.eventName
                    }
                </h1>

                <p className="text-3xl mt-4">
                    Chief Guest:
                    {" "}
                    {
                        event.chiefGuest
                    }
                </p>
            </div>
        </div>
    );
}

export default DisplayScreen;