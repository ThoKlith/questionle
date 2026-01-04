import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Question {
    id: string;
    question: string;
    answer: number; // Percentage 0-100
    category: string;
    date: string; // YYYY-MM-DD
}

// Fallback mock data
const MOCK_QUESTION: Question = {
    id: 'mock-1',
    question: "What percentage of people say they've seen a ghost?",
    answer: 18,
    category: "Supernatural",
    date: new Date().toISOString().split('T')[0]
};

export function useDailyQuestion() {
    const [question, setQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchQuestion() {
            try {
                // Get today's date in UTC YYYY-MM-DD
                const today = new Date().toISOString().split('T')[0];

                const { data, error } = await supabase
                    .from('questions')
                    .select('*')
                    .eq('date', today)
                    .single();

                if (error) {
                    if (error.code === 'PGRST116') { // No rows returned
                        console.log("No question found for today, using mock.");
                        setQuestion(MOCK_QUESTION);
                    } else {
                        throw error;
                    }
                } else if (data) {
                    setQuestion(data as Question);
                }

            } catch (err) {
                console.error("Error fetching daily question:", err);
                setError("Failed to load question");
                setQuestion(MOCK_QUESTION);
            } finally {
                setLoading(false);
            }
        }

        fetchQuestion();
    }, []);

    return { question, loading, error };
}
