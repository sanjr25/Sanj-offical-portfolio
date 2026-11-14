# Task 03 — IFTTT + Adafruit IO IoT Automation & Voice Control

**Objective:** Architect an event-driven cloud automation bridge connecting third-party triggers (voice assistants, time schedules, webhooks) to physical embedded actuators via IFTTT and Adafruit IO REST/MQTT pipelines.

## Files

- `ESP32_IFTTT_Subscriber.ino` — ESP32 C++ firmware subscribed to Adafruit IO feed, parsing automated IFTTT webhook dispatches and toggling relay.
- `IFTTT_Webhook_Payload.json` — Standardized JSON payload schema dispatched by IFTTT Webhook service to Adafruit IO REST API endpoint.

## Hardware & Software

- ESP32 SoC NodeMCU-32S
- 1-Channel Optocoupled Relay Module
- Google Assistant Voice Ecosystem
- IFTTT Cloud Service Platform
- Adafruit IO REST API & MQTT Broker
- Status Indicator LEDs

## ESP32 Pin Connections

| ESP32 Pin | Connected to | Type | Description |
|---|---|---|---|
| GPIO 4 | Relay Module IN | Digital Output (Active-LOW) | Actuates load switch when IFTTT payload is received |
| GPIO 2 | Status LED Anode | Digital Output (3.3V Logic) | Illuminates during active automation state |
| VIN (5V) | Relay Module VCC | 5V Power Supply | Powers relay coil |
| GND | Relay GND & LED Cathode | Ground Rail | Common circuit ground |

## How to run

1. Open the `.ino` file in the Arduino IDE with the ESP32 board package installed.
2. Install the libraries included at the top of the sketch (Library Manager).
3. Replace the `YOUR_...` placeholders with your Wi-Fi and cloud credentials.
4. Select the ESP32 Dev Module board and the correct COM port, then Upload.
5. Open the Serial Monitor at 115200 baud to see the status messages.

Full documentation, photos and demo video: https://portfoliosanjay-omega.vercel.app/#iot (Assignment 03)
