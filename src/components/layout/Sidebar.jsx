import {
    useState,
} from "react";

import {
    FaHome,
    FaPlusCircle,
    FaList,
    FaRocket,
    FaSignOutAlt,
} from "react-icons/fa";

import {
    HiMenuAlt3,
} from "react-icons/hi";

import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

function Sidebar() {
    const [open, setOpen] =
        useState(false);

    const location =
        useLocation();

    const navigate =
        useNavigate();

    const logout =
        async () => {
            await signOut(auth);
            navigate("/");
        };

    const menu = [
        {
            name:
                "Dashboard",
            path:
                "/dashboard",
            icon:
                <FaHome />,
        },
        {
            name:
                "Create Event",
            path:
                "/create-inauguration",
            icon:
                <FaPlusCircle />,
        },
        {
            name:
                "Manage Events",
            path:
                "/manage-events",
            icon:
                <FaList />,
        },
        {
            name:
                "Inaugurate",
            path:
                "/inaugurate-event",
            icon:
                <FaRocket />,
        },
    ];

    return (
        <>
            {/* MENU BUTTON */}
            <button
                onClick={() =>
                    setOpen(!open)
                }
                className="fixed top-5 left-5 z-[100] bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl shadow-lg text-white"
            >
                <HiMenuAlt3 className="text-2xl" />
            </button>

            {/* BACKDROP */}
            {open && (
                <div
                    onClick={() =>
                        setOpen(false)
                    }
                    className="fixed inset-0 bg-black/30 z-40"
                />
            )}

            {/* SIDEBAR */}
            <div
                className={`
          fixed top-0 left-0
          h-screen w-[290px]
          bg-gradient-to-b
          from-[#0F172A]
          to-[#312E81]
          text-white
          p-6
          shadow-2xl
          z-50
          transition-all
          duration-300
          ${open
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
        `}
            >
                {/* Logo */}
                <div className="mt-16">

                    <h1 className="text-3xl font-bold">
                        Digital
                        Inauguration
                    </h1>

                    <p className="text-gray-300 mt-2 text-sm">
                        Admin Panel
                    </p>

                </div>

                {/* Menu */}
                <div className="mt-10 flex flex-col gap-4">

                    {menu.map(
                        (item) => (
                            <Link
                                key={
                                    item.path
                                }
                                to={item.path}
                                onClick={() =>
                                    setOpen(
                                        false
                                    )
                                }
                                className={`
                  flex items-center
                  gap-4
                  px-5 py-4
                  rounded-2xl
                  transition
                  ${location.pathname ===
                                        item.path
                                        ? "bg-gradient-to-r from-purple-500 to-indigo-500"
                                        : "bg-white/10 hover:bg-white/20"
                                    }
                `}
                            >
                                {item.icon}

                                <span>
                                    {
                                        item.name
                                    }
                                </span>
                            </Link>
                        )
                    )}

                    {/* Logout */}
                    <button
                        onClick={
                            logout
                        }
                        className="flex items-center gap-4 bg-red-500 hover:bg-red-600 px-5 py-4 rounded-2xl mt-10"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>

                </div>
            </div>
        </>
    );
}

export default Sidebar;