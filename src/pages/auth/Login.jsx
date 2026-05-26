import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] =
        useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const snapshot = await getDocs(
                collection(db, "users")
            );

            let role = "";

            snapshot.forEach((doc) => {
                if (doc.data().email === email) {
                    role = doc.data().role;
                }
            });

            if (role === "admin") {
                navigate("/dashboard");
            } else if (
                role === "display"
            ) {
                navigate("/display");
            } else {
                alert("Role not found");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-indigo-200">

            <div className="bg-white shadow-2xl rounded-3xl p-8 w-[380px]">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Smart Digital Inauguration
                </h1>

                <p className="text-center text-gray-500 mb-6">
                    Login to continue
                </p>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border p-3 rounded-xl mb-4 outline-none"
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border p-3 rounded-xl mb-5 outline-none"
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;