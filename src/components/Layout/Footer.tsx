import Link from 'next/link';
import { Play, LogIn, BarChart2 } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe">
            <nav className="flex justify-around items-center max-w-md mx-auto h-16">
                <Link href="/" className="flex flex-col items-center justify-center w-full h-full text-blue-600">
                    <Play className="w-6 h-6 mb-1" />
                    <span className="text-[10px] font-medium tracking-wide">PLAY</span>
                </Link>

                <Link href="/login" className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-gray-600 transition-colors">
                    <LogIn className="w-6 h-6 mb-1" />
                    <span className="text-[10px] font-medium tracking-wide">LOGIN</span>
                </Link>

                <Link href="/stats" className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-gray-600 transition-colors">
                    <BarChart2 className="w-6 h-6 mb-1" />
                    <span className="text-[10px] font-medium tracking-wide">STATS</span>
                </Link>
            </nav>
        </footer>
    );
}
