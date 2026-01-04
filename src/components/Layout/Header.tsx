import { HelpCircle, Trophy } from 'lucide-react';

export default function Header() {
    return (
        <header className="flex items-center justify-between px-4 py-4 max-w-md mx-auto w-full">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Instructions">
                <HelpCircle className="w-6 h-6 text-gray-700" />
            </button>

            <h1 className="text-xl font-bold tracking-wider text-gray-900">HUMAN GUESS</h1>

            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Rankings">
                <Trophy className="w-6 h-6 text-gray-700" />
            </button>
        </header>
    );
}
