// Type declarations for quantum-circuit library
declare module "quantum-circuit" {
    export default class QuantumCircuit {
        constructor(numQubits: number);
        addGate(
            gateName: string,
            column: number,
            wire: number | number[],
            options?: object
        ): void;
        clear(): void;
        exportSVG(embedded: boolean): string;
        run(shots?: number): void;
        measureAll(): number[];
        stateAsString(onlyPossible?: boolean): string;
        probabilities(): number[];
        probability(wire: number): number;
        numQubits: number;
    }
}
