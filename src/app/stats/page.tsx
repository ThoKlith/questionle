"use client";

import { useGameState } from "@/hooks/useGameState";

export default function StatsPage() {
    const { gameState, loading } = useGameState();

    if (loading) {
        return <div className="flex items-center justify-center min-h-[60vh]">Loading...</div>;
    }

    const averageScore = gameState.totalGames > 0
        ? Math.round(gameState.totalScore / gameState.totalGames)
        : 0;

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Your Stats</h1>

            <div className="grid grid-cols-2 gap-4 w-full mb-8">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                    <div className="text-3xl font-black text-blue-600">{gameState.totalGames}</div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Played</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                    <div className="text-3xl font-black text-green-600">{gameState.streak}</div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Streak</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center col-span-2">
                    <div className="text-3xl font-black text-purple-600">{averageScore}</div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Avg Score</div>
                </div>
            </div>

            <h2 className="text-xl font-bold mb-4 self-start">History</h2>
            <div className="w-full space-y-3">
                {gameState.history.slice().reverse().map((entry, i) => (
                    <div key={i} className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <span className="text-gray-600 font-medium">{entry.date}</span>
                        <span className={`font-bold ${entry.score >= 90 ? 'text-green-600' : entry.score >= 70 ? 'text-yellow-600' : 'text-gray-900'}`}>
                            {entry.score}
                        </span>
                    </div>
                ))}
                {gameState.history.length === 0 && (
                    <div className="text-center text-gray-400 py-8">No games played yet</div>
                )}
            </div>
        </div>
    );
}
