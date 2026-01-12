export interface Level {
    id: number;
    title: string;
    story: string; // The sci-fi flavor text
    mission: string; // The educational content (Markdown compatible)
    objective: string; // The win condition text
    docsUrl: string; // Link to external documentation
    solutionSteps: string[]; // Step-by-step hint array
    successCondition: {
        qubit: number; // Which qubit to check?
        probability: number; // Expected probability of '1' state (e.g., 0.5)
        description: string; // "Qubit 0 must be in Superposition (50%)"
    };
}
