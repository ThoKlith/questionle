"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Play, Trophy, BarChart2 } from 'lucide-react';
import { clsx } from 'clsx';

export default function Footer() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 pb-safe z-50">
            <nav className="flex justify-around items-center max-w-md mx-auto h-16">
                <Link
                    href="/"
                    className={clsx(
                        "flex flex-col items-center justify-center w-full h-full transition-colors",
                        isActive('/') ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                    )}
                >
                    <Play className="w-6 h-6 mb-1" />
                    <span className="text-[10px] font-medium tracking-wide">PLAY</span>
                </Link>

                <Link
                    href="/leaderboard"
                    className={clsx(
                        "flex flex-col items-center justify-center w-full h-full transition-colors",
                        isActive('/leaderboard') ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                    )}
                >
                    <Trophy className="w-6 h-6 mb-1" />
                    <span className="text-[10px] font-medium tracking-wide">LEADERBOARD</span>
                </Link>

                <Link
                    href="/stats"
                    className={clsx(
                        "flex flex-col items-center justify-center w-full h-full transition-colors",
                        isActive('/stats') ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                    )}
                >
                    <BarChart2 className="w-6 h-6 mb-1" />
                    <span className="text-[10px] font-medium tracking-wide">STATS</span>
                </Link>
            </nav>
        </footer>
    );
}
