import { useState, useEffect } from 'react';
import {
    User,
    signInWithPopup,
    GoogleAuthProvider,
    signOut as firebaseSignOut,
    onAuthStateChanged
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    // Initialize loading based on whether auth is functional
    const [loading, setLoading] = useState(() => !!auth.onAuthStateChanged);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // If auth is mocked (empty object), don't try to listen
        if (!auth.onAuthStateChanged) {
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        setError(null);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error: unknown) {
            console.error("Error signing in with Google", error);
            const errorMessage = error instanceof Error ? error.message : "Failed to sign in";
            setError(errorMessage);
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    return { user, loading, error, signInWithGoogle, signOut };
}
