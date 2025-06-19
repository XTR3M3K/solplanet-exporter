import { Prometheus } from "../lib/prometheus";
import { SolplanetInverter } from "../solplanet/solplanet.inverter";
import { Runnable } from "../utils/scheduler";

export class SolplanetUpdateTask extends Runnable {
    private readonly inverter: SolplanetInverter;
    private readonly sn: string;

    constructor() {
        super();

        this.sn = process.env.SOLPLANET_INVERTER_SN;

        this.inverter = new SolplanetInverter(
            process.env.SOLPLANET_DONGLE_IP,
            process.env.SOLPLANET_DONGLE_PORT ? +process.env.SOLPLANET_DONGLE_PORT : 8484,
            this.sn
        );
    }

    public async run(): Promise<void> {
        try {
            const data = await this.inverter.getInfo();

            for (let i = 0; i < data.ac.length; i++) {
                Prometheus.voltage.set(
                    {
                        device_sn: `${this.sn}_AC`,
                        phase: `L${i + 1}`,
                    },
                    data.ac[i].voltage
                );

                Prometheus.current.set(
                    {
                        device_sn: `${this.sn}_AC`,
                        phase: `L${i + 1}`,
                    },
                    data.ac[i].current
                );

                Prometheus.power.set(
                    {
                        device_sn: `${this.sn}_AC`,
                        phase: `L${i + 1}`,
                    },
                    data.ac[i].power
                );
            }

            for (let i = 0; i < data.pv.length; i++) {
                Prometheus.voltage.set(
                    {
                        device_sn: `${this.sn}_DC`,
                        phase: `S${i + 1}`,
                    },
                    data.pv[i].voltage
                );

                Prometheus.current.set(
                    {
                        device_sn: `${this.sn}_DC`,
                        phase: `S${i + 1}`,
                    },
                    data.pv[i].current
                );

                Prometheus.power.set(
                    {
                        device_sn: `${this.sn}_DC`,
                        phase: `S${i + 1}`,
                    },
                    data.pv[i].power
                );
            }

            Prometheus.frequency.set(
                {
                    device_sn: `${this.sn}`,
                },
                data.grid.frequency
            );

            Prometheus.power_factor.set(
                {
                    device_sn: `${this.sn}`,
                },
                data.grid.power_factor
            );

            Prometheus.temperature.set(
                {
                    device_sn: `${this.sn}`,
                },
                data.temperature
            );

            Prometheus.energy_produced_total.set(
                {
                    device_sn: `${this.sn}`,
                },
                data.totalEnergyProduced
            );
        } catch(e) {
            console.error(e);
            Prometheus.clear();
        }
    }
}
