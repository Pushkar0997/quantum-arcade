import { Level } from "@/types/game";

export const LEVELS: Level[] = [
    {
        id: 1,
        title: "The Awakening",
        story: "System Offline. We need to wake up the Qubit.",
        mission: `Classical computers use 0 and 1. The **X-Gate** acts like a switch. It flips 0 to 1.`,
        objective: "Flip Qubit 1 from Off (0) to On (1).",
        docsUrl: "https://quantum.country/qcvc",
        solutionSteps: ["Target Qubit 0", "Click [X] Gate", "Run Simulation"],
        successCondition: {
            qubit: 0,
            probability: 1.0,
            description: "Qubit Active",
        },
    },
    {
        id: 2,
        title: "The Uncertainty",
        story: "Good. Now let's enter the Quantum Realm.",
        mission: `The **H-Gate** (Hadamard) creates a 50/50 probability split. The Qubit is now spinning.`,
        objective: "Put Qubit 1 into Superposition (50% 0, 50% 1).",
        docsUrl: "https://quantum.country/qcvc",
        solutionSteps: ["Target Qubit 0", "Click [H] Gate", "Run Simulation"],
        successCondition: {
            qubit: 0,
            probability: 0.5,
            description: "Superposition Achieved",
        },
    },
    {
        id: 3,
        title: "The Stabilizer",
        story: "CRITICAL WARNING. Qubit 1 is destabilizing. We cannot leave it in Superposition. You must reverse the quantum state.",
        mission: `Quantum Gates are reversible. If you apply a Hadamard (H) gate to a superposed particle, it returns to zero.

**H + H = 0**.`,
        objective: "Apply an H-Gate, then apply a SECOND H-Gate to return Qubit 1 to the Ground State (0).",
        docsUrl: "https://quantum.country/qcvc",
        solutionSteps: [
            "Target Qubit 0",
            "Click [H] Gate",
            "Click [H] Gate again",
            "Run Simulation",
        ],
        successCondition: {
            qubit: 0,
            probability: 0,
            description: "System Stabilized (0% Probability of 1)",
        },
    },
];
