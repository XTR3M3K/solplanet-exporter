export interface SolplanetInverterData {
    grid: SolplanetGridData;

    temperature?: number;

    ac: PhaseData[];
    pv: PhaseData[];
}

export interface PhaseData {
    voltage: number;
    current: number;
}

export interface SolplanetGridData {
    frequency: number;
    power_factor: number;
}