"use client";

import { useState, useCallback } from "react";
import { LEVELS } from "@/data/levels";
import MissionBriefing from "@/components/MissionBriefing";
import CircuitBoard from "@/components/CircuitBoard";
import { Trophy, Sparkles } from "lucide-react";

export default function Dashboard() {
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const currentLevel = LEVELS[currentLevelIndex];

    const handleLevelComplete = useCallback(() => {
        // Wait so user sees the success message
        setTimeout(() => {
            setCurrentLevelIndex((prev) => prev + 1);
        }, 1500);
    }, []);

    // Victory Screen - All levels complete
    if (!currentLevel) {
        return (
            <main className="min-h-screen bg-cyber-black pt-20 pb-8 px-4 flex items-center justify-center">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Victory Icon */}
                    <div className="relative mb-8">
                        <div className="w-32 h-32 mx-auto rounded-full bg-cyber-green/20 flex items-center justify-center border-2 border-cyber-green animate-pulse">
                            <Trophy className="w-16 h-16 text-cyber-green" />
                        </div>
                        <Sparkles className="w-8 h-8 text-yellow-400 absolute top-0 right-1/3 animate-bounce" />
                    </div>

                    {/* Victory Message */}
                    <h1 className="text-4xl md:text-5xl font-bold text-cyber-green neon-glow mb-4 tracking-wider">
                        SIMULATION COMPLETE
                    </h1>
                    <p className="text-xl text-gray-400 mb-8">
                        Congratulations, Agent. You have mastered the quantum realm.
                    </p>

                    {/* Stats */}
                    <div className="bg-cyber-gray/50 border border-cyber-green/30 rounded-lg p-6 mb-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-cyber-green">{LEVELS.length}</p>
                                <p className="text-sm text-gray-500">Levels Completed</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-cyber-green">100%</p>
                                <p className="text-sm text-gray-500">Quantum Mastery</p>
                            </div>
                        </div>
                    </div>

                    {/* Restart Button */}
                    <button
                        onClick={() => setCurrentLevelIndex(0)}
                        className="px-8 py-4 bg-cyber-green text-cyber-black font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-cyber-green/30 transition-all duration-300"
                    >
                        RESTART SIMULATION
                    </button>
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
