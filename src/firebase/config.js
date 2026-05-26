import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDSmEEK5ZQX7U-NkXou8lk5L21icEZIAQ0",
    authDomain: "digital-inauguration.firebaseapp.com",
    projectId: "digital-inauguration",
    storageBucket: "digital-inauguration.firebasestorage.app",
    messagingSenderId: "1043822662853",
    appId: "1:1043822662853:web:ed91791273f14230114cac",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);