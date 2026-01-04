import { useState, useEffect } from 'react';

export interface Question {
    id: string;
    text: string;
    answer: number;
    source: string;
}

// Mock data for now
const QUESTIONS: Record<string, Question> = {
    "2026-01-04": {
        id: "2026-01-04",
        text: "What percentage of people admit to singing in the shower?",
        answer: 65,
        source: "Social Survey 2024"
    },
    "2026-01-05": {
        id: "2026-01-05",
        text: "What percentage of people sleep with their phone within reach?",
        answer: 71,
        source: "Tech Habits 2024"
    }
};

export function useDailyQuestion() {
    const [question, setQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get current UTC date string YYYY-MM-DD
        const now = new Date();
        const year = now.getUTCFullYear();
        const month = String(now.getUTCMonth() + 1).padStart(2, '0');
        const day = String(now.getUTCDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;

        const fetchQuestion = async () => {
            try {
                // Import dynamically to avoid server-side issues if not handled
                const { doc, getDoc } = await import("firebase/firestore");
                const { db } = await import("@/lib/firebase");

                const docRef = doc(db, "questions", dateString);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setQuestion(docSnap.data() as Question);
                } else {
                    // Fallback to mock data if not found in DB
                    console.log("No such document in Firestore, using mock data");
                    const dailyQuestion = QUESTIONS[dateString] || {
                        id: dateString,
                        text: "What percentage of people prefer dogs over cats?",
                        answer: 55,
                        source: "Pet Survey"
                    };
                    setQuestion(dailyQuestion);
                }
            } catch (error) {
                console.error("Error fetching question:", error);
                // Fallback on error
                const dailyQuestion = QUESTIONS[dateString] || {
                    id: dateString,
                    text: "What percentage of people prefer dogs over cats?",
                    answer: 55,
                    source: "Pet Survey"
                };
                setQuestion(dailyQuestion);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
    }, []);

    return { question, loading };
}
