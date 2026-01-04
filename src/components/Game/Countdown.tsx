import { useState, useEffect } from 'react';

export default function Countdown() {
    const calculateTimeLeft = () => {
        // Check if window is defined to avoid SSR issues
        if (typeof window === 'undefined') return "";

        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
        tomorrow.setUTCHours(0, 0, 0, 0);

        const diff = tomorrow.getTime() - now.getTime();

        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Initialize state with function to avoid synchronous update warning in useEffect
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="text-center mt-8">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Next Question In</div>
            <div className="text-3xl font-mono font-bold text-gray-900">
                {timeLeft}
            </div>
        </div>
    );
}
