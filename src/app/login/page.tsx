"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const { user, signInWithGoogle, error } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);



    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Save Your Progress</h1>
            <p className="text-gray-500 text-center mb-12 max-w-xs">
                Sign in to sync your stats across devices and never lose your streak.
            </p>

            <button
                onClick={signInWithGoogle}
                className="flex items-center justify-center w-full max-w-xs bg-white border border-gray-300 rounded-lg px-6 py-4 shadow-sm hover:bg-gray-50 transition-colors"
            >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6 mr-3" />
                <span className="font-medium text-gray-700">Continue with Google</span>
            </button>
        </div>
    );
}
