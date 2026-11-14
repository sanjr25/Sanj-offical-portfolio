# Task 02 — Adafruit IO Dashboard & MQTT Cloud Telemetry

**Objective:** Establish a persistent, bi-directional MQTT publish-subscribe cloud telemetry pipeline between the ESP32 microcontroller and Adafruit IO, enabling global remote monitoring and low-latency AC appliance switching.

## Files

- `ESP32_Adafruit_MQTT.ino` — Complete ESP32 C++ firmware subscribed to Adafruit IO MQTT feed with non-blocking reconnection wrapper.

## Hardware & Software

- ESP32 SoC NodeMCU-32S
- 5V 1-Channel Optocoupler Relay Module
- 230V AC Incandescent Bulb & Socket
- Adafruit IO Cloud Broker Platform
- AC Mains Wiring & Terminal Block

## ESP32 Pin Connections

| ESP32 Pin | Connected to | Type | Description |
|---|---|---|---|
| GPIO 4 | Relay Module IN (Signal) | Digital Output (Active-LOW) | Transmits MQTT actuation commands (LOW = Relay Energized, HIGH = Released) |
| VIN (5V) | Relay Module VCC | 5V Power Supply Rail | Powers relay coil and optocoupler opto-transistor |
| GND | Relay Module GND | Ground Rail (0V) | Common logic ground return |
| Relay COM & NO | AC Phase Line In-Series to Bulb | 230V AC Switched Path | Normally Open contacts complete the AC circuit upon MQTT ON trigger |

## How to run

1. Open the `.ino` file in the Arduino IDE with the ESP32 board package installed.
2. Install the libraries included at the top of the sketch (Library Manager).
3. Replace the `YOUR_...` placeholders with your Wi-Fi and cloud credentials.
4. Select the ESP32 Dev Module board and the correct COM port, then Upload.
5. Open the Serial Monitor at 115200 baud to see the status messages.

Full documentation, photos and demo video: https://portfoliosanjay-omega.vercel.app/#iot (Assignment 02)
