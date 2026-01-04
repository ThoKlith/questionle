"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardEntry {
    user_id: string;
    username: string;
    avatar_url: string;
    total_points: number;
    games_played: number;
    current_streak: number;
    best_streak: number;
}

export default function LeaderboardPage() {
    const { user } = useAuth();
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [userRank, setUserRank] = useState<number | null>(null);

    useEffect(() => {
        fetchLeaderboard();
    }, [user]);

    async function fetchLeaderboard() {
        try {
            const { data, error } = await supabase
                .from('leaderboard')
                .select('*')
                .order('total_points', { ascending: false })
                .limit(100);

            if (error) throw error;

            setLeaderboard(data || []);

            // Find user's rank
            if (user && data) {
                const rank = data.findIndex(entry => entry.user_id === user.id);
                setUserRank(rank !== -1 ? rank + 1 : null);
            }
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        } finally {
            setLoading(false);
        }
    }

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
        if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
        if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
        return <span className="text-gray-500 font-bold w-6 text-center">{rank}</span>;
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-[60vh]">Loading...</div>;
    }

    return (
        <div className="flex flex-col w-full max-w-2xl mx-auto py-8 px-4">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Global Leaderboard</h1>
                <p className="text-gray-500">Top players by total points</p>
                {userRank && (
                    <p className="text-sm text-blue-600 font-medium mt-2">
                        Your rank: #{userRank}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                {leaderboard.map((entry, index) => {
                    const rank = index + 1;
                    const isCurrentUser = user?.id === entry.user_id;

                    return (
                        <div
                            key={entry.user_id}
                            className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${isCurrentUser
                                    ? 'bg-blue-50 border-blue-300 shadow-md'
                                    : 'bg-white border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center justify-center w-8">
                                {getRankIcon(rank)}
                            </div>

                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                {entry.avatar_url ? (
                                    <img
                                        src={entry.avatar_url}
                                        alt={entry.username || 'User'}
                                        className="w-10 h-10 rounded-full border-2 border-gray-200"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                                        {(entry.username || 'U')[0].toUpperCase()}
                                    </div>
                                )}

                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 truncate">
                                        {entry.username || 'Anonymous'}
                                        {isCurrentUser && (
                                            <span className="ml-2 text-xs text-blue-600">(You)</span>
                                        )}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {entry.games_played} games • {entry.current_streak} day streak
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-xl font-bold text-gray-900">{entry.total_points}</p>
                                <p className="text-xs text-gray-500">points</p>
                            </div>
                        </div>
                    );
                })}

                {leaderboard.length === 0 && (
                    <div className="text-center text-gray-400 py-12">
                        No players yet. Be the first to play!
                    </div>
                )}
            </div>
        </div>
    );
}
