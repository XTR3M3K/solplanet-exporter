import 'dotenv/config'

import { Prometheus } from "./lib/prometheus";
import express from "express";
import { scheduleTask } from "./utils/scheduler";
import { SolplanetUpdateTask } from "./tasks/solplanet.update.task";

Prometheus.init();

const app = express();

app.get('/metrics', async (req, res) => {
    res.setHeader('content-type', Prometheus.registry.contentType);
    res.end(await Prometheus.registry.metrics());
});

scheduleTask(new SolplanetUpdateTask(), process.env.UPDATE_TASK_INTERVAL ? +process.env.UPDATE_TASK_INTERVAL : 10000);

const port = process.env.HTTP_SERVER_PORT ? process.env.HTTP_SERVER_PORT : 8091

app.listen(port, () => {
    console.log(`Listening on *:${port}`);
});