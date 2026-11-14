# Task 05 — Firebase Logging, Automation & Data Export Engine

**Objective:** Engineer an end-to-end autonomous environmental control system combining dual-mode (Auto/Manual) hysteresis lighting, time-series historical data persistence in Firebase RTDB, and client-side CSV telemetry export for offline analytical research.

## Files

- `ESP32_Integrated_System_Logging.ino` — Complete Arduino sketch featuring multi-sensor acquisition, hysteresis lighting logic, and periodic time-series push logging to Firebase RTDB.
- `csvExporter.js` — Client-side telemetry export utility creating memory-safe W3C Blob chunks and triggering instantaneous browser CSV download.
- `sample_telemetry_export.csv` — Demonstration of historical sensor records exported into comma-separated values (CSV) format.

## Hardware & Software

- ESP32 SoC NodeMCU-32S
- DHT11 Sensor
- LDR Light Sensor & 10kΩ Resistor
- 1-Channel 5V Relay Module
- 230V AC Test Bulb
- Firebase Historical Persistence Node
- JavaScript Export Utility Engine

## ESP32 Pin Connections

| ESP32 Pin | Connected to | Type | Description |
|---|---|---|---|
| GPIO 4 | DHT11 Data Pin | Digital Single-Wire | Transmits atmospheric readings to the ESP32 |
| GPIO 34 | LDR Voltage Divider Junction | Analog Input (ADC1_CH6) | Reads ambient light intensity for automatic threshold evaluation |
| GPIO 5 | Relay Control IN | Digital Output | Actuates relay according to Auto hysteresis logic or Manual cloud toggle |
| GPIO 2 | Onboard Status LED | Digital Output | Flashes during historical cloud logging dispatches |
| 3V3 & VIN (5V) | Sensor Rails & Relay Power | Regulated DC Power | Dual-rail power distribution for digital logic and mechanical coil |

## How to run

1. Open the `.ino` file in the Arduino IDE with the ESP32 board package installed.
2. Install the libraries included at the top of the sketch (Library Manager).
3. Replace the `YOUR_...` placeholders with your Wi-Fi and cloud credentials.
4. Select the ESP32 Dev Module board and the correct COM port, then Upload.
5. Open the Serial Monitor at 115200 baud to see the status messages.

Full documentation, photos and demo video: https://portfoliosanjay-omega.vercel.app/#iot (Assignment 05)
