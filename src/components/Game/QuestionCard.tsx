import { motion } from "framer-motion";

interface QuestionCardProps {
    question: string;
    category?: string;
}

export default function QuestionCard({ question, category = "Daily Insight" }: QuestionCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full text-center mb-12"
        >
            <span className="text-xs font-bold tracking-widest text-blue-500 uppercase mb-3 block">
                {category}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {question}
            </h2>
        </motion.div>
    );
}
