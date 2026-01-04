import { useState, useEffect } from 'react';

interface GameState {
    lastPlayedDate: string | null;
    streak: number;
    history: { date: string; score: number }[];
}

const STORAGE_KEY = 'human_guess_state';

export function useGameState() {
    const [state, setState] = useState<GameState>({
        lastPlayedDate: null,
        streak: 0,
        history: []
    });
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setState(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse game state", e);
            }
        }
        setLoaded(true);
    }, []);

    const saveState = (newState: GameState) => {
        setState(newState);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    };

    const recordResult = async (date: string, score: number) => {
        const newHistory = [...state.history, { date, score }];

        // Calculate streak
        let newStreak = state.streak;

        // Check if played yesterday
        const today = new Date(date);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (state.lastPlayedDate === yesterdayStr) {
            newStreak += 1;
        } else if (state.lastPlayedDate !== date) {
            newStreak = 1;
        }

        const newState = {
            lastPlayedDate: date,
            streak: newStreak,
            history: newHistory
        };

        saveState(newState);

        // Sync to Firestore if logged in
        try {
            const { auth, db } = await import("@/lib/firebase");
            const { doc, setDoc } = await import("firebase/firestore");

            if (auth.currentUser) {
                await setDoc(doc(db, "users", auth.currentUser.uid), newState, { merge: true });
            }
        } catch (e) {
            console.error("Error syncing to Firestore", e);
        }
    };

    return { state, recordResult, loaded, saveState };
}
