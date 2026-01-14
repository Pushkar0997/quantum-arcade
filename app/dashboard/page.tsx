"use client";

import { useState, useCallback } from "react";
import { LEVELS } from "@/data/levels";
import MissionBriefing from "@/components/MissionBriefing";
import CircuitBoard from "@/components/CircuitBoard";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function Dashboard() {
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);
    const currentLevel = LEVELS[currentLevelIndex];

    const handleLevelComplete = useCallback(() => {
        // Wait so user sees the success message
        setTimeout(() => {
            // Check if this was the final level (Level 3, index 2)
            if (currentLevelIndex >= LEVELS.length - 1) {
                setGameComplete(true);
            } else {
                setCurrentLevelIndex((prev) => prev + 1);
            }
        }, 1500);
    }, [currentLevelIndex]);

    // Victory Screen - All levels complete (System Secured)
    if (gameComplete || !currentLevel) {
        return (
            <main className="min-h-screen bg-cyber-black pt-20 pb-8 px-4 flex items-center justify-center">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Victory Card Container */}
                    <div className="bg-gradient-to-b from-cyber-gray/80 to-cyber-gray/40 border-2 border-cyber-green rounded-2xl p-8 md:p-12 shadow-2xl shadow-cyber-green/20">
                        {/* Victory Icon */}
                        <div className="relative mb-8">
                            <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-cyber-green/30 to-cyber-green/10 flex items-center justify-center border-4 border-cyber-green shadow-lg shadow-cyber-green/40">
                                <CheckCircle2 className="w-20 h-20 text-cyber-green drop-shadow-lg" />
                            </div>
                            <Sparkles className="w-8 h-8 text-yellow-400 absolute -top-2 right-1/4 animate-bounce" />
                            <Sparkles className="w-6 h-6 text-cyber-green absolute -bottom-1 left-1/4 animate-pulse" />
                        </div>

                        {/* Victory Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-cyber-green neon-glow mb-4 tracking-widest uppercase">
                            System Secured
                        </h1>

                        {/* Divider */}
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyber-green to-transparent mx-auto mb-6"></div>

                        {/* Success Message */}
                        <p className="text-lg md:text-xl text-gray-300 mb-8">
                            You have mastered Single-Qubit Operations.
                        </p>

                        {/* Stats Summary */}
                        <div className="bg-cyber-black/50 border border-cyber-green/30 rounded-xl p-6 mb-8">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-cyber-green font-mono">{LEVELS.length}</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Levels</p>
                                </div>
                                <div className="text-center border-x border-cyber-green/20">
                                    <p className="text-3xl font-bold text-cyber-green font-mono">2</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Gates Learned</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-cyber-green font-mono">100%</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Complete</p>
                                </div>
                            </div>
                        </div>

                        {/* Return Button */}
                        <button
                            onClick={() => window.location.href = "/"}
                            className="px-8 py-4 bg-cyber-green text-cyber-black font-bold text-sm rounded-lg hover:shadow-lg hover:shadow-cyber-green/40 transition-all duration-300 uppercase tracking-wider"
                        >
                            Return to Main Menu
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-cyber-black pt-20 pb-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-cyber-green tracking-wider mb-2">
                            MISSION CONTROL
                        </h1>
                        <p className="text-gray-500 text-sm font-mono">
                            Quantum Training Simulation v1.0
                        </p>
                    </div>
                    {/* Level Indicator */}
                    <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Level</p>
                        <p className="text-2xl font-bold text-cyber-green font-mono">
                            {currentLevel.id} / {LEVELS.length}
                        </p>
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Mission Briefing Panel */}
                    <MissionBriefing level={currentLevel} />

                    {/* Quantum Circuit Board - key forces re-render on level change */}
                    <CircuitBoard
                        key={currentLevel.id}
                        level={currentLevel}
                        onSuccess={handleLevelComplete}
                    />
                </div>
            </div>
        </main>
    );
}
