import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyANi7kmWzC3pgF0lUC8Ayu2mBdNAWzBsI8",
    authDomain: "quest-6e736.firebaseapp.com",
    projectId: "quest-6e736",
    storageBucket: "quest-6e736.firebasestorage.app",
    messagingSenderId: "499141309544",
    appId: "1:499141309544:web:d9269da5311626723df7dd",
};



// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
    if (!firebaseConfig.apiKey) {
        throw new Error("Missing Firebase API Key (build mode)");
    }
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
} catch (error) {
    // Only warn if it's not the expected "missing key" error during build
    if ((error as Error).message !== "Missing Firebase API Key (build mode)") {
        console.warn("Firebase initialization failed:", error);
    }
    // Mock objects to prevent crash during build
    app = {} as FirebaseApp;
    auth = {} as Auth;
    db = {} as Firestore;
}

export { app, auth, db };
