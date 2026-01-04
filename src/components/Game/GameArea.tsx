"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "./Slider";
import QuestionCard from "./QuestionCard";
import Countdown from "./Countdown";
import { calculateScore } from "@/lib/gameLogic";
import { useDailyQuestion } from "@/hooks/useDailyQuestion";
import { useGameState, GameState } from "@/hooks/useGameState";
import confetti from "canvas-confetti";
import { useAuth } from "@/hooks/useAuth";

export default function GameArea() {
    const { question, loading: questionLoading } = useDailyQuestion();
    const { gameState, saveGameState, loading: statsLoading } = useGameState();
    const { user } = useAuth();

    const [guess, setGuess] = useState(50);
    const [revealed, setRevealed] = useState(false);
    const [score, setScore] = useState<number | null>(null);
    const [hasPlayedToday, setHasPlayedToday] = useState(false);

    // Check if played today
    useEffect(() => {
        if (question && gameState.lastPlayedDate === question.date) {
            setHasPlayedToday(true);
            // If played, find the score for today
            const todayEntry = gameState.history.find(h => h.date === question.date);
            if (todayEntry) {
                setScore(todayEntry.score);
                setRevealed(true);
            }
        } else {
            setHasPlayedToday(false);
            setRevealed(false);
            setScore(null);
            setGuess(50);
        }
    }, [question, gameState]);

    const handleGuess = () => {
        if (!question || hasPlayedToday) return;

        const calculatedScore = calculateScore(guess, question.answer);

        // Update state
        setScore(calculatedScore);
        setRevealed(true);
        setHasPlayedToday(true);

        if (calculatedScore > 80) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

        // Update Game State
        const newHistory = [...gameState.history, { date: question.date, score: calculatedScore }];

        // Calculate streak
        let newStreak = gameState.streak;
        const yesterday = new Date(question.date);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (gameState.lastPlayedDate === yesterdayStr) {
            newStreak += 1;
        } else if (gameState.lastPlayedDate !== question.date) {
            newStreak = 1;
        }

        const newState: GameState = {
            lastPlayedDate: question.date,
            streak: newStreak,
            totalGames: gameState.totalGames + 1,
            totalScore: gameState.totalScore + calculatedScore,
            history: newHistory
        };

        saveGameState(newState);
    };

    if (questionLoading || statsLoading || !question) {
        return <div className="flex items-center justify-center min-h-[60vh]">Loading...</div>;
    }

    return (
        <div className="w-full flex flex-col items-center justify-center min-h-[60vh]">
            <QuestionCard question={question.question} category={question.category} />

            <div className="w-full max-w-xs mx-auto mb-12">
                <Slider
                    value={hasPlayedToday && score !== null ? question.answer : guess}
                    onChange={setGuess}
                    disabled={revealed}
                    revealed={revealed}
                    correctValue={question.answer}
                />
            </div>

            <AnimatePresence mode="wait">
                {!revealed ? (
                    <motion.button
                        key="submit-btn"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleGuess}
                        className="bg-gray-900 text-white font-bold text-lg py-4 px-12 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
                    >
                        LOCK IT IN
                    </motion.button>
                ) : (
                    <motion.div
                        key="result-area"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center w-full"
                    >
                        <div className="text-sm text-gray-500 font-medium mb-1">YOUR SCORE</div>
                        <div className="text-6xl font-black text-gray-900 mb-2">
                            {score}
                        </div>
                        <div className="text-sm text-gray-400 mb-8">
                            Actual: {question.answer}%
                        </div>

                        <Countdown />

                        <button
                            onClick={() => {
                                const shareText = `📊 Human Guess #${question.id}\nIl mio intuito: ${score}/100\n${score && score > 90 ? '🟩🟩🟩🟩🟩' : score && score > 70 ? '🟩🟩🟩🟨⬜' : '🟨🟨⬜⬜⬜'}🔥 Streak: ${gameState.streak} giorni\nGioca qui: https://human-guess.vercel.app/`;
                                navigator.clipboard.writeText(shareText);
                                alert("Copied to clipboard!");
                            }}
                            className="mt-8 text-blue-600 font-bold text-sm hover:underline"
                        >
                            SHARE RESULT
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
