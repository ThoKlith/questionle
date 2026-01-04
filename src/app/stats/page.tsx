"use client";

import { useGameState } from "@/hooks/useGameState";

export default function StatsPage() {
    const { state, loaded } = useGameState();

    if (!loaded) return <div className="flex justify-center items-center min-h-[50vh]">Loading...</div>;

    const averageScore = state.history.length > 0
        ? Math.round(state.history.reduce((acc, curr) => acc + curr.score, 0) / state.history.length)
        : 0;

    return (
        <div className="flex flex-col items-center pt-8 px-4">
            <h1 className="text-2xl font-bold mb-8">Your Statistics</h1>

            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
                <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center">
                    <div className="text-3xl font-black text-gray-900 mb-1">{state.history.length}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Played</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center">
                    <div className="text-3xl font-black text-blue-600 mb-1">{state.streak}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Streak</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center">
                    <div className="text-3xl font-black text-green-600 mb-1">{averageScore}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Avg Score</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center">
                    <div className="text-3xl font-black text-purple-600 mb-1">
                        {Math.max(...state.history.map(h => h.score), 0)}
                    </div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Best</div>
                </div>
            </div>

            <div className="w-full max-w-sm">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Recent History</h2>
                <div className="space-y-2">
                    {state.history.slice().reverse().map((item) => (
                        <div key={item.date} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                            <span className="text-sm font-medium text-gray-500">{item.date}</span>
                            <span className="font-bold text-gray-900">{item.score} pts</span>
                        </div>
                    ))}
                    {state.history.length === 0 && (
                        <div className="text-center text-gray-400 py-8 text-sm">No games played yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
