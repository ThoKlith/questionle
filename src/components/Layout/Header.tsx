"use client";

import { HelpCircle, Trophy, LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Header() {
    const { user, signOut } = useAuth();
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className="flex items-center justify-between px-4 py-4 max-w-md mx-auto w-full">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors" aria-label="Instructions">
                <HelpCircle className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>

            <h1 className="text-xl font-bold tracking-wider text-gray-900 dark:text-gray-100">HUMAN GUESS</h1>

            {user ? (
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-0 hover:opacity-80 transition-opacity rounded-full"
                        aria-label="User menu"
                    >
                        {user.user_metadata?.avatar_url ? (
                            <img
                                src={user.user_metadata.avatar_url}
                                alt="Profile"
                                className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-700"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                            </div>
                        )}
                    </button>

                    <AnimatePresence>
                        {showMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowMenu(false)}
                                />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 top-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 min-w-[200px] z-20"
                                >
                                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                            {user.user_metadata?.full_name || user.email}
                                        </p>
                                        {user.user_metadata?.full_name && (
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => {
                                            signOut();
                                            setShowMenu(false);
                                        }}
                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <Link href="/leaderboard">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors" aria-label="Leaderboard">
                        <Trophy className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                </Link>
            )}
        </header>
    );
}
