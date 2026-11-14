# Task 04 — Firebase Realtime Database & IoT Monitoring Dashboard

**Objective:** Design and deploy a full-stack, authenticated IoT environmental telemetry dashboard utilizing Google Firebase Realtime Database and ESP32 with persistent WebSocket bi-directional state synchronization.

## Files

- `ESP32_Firebase_RTDB_Telemetry.ino` — Complete ESP32 C++ firmware acquiring DHT11/LDR data, streaming to Firebase RTDB, and listening to appliance control nodes.
- `firebase_dashboard.js` — Frontend web dashboard script utilizing Firebase SDK v10/v11 modular imports, real-time database listeners, and DOM updates.
- `dashboard.html` — Complete HTML5/CSS3 frontend web dashboard with embedded Firebase SDK v10/v11 integration, authentication, and live gauge cards.

## Hardware & Software

- ESP32 NodeMCU-32S
- DHT11 Digital Temperature/Humidity Sensor
- LDR 5mm Light Dependent Resistor
- 10kΩ Pull-Up Resistor
- 1-Channel 5V Relay Module
- Google Firebase Cloud Platform

## ESP32 Pin Connections

| ESP32 Pin | Connected to | Type | Description |
|---|---|---|---|
| GPIO 4 | DHT11 Data Pin (with 10kΩ pull-up) | Bidirectional Digital Single-Wire | Carries time-critical digital pulse sequences for temperature/humidity |
| GPIO 34 | LDR & 10kΩ Voltage Divider Junction | Analog Input (ADC1_CH6) | Reads analog voltage representing ambient light intensity (0-4095 ADC) |
| GPIO 5 | Relay Module IN (Signal) | Digital Output (3.3V Logic) | Drives optocoupler relay to toggle connected appliance load |
| 3V3 | DHT11 VCC & LDR Voltage Divider Rail | 3.3V Regulated DC Rail | Clean low-noise analog reference and logic power |
| VIN (5V) | Relay Module VCC | 5V DC Supply Rail | Powers relay electromechanical coil |
| GND | DHT11 GND, 10kΩ Divider Ground, Relay GND | Common Ground Rail (0V) | Universal reference ground return |

## How to run

1. Open the `.ino` file in the Arduino IDE with the ESP32 board package installed.
2. Install the libraries included at the top of the sketch (Library Manager).
3. Replace the `YOUR_...` placeholders with your Wi-Fi and cloud credentials.
4. Select the ESP32 Dev Module board and the correct COM port, then Upload.
5. Open the Serial Monitor at 115200 baud to see the status messages.

Full documentation, photos and demo video: https://portfoliosanjay-omega.vercel.app/#iot (Assignment 04)
