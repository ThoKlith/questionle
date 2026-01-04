"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export default function AdminPage() {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [jsonInput, setJsonInput] = useState("");
    const [status, setStatus] = useState("");

    const handleLogin = () => {
        // Simple hardcoded password for prototype
        if (password === "admin123") {
            setIsAuthenticated(true);
        } else {
            alert("Wrong password");
        }
    };

    const handleUpload = async () => {
        try {
            const questions = JSON.parse(jsonInput);
            setStatus("Uploading...");

            // Assume input is an array of question objects
            const questionArray = Array.isArray(questions) ? questions : [questions];

            for (const question of questionArray) {
                const { error } = await supabase
                    .from('questions')
                    .upsert(question);

                if (error) throw error;
            }

            setStatus("Upload complete!");
        } catch (e) {
            console.error(e);
            setStatus("Error: " + (e as Error).message);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Admin Password"
                    className="border p-2 rounded mb-4"
                />
                <button onClick={handleLogin} className="bg-black text-white px-4 py-2 rounded">Login</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Tools</h1>
            <p className="mb-4 text-sm text-gray-500">Upload JSON with questions. Key = Date (YYYY-MM-DD)</p>
            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full h-64 border p-2 rounded mb-4 font-mono text-xs"
                placeholder='{"2026-01-04": {"id": "2026-01-04", "text": "...", "answer": 50, "source": "..."}}'
            />
            <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
                Upload to Supabase
            </button>
            {status && <div className="text-sm font-bold">{status}</div>}
        </div>
    );
}
