"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Play, LogIn, BarChart2 } from 'lucide-react';
import { clsx } from 'clsx';

export default function Footer() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe z-50">
            <nav className="flex justify-around items-center max-w-md mx-auto h-16">
                <Link
                    href="/"
                    className={clsx(
                        "flex flex-col items-center justify-center w-full h-full transition-colors",
                        isActive('/') ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
                    )}
                >
                    <Play className="w-6 h-6 mb-1" />
                    <span className="text-[10px] font-medium tracking-wide">PLAY</span>
                </Link>

                <Link
                    href="/login"
                    className={clsx(
                        "flex flex-col items-center justify-center w-full h-full transition-colors",
                        isActive('/login') ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
                    )}
                >
                    <LogIn className="w-6 h-6 mb-1" />
                    <span className="text-[10px] font-medium tracking-wide">LOGIN</span>
                </Link>

                <Link
                    href="/stats"
                    className={clsx(
                        "flex flex-col items-center justify-center w-full h-full transition-colors",
                        isActive('/stats') ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
                    )}
                >
                    <BarChart2 className="w-6 h-6 mb-1" />
                    <span className="text-[10px] font-medium tracking-wide">STATS</span>
                </Link>
            </nav>
        </footer>
    );
}
