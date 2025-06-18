import axios, { AxiosInstance } from "axios";
import { PhaseData, SolplanetInverterData } from "./solplanet.definitions";

export class SolplanetInverter {
    private readonly client: AxiosInstance;

    constructor(ip: string, port: number, private readonly sn: string) {
        this.client = axios.create({
            baseURL: `http://${ip}:${port}`
        })
    }

    async getInfo(): Promise<SolplanetInverterData> {
        const r = await this.client.get(`/getdevdata.cgi?device=2&sn=${this.sn}`);

        const ac :PhaseData[] = [];
        const pv :PhaseData[] = [];

        for (let i = 0; i < r.data.vac.length; i++) {
            const voltage = r.data.vac[i] / 10;
            const current = r.data.iac[i] / 10;

            ac[i] = {
                voltage,
                current,
                power: +((voltage * current).toFixed(4))
            }
        }

        for (let i = 0; i < r.data.vpv.length; i++) {
            const voltage = r.data.vpv[i] / 10;
            const current = r.data.ipv[i] / 100;

            pv[i] = {
                voltage,
                current,
                power: +((voltage * current).toFixed(4))
            }
        }

        return {
            grid: {
                frequency: r.data.fac / 100,
                power_factor: r.data.pf / 100
            },

            totalEnergyProduced: r.data.eto / 10,

            temperature: r.data.tmp / 10,

            ac,
            pv
        }
    }
}