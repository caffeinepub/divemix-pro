import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface GasMixture {
    mixType: string;
    heliumPercentage: bigint;
    name: string;
    tankSize: bigint;
    oxygenPercentage: bigint;
    timestamp: Time;
    workingPressure: bigint;
    nitrogenPercentage: bigint;
}
export type Time = bigint;
export interface backendInterface {
    clearAllCalculations(): Promise<void>;
    deleteCalculation(index: bigint): Promise<void>;
    getAllCalculations(): Promise<Array<GasMixture>>;
    saveCalculation(name: string, mixType: string, tankSize: bigint, workingPressure: bigint, oxygenPercentage: bigint, heliumPercentage: bigint, nitrogenPercentage: bigint): Promise<void>;
}
