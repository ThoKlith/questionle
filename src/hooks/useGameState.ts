import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';

export interface GameState {
    lastPlayedDate: string | null;
    streak: number;
    totalGames: number;
    totalScore: number;
    history: { date: string; score: number }[];
}

const INITIAL_STATE: GameState = {
    lastPlayedDate: null,
    streak: 0,
    totalGames: 0,
    totalScore: 0,
    history: []
};

export function useGameState() {
    const { user } = useAuth();
    const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
    const [loading, setLoading] = useState(true);

    // Load state from Supabase or LocalStorage
    useEffect(() => {
        async function loadState() {
            if (user) {
                // Fetch from Supabase
                const { data, error } = await supabase
                    .from('user_stats')
                    .select('*')
                    .eq('user_id', user.id)
                    .single();

                if (data) {
                    // Adapt data if necessary, assuming DB columns match interface or using 'as GameState'
                    // Ideally, Supabase returns snake_case, so we might need mapping if we don't use a transformer
                    // For simplicity in this migration, let's assume we map it or save it as JSON in a column, 
                    // but better to map. Let's assume the table has jsonb 'data' or columns matching.
                    // For now, let's assume we store the whole state object in a 'state' column or similar, 
                    // OR we map columns. Let's go with a simple 'state' jsonb column for easiest migration 
                    // without defining a complex schema right now.
                    // ACTUALLY, let's stick to the previous pattern: 
                    // The previous code used Firestore which stores JSON-like documents.
                    // Let's assume we have a 'state' column in 'user_stats' table which is JSONB.
                    if (data.state) {
                        setGameState(data.state as GameState);
                    }
                } else if (error && error.code !== 'PGRST116') {
                    console.error("Error loading stats:", error);
                }
            } else {
                // Load from LocalStorage
                const saved = localStorage.getItem('human_guess_state');
                if (saved) {
                    setGameState(JSON.parse(saved));
                }
            }
            setLoading(false);
        }
        loadState();
    }, [user]);

    // Save state
    const saveGameState = async (newState: GameState) => {
        setGameState(newState);

        if (user) {
            // Save to Supabase
            // We'll upsert into user_stats. 
            const { error } = await supabase
                .from('user_stats')
                .upsert({
                    user_id: user.id,
                    state: newState,
                    updated_at: new Date().toISOString()
                });

            if (error) console.error("Error saving stats:", error);
        } else {
            // Save to LocalStorage
            localStorage.setItem('human_guess_state', JSON.stringify(newState));
        }
    };

    return { gameState, saveGameState, loading };
}
