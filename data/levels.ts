import { Level } from "@/types/game";

export const LEVELS: Level[] = [
    {
        id: 1,
        title: "The Quantum Coin",
        story: "Agent, the vault lock is oscillating. It exists in two states at once. You must synchronize your key to match the superposition.",
        mission: `### The H-Gate
In the classical world, a switch is either **OFF (0)** or **ON (1)**.

In the Quantum world, we use the **Hadamard Gate (H)** to put a Qubit into **Superposition**.

This means it has a 50% chance of being 0, and a 50% chance of being 1.`,
        objective: "Apply an H-Gate to q1 to enter Superposition.",
        docsUrl: "https://quantum.country/qcvc",
        solutionSteps: ["Select q1", "Click [H] Gate", "Run Simulation"],
        successCondition: {
            qubit: 0,
            probability: 0.5,
            description: "q1 must have 50% probability of being 1.",
        },
    },
    {
        id: 2,
        title: "Spooky Action",
        story: "Good work. Now we need to link two particles. When one spins up, the other must follow instantly.",
        mission: `### Entanglement
By combining an **H-Gate** and a **CNOT Gate**, we create a Bell State.

Changes to one Qubit instantly affect the other, no matter the distance.

**Recipe:**
1. Apply **H** to q1 (creates superposition)
2. Apply **CNOT** (entangles q1 with q2)`,
        objective: "Create Entanglement: H on q1, then CNOT.",
        docsUrl: "https://quantum.country/qcvc",
        solutionSteps: [
            "Select q1",
            "Click [H] Gate",
            "Click [CNOT] Gate",
            "Run Simulation",
        ],
        successCondition: {
            qubit: 1,
            probability: 0.5,
            description: "System Entangled. q2 correlated with q1.",
        },
    },
];
