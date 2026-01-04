export function calculateScore(guess: number, actual: number): number {
    const diff = Math.abs(guess - actual);
    return Math.max(0, 100 - diff);
}

export function getDailyQuestion() {
    // Placeholder for now. Will implement UTC logic later.
    return {
        id: "2026-01-04",
        text: "What percentage of people admit to singing in the shower?",
        answer: 65,
        source: "Social Survey 2024"
    };
}
