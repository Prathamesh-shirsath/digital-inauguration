import {
    useEffect,
    useState,
} from "react";

import {
    collection,
    query,
    where,
    onSnapshot,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import CurtainAnimation from "../../components/display/CurtainAnimation";

function DisplayScreen() {
    const [event, setEvent] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

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

        const unsubscribe =
            onSnapshot(
                q,
                (snapshot) => {
                    console.log(
                        "LIVE EVENT:",
                        snapshot.docs.map(
                            (doc) =>
                                doc.data()
                        )
                    );

                    if (
                        !snapshot.empty
                    ) {
                        const liveEvent =
                            snapshot.docs[0];

                        setEvent({
                            id: liveEvent.id,
                            ...liveEvent.data(),
                        });
                    } else {
                        setEvent(null);
                    }

                    setLoading(false);
                },
                (error) => {
                    console.log(
                        "Firestore Error:",
                        error
                    );

                    setLoading(false);
                }
            );

        return () =>
            unsubscribe();
    }, []);

    // Loading
    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center text-3xl">
                Loading...
            </div>
        );
    }

    // No live event
    if (!event) {
        return (
            <div className="h-screen bg-black flex justify-center items-center text-white text-4xl font-bold">
                No Live Event
            </div>
        );
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-black">

            {/* Banner */}
            <img
                src={event.imageUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Curtain */}
            <CurtainAnimation
                inaugurated={
                    event.inaugurated
                }
            />

            {/* Event Details */}
           {/* {event.inaugurated && (
                <div className="absolute bottom-10 left-10 z-40 text-white">

                    <h1 className="text-6xl font-bold">
                        {
                            event.eventName
                        }
                    </h1>

                    <p className="text-3xl mt-4">
                        Welcome
                    </p>

                    <h2 className="text-4xl font-bold">
                        {
                            event.chiefGuest
                        }
                    </h2>

                    <p className="text-2xl">
                        {
                            event.designation
                        }
                    </p>

                </div>
            )}*/}
        </div>
    );
}

export default DisplayScreen;