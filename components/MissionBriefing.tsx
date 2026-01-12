"use client";

import { useState } from "react";
import { AlertTriangle, FileText, ExternalLink } from "lucide-react";
import { Level } from "@/types/game";

interface MissionBriefingProps {
    level: Level;
}

type TabType = "MISSION" | "INTEL" | "MANUAL";

export default function MissionBriefing({ level }: MissionBriefingProps) {
    const [activeTab, setActiveTab] = useState<TabType>("MISSION");

    const tabs: { id: TabType; label: string }[] = [
        { id: "MISSION", label: "MISSION" },
        { id: "INTEL", label: "INTEL" },
        { id: "MANUAL", label: "MANUAL" },
    ];

    return (
        <div className="w-full max-w-2xl bg-black/80 border border-cyber-green rounded-lg overflow-hidden">
            {/* Tab Header */}
            <div className="flex border-b border-cyber-green/30">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 px-4 py-3 text-sm font-bold tracking-wider transition-all duration-200
              ${activeTab === tab.id
                                ? "bg-cyber-green/20 text-cyber-green border-b-2 border-cyber-green"
                                : "text-gray-500 hover:text-cyber-green hover:bg-cyber-dim"
                            }`}
                    >
                        [{tab.label}]
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 min-h-[250px]">
                {/* MISSION Tab */}
                {activeTab === "MISSION" && (
                    <div className="space-y-6 animate-fadeIn">
                        {/* Level Title */}
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-gray-500">LVL {level.id}</span>
                            <h2 className="text-xl font-bold text-cyber-green tracking-wide">
                                {level.title}
                            </h2>
                        </div>

                        {/* Story */}
                        <div className="space-y-2">
                            <p className="text-gray-300 leading-relaxed italic">
                                &quot;{level.story}&quot;
                            </p>
                        </div>

                        {/* Objective Alert */}
                        <div className="flex items-start gap-3 p-4 bg-cyber-dim border border-cyber-green/30 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-cyber-green mb-1 tracking-wider">
                                    OBJECTIVE
                                </p>
                                <p className="text-gray-300 text-sm">{level.objective}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* INTEL Tab */}
                {activeTab === "INTEL" && (
                    <div className="space-y-4 animate-fadeIn">
                        <div className="flex items-center gap-2 mb-4">
                            <FileText className="w-5 h-5 text-cyber-green" />
                            <h3 className="text-sm font-bold text-cyber-green tracking-wider">
                                CLASSIFIED INTEL
                            </h3>
                        </div>
                        <div className="text-gray-300 whitespace-pre-wrap leading-relaxed text-sm">
                            {level.mission}
                        </div>
                    </div>
                )}

                {/* MANUAL Tab */}
                {activeTab === "MANUAL" && (
                    <div className="flex flex-col items-center justify-center h-[200px] space-y-4 animate-fadeIn">
                        <ExternalLink className="w-12 h-12 text-cyber-green/50" />
                        <p className="text-gray-500 text-sm text-center">
                            Access the quantum computing documentation for in-depth learning.
                        </p>
                        <a
                            href={level.docsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="neon-button px-6 py-3 border-2 border-cyber-green text-cyber-green font-bold tracking-wider rounded-md hover:bg-cyber-dim transition-all duration-300 flex items-center gap-2"
                        >
                            ACCESS DATABASE
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
