# Task 01 — ESP32 Local Web Server & HTML LED Control

**Objective:** Develop an autonomous, embedded HTTP web server hosted on the ESP32 microcontroller to execute zero-cloud, low-latency GPIO actuation and state telemetry over a local Wi-Fi Local Area Network (LAN).

## Files

- `ESP32_Local_WebServer.ino` — Complete Arduino/ESP32 C++ firmware hosting HTTP server, mDNS responder, and non-blocking reconnect loop.
- `index.html` — Clean responsive HTML interface developed for browser-based actuator toggling with RESTful links.

## Hardware & Software

- ESP32 NodeMCU-32S Development Board
- 5mm Red Diffused LED
- 220Ω 1/4W Metal Film Resistor
- 1-Channel 5V Optocoupled Relay Module
- Wi-Fi Access Point / Router
- Solderless Breadboard & Dupont Jumper Wires

## ESP32 Pin Connections

| ESP32 Pin | Connected to | Type | Description |
|---|---|---|---|
| GPIO 2 | LED Anode (+) via 220Ω resistor / Relay IN | Digital Output (3.3V Logic) | Controls actuator digital state (HIGH = ON, LOW = OFF) |
| GND | LED Cathode (-) / Relay GND | Ground Rail (0V Reference) | Common system ground return path |
| VIN / 5V | Relay Module VCC | Power Input/Output (5V) | Supplies 5V coil power to optocoupled relay circuitry |

## How to run

1. Open the `.ino` file in the Arduino IDE with the ESP32 board package installed.
2. Install the libraries included at the top of the sketch (Library Manager).
3. Replace the `YOUR_...` placeholders with your Wi-Fi and cloud credentials.
4. Select the ESP32 Dev Module board and the correct COM port, then Upload.
5. Open the Serial Monitor at 115200 baud to see the status messages.

Full documentation, photos and demo video: https://portfoliosanjay-omega.vercel.app/#iot (Assignment 01)
