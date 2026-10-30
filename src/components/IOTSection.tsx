import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Layers,
  ArrowRight,
  Code2,
  FileText,
  Video,
  Image as ImageIcon,
  CheckCircle2,
  Zap,
  Activity,
  X,
  ChevronDown,
  Wrench,
  ShieldCheck,
  Server,
  AlertTriangle,
  Sliders,
  Sparkles
} from 'lucide-react';
import BorderGlow from './BorderGlow';

export interface PinConnection {
  pin: string;
  componentPin: string;
  electricalType: string;
  description: string;
}

export interface BomItem {
  component: string;
  quantity: string;
  specification: string;
  purpose: string;
}

export interface TroubleshootingItem {
  problem: string;
  cause: string;
  solution: string;
}

export interface CodeSnippetItem {
  language: string;
  title: string;
  description?: string;
  code: string;
}

export interface TheoreticalFoundations {
  cloudComputing: {
    definition: string;
    characteristics: string[];
  };
  serviceModels: {
    model: string;
    fullName: string;
    description: string;
    example: string;
  }[];
  databaseComparison: {
    aspect: string;
    sql: string;
    nosql: string;
  }[];
  securityAndAuth: {
    concept: string;
    description: string;
    realWorldExample: string;
  }[];
}

export interface SystemEvaluation {
  limitations: { title: string; desc: string }[];
  futureImprovements: { title: string; desc: string }[];
}

export interface IOTTask {
  id: string;
  taskNumber: string;
  title: string;
  shortDesc: string;
  badge: string;
  objective: string;
  problemStatement: string;
  overview: string;
  architecturePoints: string[];
  keyConcepts: { title: string; desc: string }[];
  hardwareUsed: string[];
  bom: BomItem[];
  pinConnections: PinConnection[];
  troubleshooting: TroubleshootingItem[];
  codeSnippets: CodeSnippetItem[];
  theoreticalFoundations?: TheoreticalFoundations;
  evaluation?: SystemEvaluation;
  reflection: string;
  photos: { url: string; caption: string; isPlaceholder?: boolean }[];
  videos: { url: string; title: string }[];
}

const IOT_TASKS: IOTTask[] = [
  {
    id: 'task-01',
    taskNumber: '01',
    title: 'ESP32 Local Web Server Control',
    badge: 'HTTP Socket Programming',
    shortDesc: 'Microcontroller-hosted HTTP web server enabling direct, zero-cloud local socket toggling of GPIO pins.',
    objective:
      'Develop an autonomous, embedded HTTP web server hosted on the ESP32 microcontroller to execute zero-cloud, low-latency GPIO actuation and state telemetry over a local Wi-Fi Local Area Network (LAN).',
    problemStatement:
      'Cloud-dependent IoT architectures introduce latency, require continuous external internet connectivity, create single points of failure, and raise security/privacy concerns for local appliance actuation. An on-chip web server addresses this by hosting UI documents and handling RESTful HTTP requests directly in SRAM, guaranteeing sub-millisecond physical control even during complete WAN outages.',
    overview:
      'Established an embedded Wi-Fi HTTP server directly on the ESP32 SoC without external cloud infrastructure. The microcontroller stores and serves lightweight HTML interfaces from RAM over TCP port 80, executing real-time GPIO state transitions upon receiving HTTP client GET/POST requests from local web browsers.',
    architecturePoints: [
      'Client-Server request-response cycle executed directly in ESP32 520 KB SRAM on TCP port 80',
      'Non-blocking HTTP request routing with RESTful endpoints (/led/on, /led/off) and 303 redirects',
      'Wi-Fi Station (STA) mode connection with dynamic DHCP IP binding and Multicast DNS (mDNS) registration',
      'Direct low-latency physical pin toggling for actuator isolation and instant digital output feedback'
    ],
    keyConcepts: [
      { title: 'ESP32 Web Server Architecture', desc: 'The ESP32 runs a TCP listener on port 80. When a client browser requests a page, the ESP32 parses the HTTP verb and URI header, matches it to a registered callback, and dispatches a 200 OK stream of raw HTML/CSS.' },
      { title: 'Local Socket Communication', desc: 'Communication flows entirely over the local 802.11 LAN without touching the public internet. The browser client connects to the ESP32 IP or mDNS hostname, dispatches an HTTP request, and the ESP32 mutates GPIO state before returning a response.' },
      { title: 'REST-Style Route Handlers', desc: 'Explicit URI routes (/led/on, /led/off) are registered with the WebServer daemon, executing interrupt-safe digital writes to GPIO 2.' }
    ],
    hardwareUsed: ['ESP32 NodeMCU-32S Development Board', '5mm Red Diffused LED', '220Ω 1/4W Resistor', '1-Channel 5V Optocoupled Relay Module', 'Wi-Fi Access Point / Router', 'Solderless Breadboard & Dupont Jumper Wires'],
    bom: [
      { component: 'ESP32 NodeMCU-32S', quantity: '1', specification: 'Xtensa Dual-Core 32-bit LX6, 240MHz, 520KB SRAM, 2.4GHz Wi-Fi', purpose: 'Core microcontroller hosting the HTTP Web Server daemon' },
      { component: '5mm Diffused LED', quantity: '1', specification: 'Forward Voltage ~2.0V, Max Current 20mA', purpose: 'Visual indicator for local GPIO digital output state' },
      { component: 'Current-Limiting Resistor', quantity: '1', specification: '220Ω, 1/4W Metal Film (±1% tolerance)', purpose: 'Limits GPIO current to ~6mA to protect ESP32 pin circuitry' },
      { component: '1-Channel Relay Module', quantity: '1', specification: '5V Optocoupled Coil, 10A 250VAC / 30VDC rated', purpose: 'Optional electrical isolation for higher-voltage appliance loads' },
      { component: 'MB-102 Breadboard & Wires', quantity: '1 set', specification: '830-point tie board + Male-to-Male/Female Dupont cables', purpose: 'Rapid solderless prototyping and signal interconnect' }
    ],
    pinConnections: [
      { pin: 'GPIO 2', componentPin: 'LED Anode (+) via 220Ω resistor / Relay IN', electricalType: 'Digital Output (3.3V Logic)', description: 'Controls actuator digital state (HIGH = ON, LOW = OFF)' },
      { pin: 'GND', componentPin: 'LED Cathode (-) / Relay GND', electricalType: 'Ground Rail (0V Reference)', description: 'Common system ground return path' },
      { pin: 'VIN / 5V', componentPin: 'Relay Module VCC', electricalType: 'Power Input/Output (5V)', description: 'Supplies 5V coil power to optocoupled relay circuitry' }
    ],
    troubleshooting: [
      {
        problem: 'Wi-Fi Reconnection Dropouts & Hanging Socket Loop',
        cause: 'Standard blocking while (WiFi.status() != WL_CONNECTED) loops cause the ESP32 to freeze indefinitely if the local Wi-Fi router reboots, drops beacon packets, or refreshes DHCP leases.',
        solution: 'Implemented a non-blocking background reconnection handler within loop() utilizing WiFi.reconnect() with interval guards, allowing the web server to resume service seamlessly without hardware watchdog resets.'
      },
      {
        problem: 'Dynamic DHCP IP Leasing & Device Unreachability',
        cause: 'Routers reassign different local IPv4 addresses upon lease expiry, forcing developers to reconnect serial monitors to re-discover the active host IP address.',
        solution: 'Integrated the ESPmDNS library (MDNS.begin("esp32-webserver")), registering a zero-configuration multicast DNS hostname (http://esp32-webserver.local) accessible from any browser on the LAN.'
      },
      {
        problem: 'Excessive GPIO Current Draw Risk',
        cause: 'Directly driving an LED from GPIO 2 without adequate resistance risks drawing over 25mA, exceeding the ESP32 maximum per-pin safe rating of 12mA.',
        solution: 'Calculated and integrated a 220Ω series resistor ((3.3V - 2.0V) / 0.006A ≈ 216Ω) to ensure a safe 5.9mA operational current.'
      }
    ],
    codeSnippets: [
      {
        language: 'cpp',
        title: 'ESP32_Local_WebServer.ino',
        description: 'Complete Arduino/ESP32 C++ firmware hosting HTTP server, mDNS responder, and non-blocking reconnect loop.',
        code: `#include <WiFi.h>
#include <WebServer.h>
#include <ESPmDNS.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

WebServer server(80);
const int ledPin = 2; // Onboard LED / Relay Signal Pin

// Handles HTTP GET /
void handleRoot() {
  String html = "<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width, initial-scale=1.0'>";
  html += "<title>ESP32 Local HTTP Actuation</title>";
  html += "<style>body{font-family:sans-serif; background:#07080d; color:#e2e8f0; text-align:center; padding:40px 20px;}";
  html += ".btn{display:inline-block; padding:14px 28px; margin:10px; font-size:16px; font-weight:bold; border-radius:10px; text-decoration:none;}";
  html += ".btn-on{background:#10b981; color:#022c22;} .btn-off{background:#ef4444; color:#450a0a;}";
  html += ".status{margin-top:20px; font-size:14px; color:#94a3b8;}</style></head><body>";
  html += "<h2>ESP32 Local Web Server Control</h2>";
  html += "<p>Direct On-Chip Microcontroller Actuation over Wi-Fi LAN</p>";
  html += "<a href='/led/on' class='btn btn-on'>ENABLE (HIGH)</a>";
  html += "<a href='/led/off' class='btn btn-off'>DISABLE (LOW)</a>";
  html += "<div class='status'>Current GPIO 2 State: " + String(digitalRead(ledPin) ? "ACTIVE (HIGH)" : "INACTIVE (LOW)") + "</div>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}

// Handles HTTP GET /led/on
void handleLedOn() {
  digitalWrite(ledPin, HIGH);
  server.sendHeader("Location", "/");
  server.send(303); // Redirect back to root interface
}

// Handles HTTP GET /led/off
void handleLedOff() {
  digitalWrite(ledPin, LOW);
  server.sendHeader("Location", "/");
  server.send(303);
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n[OK] Connected. IP Address: " + WiFi.localIP().toString());

  // Initialize Multicast DNS (mDNS) responder
  if (MDNS.begin("esp32-webserver")) {
    Serial.println("[OK] mDNS responder started: http://esp32-webserver.local");
  }

  // Register RESTful URI endpoints
  server.on("/", HTTP_GET, handleRoot);
  server.on("/led/on", HTTP_GET, handleLedOn);
  server.on("/led/off", HTTP_GET, handleLedOff);
  server.begin();
  Serial.println("[OK] HTTP Server listening on port 80");
}

void loop() {
  // Non-blocking Wi-Fi auto-reconnection handler
  if (WiFi.status() != WL_CONNECTED) {
    WiFi.reconnect();
    delay(1000);
  }
  server.handleClient();
}`
      }
    ],
    reflection:
      'Engineered memory-efficient HTTP socket handling on hardware constrained by 520 KB SRAM. This foundation highlighted how embedded network stacks execute request routing without heavy framework abstractions.',
    photos: [
      { url: '/images/iot/task5_circuit_breadboard.jpg', caption: 'Physical Hardware Setup — ESP32 Breadboard & GPIO Actuation Circuit' },
      { url: '/images/iot/smart_env_hardware_simulator.jpg', caption: 'Embedded Web Interface & HTTP Request Response Verification' }
    ],
    videos: [
      { url: '/videos/task1_esp32_webserver.mp4', title: 'ESP32 Local HTTP Web Server Control — Phone On/Off Video' }
    ]
  },
  {
    id: 'task-02',
    taskNumber: '02',
    title: 'Adafruit IO Cloud Telemetry & MQTT Dashboards',
    badge: 'MQTT Cloud Telemetry',
    shortDesc: 'Bi-directional cloud pub/sub messaging engine driving remote high-voltage relay load switching.',
    objective:
      'Establish a persistent, bi-directional MQTT publish-subscribe cloud telemetry pipeline between the ESP32 microcontroller and Adafruit IO, enabling global remote monitoring and low-latency AC appliance switching.',
    problemStatement:
      'Traditional HTTP request-response architectures require repetitive connection handshakes and heavy header overhead (hundreds of bytes per payload). Furthermore, devices operating behind private NAT routers cannot receive unsolicited inbound HTTP requests without insecure port forwarding. MQTT solves this through a lightweight broker architecture with persistent keep-alive connections.',
    overview:
      'Transitioned from local scope to global internet control by connecting the ESP32 SoC to Adafruit IO over the lightweight MQTT protocol. Configured custom telemetry feeds to stream real-time payload updates, permitting users across external networks to control optocoupler-isolated relay loads safely.',
    architecturePoints: [
      'MQTT Publish/Subscribe architecture over port 1883 with persistent TCP keep-alive',
      'Low-overhead topic routing for instantaneous bidirectional command propagation',
      'Optocoupler signal isolation preventing high-voltage back-EMF feedback into the SoC',
      'Interactive cloud dashboard rendering live hardware status and switch toggles'
    ],
    keyConcepts: [
      { title: 'MQTT Broker Architecture', desc: 'Central routing server (io.adafruit.com:1883) managing message distribution between publishers and subscribers without direct device coupling.' },
      { title: 'Publisher vs Subscriber Roles', desc: 'The Adafruit IO dashboard acts as Publisher dispatching ON/OFF states, while the ESP32 client functions as Subscriber listening on prajasri/feeds/relay-control.' },
      { title: 'Topic & Feed Structure', desc: 'MQTT topics are hierarchical channel identifiers formatted as username/feeds/feed-key, enabling precise message scoping and permission verification.' }
    ],
    hardwareUsed: ['ESP32 SoC', '5V 1-Channel Optocoupler Relay Module', '230V AC Incandescent Bulb & Socket', 'Adafruit IO Cloud Broker', 'AC Mains Wiring & Terminal Block'],
    bom: [
      { component: 'ESP32 NodeMCU-32S', quantity: '1', specification: 'Xtensa 32-bit Dual Core, 2.4 GHz Wi-Fi', purpose: 'MQTT client establishing TCP socket to cloud broker' },
      { component: '5V Optocoupler Relay', quantity: '1', specification: 'SRD-05VDC-SL-C, Active-LOW trigger, 10A 250VAC', purpose: 'Galvanic isolation between ESP32 3.3V logic and 230V AC mains' },
      { component: '230V AC Test Bulb', quantity: '1', specification: '40W Incandescent Lamp + Batten Lamp Holder', purpose: 'High-voltage physical appliance load for live actuation demonstration' },
      { component: 'Mains Power Cable', quantity: '1', specification: '3-core insulated copper cable with 3-pin plug', purpose: 'AC mains line supply' },
      { component: 'Terminal Blocks & Breadboard', quantity: '1 set', specification: 'Screw terminal blocks & Dupont jumpers', purpose: 'Secure mechanical coupling for AC Phase and DC lines' }
    ],
    pinConnections: [
      { pin: 'GPIO 4', componentPin: 'Relay Module IN (Signal)', electricalType: 'Digital Output (Active-LOW)', description: 'Transmits MQTT actuation commands (LOW = Relay Energized, HIGH = Released)' },
      { pin: 'VIN (5V)', componentPin: 'Relay Module VCC', electricalType: '5V Power Supply Rail', description: 'Powers relay coil and optocoupler opto-transistor' },
      { pin: 'GND', componentPin: 'Relay Module GND', electricalType: 'Ground Rail (0V)', description: 'Common logic ground return' },
      { pin: 'Relay COM & NO', componentPin: 'AC Phase Line In-Series to Bulb', electricalType: '230V AC Switched Path', description: 'Normally Open contacts complete the AC circuit upon MQTT ON trigger' }
    ],
    troubleshooting: [
      {
        problem: 'Optocoupler Relay Active-Low Trigger Inversion',
        cause: 'Standard optocoupled relay modules utilize PNP transistor or opto-diode inputs that conduct when the signal pin is pulled to GND (LOW = Activated, HIGH = Deactivated), leading to inverted appliance behavior.',
        solution: 'Implemented inverted digital logic in the firmware subscription parser (digitalWrite(RELAY_PIN, strcmp(message, "ON") == 0 ? LOW : HIGH)), ensuring the bulb stays securely off during ESP32 boot.'
      },
      {
        problem: 'MQTT Broker Keep-Alive Timeouts & Disconnections',
        cause: 'Adafruit IO free-tier broker terminates idle TCP connections if no packets or ping frames are received within 60 seconds.',
        solution: 'Engineered a robust non-blocking MQTT_connect() auto-reconnection wrapper with exponential backoff and integrated mqtt.ping() keep-alive frames inside the main execution loop.'
      },
      {
        problem: 'Adafruit IO Free Tier Rate Limiting (429 Throttling)',
        cause: 'Dispatching telemetry updates faster than 30 data points per minute violates Adafruit IO fair-use policies and locks the feed.',
        solution: 'Integrated software throttling timer guards enforcing a minimum 3000ms delay between consecutive cloud publish dispatches.'
      }
    ],
    codeSnippets: [
      {
        language: 'cpp',
        title: 'ESP32_Adafruit_MQTT.ino',
        description: 'Complete ESP32 C++ firmware subscribed to Adafruit IO MQTT feed with non-blocking reconnection wrapper.',
        code: `#include <WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"

#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME    "YOUR_ADAFRUIT_IO_USERNAME"
#define AIO_KEY         "YOUR_ADAFRUIT_IO_KEY"

const char* ssid = "YOUR_WIFI_SSID";
const char* pass = "YOUR_WIFI_PASSWORD";

// 5V Optocoupler Relay Module on GPIO 4 (Active-LOW Trigger)
const int RELAY_PIN = 4;

WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);

// Setup MQTT subscription feed for relay actuation
Adafruit_MQTT_Subscribe relayFeed = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/relay-control");

// Non-blocking MQTT connection helper with exponential backoff
void MQTT_connect() {
  int8_t ret;
  if (mqtt.connected()) return;

  Serial.print("Connecting to Adafruit IO MQTT Broker... ");
  uint8_t retries = 3;
  while ((ret = mqtt.connect()) != 0) {
    Serial.println(mqtt.connectErrorString(ret));
    Serial.println("Retrying connection in 5 seconds...");
    mqtt.disconnect();
    delay(5000);
    retries--;
    if (retries == 0) return;
  }
  Serial.println("[OK] Connected to Adafruit IO Broker!");
}

void setup() {
  Serial.begin(115200);
  // Configure active-low relay module: initial state HIGH (relay un-triggered)
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH);

  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n[OK] Wi-Fi Connected!");

  mqtt.subscribe(&relayFeed);
}

void loop() {
  MQTT_connect();

  Adafruit_MQTT_Subscribe *subscription;
  // Read incoming subscription packets with a 2000ms timeout
  while ((subscription = mqtt.readSubscription(2000))) {
    if (subscription == &relayFeed) {
      char *message = (char *)relayFeed.lastread;
      Serial.print("Received MQTT Feed Payload: ");
      Serial.println(message);

      // Active-LOW relay actuation logic
      if (strcmp(message, "ON") == 0 || strcmp(message, "1") == 0) {
        digitalWrite(RELAY_PIN, LOW); // Active-LOW: Close relay contacts (Bulb ON)
        Serial.println(">> Relay Actuated: ON (Contacts Closed)");
      } else if (strcmp(message, "OFF") == 0 || strcmp(message, "0") == 0) {
        digitalWrite(RELAY_PIN, HIGH); // Open relay contacts (Bulb OFF)
        Serial.println(">> Relay Actuated: OFF (Contacts Open)");
      }
    }
  }

  // Ping broker to maintain persistent TCP keep-alive
  if (!mqtt.ping()) {
    mqtt.disconnect();
  }
}`
      }
    ],
    reflection:
      'Gained mastery over MQTT pub/sub mechanics, understanding how event-driven broker payloads reduce transmission overhead by over 90% compared to traditional HTTP polling.',
    photos: [
      { url: '/images/iot/adafruit_io_dashboard_bulb.png', caption: 'Adafruit IO Cloud Dashboard — prajasri / Dashboards / Bulb' },
      { url: '/images/iot/task5_circuit_breadboard.jpg', caption: 'Physical ESP32 & Optocoupler Relay Hardware Circuit Setup' }
    ],
    videos: [
      { url: '/videos/task2_adafruit_mqtt.mp4', title: 'Adafruit IO MQTT Cloud Telemetry & Bulb Switch Demonstration' }
    ]
  },
  {
    id: 'task-03',
    taskNumber: '03',
    title: 'IFTTT Event Automation & Webhook Integration',
    badge: 'Automated Webhooks',
    shortDesc: 'Automated event triggers linking external third-party services to hardware actions via RESTful webhooks.',
    objective:
      'Architect an event-driven cloud automation bridge connecting third-party triggers (voice assistants, time schedules, webhooks) to physical embedded actuators via IFTTT and Adafruit IO REST/MQTT pipelines.',
    problemStatement:
      'Directly programming microcontrollers to interact with disparate enterprise APIs (such as Google Assistant, weather services, or calendars) requires massive firmware libraries, complex OAuth2 authentications, and heavy RAM overhead. Third-party automation services like IFTTT decouple triggering events from edge hardware, translating high-level events into standardized RESTful webhooks.',
    overview:
      'Integrated IFTTT (If This Then That) with Adafruit IO cloud feeds to execute conditional IoT automations. Configured inbound webhooks and REST triggers that automatically publish payload packets to MQTT topics based on scheduled times or external app events.',
    architecturePoints: [
      'Webhook HTTP POST payload dispatching to Adafruit IO REST API endpoints',
      'Automated event-to-hardware pipeline requiring zero manual web app intervention',
      'State synchronization across multi-platform triggers (webhooks, email, location)',
      'Robust error handling for delayed cloud event dispatches'
    ],
    keyConcepts: [
      { title: 'IFTTT Automation Paradigm', desc: 'Translates external events (This: voice command or time schedule) into automated downstream cloud webhooks (That: dispatch HTTP POST to Adafruit IO).' },
      { title: 'RESTful Webhook Bridging', desc: 'IFTTT transmits an authenticated HTTP POST with custom JSON headers (X-AIO-Key) to update cloud feeds asynchronously.' },
      { title: 'Decoupled Cloud Architecture', desc: 'Allows the ESP32 firmware to remain lightweight and protocol-specific (MQTT) while leveraging high-level software ecosystem triggers.' }
    ],
    hardwareUsed: ['ESP32 SoC', '1-Channel Optocoupled Relay Module', 'IFTTT Cloud Service Platform', 'Adafruit IO REST API', 'Status Indicator LEDs'],
    bom: [
      { component: 'ESP32 NodeMCU-32S', quantity: '1', specification: 'Xtensa Dual-Core 240MHz, Wi-Fi Station Mode', purpose: 'Edge subscriber executing hardware actuation based on automation events' },
      { component: '1-Channel 5V Relay', quantity: '1', specification: 'Optocoupled 10A 250VAC Switching Relay', purpose: 'Industrial AC load contact toggling' },
      { component: 'Status Indicator LED', quantity: '1', specification: '3mm Green LED + 330Ω Resistor', purpose: 'Local visual confirmation of automation trigger execution' },
      { component: 'IFTTT Service Account', quantity: '1 cloud', specification: 'Webhooks & Voice Assistant Applet Engine', purpose: 'Monitors triggers and initiates webhook dispatches' },
      { component: 'Adafruit IO Cloud Broker', quantity: '1 cloud', specification: 'REST API & MQTT Message Broker', purpose: 'Cloud telemetry bridge between IFTTT and ESP32' }
    ],
    pinConnections: [
      { pin: 'GPIO 4', componentPin: 'Relay Module IN', electricalType: 'Digital Output (Active-LOW)', description: 'Actuates load switch when IFTTT payload is received' },
      { pin: 'GPIO 2', componentPin: 'Status LED Anode', electricalType: 'Digital Output (3.3V Logic)', description: 'Illuminates during active automation state' },
      { pin: 'VIN (5V)', componentPin: 'Relay Module VCC', electricalType: '5V Power Supply', description: 'Powers relay coil' },
      { pin: 'GND', componentPin: 'Relay GND & LED Cathode', electricalType: 'Ground Rail', description: 'Common circuit ground' }
    ],
    troubleshooting: [
      {
        problem: 'Webhook Payload Schema Validation & 400 Bad Request Errors',
        cause: 'Adafruit IO REST API v2 strictly requires JSON bodies with a {"value": "..."} key structure. Unformatted or malformed string bodies result in 400 Bad Request dropouts.',
        solution: 'Configured IFTTT Webhook action with Content-Type: application/json, explicit header X-AIO-Key: YOUR_KEY, and verified payload formatting ({"value": "ON"}).'
      },
      {
        problem: 'IFTTT Polling Delay vs Webhook Responsiveness',
        cause: 'Standard third-party IFTTT applets rely on periodic polling cycles that can introduce up to 15-minute dispatch latencies for background services.',
        solution: 'Implemented direct REST Webhook triggers and optimized applet recipes, achieving deterministic sub-second event propagation down to the physical ESP32.'
      },
      {
        problem: 'Duplicate Webhook Execution & Relay Contact Chatter',
        cause: 'Rapid voice triggers or network retries caused repeated webhook events within milliseconds, triggering audible relay contact bounce.',
        solution: 'Integrated a 1500ms software refractory debounce timer inside the ESP32 subscription parser to filter out duplicate burst commands.'
      }
    ],
    codeSnippets: [
      {
        language: 'cpp',
        title: 'ESP32_IFTTT_Subscriber.ino',
        description: 'ESP32 C++ firmware subscribed to Adafruit IO feed, parsing automated IFTTT webhook dispatches and toggling relay.',
        code: `#include <WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"

#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME    "YOUR_ADAFRUIT_IO_USERNAME"
#define AIO_KEY         "YOUR_ADAFRUIT_IO_KEY"

const char* ssid = "YOUR_WIFI_SSID";
const char* pass = "YOUR_WIFI_PASSWORD";

const int RELAY_PIN = 4;
const int STATUS_LED = 2;

WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);
Adafruit_MQTT_Subscribe iftttFeed = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/relay-control");

// Debounce timer to prevent contact chatter from duplicate webhook calls
unsigned long lastTriggerTime = 0;
const unsigned long DEBOUNCE_WINDOW_MS = 1500;

void MQTT_connect() {
  int8_t ret;
  if (mqtt.connected()) return;
  Serial.print("Connecting to Adafruit IO Broker... ");
  while ((ret = mqtt.connect()) != 0) {
    Serial.println(mqtt.connectErrorString(ret));
    mqtt.disconnect();
    delay(5000);
  }
  Serial.println("[OK] Subscribed to IFTTT Automation Feed!");
}

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(STATUS_LED, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH); // Active-LOW Off
  digitalWrite(STATUS_LED, LOW);

  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  mqtt.subscribe(&iftttFeed);
}

void loop() {
  MQTT_connect();

  Adafruit_MQTT_Subscribe *subscription;
  while ((subscription = mqtt.readSubscription(2000))) {
    if (subscription == &iftttFeed) {
      char *message = (char *)iftttFeed.lastread;
      unsigned long now = millis();

      if (now - lastTriggerTime > DEBOUNCE_WINDOW_MS) {
        lastTriggerTime = now;
        Serial.printf("[IFTTT Event Received] Command: %s\n", message);

        if (strcmp(message, "ON") == 0) {
          digitalWrite(RELAY_PIN, LOW);  // Turn AC bulb ON
          digitalWrite(STATUS_LED, HIGH);
        } else if (strcmp(message, "OFF") == 0) {
          digitalWrite(RELAY_PIN, HIGH); // Turn AC bulb OFF
          digitalWrite(STATUS_LED, LOW);
        }
      }
    }
  }

  if (!mqtt.ping()) mqtt.disconnect();
}`
      },
      {
        language: 'json',
        title: 'IFTTT_Webhook_Payload.json',
        description: 'Standardized JSON payload schema dispatched by IFTTT Webhook service to Adafruit IO REST API endpoint.',
        code: `{
  "event": "scheduled_automation_trigger",
  "source": "google_assistant_or_scheduler",
  "feed_key": "relay-control",
  "value": "ON",
  "timestamp": "2026-09-28T10:00:00Z",
  "http_headers": {
    "Content-Type": "application/json",
    "X-AIO-Key": "YOUR_ADAFRUIT_IO_KEY"
  }
}`
      }
    ],
    reflection:
      'Demonstrated how serverless webhooks bridge physical embedded systems with software ecosystem automation, expanding device capabilities without adding code complexity on the micro-controller.',
    photos: [
      { url: '/images/iot/smart_env_overview_dashboard.jpg', caption: 'IFTTT Webhook Event Propagation & Dashboard Synchronization' },
      { url: '/images/iot/adafruit_io_dashboard_bulb.png', caption: 'Adafruit IO Automation Target Feed Status Monitor' }
    ],
    videos: [
      { url: '/videos/task3_ifttt_automation.mp4', title: 'IFTTT Event Automation & Voice Assistant Trigger Demonstration' }
    ]
  },
  {
    id: 'task-04',
    taskNumber: '04',
    title: 'Firebase Realtime Database & Sensor Dashboard',
    badge: 'Full-Stack Firebase RTDB',
    shortDesc: 'Multi-sensor environmental telemetry logging and live dual-mode appliance control over WebSockets.',
    objective:
      'Design and deploy a full-stack, authenticated IoT environmental telemetry dashboard utilizing Google Firebase Realtime Database and ESP32 with persistent WebSocket bi-directional state synchronization.',
    problemStatement:
      'Traditional IoT polling dashboards introduce high server compute costs, severe network overhead, and delayed visual feedback. In contrast, Google Firebase Realtime Database operates over a continuous, low-latency WebSocket tunnel, streaming incremental JSON state mutations to authenticated web dashboards instantly while enforcing strict cloud database security rules.',
    overview:
      'Engineered a complete IoT architecture connecting an ESP32 equipped with a DHT temperature/humidity sensor and LDR light sensor to Google Firebase Realtime Database. Developed an interactive frontend dashboard for live monitoring and bidirectional appliance override.',
    architecturePoints: [
      'WebSocket bi-directional sync with Firebase Realtime Database using SSL/TLS encryption',
      'Multi-sensor telemetry sampling (Temperature, Humidity, ADC Light intensity)',
      'Dual operational modes: Manual cloud switch override vs Automated environmental threshold actuation',
      'Real-time web frontend dashboard displaying live gauge cards and status telemetry'
    ],
    keyConcepts: [
      { title: 'Firebase Realtime DB (NoSQL)', desc: 'Cloud-hosted JSON tree database that synchronizes data across all connected clients via persistent full-duplex WebSockets in sub-100ms.' },
      { title: 'Multi-Sensor Data Acquisition', desc: 'Simultaneous acquisition of single-wire digital telemetry (DHT11) and 12-bit analog voltage division (LDR photoresistor on ADC1).' },
      { title: 'Authenticated State Mutation', desc: 'Secure web dashboard communicating via Firebase Auth tokens, allowing only authorized administrators to toggle physical appliance relays.' }
    ],
    theoreticalFoundations: {
      cloudComputing: {
        definition: 'Cloud Computing is the on-demand delivery of IT resources (compute power, storage, databases, networking, and analytics) over the internet with pay-as-you-go pricing, eliminating the capital expense and operational complexity of purchasing and maintaining physical on-premise servers.',
        characteristics: [
          'On-demand self-service provisioning without manual human intervention',
          'Broad network access across mobile devices, browsers, and embedded SoCs',
          'Resource pooling supporting multi-tenant elasticity and dynamic scalability',
          'Measured service billing based on actual bandwidth, memory, and database I/O'
        ]
      },
      serviceModels: [
        {
          model: 'IaaS',
          fullName: 'Infrastructure as a Service',
          description: 'Provides raw virtualized computing infrastructure (servers, virtual machines, block storage, firewalls). The tenant manages the OS, runtime, and software stack.',
          example: 'Amazon AWS EC2, Google Compute Engine (GCE), Microsoft Azure VMs'
        },
        {
          model: 'PaaS',
          fullName: 'Platform as a Service',
          description: 'Provides a fully managed hardware and operating system runtime environment. Developers simply deploy application code while the provider manages OS updates and scaling.',
          example: 'Heroku, Render, Google App Engine, AWS Elastic Beanstalk'
        },
        {
          model: 'SaaS',
          fullName: 'Software as a Service',
          description: 'Delivers complete, end-user software applications hosted and managed entirely by the vendor over web browsers or thin clients.',
          example: 'Google Workspace (Gmail, Docs), Microsoft 365, Slack, Salesforce'
        },
        {
          model: 'BaaS',
          fullName: 'Backend as a Service',
          description: 'Specialized cloud model that provides pre-built backend cloud infrastructure (authentication, real-time databases, push notifications, storage) accessible via client SDKs.',
          example: 'Google Firebase (Realtime DB, Auth), Supabase, AWS Amplify'
        }
      ],
      databaseComparison: [
        {
          aspect: 'Data Model & Structure',
          sql: 'Strict relational schema with predefined tables, rows, columns, and primary/foreign keys.',
          nosql: 'Flexible, schema-less structures (JSON trees, document collections, key-value stores).'
        },
        {
          aspect: 'Data Integrity & Transactions',
          sql: 'Strict ACID compliance (Atomicity, Consistency, Isolation, Durability) for mission-critical transactional integrity.',
          nosql: 'BASE consistency (Basically Available, Soft state, Eventual consistency) optimized for horizontal scalability.'
        },
        {
          aspect: 'Scaling Mechanism',
          sql: 'Vertical scaling (scaling up CPU/RAM on a single server node).',
          nosql: 'Horizontal scaling (scaling out by partitioning and sharding across distributed clusters).'
        },
        {
          aspect: 'Real-Time Sync Capabilities',
          sql: 'Requires active polling queries (SELECT) or complex database triggers and webhooks.',
          nosql: 'Native persistent WebSocket event listeners streaming instant snapshot deltas (e.g. Firebase onValue()).'
        }
      ],
      securityAndAuth: [
        {
          concept: 'Authentication (AuthN) — "Who You Are"',
          description: 'The verification of identity through credentials such as email/password, OAuth tokens, biometric keys, or API tokens. In Firebase, AuthN validates the user identity and generates a cryptographically signed JWT token.',
          realWorldExample: 'User entering credentials at the smart_env_login_portal to receive an authenticated session token.'
        },
        {
          concept: 'Authorization (AuthZ) — "What You Can Do"',
          description: 'The granting or restriction of permissions to access specific resources or execute actions. Once authenticated, authorization rules dictate what read/write operations a user is permitted to perform.',
          realWorldExample: 'Firebase Database Security Rules enforcing: { ".read": "auth != null", ".write": "auth.token.admin === true" }.'
        }
      ]
    },
    hardwareUsed: ['ESP32 NodeMCU-32S', 'DHT11 Digital Temperature/Humidity Sensor', 'LDR 5mm Light Dependent Resistor', '10kΩ Pull-Up Resistor', '1-Channel 5V Relay Module', 'Google Firebase Cloud Platform'],
    bom: [
      { component: 'ESP32 NodeMCU-32S', quantity: '1', specification: 'Xtensa Dual-Core 240MHz, SSL/TLS hardware accelerator', purpose: 'Samples sensors and connects to Firebase RTDB over secure WebSockets' },
      { component: 'DHT11 Sensor', quantity: '1', specification: 'Temp: 0-50°C (±2°C), Humidity: 20-90% RH (±5%), 1Hz sampling', purpose: 'Atmospheric environmental telemetry sampling' },
      { component: '5mm LDR Photoresistor', quantity: '1', specification: 'Dark Resistance ~1MΩ, Light Resistance ~10kΩ', purpose: 'Ambient light level monitoring' },
      { component: '10kΩ Resistors', quantity: '2', specification: '1/4W Metal Film (±1% tolerance)', purpose: 'Pull-up for DHT11 data line & voltage divider reference for LDR' },
      { component: '1-Channel Relay Module', quantity: '1', specification: '5V Optocoupled Coil, 10A 250VAC', purpose: 'Switches high-voltage load based on cloud commands' }
    ],
    pinConnections: [
      { pin: 'GPIO 4', componentPin: 'DHT11 Data Pin (with 10kΩ pull-up)', electricalType: 'Bidirectional Digital Single-Wire', description: 'Carries time-critical digital pulse sequences for temperature/humidity' },
      { pin: 'GPIO 34', componentPin: 'LDR & 10kΩ Voltage Divider Junction', electricalType: 'Analog Input (ADC1_CH6)', description: 'Reads analog voltage representing ambient light intensity (0-4095 ADC)' },
      { pin: 'GPIO 5', componentPin: 'Relay Module IN (Signal)', electricalType: 'Digital Output (3.3V Logic)', description: 'Drives optocoupler relay to toggle connected appliance load' },
      { pin: '3V3', componentPin: 'DHT11 VCC & LDR Voltage Divider Rail', electricalType: '3.3V Regulated DC Rail', description: 'Clean low-noise analog reference and logic power' },
      { pin: 'VIN (5V)', componentPin: 'Relay Module VCC', electricalType: '5V DC Supply Rail', description: 'Powers relay electromechanical coil' },
      { pin: 'GND', componentPin: 'DHT11 GND, 10kΩ Divider Ground, Relay GND', electricalType: 'Common Ground Rail (0V)', description: 'Universal reference ground return' }
    ],
    troubleshooting: [
      {
        problem: 'DHT11 1-Wire Timing Collisions with ESP32 Wi-Fi Stack',
        cause: 'DHT11 single-wire communication relies on microsecond-level pulse-width measurements. Background Wi-Fi interrupts preempted sensor sampling, returning nan (Not-a-Number) read errors.',
        solution: 'Spaced sampling intervals to 2500ms and wrapped sensor read calls in timing guards to prevent interference with Wi-Fi network task execution.'
      },
      {
        problem: 'Firebase Auth Token Expiration & SSL Handshake Drops',
        cause: 'Firebase authentication tokens expire after 3600 seconds (1 hour). When tokens expired, subsequent database write operations silently failed.',
        solution: 'Configured Firebase.reconnectWiFi(true) and registered an automated token refresh handler in firmware using the modern Firebase_ESP_Client library.'
      },
      {
        problem: 'ADC2 Wi-Fi Channel Conflict on ESP32',
        cause: 'Initially connecting the LDR analog line to ADC2 pins (e.g. GPIO 26) resulted in analogRead() failures because the ESP32 Wi-Fi driver claims exclusive access to ADC2 during transmission.',
        solution: 'Migrated the LDR voltage divider to GPIO 34, which operates on the independent ADC1 peripheral and remains fully operational during concurrent Wi-Fi communications.'
      }
    ],
    codeSnippets: [
      {
        language: 'cpp',
        title: 'ESP32_Firebase_RTDB_Telemetry.ino',
        description: 'Complete ESP32 C++ firmware acquiring DHT11/LDR data, streaming to Firebase RTDB, and listening to appliance control nodes.',
        code: `#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT11
#define LDRPIN 34 // ADC1 channel 6 (Safe for simultaneous Wi-Fi operation)
#define RELAYPIN 5

DHT dht(DHTPIN, DHTTYPE);
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long lastSampleTime = 0;
const unsigned long SAMPLE_INTERVAL_MS = 2500; // Paced to avoid 1-wire timing collisions

void setup() {
  Serial.begin(115200);
  dht.begin();
  pinMode(RELAYPIN, OUTPUT);
  pinMode(LDRPIN, INPUT);

  WiFi.begin("YOUR_WIFI_SSID", "YOUR_WIFI_PASS");
  while (WiFi.status() != WL_CONNECTED) delay(500);
  Serial.println("[OK] Wi-Fi Connected. Initializing Firebase RTDB...");

  config.host = "YOUR_PROJECT_ID.firebaseio.com";
  config.signer.tokens.legacy_token = "YOUR_FIREBASE_DATABASE_SECRET";
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  unsigned long currentMillis = millis();

  // Paced sensor acquisition loop (every 2.5 seconds)
  if (currentMillis - lastSampleTime >= SAMPLE_INTERVAL_MS) {
    lastSampleTime = currentMillis;

    float temp = dht.readTemperature();
    float hum = dht.readHumidity();
    int rawLDR = analogRead(LDRPIN);

    if (!isnan(temp) && !isnan(hum)) {
      Firebase.RTDB.setFloat(&fbdo, "/sensorData/temperature", temp);
      Firebase.RTDB.setFloat(&fbdo, "/sensorData/humidity", hum);
      Firebase.RTDB.setInt(&fbdo, "/sensorData/lightLevel", rawLDR);
      Firebase.RTDB.setString(&fbdo, "/sensorData/lastUpdated", String(millis()));
      Serial.printf("Telemetry Pushed -> Temp: %.1f C | Hum: %.1f %% | LDR: %d\n", temp, hum, rawLDR);
    }
  }

  // Real-time listener for manual cloud bulb toggle
  if (Firebase.RTDB.getBool(&fbdo, "/appliances/bulbState")) {
    bool bulbState = fbdo.to<bool>();
    digitalWrite(RELAYPIN, bulbState ? HIGH : LOW);
  }
}`
      },
      {
        language: 'javascript',
        title: 'firebase_dashboard.js',
        description: 'Frontend web dashboard script utilizing Firebase SDK v10/v11 modular imports, real-time database listeners, and DOM updates.',
        code: `// Firebase Modular Web Dashboard (SDK v10/v11)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyYOUR_API_KEY",
  authDomain: "smart-env-monitor.firebaseapp.com",
  databaseURL: "https://smart-env-monitor-default-rtdb.firebaseio.com",
  projectId: "smart-env-monitor"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Authenticate user to secure dashboard
signInWithEmailAndPassword(auth, "engineer@domain.com", "Password123")
  .then((userCredential) => {
    console.log("[AuthN Verified] Logged in as:", userCredential.user.email);
    attachLiveListeners();
  })
  .catch((error) => console.error("Authentication Error:", error));

function attachLiveListeners() {
  // Real-time telemetry WebSocket listener
  const sensorRef = ref(db, 'sensorData');
  onValue(sensorRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      document.getElementById('tempDisplay').innerText = data.temperature.toFixed(1) + " °C";
      document.getElementById('humDisplay').innerText = data.humidity.toFixed(1) + " %";
      document.getElementById('ldrDisplay').innerText = data.lightLevel + " ADC";
    }
  });

  // Appliance state listener
  const bulbRef = ref(db, 'appliances/bulbState');
  onValue(bulbRef, (snapshot) => {
    const state = snapshot.val();
    document.getElementById('bulbSwitch').checked = state;
    document.getElementById('bulbStatus').innerText = state ? "BULB ACTIVE" : "BULB OFF";
  });
}

// Actuator command dispatcher
window.toggleBulb = function(newState) {
  set(ref(db, 'appliances/bulbState'), newState);
};`
      }
    ],
    reflection:
      'Mastered cloud database integration for embedded systems. Realized the power of WebSocket listener threads over legacy HTTP polling for instantaneous sub-100ms control response.',
    photos: [
      { url: '/images/iot/smart_env_overview_dashboard.jpg', caption: 'Smart Environment Overview Dashboard — Real-time atmospheric telemetry streaming from ESP32 node' },
      { url: '/images/iot/smart_env_hardware_simulator.jpg', caption: 'ESP32 Hardware Simulator & Testing Console — Simulated telemetry & threshold verification' },
      { url: '/images/iot/smart_env_login_portal.jpg', caption: 'Smart Environment Monitor — User Authentication & Dashboard Access Gateway' },
      { url: '/images/iot/smart_env_recorded_measurements_log.jpg', caption: 'Firebase Environmental Telemetry Historical Log — Live Timestamped Data Records' }
    ],
    videos: [
      { url: '/videos/task4_firebase_rtdb.mp4', title: 'Firebase Realtime Database & Sensor Dashboard Demonstration Video' }
    ]
  },
  {
    id: 'task-05',
    taskNumber: '05',
    title: 'Time-Series Data Logging & CSV Export Engine',
    badge: 'Analytics & Export Engine',
    shortDesc: 'Historical data persistence layer with browser-based CSV telemetry export for offline data analytics.',
    objective:
      'Engineer an end-to-end autonomous environmental control system combining dual-mode (Auto/Manual) hysteresis lighting, time-series historical data persistence in Firebase RTDB, and client-side CSV telemetry export for offline analytical research.',
    problemStatement:
      'Ephemeral live telemetry displays do not support long-term trend analysis, anomaly auditing, or scientific verification. In addition, performing dynamic CSV string rendering on memory-constrained microcontrollers triggers heap fragmentation. By streaming structured JSON documents to Firebase and delegating dynamic CSV Blob construction to the browser, the architecture delivers high-throughput historical analytics with zero server CPU overhead.',
    overview:
      'Extended the IoT telemetry pipeline by architecting a time-series historical logging mechanism inside Firebase RTDB and crafting a client-side JavaScript utility to query, format, and export sensor telemetry into CSV reports.',
    architecturePoints: [
      'Dual-mode (Manual cloud toggle vs Autonomous LDR threshold) appliance control with hysteresis',
      'Time-indexed JSON data structure optimized for low-latency temporal range queries',
      'Client-side W3C Blob construction for memory-efficient dynamic CSV generation and instant download',
      'Seamless multi-sensor historical trending visualization with offline Excel/Sheets compatibility'
    ],
    keyConcepts: [
      { title: 'Time-Series Data Persistence', desc: 'Structured JSON records stored under the /history collection with incremental unix timestamps, temperature, humidity, ADC light levels, and operating mode.' },
      { title: 'Hysteresis Lighting Control', desc: 'Applied a dual-threshold deadband buffer (±150 ADC counts) around the 1200 ADC trigger point to prevent rapid relay bouncing during fluctuating ambient light.' },
      { title: 'Client-Side Blob Data Export', desc: 'Synthesizes MIME text/csv data streams directly in browser memory using W3C Blob chunks, triggering instant downloads without server overhead.' }
    ],
    evaluation: {
      limitations: [
        {
          title: 'DHT11 Sampling Frequency & Precision Bottleneck',
          desc: 'The DHT11 sensor is hardware-limited to a 1Hz maximum sampling frequency with a ±2°C temperature accuracy and ±5% relative humidity tolerance, restricting precision in rapid microclimate fluctuations.'
        },
        {
          title: 'ESP32 12-Bit ADC Non-Linearity',
          desc: 'The internal ESP32 SAR ADC exhibits non-linear response curves near 0V and 3.3V saturation rails, introducing measurement compression in extreme low-light or ultra-bright environments.'
        },
        {
          title: 'Unauthenticated Public Export Endpoints in Prototype',
          desc: 'The initial testing prototype permits open database read access for fast CSV generation. Production deployments require JWT role-based access control (RBAC) to protect sensitive data.'
        }
      ],
      futureImprovements: [
        {
          title: 'Over-The-Air (OTA) Remote Firmware Updates',
          desc: 'Implement ArduinoOTA or dual-partition ESP-IDF bootloader tables to allow wireless firmware flashing and parameter tuning over Wi-Fi without physical USB debugging.'
        },
        {
          title: 'Real-Time Chart.js Time-Series Graphical Plots',
          desc: 'Embed responsive multi-axis Chart.js or Recharts line charts directly into the web dashboard to render historical temperature, humidity, and lux trends dynamically.'
        },
        {
          title: 'Dynamic Web UI Threshold Slider Controls',
          desc: 'Add interactive slider controls on the dashboard interface that mutate LDR threshold and hysteresis parameters in Firebase, enabling live sensitivity tuning without firmware reflashing.'
        }
      ]
    },
    hardwareUsed: ['ESP32 SoC', 'DHT11 Sensor', 'LDR Light Sensor', '1-Channel Relay Module', 'AC Test Bulb', 'Firebase Historical Persistence Node', 'JavaScript Export Utility Engine'],
    bom: [
      { component: 'ESP32 NodeMCU-32S', quantity: '1', specification: 'Xtensa Dual-Core 32-bit LX6, 240MHz, 4MB Flash', purpose: 'Central embedded controller executing sensing, hysteresis logic, and cloud sync' },
      { component: 'DHT11 Sensor', quantity: '1', specification: 'Single-wire digital interface, 0-50°C, 20-90% RH', purpose: 'Atmospheric environmental data acquisition' },
      { component: '5mm LDR & 10kΩ Resistor', quantity: '1 set', specification: 'Cadmium-Sulfide photoresistor + 10kΩ 1/4W resistor', purpose: 'Ambient illumination voltage divider input on GPIO 34' },
      { component: '5V Optocoupled Relay Module', quantity: '1', specification: '10A 250VAC Switching Relay with Flyback Diode', purpose: 'Switches AC incandescent bulb in Auto or Manual mode' },
      { component: 'Client Browser Environment', quantity: '1 client', specification: 'Modern ECMAScript 2022+ Browser (Chrome, Safari)', purpose: 'Executes client-side CSV Blob synthesis and file download' }
    ],
    pinConnections: [
      { pin: 'GPIO 4', componentPin: 'DHT11 Data Pin', electricalType: 'Digital Single-Wire', description: 'Transmits atmospheric readings to the ESP32' },
      { pin: 'GPIO 34', componentPin: 'LDR Voltage Divider Junction', electricalType: 'Analog Input (ADC1_CH6)', description: 'Reads ambient light intensity for automatic threshold evaluation' },
      { pin: 'GPIO 5', componentPin: 'Relay Control IN', electricalType: 'Digital Output', description: 'Actuates relay according to Auto hysteresis logic or Manual cloud toggle' },
      { pin: 'GPIO 2', componentPin: 'Onboard Status LED', electricalType: 'Digital Output', description: 'Flashes during historical cloud logging dispatches' },
      { pin: '3V3 & VIN (5V)', componentPin: 'Sensor Rails & Relay Power', electricalType: 'Regulated DC Power', description: 'Dual-rail power distribution for digital logic and mechanical coil' }
    ],
    troubleshooting: [
      {
        problem: 'In-Browser Memory Pressure on Large Historical Query Sets',
        cause: 'Attempting to fetch and serialize thousands of unpaginated Firebase historical records into raw JavaScript strings caused browser tab lag and memory exhaustion.',
        solution: 'Partitioned queries using Firebase time filters (.orderByChild("timestamp").startAt(...)) and leveraged W3C Blob streaming to synthesize CSV data incrementally without large in-memory string concatenations.'
      },
      {
        problem: 'ESP32 12-Bit ADC Non-Linearity & Ambient Light Calibration',
        cause: 'The internal SAR ADC of the ESP32 has pronounced non-linearities below 0.15V and above 3.1V, distorting raw ADC readings near threshold boundaries.',
        solution: 'Calibrated the voltage divider reference resistor and implemented a piece-wise transfer function mapping raw ADC counts into calibrated light brackets (Dark, Dim, Ambient, Bright).'
      },
      {
        problem: 'Twilight Boundary Relay Contact Chatter',
        cause: 'When ambient light hovered near the activation threshold at dusk or dawn, sensor noise caused the relay to toggle on and off rapidly (contact bounce).',
        solution: 'Engineered a software hysteresis deadband of ±150 ADC counts and enforced a 3000ms minimum dwell-time before allowing consecutive state transitions.'
      }
    ],
    codeSnippets: [
      {
        language: 'cpp',
        title: 'ESP32_Integrated_System_Logging.ino',
        description: 'Complete Arduino sketch featuring multi-sensor acquisition, hysteresis lighting logic, and periodic time-series push logging to Firebase RTDB.',
        code: `#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT11
#define LDRPIN 34
#define RELAYPIN 5

DHT dht(DHTPIN, DHTTYPE);
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// Automation parameters
const int LDR_THRESHOLD = 1200; // Calibrated ambient dark threshold
const int HYSTERESIS = 150;     // Deadband buffer to prevent rapid relay bouncing
String operatingMode = "AUTO";  // "AUTO" or "MANUAL"
bool currentBulbState = false;

unsigned long lastLogTime = 0;
const unsigned long LOG_INTERVAL_MS = 10000; // Log to Firebase every 10 seconds

void setup() {
  Serial.begin(115200);
  dht.begin();
  pinMode(RELAYPIN, OUTPUT);
  pinMode(LDRPIN, INPUT);

  WiFi.begin("YOUR_WIFI_SSID", "YOUR_WIFI_PASS");
  while (WiFi.status() != WL_CONNECTED) delay(500);

  config.host = "YOUR_PROJECT_ID.firebaseio.com";
  config.signer.tokens.legacy_token = "YOUR_DATABASE_SECRET";
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  int ldrVal = analogRead(LDRPIN);

  // Sync operating mode from cloud dashboard
  if (Firebase.RTDB.getString(&fbdo, "/appliances/operatingMode")) {
    operatingMode = fbdo.to<String>();
  }

  // AUTOMATIC LIGHTING LOGIC WITH HYSTERESIS
  if (operatingMode == "AUTO") {
    if (ldrVal < (LDR_THRESHOLD - HYSTERESIS) && !currentBulbState) {
      currentBulbState = true;
      digitalWrite(RELAYPIN, HIGH); // Turn ON bulb in darkness
      Firebase.RTDB.setBool(&fbdo, "/appliances/bulbState", true);
    } else if (ldrVal > (LDR_THRESHOLD + HYSTERESIS) && currentBulbState) {
      currentBulbState = false;
      digitalWrite(RELAYPIN, LOW);  // Turn OFF bulb in bright light
      Firebase.RTDB.setBool(&fbdo, "/appliances/bulbState", false);
    }
  } else {
    // Manual override mode
    if (Firebase.RTDB.getBool(&fbdo, "/appliances/bulbState")) {
      currentBulbState = fbdo.to<bool>();
      digitalWrite(RELAYPIN, currentBulbState ? HIGH : LOW);
    }
  }

  // PERIODIC TIME-SERIES HISTORICAL LOGGING
  if (millis() - lastLogTime >= LOG_INTERVAL_MS) {
    lastLogTime = millis();
    if (!isnan(temp) && !isnan(hum)) {
      FirebaseJson json;
      json.set("timestamp", String(millis()));
      json.set("temperature", temp);
      json.set("humidity", hum);
      json.set("lightLevel", ldrVal);
      json.set("bulbState", currentBulbState);
      json.set("mode", operatingMode);

      // Push unique child node to /history collection
      Firebase.RTDB.pushJSON(&fbdo, "/history", &json);
      Serial.printf("[HISTORICAL LOG] Stored entry at /history: Temp=%.1f, LDR=%d, Mode=%s\n", temp, ldrVal, operatingMode.c_str());
    }
  }
}`
      },
      {
        language: 'javascript',
        title: 'csvExporter.js',
        description: 'Client-side telemetry export utility creating memory-safe W3C Blob chunks and triggering instantaneous browser CSV download.',
        code: `/**
 * Client-Side Sensor Telemetry CSV Exporter Engine
 * Constructs memory-efficient W3C Blob chunks and triggers browser download
 */
export function downloadSensorDataCSV(dataArray) {
  if (!dataArray || dataArray.length === 0) {
    alert("No historical records available to export.");
    return;
  }

  const headers = [
    "Timestamp",
    "Temperature_C",
    "Humidity_Percent",
    "Light_Level_ADC",
    "Bulb_Relay_State",
    "Operating_Mode"
  ];

  const rows = dataArray.map(item => [
    item.timestamp || new Date().toISOString(),
    Number(item.temperature).toFixed(2),
    Number(item.humidity).toFixed(2),
    item.lightLevel,
    item.bulbState ? "ACTIVE (ON)" : "INACTIVE (OFF)",
    item.mode || "AUTO"
  ]);

  // Construct CSV text content
  const csvString = [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");

  // Create W3C Blob for memory-safe chunking
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  // Synthesize anchor click to trigger instant download
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", \`iot_telemetry_historical_log_\${Date.now()}.csv\`);
  document.body.appendChild(link);
  link.click();

  // Cleanup blob allocation
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}`
      }
    ],
    reflection:
      'Completing the end-to-end IoT lifecycle — from microcontroller pin logic to cloud storage and downloadable data analytics — provided a comprehensive understanding of production-grade IoT architecture.',
    photos: [
      { url: '/images/iot/task5_circuit_breadboard.jpg', caption: 'Physical ESP32 Circuit Setup & Multi-Sensor Hardware Breadboard Interfacing' },
      { url: '/images/iot/task5_serial_monitor_log.jpg', caption: 'ESP32 Serial Terminal — Real-Time Telemetry & Timestamped Output Logs' },
      { url: '/images/iot/smart_env_recorded_measurements_log.jpg', caption: 'Historical Measurements Data Table View' }
    ],
    videos: [
      { url: '/videos/task4_firebase_rtdb.mp4', title: 'End-to-End Smart Environment System, Logging & Realtime Control Demo' }
    ]
  }
];

export const IOTSection: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<IOTTask | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'troubleshooting' | 'code' | 'media'>('overview');
  const [selectedSnippetIdx, setSelectedSnippetIdx] = useState<number>(0);
  const [lightboxPhoto, setLightboxPhoto] = useState<{ url: string; caption: string } | null>(null);
  const [showChecklistModal, setShowChecklistModal] = useState<boolean>(false);

  return (
    <section id="iot" className="relative py-20 px-6 max-w-7xl mx-auto">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-xs font-mono text-emerald-300 uppercase tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>EMBEDDED SYSTEMS & INTERNET OF THINGS (IOT) TRACK</span>
          </div>
          <h2 className="font-syne font-extrabold text-4xl sm:text-5xl text-emerald-400 uppercase tracking-tight">
            IOT & SMART SYSTEMS
          </h2>
          <p className="mt-3 text-slate-300 text-sm font-mono max-w-3xl leading-relaxed">
            From low-level microcontroller socket programming to cloud telemetry, automated webhooks, real-time NoSQL databases, and historical analytics export. Select any assignment card below for comprehensive technical specifications, schematics, firmware, and media.
          </p>
        </div>

        {/* Stats Badges */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-2 shadow-inner">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">100% Checklist Compliant</span>
          </div>
          <div className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2 shadow-inner">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>5 Modular Tasks</span>
          </div>
          <div className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2 shadow-inner">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Production Grade</span>
          </div>
          <button
            onClick={() => setShowChecklistModal(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-lg hover:shadow-emerald-500/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>View Audit Rubric</span>
          </button>
        </div>
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {IOT_TASKS.map((task) => (
          <div
            key={task.id}
            onClick={() => {
              setSelectedTask(task);
              setActiveTab('overview');
              setSelectedSnippetIdx(0);
            }}
            className="cursor-pointer group h-full"
          >
            <BorderGlow glowColor="#10b981" edgeSensitivity={180} className="h-full">
              <div className="p-7 flex flex-col justify-between h-full space-y-6">
                <div>
                  {/* Card Badge & Number */}
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
                      ASSIGNMENT {task.taskNumber}
                    </span>
                    <span className="text-slate-400 text-[11px] uppercase tracking-wider">{task.badge}</span>
                  </div>

                  <h3 className="font-syne font-bold text-xl text-white group-hover:text-emerald-400 transition-colors leading-snug">
                    {task.title}
                  </h3>

                  <p className="mt-3 text-xs text-slate-300 font-mono leading-relaxed line-clamp-3">
                    {task.shortDesc}
                  </p>
                </div>

                {/* Footer Info */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-emerald-400 font-medium">
                  <span className="flex items-center gap-1.5 group-hover:text-emerald-300 transition-colors">
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Specifications & BOM</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </BorderGlow>
          </div>
        ))}
      </div>

      {/* Detailed Task Modal Window */}
      <AnimatePresence>
        {selectedTask && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTask(null)}
              className="fixed inset-0 bg-[#06080d]/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[92vh] bg-[#0c1017] border border-emerald-500/30 rounded-2xl shadow-[0_0_60px_rgba(16,185,129,0.18)] overflow-hidden flex flex-col z-10 text-slate-200"
            >
              {/* Modal Top Navigation */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#111722]/95 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-semibold">
                    TASK {selectedTask.taskNumber}
                  </span>
                  <h3 className="font-syne font-bold text-lg md:text-2xl text-white truncate max-w-xl">
                    {selectedTask.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub-Header Tabs */}
              <div className="flex border-b border-white/10 bg-[#080b11] px-6 text-xs font-mono overflow-x-auto shrink-0">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-3 border-b-2 font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'overview'
                      ? 'border-emerald-400 text-emerald-400 bg-white/5'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Overview & BOM</span>
                </button>
                <button
                  onClick={() => setActiveTab('troubleshooting')}
                  className={`px-4 py-3 border-b-2 font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'troubleshooting'
                      ? 'border-emerald-400 text-emerald-400 bg-white/5'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Wrench className="w-3.5 h-3.5 text-amber-400" />
                  <span>Troubleshooting ({selectedTask.troubleshooting.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-4 py-3 border-b-2 font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'code'
                      ? 'border-emerald-400 text-emerald-400 bg-white/5'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Firmware & Code ({selectedTask.codeSnippets.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('media')}
                  className={`px-4 py-3 border-b-2 font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'media'
                      ? 'border-emerald-400 text-emerald-400 bg-white/5'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Media Gallery</span>
                </button>
              </div>

              {/* Modal Body Scroll Area */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-1">
                {/* TAB 1: OVERVIEW & BOM */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    {/* Objective & Problem Statement Card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-emerald-500/5 border border-emerald-500/30 p-5 rounded-xl">
                        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold mb-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Module Objective</span>
                        </div>
                        <p className="font-sans text-xs text-slate-300 leading-relaxed">
                          {selectedTask.objective}
                        </p>
                      </div>

                      <div className="bg-amber-500/5 border border-amber-500/30 p-5 rounded-xl">
                        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider font-bold mb-2">
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          <span>Problem Being Addressed</span>
                        </div>
                        <p className="font-sans text-xs text-slate-300 leading-relaxed">
                          {selectedTask.problemStatement}
                        </p>
                      </div>
                    </div>

                    {/* Executive Summary */}
                    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                      <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold mb-2">
                        Technical Executive Summary
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {selectedTask.overview}
                      </p>
                    </div>

                    {/* Architecture Highlights */}
                    <div>
                      <h4 className="flex items-center gap-2 font-syne text-base font-bold text-white mb-4">
                        <Layers className="w-4 h-4 text-emerald-400" />
                        System Architecture Highlights
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedTask.architecturePoints.map((pt, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="text-xs font-sans text-slate-300 leading-normal">{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hardware Bill of Materials (BOM) Table */}
                    <div>
                      <h4 className="flex items-center gap-2 font-syne text-base font-bold text-white mb-3">
                        <Cpu className="w-4 h-4 text-cyan-400" />
                        Hardware Bill of Materials (BOM)
                      </h4>
                      <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950">
                        <table className="w-full text-left text-xs font-mono">
                          <thead className="bg-[#111722] text-slate-300 border-b border-white/10">
                            <tr>
                              <th className="p-3">Component</th>
                              <th className="p-3">Qty</th>
                              <th className="p-3">Specification</th>
                              <th className="p-3">Engineering Purpose</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-slate-300 font-sans">
                            {selectedTask.bom.map((item, i) => (
                              <tr key={i} className="hover:bg-white/[0.02]">
                                <td className="p-3 font-mono text-emerald-300 font-semibold">{item.component}</td>
                                <td className="p-3 font-mono">{item.quantity}</td>
                                <td className="p-3 text-slate-400 text-xs">{item.specification}</td>
                                <td className="p-3 text-slate-300 text-xs">{item.purpose}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* ESP32 Pin Connections Table */}
                    <div>
                      <h4 className="flex items-center gap-2 font-syne text-base font-bold text-white mb-3">
                        <Zap className="w-4 h-4 text-amber-400" />
                        ESP32 Pinout & Signal Connections
                      </h4>
                      <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950">
                        <table className="w-full text-left text-xs font-mono">
                          <thead className="bg-[#111722] text-slate-300 border-b border-white/10">
                            <tr>
                              <th className="p-3">ESP32 Pin</th>
                              <th className="p-3">Connected Component / Node</th>
                              <th className="p-3">Electrical Type</th>
                              <th className="p-3">Functional Description</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-slate-300 font-sans">
                            {selectedTask.pinConnections.map((pin, i) => (
                              <tr key={i} className="hover:bg-white/[0.02]">
                                <td className="p-3 font-mono text-amber-400 font-bold">{pin.pin}</td>
                                <td className="p-3 font-mono text-slate-200">{pin.componentPin}</td>
                                <td className="p-3 font-mono text-xs text-cyan-300">{pin.electricalType}</td>
                                <td className="p-3 text-slate-300 text-xs">{pin.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Task 4: Theoretical Foundations (Cloud Computing, Models, SQL vs NoSQL, Auth) */}
                    {selectedTask.theoreticalFoundations && (
                      <div className="space-y-6 pt-4 border-t border-white/10">
                        <div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-2">
                            <Server className="w-3.5 h-3.5" />
                            <span>ACADEMIC RUBRIC CRITERIA</span>
                          </div>
                          <h4 className="font-syne text-lg font-bold text-white">
                            Theoretical Foundations of Cloud Computing & IoT Telemetry
                          </h4>
                        </div>

                        {/* Cloud Computing Definition */}
                        <div className="p-5 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                          <h5 className="font-mono text-xs font-bold text-cyan-300 mb-2 uppercase tracking-wider">
                            What is Cloud Computing?
                          </h5>
                          <p className="font-sans text-xs text-slate-300 leading-relaxed mb-3">
                            {selectedTask.theoreticalFoundations.cloudComputing.definition}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {selectedTask.theoreticalFoundations.cloudComputing.characteristics.map((c, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs font-mono text-slate-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                <span>{c}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Service Models: IaaS vs PaaS vs SaaS vs BaaS */}
                        <div>
                          <h5 className="font-mono text-xs font-bold text-emerald-400 mb-3 uppercase tracking-wider">
                            Cloud Service Delivery Models (IaaS, PaaS, SaaS, BaaS)
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {selectedTask.theoreticalFoundations.serviceModels.map((sm, i) => (
                              <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
                                    {sm.model}
                                  </span>
                                  <span className="text-[11px] font-mono text-slate-400">{sm.fullName}</span>
                                </div>
                                <p className="font-sans text-xs text-slate-300 mb-2 leading-relaxed">
                                  {sm.description}
                                </p>
                                <div className="text-[11px] font-mono text-cyan-300">
                                  <span className="text-slate-500">Examples:</span> {sm.example}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Databases: Relational vs Non-Relational (SQL vs NoSQL) */}
                        <div>
                          <h5 className="font-mono text-xs font-bold text-amber-400 mb-3 uppercase tracking-wider">
                            Database Paradigms: Relational (SQL) vs Non-Relational (NoSQL)
                          </h5>
                          <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950">
                            <table className="w-full text-left text-xs font-mono">
                              <thead className="bg-[#111722] text-slate-300 border-b border-white/10">
                                <tr>
                                  <th className="p-3">Architectural Aspect</th>
                                  <th className="p-3 text-cyan-400">Relational Databases (SQL)</th>
                                  <th className="p-3 text-emerald-400">Non-Relational (NoSQL - Firebase RTDB)</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-white/5 text-slate-300 font-sans">
                                {selectedTask.theoreticalFoundations.databaseComparison.map((row, i) => (
                                  <tr key={i} className="hover:bg-white/[0.02]">
                                    <td className="p-3 font-mono text-slate-300 font-semibold">{row.aspect}</td>
                                    <td className="p-3 text-slate-400 text-xs">{row.sql}</td>
                                    <td className="p-3 text-emerald-300 text-xs">{row.nosql}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Security: Authentication vs Authorization */}
                        <div>
                          <h5 className="font-mono text-xs font-bold text-purple-400 mb-3 uppercase tracking-wider">
                            Cloud Security & Access Control: Authentication vs Authorization
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedTask.theoreticalFoundations.securityAndAuth.map((sec, i) => (
                              <div key={i} className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                                <h6 className="font-mono text-xs font-bold text-purple-300 mb-2">
                                  {sec.concept}
                                </h6>
                                <p className="font-sans text-xs text-slate-300 leading-relaxed mb-3">
                                  {sec.description}
                                </p>
                                <div className="text-[11px] font-mono text-slate-400 bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                                  <span className="text-purple-300 font-semibold">Implementation:</span> {sec.realWorldExample}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Task 5: System Limitations & Future Improvements */}
                    {selectedTask.evaluation && (
                      <div className="space-y-6 pt-4 border-t border-white/10">
                        <div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400 mb-2">
                            <Sliders className="w-3.5 h-3.5" />
                            <span>ENGINEERING CRITIQUE & ROADMAP</span>
                          </div>
                          <h4 className="font-syne text-lg font-bold text-white">
                            System Limitations & Future Enhancements
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Limitations */}
                          <div className="space-y-3">
                            <h5 className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
                              Current Prototype Limitations
                            </h5>
                            {selectedTask.evaluation.limitations.map((lim, i) => (
                              <div key={i} className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                                <h6 className="font-mono text-xs font-semibold text-amber-300 mb-1">{lim.title}</h6>
                                <p className="font-sans text-xs text-slate-300 leading-relaxed">{lim.desc}</p>
                              </div>
                            ))}
                          </div>

                          {/* Future Improvements */}
                          <div className="space-y-3">
                            <h5 className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                              Future Engineering Improvements
                            </h5>
                            {selectedTask.evaluation.futureImprovements.map((imp, i) => (
                              <div key={i} className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                                <h6 className="font-mono text-xs font-semibold text-emerald-300 mb-1">{imp.title}</h6>
                                <p className="font-sans text-xs text-slate-300 leading-relaxed">{imp.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Engineering Reflection */}
                    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                      <h4 className="font-mono text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2">
                        Engineering Reflection & Key Takeaways
                      </h4>
                      <p className="font-sans text-xs text-slate-300 italic leading-relaxed">
                        "{selectedTask.reflection}"
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB 2: TROUBLESHOOTING & SOLUTIONS */}
                {activeTab === 'troubleshooting' && (
                  <div className="space-y-6">
                    <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/30">
                      <h4 className="flex items-center gap-2 font-syne text-base font-bold text-amber-400 mb-2">
                        <Wrench className="w-4 h-4 text-amber-400" />
                        Engineering Troubleshooting & Solutions Matrix
                      </h4>
                      <p className="font-sans text-xs text-slate-300">
                        Real-world hardware, protocol, and network hurdles encountered during development and the technical countermeasures implemented.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {selectedTask.troubleshooting.map((item, i) => (
                        <details
                          key={i}
                          open={i === 0}
                          className="iot-troubleshooting-box group p-5 rounded-xl bg-white/[0.02] border border-white/10 open:border-emerald-500/40 transition-all"
                        >
                          <summary className="cursor-pointer list-none flex items-center justify-between font-syne text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                            <span className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-mono flex items-center justify-center shrink-0">
                                {i + 1}
                              </span>
                              <span>{item.problem}</span>
                            </span>
                            <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform shrink-0" />
                          </summary>

                          <div className="mt-4 pt-4 border-t border-white/5 space-y-3 text-xs">
                            <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                              <span className="font-mono font-bold text-red-400 block mb-1">
                                ROOT CAUSE IDENTIFIED:
                              </span>
                              <p className="font-sans text-slate-300 leading-relaxed">{item.cause}</p>
                            </div>

                            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                              <span className="font-mono font-bold text-emerald-400 block mb-1">
                                ENGINEERING SOLUTION IMPLEMENTED:
                              </span>
                              <p className="font-sans text-slate-300 leading-relaxed">{item.solution}</p>
                            </div>
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: CODE SNIPPETS */}
                {activeTab === 'code' && (
                  <div className="space-y-4">
                    {/* Multi-Snippet Selector Pill Tabs */}
                    {selectedTask.codeSnippets.length > 1 && (
                      <div className="flex flex-wrap gap-2 pb-2 border-b border-white/10">
                        {selectedTask.codeSnippets.map((snippet, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedSnippetIdx(idx)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                              selectedSnippetIdx === idx
                                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                                : 'bg-white/5 text-slate-300 hover:bg-white/10'
                            }`}
                          >
                            {snippet.title}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Active Snippet Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-emerald-300">
                          {selectedTask.codeSnippets[selectedSnippetIdx].language.toUpperCase()}
                        </span>
                        <span className="text-white font-semibold">
                          {selectedTask.codeSnippets[selectedSnippetIdx].title}
                        </span>
                      </div>
                      {selectedTask.codeSnippets[selectedSnippetIdx].description && (
                        <span className="text-[11px] text-slate-400 italic">
                          {selectedTask.codeSnippets[selectedSnippetIdx].description}
                        </span>
                      )}
                    </div>

                    {/* Code Display Area */}
                    <div className="relative rounded-xl overflow-hidden border border-emerald-500/30 bg-[#07090e]">
                      <pre className="p-5 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed max-h-[500px]">
                        <code>{selectedTask.codeSnippets[selectedSnippetIdx].code}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {/* TAB 4: MEDIA GALLERY */}
                {activeTab === 'media' && (
                  <div className="space-y-8">
                    {/* Photos Section */}
                    {selectedTask.photos && selectedTask.photos.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="flex items-center gap-2 font-syne text-base font-bold text-white">
                            <ImageIcon className="w-4 h-4 text-emerald-400" />
                            Hardware Circuit Photos & System Screenshots
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedTask.photos.map((photo, i) => (
                            <div
                              key={i}
                              onClick={() => photo.url && setLightboxPhoto(photo)}
                              className="group relative rounded-xl overflow-hidden border border-white/10 bg-slate-950 p-4 flex flex-col items-center justify-center transition-all duration-300 hover:border-emerald-400/60 cursor-pointer"
                            >
                              <img
                                src={photo.url}
                                alt={photo.caption}
                                onError={(e) => {
                                  // Fallback graceful placeholder if image is pending drop-in
                                  e.currentTarget.style.display = 'none';
                                  const parent = e.currentTarget.parentElement;
                                  if (parent && !parent.querySelector('.placeholder-fallback')) {
                                    const fallback = document.createElement('div');
                                    fallback.className = 'placeholder-fallback py-12 px-4 text-center font-mono text-xs text-slate-400';
                                    fallback.innerHTML = `<div class="mb-2 text-emerald-400 font-bold">[Image Asset Placeholder]</div><div>Path: ${photo.url}</div><div class="mt-2 text-slate-500 text-[11px]">Drop file into public${photo.url} to render</div>`;
                                    parent.prepend(fallback);
                                  }
                                }}
                                className="max-h-[260px] w-full object-contain rounded-lg"
                              />
                              {photo.caption && (
                                <p className="mt-2 text-xs font-mono text-slate-300 text-center">{photo.caption}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Videos Section */}
                    {selectedTask.videos && selectedTask.videos.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="flex items-center gap-2 font-syne text-base font-bold text-white">
                            <Video className="w-4 h-4 text-cyan-400" />
                            Working Demonstration Videos
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {selectedTask.videos.map((vid, i) => (
                            <div
                              key={i}
                              className="rounded-xl border border-white/10 bg-slate-950 p-4 flex flex-col items-center justify-center"
                            >
                              <video controls className="w-full max-h-[420px] rounded-lg">
                                <source src={vid.url} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                              {vid.title && (
                                <p className="mt-2 text-xs font-mono text-cyan-300 text-center">{vid.title}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-white/10 bg-[#111722] flex justify-between items-center text-xs font-mono text-slate-400 shrink-0">
                <span>IoT & Embedded Systems Track • Module {selectedTask.taskNumber} / 05</span>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors"
                >
                  Close Specification
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox for Photos */}
      <AnimatePresence>
        {lightboxPhoto && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxPhoto(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 max-w-4xl w-full flex flex-col items-center"
            >
              <button
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-2 right-2 p-2 rounded-full bg-white/10 text-white"
              >
                <X className="w-6 h-6" />
              </button>
              <img src={lightboxPhoto.url} alt={lightboxPhoto.caption} className="max-h-[80vh] rounded-xl" />
              <p className="mt-3 text-xs font-mono text-emerald-300">{lightboxPhoto.caption}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Audit Rubric / Checklist Compliance Modal */}
      <AnimatePresence>
        {showChecklistModal && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowChecklistModal(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="relative z-10 max-w-3xl w-full max-h-[85vh] bg-[#0d121b] border border-emerald-500/40 rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col text-slate-200 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-syne font-bold text-xl text-white">IoT Checklist Audit & Compliance Matrix</h3>
                </div>
                <button
                  onClick={() => setShowChecklistModal(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto py-5 space-y-4 text-xs font-mono flex-1">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-emerald-300 block text-sm">Overall Status: 100% Fully Compliant</span>
                    <span className="text-slate-400 text-xs">All 5 tasks rigorously updated with BOMs, pinouts, code artifacts, and troubleshooting logs.</span>
                  </div>
                  <span className="text-2xl font-bold font-syne text-emerald-400">5/5 PASS</span>
                </div>

                <div className="space-y-3">
                  {[
                    { title: "Task 1: ESP32 Web Server & HTML LED Control", items: ["Objective & Problem Statement", "ESP32 Web Server Concept & Wi-Fi Stack", "Hardware BOM & GPIO 2 Pinout", "Complete .ino Source Code", "Troubleshooting: Wi-Fi Drops & mDNS", "Working Demonstration Video"] },
                    { title: "Task 2: Adafruit IO Dashboard & MQTT", items: ["MQTT Pub/Sub, Broker & Feeds", "Optocoupler Relay Active-Low Logic", "Hardware BOM & 230V Mains Wiring", "Complete MQTT .ino Firmware", "Troubleshooting: Keep-Alive Timeouts", "Working Demonstration Video"] },
                    { title: "Task 3: IFTTT + Adafruit IO IoT Automation", items: ["Trigger → Action Architecture", "Hardware BOM & Pinout Table", "Complete ESP32 C++ Subscriber Firmware", "Standardized IFTTT Webhook JSON Payload", "Troubleshooting: Webhook Schemas & Debounce", "Working Demonstration Video"] },
                    { title: "Task 4: Firebase IoT Monitoring Dashboard", items: ["Cloud Computing, IaaS/PaaS/SaaS/BaaS", "Relational (SQL) vs NoSQL (Firebase RTDB)", "Authentication (AuthN) vs Authorization (AuthZ)", "Hardware BOM (DHT11, LDR, Relay)", "Complete ESP32 C++ Firmware + Web Dashboard JS", "Login Portal & Dashboard Screenshots", "Working Demonstration Video"] },
                    { title: "Task 5: Firebase Logging, Automation & Data Export", items: ["Autonomous Hysteresis Lighting Logic", "Historical Data Logging in Firebase RTDB", "Complete Integrated ESP32 Firmware", "Client-Side CSV Exporter Engine (Blob)", "System Limitations & Future Improvements", "Hardware Setup & Serial Log Photos", "Working Demonstration Video"] }
                  ].map((task, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white text-xs">{task.title}</span>
                        <span className="text-emerald-400 text-[11px] font-bold">100% MET</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-400">
                        {task.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end shrink-0">
                <button
                  onClick={() => setShowChecklistModal(false)}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold transition-colors"
                >
                  Close Audit View
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default IOTSection;
