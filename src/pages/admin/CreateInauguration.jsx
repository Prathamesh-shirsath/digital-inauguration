import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import axios from "axios";

import {
    collection,
    addDoc,
} from "firebase/firestore";

import { db } from "../../firebase/config";
import toast from "react-hot-toast";

function CreateInauguration() {
    const [loading, setLoading] =
        useState(false);

    const [image, setImage] =
        useState(null);

    const [preview, setPreview] =
        useState(null);

    const [form, setForm] =
        useState({
            eventName: "",
            chiefGuest: "",
            designation: "",
            collegeName: "",
            eventDate: "",
            welcomeMessage: "",
        });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleImage = (e) => {
        const file =
            e.target.files[0];

        setImage(file);

        setPreview(
            URL.createObjectURL(file)
        );
    };

    const saveEvent = async () => {
        try {
            setLoading(true);

            if (!image) {
                toast.error("Please select image");
                return;
            }

            // DEBUG LOGS
            console.log(
                "Cloud Name:",
                import.meta.env.VITE_CLOUD_NAME
            );

            console.log(
                "Preset:",
                import.meta.env.VITE_UPLOAD_PRESET
            );

            console.log("Image:", image);

            const cloudName =
                import.meta.env.VITE_CLOUD_NAME;

            const uploadPreset =
                import.meta.env.VITE_UPLOAD_PRESET;

            const formData =
                new FormData();

            formData.append(
                "file",
                image
            );

            formData.append(
                "upload_preset",
                uploadPreset
            );

            const upload =
                await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );

            console.log(
                "Cloudinary Response:",
                upload.data
            );

            const imageUrl =
                upload.data.secure_url;

            await addDoc(
                collection(
                    db,
                    "inaugurations"
                ),
                {
                    ...form,
                    imageUrl,
                    inaugurated: false,
                    createdAt: new Date(),
                    isActive: true,
                }
            );

            toast.success(
                "Event Created!"
            );

            setForm({
                eventName: "",
                chiefGuest: "",
                designation: "",
                collegeName: "",
                eventDate: "",
                welcomeMessage: "",
            });

            setImage(null);
            setPreview(null);

        } catch (error) {
            console.log(
                "FULL ERROR:",
                error.response?.data ||
                error
            );

            toast.error(
                "Upload failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex">

            <Sidebar />

            <div className="ml-[260px] w-full p-10">

                <h1 className="text-4xl font-bold mb-8">
                    Create New
                    Inauguration
                </h1>

                <div className="bg-white p-8 rounded-3xl shadow-xl">

                    <div className="grid grid-cols-2 gap-5">

                        <input
                            name="eventName"
                            placeholder="Event Name"
                            className="border p-4 rounded-xl"
                            onChange={
                                handleChange
                            }
                        />

                        <input
                            name="chiefGuest"
                            placeholder="Chief Guest Name"
                            className="border p-4 rounded-xl"
                            onChange={
                                handleChange
                            }
                        />

                        <input
                            name="designation"
                            placeholder="Designation"
                            className="border p-4 rounded-xl"
                            onChange={
                                handleChange
                            }
                        />

                        <input
                            name="collegeName"
                            placeholder="College Name"
                            className="border p-4 rounded-xl"
                            onChange={
                                handleChange
                            }
                        />

                        <input
                            type="date"
                            name="eventDate"
                            className="border p-4 rounded-xl"
                            onChange={
                                handleChange
                            }
                        />

                        <input
                            name="welcomeMessage"
                            placeholder="Welcome Message"
                            className="border p-4 rounded-xl"
                            onChange={
                                handleChange
                            }
                        />
                    </div>

                    <div className="mt-8">

                        <h2 className="font-semibold text-lg mb-2">
                            Upload 16:9
                            Welcome Banner
                        </h2>

                        <input
                            type="file"
                            onChange={
                                handleImage
                            }
                        />

                        {preview && (
                            <img
                                src={preview}
                                alt=""
                                className="mt-5 rounded-3xl w-full h-[350px] object-cover"
                            />
                        )}
                    </div>

                    <button
                        onClick={saveEvent}
                        className="mt-8 bg-indigo-600 text-white px-8 py-4 rounded-2xl"
                    >
                        {loading
                            ? "Saving..."
                            : "Save Inauguration"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateInauguration;