import {
    FaHome,
    FaPlusCircle,
    FaSignOutAlt,
} from "react-icons/fa";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

function Sidebar() {
    const navigate =
        useNavigate();

    const logout =
        async () => {
            await signOut(auth);

            navigate("/");
        };

    return (
        <div className="w-[260px] h-screen bg-indigo-700 text-white fixed p-5">

            <h1 className="text-3xl font-bold mb-10">
                Inauguration
            </h1>

            <div className="flex flex-col gap-5">

                <Link
                    to="/dashboard"
                    className="p-4 rounded-xl hover:bg-indigo-600"
                >
                    Dashboard
                </Link>

                <Link
                    to="/create-inauguration"
                    className="p-4 rounded-xl hover:bg-indigo-600"
                >
                    Create New
                </Link>

                <button
                    onClick={
                        logout
                    }
                    className="bg-red-500 mt-10 p-4 rounded-xl"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;