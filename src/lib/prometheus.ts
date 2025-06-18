import { Gauge, Registry } from "prom-client";

export class Prometheus {
    public static registry: Registry = new Registry();

    public static voltage = new Gauge({
        name: 'voltage',
        help: 'Voltage measurement',
        labelNames: [
            'device_sn',
            'phase'
        ]
    });
    public static current = new Gauge({
        name: 'current',
        help: 'Current measurement',
        labelNames: [
            'device_sn',
            'phase'
        ]
    });
    public static power = new Gauge({
        name: 'power',
        help: 'Power measurement',
        labelNames: [
            'device_sn',
            'phase'
        ]
    });

    public static power_factor = new Gauge({
        name: 'power_factor',
        help: 'Power factor measurement',
        labelNames: [
            'device_sn',
            'phase'
        ]
    });

    public static frequency = new Gauge({
        name: 'frequency',
        help: 'Frequency measurement',
        labelNames: [
            'device_sn',
            'phase'
        ]
    });

    public static temperature = new Gauge({
        name: 'temperature',
        help: 'Temperature measurement',
        labelNames: [
            'device_sn'
        ]
    });

    public static energy_produced = new Gauge({
        name: 'energy_produced',
        help: 'Energy produced',
        labelNames: [
            'device_sn'
        ]
    });

    public static init() {
        this.registry.registerMetric(this.voltage);
        this.registry.registerMetric(this.current);
        this.registry.registerMetric(this.power);
        this.registry.registerMetric(this.power_factor);
        this.registry.registerMetric(this.frequency);
        this.registry.registerMetric(this.temperature);
        this.registry.registerMetric(this.energy_produced);
    }

    public static clear() {
        this.voltage.reset();
        this.current.reset();
        this.power.reset();
        this.power_factor.reset();
        this.frequency.reset();
        this.temperature.reset();
        this.energy_produced.reset();
    }
}