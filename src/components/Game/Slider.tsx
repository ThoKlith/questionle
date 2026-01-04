"use client";

import { clsx } from "clsx";

interface SliderProps {
    value: number;
    onChange: (value: number) => void;
    disabled?: boolean;
    revealed?: boolean;
    correctValue?: number;
}

export default function Slider({ value, onChange, disabled, revealed, correctValue }: SliderProps) {
    return (
        <div className="relative w-full h-16 flex items-center justify-center">
            {/* Track Background */}
            <div className="absolute w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                {/* Fill */}
                <div
                    className={clsx("h-full transition-all duration-75 ease-out",
                        revealed ? "bg-gray-300" : "bg-blue-500"
                    )}
                    style={{ width: `${value}%` }}
                />

                {/* Correct Value Marker (Hidden until revealed) */}
                {revealed && correctValue !== undefined && (
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-green-500 z-10"
                        style={{ left: `${correctValue}%` }}
                    />
                )}
            </div>

            {/* Native Input (Invisible but interactive) */}
            <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                disabled={disabled}
                className="absolute w-full h-full opacity-0 cursor-pointer z-20"
            />

            {/* Custom Thumb / Value Indicator */}
            <div
                className="absolute top-0 bottom-0 pointer-events-none transition-all duration-75 ease-out flex flex-col items-center justify-center"
                style={{ left: `calc(${value}% - 24px)` }} // 24px is half of thumb width (48px)
            >
                {/* Value Bubble */}
                <div className={clsx(
                    "mb-8 px-3 py-1 rounded-lg font-bold text-xl shadow-sm transition-colors",
                    revealed ? "bg-gray-200 text-gray-500" : "bg-blue-600 text-white"
                )}>
                    {value}%
                </div>

                {/* Thumb Circle */}
                <div className={clsx(
                    "w-12 h-12 rounded-full shadow-md border-4 transition-colors flex items-center justify-center bg-white",
                    revealed ? "border-gray-300" : "border-blue-500"
                )}>
                    <div className={clsx("w-3 h-3 rounded-full", revealed ? "bg-gray-300" : "bg-blue-500")} />
                </div>
            </div>

            {/* Correct Value Indicator (Post-reveal) */}
            {revealed && correctValue !== undefined && (
                <div
                    className="absolute top-0 bottom-0 pointer-events-none flex flex-col items-center justify-center z-10"
                    style={{ left: `calc(${correctValue}% - 16px)` }}
                >
                    <div className="mb-8 px-2 py-1 rounded bg-green-500 text-white font-bold text-sm shadow-sm">
                        {correctValue}%
                    </div>
                    <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white shadow-lg" />
                </div>
            )}
        </div>
    );
}
