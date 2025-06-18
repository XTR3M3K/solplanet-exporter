# Prometheus exporter for Solplanet inverters

## Configuration

All configuration is handled through environment variables. The following variables must be set to ensure proper communication with the Solplanet inverter and correct operation of the application:

Environment variable | Description | Default value
---------|-------------|----
HTTP_SERVER_PORT | Port on which the local HTTP server is running to expose API or data. | 8091
UPDATE_TASK_INTERVAL | Interval (in milliseconds) between periodic update tasks, such as data polling or synchronization. | 10000
SOLPLANET_DONGLE_IP | IP address of the Solplanet inverter communication dongle. |
SOLPLANET_DONGLE_PORT | TCP port used to communicate with the Solplanet dongle. | 8484
SOLPLANET_INVERTER_SN | Serial number of the connected Solplanet inverter device. |

## Usage

### Using Docker CLI

```bash
docker run -d \
  --name solplanet-exporter \
  -p 8080:8080 \
  -e UPDATE_TASK_INTERVAL=10000 \
  -e SOLPLANET_DONGLE_IP=192.168.1.170 \
  -e SOLPLANET_DONGLE_PORT=8484 \
  -e SOLPLANET_INVERTER_SN=SP00066032310246 \
  -e HTTP_SERVER_PORT=8080 \
  ghcr.io/xtr3m3k/solplanet-exporter:latest
```

### Using Docker Compose

```yaml
services:
  solplanet-exporter:
    image: ghcr.io/xtr3m3k/solplanet-exporter:latest
    restart: unless-stopped
    ports:
      - "8091:8091"
    environment:
      SOLPLANET_DONGLE_IP: '192.168.1.170'
      SOLPLANET_INVERTER_SN: XXXXXXXXXXXXXXXX
```
