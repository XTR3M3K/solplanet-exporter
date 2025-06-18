export interface SolplanetInverterData {
    grid: SolplanetGridData;

    temperature: number;

    totalEnergyProduced: number;

    ac: PhaseData[];
    pv: PhaseData[];
}

export interface PhaseData {
    voltage: number;
    current: number;
    power?: number;
}

export interface SolplanetGridData {
    frequency: number;
    power_factor: number;
}