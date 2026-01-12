"use client";

import { useEffect, useState, useCallback } from "react";
import { RotateCcw, Play, Zap, Lightbulb } from "lucide-react";
import { Level } from "@/types/game";
import StatusConsole, { StatusType } from "@/components/StatusConsole";

interface CircuitBoardProps {
    level: Level;
    onSuccess: () => void;
}

interface FeedbackState {
    status: StatusType;
    message: string;
}

export default function CircuitBoard({ level, onSuccess }: CircuitBoardProps) {
    const [circuit, setCircuit] = useState<import("quantum-circuit").default | null>(null);
    const [svg, setSvg] = useState<string>("");
    const [gateCount, setGateCount] = useState(0);
    const [selectedQubit, setSelectedQubit] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [showBlueprint, setShowBlueprint] = useState(false);
    const [feedback, setFeedback] = useState<FeedbackState>({
        status: "idle",
        message: "",
    });

    // Initialize the quantum circuit after mount (avoids SSR issues)
    useEffect(() => {
        const initCircuit = async () => {
            try {
                const QuantumCircuitClass = (await import("quantum-circuit")).default;
                const qc = new QuantumCircuitClass(2);
                setCircuit(qc);
                // Use RAW SVG output from library (no regex modifications)
                setSvg(qc.exportSVG(true));
            } catch (error) {
                console.error("Failed to initialize QuantumCircuit:", error);
            }
        };
        initCircuit();
    }, []);

    // Regenerate SVG when circuit changes (raw output, no modifications)
    const updateSvg = useCallback(() => {
        if (circuit) {
            setSvg(circuit.exportSVG(true));
        }
    }, [circuit]);

    // Add Hadamard Gate to selected qubit
    const addHGate = () => {
        if (circuit) {
            circuit.addGate("h", gateCount, selectedQubit);
            setGateCount((prev) => prev + 1);
            updateSvg();
            setFeedback({ status: "idle", message: "" });
            setShowBlueprint(false);
        }
    };

    // Add Pauli-X Gate to selected qubit
    const addXGate = () => {
        if (circuit) {
            circuit.addGate("x", gateCount, selectedQubit);
            setGateCount((prev) => prev + 1);
            updateSvg();
            setFeedback({ status: "idle", message: "" });
            setShowBlueprint(false);
        }
    };

    // Add CNOT Gate (Control=0, Target=1)
    const addCNOTGate = () => {
        if (circuit) {
            circuit.addGate("cx", gateCount, [0, 1]);
            setGateCount((prev) => prev + 1);
            updateSvg();
            setFeedback({ status: "idle", message: "" });
            setShowBlueprint(false);
        }
    };

    // Clear the circuit
    const clearCircuit = async () => {
        try {
            const QuantumCircuitClass = (await import("quantum-circuit")).default;
            const qc = new QuantumCircuitClass(2);
            setCircuit(qc);
            // Use RAW SVG output from library
            setSvg(qc.exportSVG(true));
            setGateCount(0);
            setFeedback({ status: "idle", message: "" });
            setShowBlueprint(false);
        } catch (error) {
            console.error("Failed to reset QuantumCircuit:", error);
        }
    };

    // Show blueprint hint with step-by-step instructions
    const handleShowBlueprint = () => {
        setShowBlueprint(true);
        const stepsText = level.solutionSteps.join(" → ");
        setFeedback({
            status: "idle",
            message: stepsText,
        });
    };

    // Run simulation and check win condition
    const runSimulation = () => {
        if (!circuit) return;

        setIsRunning(true);
        setFeedback({ status: "processing", message: "" });
        setShowBlueprint(false);

        // Fake delay for realism
        setTimeout(() => {
            // Run the circuit simulation
            circuit.run();

            // Get probabilities for each basis state
            const probs = circuit.probabilities();

            // Calculate probability of qubit being in |1⟩ state
            const { qubit, probability: targetProb } = level.successCondition;

            let qubitProb: number;
            if (qubit === 0) {
                qubitProb = (probs[1] || 0) + (probs[3] || 0);
            } else {
                qubitProb = (probs[2] || 0) + (probs[3] || 0);
            }

            // Allow small tolerance for floating point comparison
            const tolerance = 0.01;
            const isSuccess = Math.abs(qubitProb - targetProb) <= tolerance;

            setIsRunning(false);

            if (isSuccess) {
                setAttempts(0); // Reset attempts on success
                setFeedback({
                    status: "success",
                    message: `OPTIMAL STATE ACHIEVED. ACCESSING LEVEL ${level.id + 1}...`,
                });
                onSuccess();
            } else {
                setAttempts((prev) => prev + 1); // Increment attempts on failure
                const qubitLabel = qubit === 0 ? "q1" : "q2";
                setFeedback({
                    status: "error",
                    message: `SUBOPTIMAL. ${qubitLabel} is ${(qubitProb * 100).toFixed(0)}% (Need ${(targetProb * 100).toFixed(0)}%).`,
                });
            }
        }, 800);
    };

    return (
        <div className="w-full bg-black/80 border border-cyber-green rounded-lg overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-cyber-green/30 flex items-center justify-between">
                <h3 className="text-sm font-bold text-cyber-green tracking-wider">
                    QUANTUM CIRCUIT
                </h3>
                <span className="text-xs font-mono text-gray-500">
                    {gateCount} gate{gateCount !== 1 ? "s" : ""}
                </span>
            </div>

            {/* Circuit Drawing Area */}
            <div
                id="drawing"
                className="p-4 min-h-[200px] flex items-center justify-center overflow-x-auto"
                style={{
                    filter: "invert(1) hue-rotate(180deg)",
                }}
            >
                {svg ? (
                    <div
                        dangerouslySetInnerHTML={{ __html: svg }}
                        className="circuit-svg"
                    />
                ) : (
                    <p className="text-gray-500 font-mono text-sm">
                        Initializing quantum state...
                    </p>
                )}
            </div>

            {/* Qubit Selector */}
            <div className="px-4 py-2 border-t border-cyber-green/30 flex items-center gap-3">
                <span className="text-xs text-gray-500">TARGET QUBIT:</span>
                <div className="flex gap-1">
                    <button
                        onClick={() => setSelectedQubit(0)}
                        className={`px-3 py-1 text-sm font-mono rounded transition-all duration-200 ${selectedQubit === 0
                            ? "bg-cyber-green text-cyber-black font-bold"
                            : "bg-cyber-dim border border-cyber-green/50 text-gray-400 hover:text-cyber-green"
                            }`}
                    >
                        q1
                    </button>
                    <button
                        onClick={() => setSelectedQubit(1)}
                        className={`px-3 py-1 text-sm font-mono rounded transition-all duration-200 ${selectedQubit === 1
                            ? "bg-cyber-green text-cyber-black font-bold"
                            : "bg-cyber-dim border border-cyber-green/50 text-gray-400 hover:text-cyber-green"
                            }`}
                    >
                        q2
                    </button>
                </div>
            </div>

            {/* Gate Toolbar */}
            <div className="px-4 py-3 border-t border-cyber-green/30 flex flex-wrap items-center gap-3">
                <span className="text-xs text-gray-500">ADD GATE:</span>

                {/* H Gate Button */}
                <button
                    onClick={addHGate}
                    className="px-4 py-2 bg-cyber-dim border border-cyber-green text-cyber-green font-bold rounded hover:bg-cyber-green hover:text-cyber-black transition-all duration-200"
                    title="Hadamard Gate"
                >
                    H
                </button>

                {/* X Gate Button */}
                <button
                    onClick={addXGate}
                    className="px-4 py-2 bg-cyber-dim border border-cyber-green text-cyber-green font-bold rounded hover:bg-cyber-green hover:text-cyber-black transition-all duration-200"
                    title="Pauli-X Gate"
                >
                    X
                </button>

                {/* CNOT Gate Button */}
                <button
                    onClick={addCNOTGate}
                    className="px-4 py-2 bg-cyber-dim border border-cyan-400 text-cyan-400 font-bold rounded hover:bg-cyan-400 hover:text-cyber-black transition-all duration-200 flex items-center gap-1"
                    title="CNOT Gate (Control=Q0, Target=Q1)"
                >
                    <Zap className="w-4 h-4" />
                    CNOT
                </button>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Clear Button */}
                <button
                    onClick={clearCircuit}
                    className="px-4 py-2 bg-transparent border border-gray-600 text-gray-400 font-semibold rounded hover:border-red-500 hover:text-red-500 transition-all duration-200 flex items-center gap-2"
                >
                    <RotateCcw className="w-4 h-4" />
                    Clear
                </button>
            </div>

            {/* Status Console */}
            <div className="px-4 py-3 border-t border-cyber-green/30">
                {showBlueprint ? (
                    <div className="font-mono text-sm py-3 px-4 bg-orange-500/10 border border-orange-500 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Lightbulb className="w-5 h-5 text-orange-400" />
                            <span className="text-orange-400 font-bold tracking-wider">BLUEPRINT</span>
                        </div>
                        <p className="text-orange-300 tracking-wide">{feedback.message}</p>
                    </div>
                ) : (
                    <StatusConsole
                        status={feedback.status}
                        message={feedback.message}
                    />
                )}
            </div>

            {/* Run Simulation Button Row */}
            <div className="px-4 py-4 border-t border-cyber-green/30 flex gap-3">
                {/* Show Blueprint button (after 3 failed attempts) */}
                {attempts >= 3 && !showBlueprint && feedback.status !== "success" && (
                    <button
                        onClick={handleShowBlueprint}
                        className="px-4 py-3 font-bold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 border-2 border-orange-500 text-orange-500 hover:bg-orange-500/10"
                    >
                        <Lightbulb className="w-5 h-5" />
                        SHOW BLUEPRINT
                    </button>
                )}

                {/* Run Simulation Button */}
                <button
                    onClick={runSimulation}
                    disabled={isRunning || gateCount === 0}
                    className={`flex-1 py-3 font-bold text-lg rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${isRunning || gateCount === 0
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-cyber-green text-cyber-black hover:shadow-lg hover:shadow-cyber-green/30 neon-button"
                        }`}
                >
                    <Play className="w-5 h-5" />
                    {isRunning ? "SIMULATING..." : "RUN SIMULATION"}
                </button>
            </div>
        </div>
    );
}
