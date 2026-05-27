import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaUser,
    FaLock,
} from "react-icons/fa";

import {
    doc,
    getDoc,
} from "firebase/firestore";

import { db } from "../../firebase/config";

function Login() {
    const navigate =
        useNavigate();

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    // LOGIN
    const handleLogin =
        async (e) => {
            e.preventDefault();

            try {
                setLoading(true);
                setError("");

                // document id = password
                const userRef =
                    doc(
                        db,
                        "users",
                        password.trim()
                    );

                const userSnap =
                    await getDoc(
                        userRef
                    );

                if (
                    userSnap.exists()
                ) {
                    const userData =
                        userSnap.data();

                    // Match Email
                    if (
                        userData.email ===
                        username.trim()
                    ) {
                        // Save Login
                        localStorage.setItem(
                            "isLoggedIn",
                            "true"
                        );

                        localStorage.setItem(
                            "role",
                            userData.role
                        );

                        localStorage.setItem(
                            "userEmail",
                            userData.email
                        );

                        localStorage.setItem(
                            "userName",
                            userData.name
                        );

                        // Redirect
                        // Redirect based on role
                        if (
                            userData.role ===
                            "admin"
                        ) {
                            navigate(
                                "/dashboard"
                            );
                        } else if (
                            userData.role ===
                            "display"
                        ) {
                            navigate(
                                "/display"
                            );
                        }
                        
                    } else {
                        setError(
                            "Invalid login credentials"
                        );
                    }
                } else {
                    setError(
                        "Invalid login credentials"
                    );
                }
            } catch (err) {
                console.log(err);

                setError(
                    "Login failed. Try again."
                );
            } finally {
                setLoading(false);
            }
        };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#EEF2FF] via-[#E0E7FF] to-[#F5F3FF] flex items-center justify-center p-4">

            {/* Background */}
            <div className="absolute inset-0 overflow-hidden">

                <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full animate-pulse" />

                <div className="absolute bottom-[-150px] right-[-100px] w-[450px] h-[450px] bg-indigo-500/20 blur-[120px] rounded-full animate-pulse" />

                <div className="absolute top-[20%] right-[10%] w-[250px] h-[250px] bg-pink-400/10 blur-[100px] rounded-full" />
            </div>

            {/* Wave Background */}
            <div className="absolute inset-0 opacity-20">

                <svg
                    className="w-full h-full"
                    viewBox="0 0 1440 800"
                    fill="none"
                >
                    <path
                        d="M0 300 C300 100 500 500 900 300 C1200 150 1300 400 1440 250"
                        stroke="#6366F1"
                        strokeWidth="3"
                    />

                    <path
                        d="M0 450 C400 250 600 650 1000 450 C1200 300 1350 500 1440 400"
                        stroke="#8B5CF6"
                        strokeWidth="3"
                    />
                </svg>
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-[460px]">

                <div className="bg-white/85 backdrop-blur-3xl border border-white/40 shadow-[0_20px_60px_rgba(99,102,241,0.2)] rounded-[40px] p-8 sm:p-10">

                    {/* Header */}
                    <div className="text-center">

                        <h1 className="text-3xl sm:text-5xl font-bold text-[#1E1B4B] mt-5 leading-tight">
                            Digital
                            <br />
                            Inauguration
                        </h1>

                        <p className="text-gray-500 mt-3 text-base sm:text-lg">
                            Login to continue
                        </p>

                    </div>

                    {/* Form */}
                    <form
                        onSubmit={
                            handleLogin
                        }
                        autoComplete="off"
                        className="mt-10 space-y-5"
                    >

                        {/* Username */}
                        <div className="relative">

                            <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

                            <input
                                type="email"
                                value={
                                    username
                                }
                                onChange={(
                                    e
                                ) =>
                                    setUsername(
                                        e.target
                                            .value
                                    )
                                }
                                placeholder="Enter Email"
                                className="w-full h-[58px] sm:h-[62px] rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none pl-14 pr-4 transition-all duration-300"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">

                            <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

                            <input
                                type="password"
                                value={
                                    password
                                }
                                onChange={(
                                    e
                                ) =>
                                    setPassword(
                                        e.target
                                            .value
                                    )
                                }
                                placeholder="Enter Password"
                                className="w-full h-[58px] sm:h-[62px] rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none pl-14 pr-4 transition-all duration-300"
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-100 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={
                                loading
                            }
                            className="w-full h-[58px] sm:h-[62px] rounded-2xl bg-gradient-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] text-white text-lg font-bold shadow-[0_10px_30px_rgba(124,58,237,0.35)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
                        >
                            {loading
                                ? "LOGGING IN..."
                                : "LOGIN"}
                        </button>

                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-500 mt-7">
                        Secure access to
                        Digital Inauguration
                        System
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Login;