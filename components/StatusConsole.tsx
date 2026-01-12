"use client";

import { CheckCircle, AlertTriangle, Terminal } from "lucide-react";

export type StatusType = "idle" | "success" | "error" | "processing";

interface StatusConsoleProps {
    status: StatusType;
    message: string;
    onNextLevel?: () => void;
}

export default function StatusConsole({
    status,
    message,
    onNextLevel,
}: StatusConsoleProps) {
    if (status === "idle") {
        return (
            <div className="font-mono text-sm text-gray-600 flex items-center gap-2 h-8">
                <Terminal className="w-4 h-4" />
                <span className="animate-pulse">_</span>
            </div>
        );
    }

    if (status === "processing") {
        return (
            <div className="font-mono text-sm text-yellow-400 flex items-center gap-2 py-3 px-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg animate-pulse">
                <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                <span className="tracking-wider">ANALYZING CIRCUIT...</span>
            </div>
        );
    }

    if (status === "success") {
        return (
            <div className="font-mono text-sm py-3 px-4 bg-cyber-green/10 border border-cyber-green rounded-lg flex items-center justify-between gap-4 shadow-lg shadow-cyber-green/10">
                <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0" />
                    <span className="text-cyber-green tracking-wide">{message}</span>
                </div>
                {onNextLevel && (
                    <button
                        onClick={onNextLevel}
                        className="px-4 py-1.5 bg-cyber-green text-cyber-black font-bold text-sm rounded hover:bg-cyber-green/80 transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
                    >
                        NEXT LEVEL →
                    </button>
                )}
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="font-mono text-sm py-3 px-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3 shadow-lg shadow-red-500/10">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span className="text-red-400 tracking-wide">{message}</span>
            </div>
        );
    }

    return null;
}
