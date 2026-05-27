import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import axios from "axios";

import {
    collection,
    addDoc,
} from "firebase/firestore";

import { db } from "../../firebase/config";

function CreateInauguration() {
    const [eventName, setEventName] =
        useState("");

    const [chiefGuest, setChiefGuest] =
        useState("");

    const [designation, setDesignation] =
        useState("");

    const [eventDate, setEventDate] =
        useState("");

    const [image, setImage] =
        useState(null);

    const [preview, setPreview] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    // Handle Image
    const handleImage = (e) => {
        const file =
            e.target.files[0];

        if (!file) return;

        setImage(file);

        setPreview(
            URL.createObjectURL(file)
        );
    };

    // Create Event
    const handleSubmit =
        async () => {
            try {
                if (
                    !eventName ||
                    !chiefGuest ||
                    !designation ||
                    !eventDate ||
                    !image
                ) {
                    alert(
                        "Please fill all fields"
                    );
                    return;
                }

                setLoading(true);

                // Cloudinary Upload
                const formData =
                    new FormData();

                formData.append(
                    "file",
                    image
                );

                formData.append(
                    "upload_preset",
                    import.meta.env
                        .VITE_UPLOAD_PRESET
                );

                const response =
                    await axios.post(
                        `https://api.cloudinary.com/v1_1/${import.meta.env
                            .VITE_CLOUD_NAME
                        }/image/upload`,
                        formData
                    );

                const imageUrl =
                    response.data
                        .secure_url;

                // Firestore Save
                await addDoc(
                    collection(
                        db,
                        "inaugurations"
                    ),
                    {
                        eventName,
                        chiefGuest,
                        designation,
                        eventDate,
                        imageUrl,
                        isLive: false,
                        inaugurated: false,
                        createdAt:
                            new Date(),
                    }
                );

                alert(
                    "Event Created Successfully!"
                );

                // Reset
                setEventName("");
                setChiefGuest("");
                setDesignation("");
                setEventDate("");
                setImage(null);
                setPreview("");

            } catch (error) {
                console.log(error);
                alert(
                    "Failed to create event"
                );
            } finally {
                setLoading(false);
            }
        };

    return (
        <div className="min-h-screen bg-[#F5F7FF]">

            <Sidebar />

            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 pt-20 lg:pt-10 pb-10 max-w-[1600px] mx-auto">

                {/* Header */}
                <div className="mb-8">

                    <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                        EVENT MANAGEMENT
                    </span>

                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mt-4 leading-tight">
                        Create New Event
                    </h1>

                    <p className="text-gray-500 mt-3 text-sm sm:text-base">
                        Create inauguration
                        event for smart board
                        display
                    </p>

                </div>

                {/* Main Card */}
                <div className="bg-white rounded-[30px] md:rounded-[40px] shadow-xl p-5 sm:p-8 md:p-10">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">

                        {/* Left Side */}
                        <div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-8">
                                Event Details
                            </h2>

                            <div className="space-y-5">

                                {/* Event Name */}
                                <div>
                                    <label className="text-gray-500 font-medium">
                                        Event Name
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            eventName
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            setEventName(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter Event Name"
                                        className="w-full mt-2 h-[58px] rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition"
                                    />
                                </div>

                                {/* Chief Guest */}
                                <div>
                                    <label className="text-gray-500 font-medium">
                                        Chief Guest
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            chiefGuest
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            setChiefGuest(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter Chief Guest"
                                        className="w-full mt-2 h-[58px] rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition"
                                    />
                                </div>

                                {/* Designation */}
                                <div>
                                    <label className="text-gray-500 font-medium">
                                        Designation
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            designation
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            setDesignation(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter Designation"
                                        className="w-full mt-2 h-[58px] rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition"
                                    />
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="text-gray-500 font-medium">
                                        Event Date
                                    </label>

                                    <input
                                        type="date"
                                        value={
                                            eventDate
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            setEventDate(
                                                e.target.value
                                            )
                                        }
                                        className="w-full mt-2 h-[58px] rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Right Side */}
                        <div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-8">
                                Welcome Screen
                            </h2>

                            {/* Preview */}
                            {preview && (
                                <div className="mb-6 rounded-[25px] overflow-hidden shadow-lg border border-slate-200">

                                    <img
                                        src={preview}
                                        alt=""
                                        className="w-full aspect-video object-cover rounded-[20px]"
                                    />

                                </div>
                            )}

                            {/* Upload Box */}
                            <label className="w-full min-h-[240px] sm:min-h-[300px] rounded-[30px] md:rounded-[35px] border-2 border-dashed border-purple-300 bg-purple-50 hover:bg-purple-100 transition flex flex-col items-center justify-center cursor-pointer p-6 sm:p-8">

                                <div className="text-6xl">
                                    🖼️
                                </div>

                                <h3 className="text-xl font-bold text-slate-700 mt-4 text-center">
                                    Upload Welcome Image
                                </h3>

                                <p className="text-gray-500 text-center mt-2 text-sm sm:text-base">
                                    Upload a 16:9 image
                                    for smart board
                                    display
                                </p>

                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={
                                        handleImage
                                    }
                                />
                            </label>

                        </div>
                    </div>

                    {/* Button */}
                    <div className="mt-10 flex justify-end">

                        <button
                            onClick={
                                handleSubmit
                            }
                            disabled={loading}
                            className="w-full sm:w-auto min-w-[220px] px-8 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-[#4338CA] to-[#9333EA] text-white text-base sm:text-lg font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition duration-300"
                        >
                            {loading
                                ? "Creating..."
                                : "Create Event"}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateInauguration;