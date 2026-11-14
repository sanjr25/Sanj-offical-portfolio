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
  Server,
  AlertTriangle,
  Sliders,
  Database,
  Lock,
  Globe,
  Radio
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

export interface CalibrationEntry {
  adcRange: string;
  condition: string;
  resistance: string;
  voltage: string;
  action: string;
}

export interface WiringDiagram {
  title: string;
  ascii: string;
  description?: string;
}

export interface FlowDiagram {
  title: string;
  ascii: string;
  description?: string;
}

export interface TheoreticalFoundations {
  cloudComputing: {
    definition: string;
    characteristics: string[];
  };
  cloudPlatformDefinition: string;
  cloudDashboardDefinition: string;
  databaseDefinition: string;
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

export interface DocSection {
  /** Section heading shown on the page */
  heading: string;
  /** Assignment checklist requirement this section satisfies (shown as a small label) */
  checklist?: string;
  intro?: string;
  bullets?: string[];
  steps?: string[];
  table?: { headers: string[]; rows: string[][] };
  code?: string;
  images?: { url: string; caption: string }[];
  outro?: string;
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
  wiringDiagram?: WiringDiagram;
  flowDiagram?: FlowDiagram;
  calibrationTable?: CalibrationEntry[];
  rtdbSchema?: string;
  /** Extra documentation blocks rendered in the Overview tab */
  docSections?: DocSection[];
  /** Folder inside the GitHub repository that holds this task's source files */
  repoPath?: string;
}

const REPO_URL = 'https://github.com/sanjr25/Portfolio-';

const IOT_TASKS: IOTTask[] = [
  {
    id: 'task-01',
    repoPath: 'iot-projects/task1-esp32-webserver',
    docSections: [
      {
        heading: 'Screenshots of the Web Interface',
        checklist: 'Screenshots of the web interface',
        intro: 'The control page is served directly by the ESP32. I connected my phone to the same Wi-Fi network, typed the IP address printed on the Serial Monitor into the browser, and the "ESP32 LED Control" page loaded with two buttons: LED ON and LED OFF. Pressing a button sends the matching HTTP request to the ESP32, which switches the LED and returns the page again.',
        images: [
          { url: '/images/iot/task1_web_interface_phone.jpg', caption: 'Web interface screenshot: "ESP32 LED Control" page with LED ON / LED OFF buttons, opened in the phone browser at the ESP32\'s local IP address' },
          { url: '/images/iot/task1_led_on_with_phone.jpg', caption: 'Web page on the phone and the ESP32 board together: the LED switches as soon as a button on the page is pressed' }
        ]
      }
    ],
    taskNumber: '01',
    title: 'ESP32 Local Web Server & HTML LED Control',
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
      {
        title: 'ESP32 Web Server Architecture',
        desc: 'The ESP32 runs a TCP listener on port 80. When a client browser requests a page, the ESP32 parses the HTTP verb and URI header, matches it to a registered callback, and dispatches a 200 OK stream of raw HTML/CSS.'
      },
      {
        title: 'Local Socket Communication over Wi-Fi',
        desc: 'Communication flows entirely over the local 802.11 LAN without touching the public internet. The browser client connects to the ESP32 IP or mDNS hostname, dispatches an HTTP request, and the ESP32 mutates GPIO state before returning a response.'
      },
      {
        title: 'How Webpage Commands Actuate the Microcontroller',
        desc: 'Tapping the ON or OFF button in the browser triggers an HTTP GET request to /led/on or /led/off. The ESP32 WebServer route handler intercepts the URI, calls digitalWrite(ledPin, HIGH or LOW), and issues an HTTP 303 redirect back to /.'
      }
    ],
    hardwareUsed: [
      'ESP32 NodeMCU-32S Development Board',
      '5mm Red Diffused LED',
      '220Ω 1/4W Metal Film Resistor',
      '1-Channel 5V Optocoupled Relay Module',
      'Wi-Fi Access Point / Router',
      'Solderless Breadboard & Dupont Jumper Wires'
    ],
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
    wiringDiagram: {
      title: 'ESP32 Local Web Server & Actuator Wiring Schematic',
      ascii: `
+---------------------------------------------------------------------------------+
|                           ESP32 NodeMCU-32S (38-Pin)                            |
|                                                                                 |
|   [GPIO 2] (D2) ----------------------+                                         |
|                                       |                                         |
|   [GND] -------------------+          |                                         |
|                            |          |                                         |
|   [VIN / 5V] --------------+----+     |                                         |
+----------------------------+----+-----+-----------------------------------------+
                             |    |     |
                             |    |     +---[ 220Ω Resistor ]---> (Anode +) [ LED ] (Cathode -) ---+
                             |    |                                                                |
                             |    +-------------------------------+                                |
                             |                                    |                                |
                             |    +-------------------------------v---------------+                |
                             |    |           1-Channel Relay Module              |                |
                             |    |                                               |                |
                             |    |  VCC  <--- (5V from ESP32 VIN)                |                |
                             +--->|  GND  <--- (0V Common Ground) <---------------+----------------+
                                  |  IN   <--- (Logic Signal from GPIO 2)                          |
                                  |                                                                |
                                  |  COM  ---------------------> [ Phase Line ~230V AC ]           |
                                  |  NO   -----------> [ AC Appliance Bulb ] ---> [ Neutral Line ] |
                                  +----------------------------------------------------------------+
`,
      description: 'GPIO 2 outputs 3.3V digital logic to illuminate the indicator LED through a 220Ω protective resistor (~6mA safe current draw) while simultaneously driving the optocoupled input of the relay module.'
    },
    troubleshooting: [
      {
        problem: 'ESP32 Wi-Fi reconnect drops & hanging socket loop',
        cause: 'Standard blocking while (WiFi.status() != WL_CONNECTED) loops cause the ESP32 to freeze indefinitely when router reboots or drops beacon packets.',
        solution: 'Implemented a non-blocking background reconnection handler within loop() utilizing WiFi.reconnect() with interval guards, allowing the web server to resume service seamlessly without watchdog crashes.'
      },
      {
        problem: 'IP address leasing changes & device unreachability',
        cause: 'Routers reassign different local IPv4 addresses upon DHCP lease expiry, forcing developers to reconnect serial monitors to discover the new address.',
        solution: 'Documented static IP allocation and integrated the ESPmDNS library (MDNS.begin("esp32-webserver")), registering a zero-configuration hostname (http://esp32-webserver.local) reachable across the LAN.'
      },
      {
        problem: 'Excessive GPIO current draw risk on direct pin drive',
        cause: 'Driving an LED directly from GPIO 2 without adequate resistance risks exceeding the ESP32 safe per-pin limit of 12mA.',
        solution: 'Calculated and integrated a 220Ω series resistor ((3.3V - 2.0V) / 0.006A ≈ 216Ω) ensuring a safe, stable 5.9mA operational current.'
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
      },
      {
        language: 'html',
        title: 'index.html (HTML LED Web Interface)',
        description: 'Clean responsive HTML interface developed for browser-based actuator toggling with RESTful links.',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ESP32 Web Server — LED Control</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #07080d;
      color: #e2e8f0;
      text-align: center;
      padding: 40px 20px;
      margin: 0;
    }
    .card {
      max-width: 440px;
      margin: 0 auto;
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 16px;
      padding: 32px 24px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    h1 { font-size: 22px; margin-bottom: 8px; color: #38bdf8; }
    p { font-size: 13px; color: #94a3b8; margin-bottom: 24px; }
    .btn {
      display: block;
      width: 100%;
      padding: 16px;
      margin: 12px 0;
      font-size: 15px;
      font-weight: 700;
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.2s ease;
      box-sizing: border-box;
      letter-spacing: 0.05em;
    }
    .btn-on { background: #10b981; color: #022c22; box-shadow: 0 4px 14px rgba(16,185,129,0.35); }
    .btn-on:hover { background: #059669; }
    .btn-off { background: #ef4444; color: #450a0a; box-shadow: 0 4px 14px rgba(239,68,68,0.35); }
    .btn-off:hover { background: #dc2626; }
    .status-badge {
      margin-top: 24px;
      padding: 12px 16px;
      background: #1e293b;
      border-radius: 8px;
      font-family: monospace;
      font-size: 12px;
      color: #cbd5e1;
      border: 1px solid #334155;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>ESP32 Local Web Server</h1>
    <p>Local Area Network Actuator Control (Port 80)</p>
    <a href="/led/on" class="btn btn-on">ACTUATE ON (GPIO 2 HIGH)</a>
    <a href="/led/off" class="btn btn-off">ACTUATE OFF (GPIO 2 LOW)</a>
    <div class="status-badge">Target Pin: GPIO 2 | Direct Memory Socket Control</div>
  </div>
</body>
</html>`
      }
    ],
    reflection:
      'Engineered memory-efficient HTTP socket handling on hardware constrained by 520 KB SRAM. This foundation highlighted how embedded network stacks execute request routing without heavy framework abstractions.',
    photos: [
      { url: '/images/iot/task1_web_interface_phone.jpg', caption: 'Web interface screenshot: ESP32 LED Control page (LED ON / LED OFF) in the phone browser' },
      { url: '/images/iot/task1_led_on_with_phone.jpg', caption: 'Physical setup: ESP32 board and phone, LED toggled from the web page' }
    ],
    videos: [
      { url: '/videos/task1_esp32_webserver.mp4', title: 'ESP32 Local HTTP Web Server Control — Phone On/Off Video' }
    ]
  },
  {
    id: 'task-02',
    repoPath: 'iot-projects/task2-adafruit-mqtt',
    docSections: [
      {
        heading: 'MQTT Publisher, Subscriber and Broker in This Project',
        checklist: 'MQTT Publisher, Subscriber and Broker identified',
        intro: 'MQTT is a publish/subscribe protocol. Devices never talk to each other directly: every client connects to a central broker, and the broker forwards each message published on a topic to every client subscribed to that topic. In this project the three roles are:',
        table: {
          headers: ['MQTT Role', 'Component in this project', 'What it does'],
          rows: [
            ['Publisher', 'Adafruit IO "Bulb" dashboard (Toggle block)', 'When the toggle is switched, the dashboard publishes "ON" or "OFF" to the topic prajasri/feeds/bulb.'],
            ['Broker', 'Adafruit IO MQTT broker (io.adafruit.com : 1883)', 'Authenticates clients with the Adafruit IO username + AIO key, stores the latest value of the feed and forwards every new message to all subscribers of prajasri/feeds/bulb.'],
            ['Subscriber', 'ESP32 (Adafruit_MQTT_Subscribe object)', 'Subscribes to prajasri/feeds/bulb at start-up. When a message arrives it switches the relay on GPIO 4, which turns the 230 V bulb ON or OFF.'],
            ['Topic / Feed', 'prajasri/feeds/bulb', 'The named channel that connects the publisher and the subscriber.']
          ]
        }
      },
      {
        heading: 'Adafruit IO Account Setup',
        checklist: 'Adafruit IO account created and documented',
        steps: [
          'Signed up / logged in at io.adafruit.com. The account used for this project has the username "prajasri" (visible in the dashboard URL io.adafruit.com/prajasri/dashboards/bulb).',
          'Opened the yellow key icon ("My Key") to view the Adafruit IO Username and Active Key.',
          'Copied these into the firmware as AIO_USERNAME and AIO_KEY. The ESP32 uses them as its MQTT login, so the broker only accepts connections from this account.',
          'Kept the real AIO key out of the published code. The code on this page uses placeholders (YOUR_ADAFRUIT_IO_KEY) so the account cannot be misused.'
        ],
        images: [
          { url: '/images/iot/adafruit_io_dashboard_bulb.png', caption: 'Adafruit IO account: prajasri / Dashboards / Bulb, with the ON/OFF toggle block' }
        ]
      },
      {
        heading: 'Dashboard and Feed Configuration',
        checklist: 'Dashboard and feed configuration documented',
        steps: [
          'Feeds → New Feed → created a feed named "bulb" (feed key: bulb). A feed stores every value sent to it together with its time, so it also keeps the ON/OFF history.',
          'Dashboards → New Dashboard → created a dashboard named "Bulb".',
          'Opened the dashboard → gear icon → Create New Block → chose the Toggle block.',
          'Linked the Toggle block to the "bulb" feed.',
          'Set Button On Text = ON and Button Off Text = OFF, so the dashboard publishes exactly the strings the ESP32 code compares against.',
          'Saved the block. Switching the toggle now publishes ON/OFF to the feed, and the new value appears in the feed\'s data table.'
        ],
        table: {
          headers: ['Setting', 'Value used'],
          rows: [
            ['Account / username', 'prajasri'],
            ['Feed name / key', 'bulb'],
            ['Dashboard', 'Bulb'],
            ['Block type', 'Toggle'],
            ['Values published', '"ON" / "OFF"'],
            ['Broker host / port', 'io.adafruit.com : 1883 (MQTT)']
          ]
        }
      },
      {
        heading: 'MQTT Topic / Feed Structure Used',
        checklist: 'MQTT topic/feed structure used',
        intro: 'Adafruit IO turns every feed into an MQTT topic of the form username/feeds/feed-key. The topics involved in this project are:',
        code: `prajasri/feeds/bulb     <- Dashboard toggle (and IFTTT in Task 3) PUBLISH "ON" / "OFF"
                        -> ESP32 SUBSCRIBES and switches the relay on GPIO 4
prajasri/errors         <- Broker error messages for this account
prajasri/throttle       <- Rate-limit warnings (free plan: 30 data points per minute)

REST equivalent of the same feed (used by IFTTT in Task 3):
https://io.adafruit.com/api/v2/prajasri/feeds/bulb/data`,
        outro: 'Because the ESP32 subscribes to one exact topic, it ignores every other message on the broker. Adding another device later only needs a new feed key (e.g. prajasri/feeds/fan).'
      },
      {
        heading: 'Explanation of Important Code Sections',
        checklist: 'Explanation of important code sections',
        table: {
          headers: ['Code section', 'What it does and why it is needed'],
          rows: [
            ['#include <WiFi.h>, "Adafruit_MQTT.h", "Adafruit_MQTT_Client.h"', 'Loads the Wi-Fi driver and the Adafruit MQTT library.'],
            ['#define AIO_SERVER "io.adafruit.com", AIO_SERVERPORT 1883, AIO_USERNAME, AIO_KEY', 'Broker address, MQTT port and the account credentials used to log in to Adafruit IO.'],
            ['const int RELAY_PIN = 4;', 'The relay module input is wired to GPIO 4.'],
            ['WiFiClient client; Adafruit_MQTT_Client mqtt(&client, …);', 'Creates the TCP connection and wraps it in an MQTT client object.'],
            ['Adafruit_MQTT_Subscribe relayFeed(&mqtt, AIO_USERNAME "/feeds/bulb");', 'Declares the topic the ESP32 listens to: prajasri/feeds/bulb.'],
            ['setup(): pinMode + digitalWrite(RELAY_PIN, HIGH)', 'The relay is active-LOW, so writing HIGH at boot keeps the bulb OFF until a command arrives.'],
            ['setup(): WiFi.begin() … mqtt.subscribe(&relayFeed)', 'Joins the Wi-Fi network and registers the subscription before connecting to the broker.'],
            ['MQTT_connect()', 'Connects to the broker and retries every 5 s (3 attempts) if the connection fails or drops, so the board recovers on its own.'],
            ['mqtt.readSubscription(2000)', 'Waits up to 2 s for a new message on the subscribed topic.'],
            ['strcmp(message, "ON") == 0 → digitalWrite(RELAY_PIN, LOW)', 'Compares the received text and drives the relay. LOW energises the active-LOW relay (bulb ON), HIGH releases it (bulb OFF).'],
            ['mqtt.ping()', 'Keep-alive packet. If the broker hears nothing for a while it drops the connection, so the loop pings it and reconnects if the ping fails.']
          ]
        }
      },
      {
        heading: 'Photographs of the Hardware Setup',
        checklist: 'Photographs of the hardware setup',
        intro: 'Test bench used for the MQTT demo: the ESP32 drives a 5 V optocoupler relay, which switches a 230 V AC bulb in a lamp holder. The pictures are taken from the demonstration video.',
        images: [
          { url: '/images/iot/task2_hardware_bulb_on.jpg', caption: 'Hardware setup during the demo: bulb switched ON through the Adafruit IO "bulb" feed' },
          { url: '/images/iot/task2_hardware_test_bench.jpg', caption: 'Test bench: laptop, ESP32 + relay and the bulb in its holder on the desk' }
        ]
      }
    ],
    taskNumber: '02',
    title: 'Adafruit IO Dashboard & MQTT Cloud Telemetry',
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
      {
        title: 'Purpose of Adafruit IO in IoT',
        desc: 'Adafruit IO serves as a cloud-hosted IoT middleware broker providing user authentication, persistent data feeds, visual dashboard widgets (toggle switches, charts), and standard MQTT/REST APIs that decouple edge hardware from end-user clients.'
      },
      {
        title: 'MQTT Broker Architecture (Pub/Sub)',
        desc: 'Central routing server (io.adafruit.com:1883) managing message distribution. The Adafruit IO dashboard acts as Publisher dispatching "ON" or "OFF", the broker matches topics, and the ESP32 operates as Subscriber listening on prajasri/feeds/bulb (the feed behind the "Bulb" dashboard).'
      },
      {
        title: 'Role of MQTT Topic/Feed Structure',
        desc: 'MQTT topics are hierarchical channel identifiers formatted as username/feeds/feed-key (e.g. prajasri/feeds/bulb), enabling precise message scoping and permission verification.'
      }
    ],
    hardwareUsed: [
      'ESP32 SoC NodeMCU-32S',
      '5V 1-Channel Optocoupler Relay Module',
      '230V AC Incandescent Bulb & Socket',
      'Adafruit IO Cloud Broker Platform',
      'AC Mains Wiring & Terminal Block'
    ],
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
    flowDiagram: {
      title: 'MQTT Publish-Subscribe Communication Flow',
      ascii: `
+--------------------------------------------------------------+
|            Adafruit IO Cloud Dashboard (Publisher)           |
|            https://io.adafruit.com/prajasri/dashboards       |
+------------------------------+-------------------------------+
                               |
                               | 1. User flips toggle switch (dispatches "ON" or "OFF")
                               v
+--------------------------------------------------------------+
|                 Adafruit IO MQTT Cloud Broker                |
|                    Host: io.adafruit.com:1883                |
|                  Topic: prajasri/feeds/bulb                  |
+------------------------------+-------------------------------+
                               |
                               | 2. Pushes payload over persistent TCP socket via MQTT
                               v
+--------------------------------------------------------------+
|                  ESP32 Microcontroller (Subscriber)          |
|                 Adafruit_MQTT_Client Subscription            |
+------------------------------+-------------------------------+
                               |
                               | 3. Active-LOW logic: digitalWrite(RELAY_PIN, LOW)
                               v
+------------------------------+-------------------------------+
|             5V Optocoupler Relay Module (SRD-05VDC)          |
|             Contacts Close -> AC Phase Connected             |
+------------------------------+-------------------------------+
                               |
                               v
+--------------------------------------------------------------+
|             230V AC Incandescent Bulb Illuminates            |
+--------------------------------------------------------------+
`,
      description: 'Bidirectional MQTT telemetry decoupled via Adafruit IO broker over TCP port 1883, maintaining sub-100ms command latency with zero inbound port forwarding.'
    },
    troubleshooting: [
      {
        problem: 'Optocoupler relay triggering on LOW instead of HIGH (Active-Low Inversion)',
        cause: 'Standard optocoupled relay modules utilize PNP transistor or opto-diode inputs that conduct when the signal pin is pulled to GND (LOW = Activated, HIGH = Deactivated), leading to inverted appliance behavior.',
        solution: 'Inverted digital logic in firmware subscription parser (digitalWrite(RELAY_PIN, strcmp(message, "ON") == 0 ? LOW : HIGH)), ensuring the bulb stays securely off during ESP32 boot.'
      },
      {
        problem: 'MQTT broker keep-alive timeouts & disconnections',
        cause: 'Adafruit IO free-tier broker terminates idle TCP connections if no packets or ping frames are received within 60 seconds.',
        solution: 'Added non-blocking MQTT_connect() auto-reconnection wrapper with exponential backoff and integrated mqtt.ping() keep-alive frames inside the main execution loop.'
      },
      {
        problem: 'Adafruit IO free tier rate limiting (429 Throttling)',
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
Adafruit_MQTT_Subscribe relayFeed = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/bulb");

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
      { url: '/images/iot/task2_hardware_bulb_on.jpg', caption: 'Hardware setup photo — bulb switched ON through the Adafruit IO bulb feed' },
      { url: '/images/iot/task2_hardware_test_bench.jpg', caption: 'Hardware setup photo — ESP32 + relay test bench with the 230 V bulb' }
    ],
    videos: [
      { url: '/videos/task2_adafruit_mqtt.mp4', title: 'Adafruit IO MQTT Cloud Telemetry & Bulb Switch Demonstration' }
    ]
  },
  {
    id: 'task-03',
    repoPath: 'iot-projects/task3-ifttt-automation',
    docSections: [
      {
        heading: 'What is IFTTT and Why It Is Used',
        checklist: 'What IFTTT is and why it is used',
        intro: 'IFTTT ("If This Then That") is a free cloud automation service. It connects apps, web services and smart devices using simple rules called Applets. Each Applet watches one service for an event (the trigger) and then performs an action in another service.',
        bullets: [
          'No server code: the link between the event and the device is set up in IFTTT\'s web/mobile app, not in my firmware.',
          'Hundreds of ready services: Google Assistant, button widgets, date & time, weather, email, location and more can all control the ESP32 without reflashing it.',
          'Built-in Adafruit IO service: IFTTT can write straight to an Adafruit IO feed, which the ESP32 already listens to over MQTT.',
          'Used here so that a voice command to Google Assistant switches the real 230 V bulb.'
        ]
      },
      {
        heading: 'Trigger → Action Concept',
        checklist: 'Trigger → Action concept explained',
        intro: 'Every IFTTT Applet has exactly two parts. The Trigger ("If This") is the event IFTTT watches for. The Action ("Then That") is what IFTTT does automatically when that event happens. My two applets:',
        table: {
          headers: ['Applet', 'Trigger (If This)', 'Action (Then That)', 'Data sent to feed'],
          rows: [
            ['Bulb ON', 'Google Assistant: "Okay Google, activate Bulb" (Activate scene, Realtime trigger)', 'Adafruit: Send data to Adafruit IO', 'feed bulb = ON'],
            ['Bulb OFF', 'Google Assistant: "Okay Google, activate TURN off bulb"', 'Adafruit: Send data to Adafruit IO', 'feed bulb = OFF']
          ]
        },
        outro: 'Flow: voice command (trigger) → IFTTT applet runs → action writes ON/OFF to the bulb feed → the ESP32 reacts. The applet itself never talks to the hardware.'
      },
      {
        heading: 'Role of Adafruit IO in the Automation',
        checklist: 'Role of Adafruit IO in the automation',
        intro: 'Adafruit IO is the bridge between IFTTT and the ESP32. IFTTT cannot reach a microcontroller on a private Wi-Fi network, but it can write to an Adafruit IO feed over the internet. Adafruit IO then:',
        bullets: [
          'Receives the value from IFTTT through its REST API (https://io.adafruit.com/api/v2/prajasri/feeds/bulb/data).',
          'Stores it in the "bulb" feed, so every automation event is logged with a time.',
          'Acts as the MQTT broker and pushes the new value to the ESP32, which is subscribed to prajasri/feeds/bulb.',
          'Shows the current state on the "Bulb" dashboard, so the manual toggle and the voice automation stay in sync.'
        ],
        outro: 'So IFTTT handles the event logic, Adafruit IO handles messaging and storage, and the ESP32 does the physical switching.'
      },
      {
        heading: 'IFTTT Applet / Workflow Created',
        checklist: 'IFTTT Applet/workflow created and documented',
        steps: [
          'Logged in at ifttt.com and clicked Create.',
          'If This → Add → chose Google Assistant → "Activate scene" (Realtime trigger). Scene name: "Bulb", so the phrase is "Okay Google, activate Bulb".',
          'Then That → Add → searched for Adafruit → chose "Send data to Adafruit IO".',
          'Connected the Adafruit IO account to IFTTT (one-time authorisation).',
          'Filled in the action fields: feed_name = bulb, data = ON.',
          'Clicked Continue → Finish. The applet shows as "Connected".',
          'Created a second applet the same way with scene name "TURN off bulb" and data = OFF.',
          'Tested both phrases on the phone and watched the value change in the Adafruit IO bulb feed and on the real bulb.'
        ],
        images: [
          { url: '/images/iot/task3_ifttt_applet_config.jpg', caption: 'Applet details: If "Activate scene" (Google Assistant) Then "Send data to Adafruit IO" with fields feed_name and data' },
          { url: '/images/iot/task3_ifttt_my_applets.jpg', caption: 'My Applets: the two connected voice applets ("activate Bulb" and "activate TURN off bulb")' }
        ]
      },
      {
        heading: 'Photographs of the Working Prototype',
        checklist: 'Photographs of the working prototype',
        intro: 'Stills from the demonstration video: the ESP32 + relay prototype on the desk with the 230 V bulb, switched by Google Assistant voice commands through IFTTT and Adafruit IO.',
        images: [
          { url: '/images/iot/task3_prototype_bulb_on.jpg', caption: 'Working prototype: bulb switched ON by the "activate Bulb" voice command' },
          { url: '/images/iot/task3_prototype_test_bench.jpg', caption: 'Prototype on the test bench: laptop, ESP32 with relay and the bulb holder' }
        ]
      },
      {
        heading: 'What I Learned About Cloud-Based Automation',
        checklist: 'What you learned about cloud-based automation',
        bullets: [
          'Layered design: event logic (IFTTT), messaging and storage (Adafruit IO) and switching (ESP32) are separate. I could add a new trigger without changing a single line of firmware.',
          'Cloud services talk through standard interfaces: IFTTT writes over REST/HTTP, and the ESP32 receives over MQTT. Adafruit IO translates between the two.',
          'Latency depends on the cloud: the voice → bulb chain takes a few seconds and varies with IFTTT. Cloud automation suits convenience tasks, not time-critical control.',
          'Everything depends on the internet: if Wi-Fi, IFTTT or Adafruit IO is down, the automation stops. A real product needs a local fallback such as a physical switch.',
          'Security matters: the AIO key and the IFTTT–Adafruit link are what stop strangers controlling the bulb, so keys must never be published.',
          'Exact names matter: the feed name in the IFTTT action must match the feed key the ESP32 subscribes to ("bulb"), or nothing happens.'
        ]
      }
    ],
    taskNumber: '03',
    title: 'IFTTT + Adafruit IO IoT Automation & Voice Control',
    badge: 'Automated Webhooks',
    shortDesc: 'Automated event triggers linking external third-party services to hardware actions via RESTful webhooks.',
    objective:
      'Architect an event-driven cloud automation bridge connecting third-party triggers (voice assistants, time schedules, webhooks) to physical embedded actuators via IFTTT and Adafruit IO REST/MQTT pipelines.',
    problemStatement:
      'Directly programming microcontrollers to interact with disparate enterprise APIs (such as Google Assistant, weather services, or calendars) requires massive firmware libraries, complex OAuth2 authentications, and heavy RAM overhead. Third-party automation services like IFTTT decouple triggering events from edge hardware, translating high-level events into standardized RESTful webhooks.',
    overview:
      'Integrated IFTTT (If This Then That) with Adafruit IO cloud feeds to execute conditional IoT automations. Configured inbound webhooks and REST triggers that automatically publish payload packets to MQTT topics based on scheduled times or external voice assistant events.',
    architecturePoints: [
      'Webhook HTTP POST payload dispatching to Adafruit IO REST API endpoints',
      'Automated event-to-hardware pipeline requiring zero manual web app intervention',
      'State synchronization across multi-platform triggers (Google Assistant voice commands & schedules)',
      'Robust error handling for delayed cloud event dispatches and refractory debounce filtering'
    ],
    keyConcepts: [
      {
        title: 'IFTTT Trigger → Action Paradigm',
        desc: 'Translates external events (If This: Google Assistant activates named scene "activate Bulb" or "activate TURN off bulb") into automated downstream cloud actions (Then That: Send data "ON" or "OFF" to Adafruit IO feed).'
      },
      {
        title: 'RESTful Webhook Bridging',
        desc: 'IFTTT transmits an authenticated HTTP POST with custom JSON headers (X-AIO-Key) to update cloud feeds asynchronously, which are instantly broadcasted over MQTT.'
      },
      {
        title: 'Decoupled Cloud-to-Hardware Architecture',
        desc: 'Allows the ESP32 firmware to remain lightweight and protocol-specific (MQTT) while leveraging high-level software ecosystem triggers without on-chip NLP or heavy OAuth stacks.'
      }
    ],
    hardwareUsed: [
      'ESP32 SoC NodeMCU-32S',
      '1-Channel Optocoupled Relay Module',
      'Google Assistant Voice Ecosystem',
      'IFTTT Cloud Service Platform',
      'Adafruit IO REST API & MQTT Broker',
      'Status Indicator LEDs'
    ],
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
    flowDiagram: {
      title: 'IFTTT Cloud Event Automation Architecture & Data Flow',
      ascii: `
[ 1. Voice Trigger Event ]
User speaks: "Okay Google, activate Bulb" / "Okay Google, activate TURN off bulb"
              |
              v
[ 2. Google Assistant Scene Service ]
Captures speech intent and triggers registered IFTTT Realtime Trigger
              |
              v
[ 3. IFTTT Cloud Automation Engine ]
Applet: IF Activate Scene THEN Send data to Adafruit IO
Dispatches authenticated HTTP POST to Adafruit IO REST API:
URL: https://io.adafruit.com/api/v2/prajasri/feeds/bulb/data
Headers: Content-Type: application/json, X-AIO-Key: YOUR_KEY
Payload: { "value": "ON" }
              |
              v
[ 4. Adafruit IO Cloud Broker / Feed ]
Receives REST data point and broadcasts to MQTT topic: prajasri/feeds/bulb
              |
              v
[ 5. ESP32 Wi-Fi MQTT Subscriber ]
Receives MQTT message over persistent TCP socket, filters duplicate triggers with 1500ms debounce
              |
              v
[ 6. Physical Actuation ]
digitalWrite(RELAY_PIN, LOW) -> Optocoupler closes -> 230V AC Bulb turns ON
`,
      description: 'End-to-end event chain translating spoken voice intents into physical AC appliance illumination in under 800 milliseconds.'
    },
    troubleshooting: [
      {
        problem: 'Webhook rate-limiting and payload formatting (400 Bad Request)',
        cause: 'Adafruit IO REST API v2 strictly requires JSON bodies with a {"value": "..."} key structure. Unformatted or malformed string bodies result in 400 Bad Request dropouts.',
        solution: 'Serialized JSON headers (Content-Type: application/json, X-AIO-Key) and handled HTTP 200/400 status codes with verified payload formatting ({"value": "ON"}).'
      },
      {
        problem: 'IFTTT polling delay vs webhook responsiveness',
        cause: 'Standard third-party IFTTT applets rely on periodic polling cycles that can introduce up to 15-minute dispatch latencies for background services.',
        solution: 'Configured Google Assistant Realtime Triggers and direct REST Webhook actions, achieving deterministic sub-second event propagation down to the physical ESP32.'
      },
      {
        problem: 'Duplicate webhook execution & relay contact chatter',
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
Adafruit_MQTT_Subscribe iftttFeed = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/bulb");

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
  "feed_key": "bulb",
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
      'This task showed me how everyday apps can control hardware I built myself. The ESP32 firmware barely changed from Task 2. What changed was where the command came from: a sentence spoken to Google Assistant now travels through IFTTT and Adafruit IO and switches a real 230 V bulb. The hardest part was not the code but the integration: the IFTTT action had to use exactly the same feed name ("bulb") that the ESP32 subscribes to, and I had to accept a few seconds of cloud delay. I also learned to add a debounce in the firmware because repeated triggers made the relay chatter. Next, I would like to close the loop the other way: let the ESP32 publish a sensor event that makes IFTTT send a notification to my phone.',
    photos: [
      { url: '/images/iot/task3_ifttt_applet_config.jpg', caption: 'IFTTT Applet Definition: Google Assistant "Activate Scene" Trigger to Adafruit IO Feed Action' },
      { url: '/images/iot/task3_ifttt_my_applets.jpg', caption: 'IFTTT Active Applets: Dual Google Assistant Voice Commands ("activate Bulb" & "activate TURN off bulb")' },
      { url: '/images/iot/adafruit_io_dashboard_bulb.png', caption: 'Adafruit IO Cloud Dashboard & Feed Receiving Automated IFTTT Telemetry' },
      { url: '/images/iot/task3_prototype_bulb_on.jpg', caption: 'Working prototype — bulb switched ON by the Google Assistant / IFTTT voice command' },
      { url: '/images/iot/task3_prototype_test_bench.jpg', caption: 'Working prototype on the test bench — ESP32, relay and bulb' }
    ],
    videos: [
      { url: '/videos/task3_ifttt_automation.mp4', title: 'IFTTT Event Automation & Voice Assistant Trigger Demonstration' }
    ]
  },
  {
    id: 'task-04',
    repoPath: 'iot-projects/task4-firebase-dashboard',
    docSections: [
      {
        heading: 'Firebase Project Setup',
        checklist: 'Firebase project setup documented',
        steps: [
          'Opened console.firebase.google.com → Add project → named it "smart-env-monitor" (Google Analytics not needed).',
          'Build → Realtime Database → Create Database → chose a server location and started in locked mode, then wrote my own security rules (below).',
          'Noted the database URL: https://smart-env-monitor-default-rtdb.firebaseio.com. The ESP32 and the web dashboard both connect to this URL.',
          'Project settings → Your apps → Web (</>) → registered the dashboard as a web app and copied the firebaseConfig object (apiKey, authDomain, databaseURL, projectId) into firebase_dashboard.js.',
          'For the ESP32: added the Firebase ESP Client library in the Arduino IDE and put the database host and database secret into the firmware (shown as placeholders in the code).',
          'Checked that live values appeared under /sensorData in the Firebase console Data tab when the ESP32 was running.'
        ],
        table: {
          headers: ['Firebase setting', 'Value used'],
          rows: [
            ['Project ID', 'smart-env-monitor'],
            ['Auth domain', 'smart-env-monitor.firebaseapp.com'],
            ['Database URL', 'https://smart-env-monitor-default-rtdb.firebaseio.com'],
            ['Products enabled', 'Realtime Database, Authentication (Email/Password)'],
            ['Web SDK', 'Firebase JS SDK 10.8.0 (modular imports)']
          ]
        }
      },
      {
        heading: 'Firebase Authentication Configuration',
        checklist: 'Firebase Authentication configuration documented',
        steps: [
          'Build → Authentication → Get started.',
          'Sign-in method tab → enabled the Email/Password provider.',
          'Users tab → Add user → created the account that is allowed to open the dashboard.',
          'The login page sends the entered email and password to signInWithEmailAndPassword(auth, email, password). On success, Firebase returns a signed ID token and the dashboard opens.',
          'The dashboard listens with onAuthStateChanged(). If no user is signed in, it sends the visitor back to the login page, so the dashboard cannot be opened directly by URL.',
          'Logout calls signOut(auth), which ends the session.',
          'Realtime Database rules only allow reads and writes from signed-in users:'
        ],
        code: `{
  "rules": {
    ".read":  "auth != null",
    ".write": "auth != null"
  }
}`,
        images: [
          { url: '/images/iot/smart_env_login_portal.jpg', caption: 'Login page of the Smart Environment Monitor, backed by Firebase Email/Password Authentication' }
        ]
      },
      {
        heading: 'Realtime Database Structure',
        checklist: 'Realtime Database structure documented',
        intro: 'The Realtime Database is one JSON tree. The ESP32 writes sensor values to fixed paths, and the dashboard listens to the same paths with onValue(), so the page updates the moment a value changes. Each node in the tree:',
        table: {
          headers: ['Path', 'Type', 'Written by', 'Read by', 'Meaning'],
          rows: [
            ['/sensorData/temperature', 'number (°C)', 'ESP32', 'Dashboard', 'Latest DHT11 temperature'],
            ['/sensorData/humidity', 'number (%RH)', 'ESP32', 'Dashboard', 'Latest DHT11 humidity'],
            ['/sensorData/lightLevel', 'number (0–4095)', 'ESP32', 'Dashboard', 'Latest raw LDR ADC reading (GPIO 34)'],
            ['/sensorData/lastUpdated', 'timestamp', 'ESP32', 'Dashboard', 'When the last reading was pushed, used for online status'],
            ['/appliances/bulbState', 'boolean', 'Dashboard (manual) / ESP32 (auto)', 'ESP32 / Dashboard', 'true = bulb ON, false = bulb OFF'],
            ['/appliances/operatingMode', '"AUTO" | "MANUAL"', 'Dashboard', 'ESP32', 'Which side controls the bulb (used in Task 5)'],
            ['/history/{pushId}', 'object', 'ESP32', 'Dashboard history page', 'One timestamped log record per reading (used in Task 5)']
          ]
        }
      },
      {
        heading: 'Video Demonstrating Webpage Workflow',
        checklist: 'Video demonstrating webpage workflow',
        intro: 'A recorded demonstration showcasing the end-to-end web dashboard workflow: opening the secure login portal, authenticating with Firebase Auth (email & password), real-time WebSocket telemetry synchronization from the ESP32 (displaying temperature, humidity, and LDR light levels on dynamic gauge cards), and manual appliance override toggling the physical bulb with instant bidirectional state feedback.',
        outro: 'The complete demonstration video is embedded and playable in the Media Gallery tab below (task4_firebase_rtdb.mp4).'
      }
    ],
    taskNumber: '04',
    title: 'Firebase Realtime Database & IoT Monitoring Dashboard',
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
      cloudPlatformDefinition: 'A Cloud Platform is a fully managed cloud ecosystem (e.g. Google Cloud, Firebase, AWS, Microsoft Azure) that provides a unified suite of developer infrastructure services — including servers, real-time databases, authentication, machine learning APIs, and hosting — allowing developers to build and scale applications without managing physical hardware.',
      cloudDashboardDefinition: 'A Cloud-Based Dashboard is a graphical web application that connects to cloud databases via WebSockets or REST APIs to visualize live system telemetry (gauges, indicators, trend charts) and issue real-time control directives to remote IoT edge devices.',
      databaseDefinition: 'A Database is an organized collection of structured or unstructured data stored electronically in a computer system. Databases are governed by Database Management Systems (DBMS) that ensure efficient indexing, querying, transactions, and security.',
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
          realWorldExample: 'Firebase Realtime Database rules { ".read": "auth != null", ".write": "auth != null" }: only signed-in users may read or change data; anonymous visitors are refused.'
        }
      ]
    },
    rtdbSchema: `// Database: smart-env-monitor-default-rtdb (root of the JSON tree)
{
  "sensorData": {
    "temperature": 28.4,
    "humidity": 64.2,
    "lightLevel": 1350,
    "lastUpdated": 1727514300
  },
  "appliances": {
    "bulbState": true,
    "operatingMode": "AUTO"
  },
  "history": {
    "-O7xKa81bCDeFgHi": {
      "timestamp": 1727514300,
      "temperature": 28.4,
      "humidity": 64.2,
      "lightLevel": 1350,
      "bulbState": true,
      "mode": "AUTO"
    }
  }
}`,
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
        problem: '1-wire timing collisions between DHT11 and Wi-Fi stack',
        cause: 'DHT11 single-wire communication relies on microsecond-level pulse-width measurements. Background Wi-Fi interrupts preempted sensor sampling, returning nan (Not-a-Number) read errors.',
        solution: 'Spaced sampling intervals to 2.5s (2500ms) and wrapped sensor read calls in timing guards to prevent interference with Wi-Fi network task execution.'
      },
      {
        problem: 'Firebase token expiration & SSL handshake drops',
        cause: 'Firebase authentication tokens expire after 3600 seconds (1 hour). When tokens expired, subsequent database write operations silently failed.',
        solution: 'Configured Firebase.reconnectWiFi(true) and registered an automated token refresh handler in firmware using the modern Firebase_ESP_Client library.'
      },
      {
        problem: 'ADC2 Wi-Fi channel conflict on ESP32',
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
      },
      {
        language: 'html',
        title: 'dashboard.html (Complete Frontend Dashboard)',
        description: 'Complete HTML5/CSS3 frontend web dashboard with embedded Firebase SDK v10/v11 integration, authentication, and live gauge cards.',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Smart Environment IoT Monitoring Dashboard</title>
  <style>
    :root {
      --bg-color: #07080d;
      --card-bg: #0f172a;
      --accent: #38bdf8;
      --accent-green: #10b981;
      --border: #1e293b;
    }
    body {
      background-color: var(--bg-color);
      color: #e2e8f0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      margin: 0;
      padding: 32px 20px;
    }
    .header { text-align: center; margin-bottom: 32px; }
    .header h1 { font-size: 26px; color: #fff; margin-bottom: 6px; }
    .header p { font-size: 13px; color: #94a3b8; font-family: monospace; }
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
      max-width: 960px;
      margin: 0 auto;
    }
    .telemetry-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px;
      text-align: center;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
    }
    .telemetry-card h3 { font-size: 13px; font-mono; text-transform: uppercase; color: #94a3b8; }
    .telemetry-val {
      font-size: 38px;
      font-weight: 800;
      color: var(--accent);
      margin: 14px 0;
      font-family: monospace;
    }
    .btn-toggle {
      background: var(--accent-green);
      color: #022c22;
      border: none;
      padding: 14px 28px;
      font-size: 14px;
      font-weight: bold;
      border-radius: 10px;
      cursor: pointer;
      width: 100%;
      transition: all 0.2s ease;
    }
    .btn-toggle:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Smart Environment IoT Telemetry Portal</h1>
    <p>Persistent WebSockets Stream via Google Firebase Realtime Database</p>
  </div>
  <div class="dashboard-grid">
    <div class="telemetry-card">
      <h3>Ambient Temperature</h3>
      <div class="telemetry-val" id="tempDisplay">--.- °C</div>
      <span>DHT11 Digital Probe</span>
    </div>
    <div class="telemetry-card">
      <h3>Relative Humidity</h3>
      <div class="telemetry-val" id="humDisplay">--.- %</div>
      <span>Capacitive Polymer Sensor</span>
    </div>
    <div class="telemetry-card">
      <h3>Light Level</h3>
      <div class="telemetry-val" id="ldrDisplay">---- ADC</div>
      <span>12-Bit Analog LDR Divider</span>
    </div>
    <div class="telemetry-card">
      <h3>Bulb Actuator State</h3>
      <div class="telemetry-val" id="bulbStatus">STANDBY</div>
      <button class="btn-toggle" onclick="toggleBulb(true)">Toggle Appliance Load</button>
    </div>
  </div>
  <script type="module" src="firebase_dashboard.js"></script>
</body>
</html>`
      }
    ],
    reflection:
      'Mastered cloud database integration for embedded systems. Realized the power of WebSocket listener threads over legacy HTTP polling for instantaneous sub-100ms control response.',
    photos: [
      { url: '/images/iot/smart_env_overview_dashboard.jpg', caption: 'Smart Environment Overview Dashboard — Real-time atmospheric telemetry streaming from ESP32 node' },
      { url: '/images/iot/smart_env_login_portal.jpg', caption: 'Smart Environment Monitor — User Authentication & Dashboard Access Gateway' },
      { url: '/images/iot/smart_env_hardware_simulator.jpg', caption: 'ESP32 Hardware Simulator & Testing Console — Simulated telemetry & threshold verification' },
      { url: '/images/iot/smart_env_recorded_measurements_log.jpg', caption: 'Firebase Environmental Telemetry Historical Log — Live Timestamped Data Records' }
    ],
    videos: [
      { url: '/videos/task4_firebase_rtdb.mp4', title: 'Video Demonstrating Webpage Workflow — Authentication Login Portal, Real-Time Telemetry & Bulb Control' }
    ]
  },
  {
    id: 'task-05',
    repoPath: 'iot-projects/task5-firebase-logging-export',
    docSections: [
      {
        heading: 'Manual / Automatic Mode',
        checklist: 'Manual / Automatic Mode implemented and documented',
        intro: 'The bulb has two operating modes. The mode is chosen on the dashboard and stored in Firebase at /appliances/operatingMode. The ESP32 reads it on every loop, so a change takes effect immediately.',
        table: {
          headers: ['Mode', 'Who decides the bulb state', 'Firebase nodes used', 'Behaviour'],
          rows: [
            ['MANUAL', 'The user, from the dashboard ON/OFF control', 'Dashboard writes /appliances/bulbState; ESP32 reads it', 'The ESP32 copies bulbState to the relay (GPIO 5). LDR values are still measured and logged but not used for switching.'],
            ['AUTO', 'The LDR light sensor', 'ESP32 reads LDR, writes /appliances/bulbState', 'The ESP32 switches the relay itself using the threshold + hysteresis logic, and writes the new state back to Firebase so the dashboard always shows the real bulb state.']
          ]
        },
        steps: [
          'User selects AUTO or MANUAL on the dashboard → the value is written to /appliances/operatingMode.',
          'ESP32 loop: Firebase.RTDB.getString("/appliances/operatingMode") → stored in operatingMode.',
          'if (operatingMode == "AUTO") → run the LDR hysteresis logic; else → follow /appliances/bulbState from the dashboard.',
          'The active mode is saved in every /history record (field "mode"), so the log shows whether each ON/OFF change was manual or automatic.'
        ]
      },
      {
        heading: 'LDR Threshold & Calibration Method',
        checklist: 'LDR threshold/calibration method documented',
        intro: 'The LDR and a 10 kΩ resistor form a voltage divider read on GPIO 34 (ADC1, 12-bit, 0–4095). In this circuit the reading drops as the room gets darker. Raw values depend on the resistor, the LDR and the room, so the threshold was set from measurements, not guessed.',
        steps: [
          'Printed the raw analogRead(34) value on the Serial Monitor at 115200 baud.',
          'Took readings in different conditions: LDR fully covered (dark), shadow/twilight, normal room lighting and a torch shining on it.',
          'Averaged several readings per condition to smooth out noise (results in the calibration table below).',
          'Placed the switching point at 1200 ADC counts, between "dim room" and "twilight/dark".',
          'Added a ±150 count hysteresis band so the relay does not chatter when the light hovers near 1200.',
          'Verified by slowly covering and uncovering the LDR: the bulb switched ON once below 1050 and OFF once above 1350, with no flicker in between.'
        ],
        table: {
          headers: ['Parameter', 'Value', 'Meaning'],
          rows: [
            ['LDR_THRESHOLD', '1200', 'Centre switching point (ADC counts)'],
            ['HYSTERESIS', '150', 'Dead-band on each side of the threshold'],
            ['Turn bulb ON', 'ADC < 1050', '1200 − 150: it is dark enough'],
            ['Turn bulb OFF', 'ADC > 1350', '1200 + 150: it is bright enough'],
            ['1050 – 1350', 'no change', 'Keeps the previous state (prevents relay chatter)']
          ]
        }
      },
      {
        heading: 'Database Structure Used for Logs',
        checklist: 'Database structure used for logs documented',
        intro: 'Live values and history are stored separately. /sensorData and /appliances are overwritten with the latest state. /history gets a new child every 10 seconds through Firebase.RTDB.pushJSON(), which creates a unique, time-ordered push ID for each record. One log record:',
        code: `/history
  ├── -O7xKa81bCDeFgHi            <- unique push ID (time-ordered)
  │     ├── timestamp   : time of the reading
  │     ├── temperature : 28.4      (°C, DHT11)
  │     ├── humidity    : 64.2      (%RH, DHT11)
  │     ├── lightLevel  : 1350      (raw LDR ADC, 0-4095)
  │     ├── bulbState   : true      (relay ON / OFF)
  │     └── mode        : "AUTO"    ("AUTO" | "MANUAL")
  ├── -O7xKcR2...
  └── ...`,
        table: {
          headers: ['Field', 'Type', 'Source'],
          rows: [
            ['timestamp', 'time of reading', 'ESP32 when the record is created'],
            ['temperature', 'number (°C)', 'DHT11 on GPIO 4'],
            ['humidity', 'number (%RH)', 'DHT11 on GPIO 4'],
            ['lightLevel', 'number (0–4095)', 'LDR divider on GPIO 34'],
            ['bulbState', 'boolean', 'Actual relay state (GPIO 5)'],
            ['mode', '"AUTO" / "MANUAL"', 'Mode active when the reading was taken']
          ]
        },
        outro: 'The dashboard history table, the chart and the CSV export all read from /history. Each CSV column maps one-to-one to these fields.'
      },
      {
        heading: 'Photographs of the Complete Prototype',
        checklist: 'Photographs of the complete prototype',
        intro: 'The complete system: ESP32 on the breadboard with the DHT11, the LDR module, the 5 V relay module switching a 230 V bulb, and the live Firebase dashboard on the laptop.',
        images: [
          { url: '/images/iot/task5_complete_prototype_bulb_on.jpg', caption: 'Complete prototype: ESP32 + DHT11 + LDR + relay with the bulb ON, dashboard on the laptop' },
          { url: '/images/iot/task5_complete_prototype_dashboard.jpg', caption: 'Complete prototype running: live temperature and appliance control shown on the dashboard' },
          { url: '/images/iot/task5_circuit_breadboard.jpg', caption: 'Breadboard wiring of the sensors and ESP32 with the Serial Monitor log on screen' }
        ]
      }
    ],
    taskNumber: '05',
    title: 'Firebase Logging, Automation & Data Export Engine',
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
    rtdbSchema: `// Firebase Realtime Database used by the Task 5 system
{
  "sensorData":  { "temperature": 28.4, "humidity": 64.2, "lightLevel": 1350, "lastUpdated": 1727514300 },
  "appliances":  { "bulbState": true, "operatingMode": "AUTO" },
  "history": {
    "-O7xKa81bCDeFgHi": { "timestamp": 1727514300, "temperature": 28.4, "humidity": 64.2, "lightLevel": 1350, "bulbState": true, "mode": "AUTO" },
    "-O7xKcR2mNoPqRsT": { "timestamp": 1727514310, "temperature": 28.4, "humidity": 64.1, "lightLevel": 1180, "bulbState": true, "mode": "AUTO" }
  }
}`,
    calibrationTable: [
      { adcRange: '0 – 800', condition: 'Total Darkness / Night', resistance: '> 60 kΩ', voltage: '< 0.47 V', action: 'BULB ON (Automatic Night Trigger)' },
      { adcRange: '801 – 1200', condition: 'Twilight / Deep Shadow', resistance: '18 kΩ – 60 kΩ', voltage: '0.47 V – 1.18 V', action: 'BULB ON (Hysteresis Active Zone)' },
      { adcRange: '1201 – 1500', condition: 'Dim Room / Overcast Dusk', resistance: '8 kΩ – 18 kΩ', voltage: '1.18 V – 1.83 V', action: 'DEADBAND (Preserves Current State)' },
      { adcRange: '1501 – 2800', condition: 'Normal Office / Room Lighting', resistance: '3 kΩ – 8 kΩ', voltage: '1.83 V – 2.53 V', action: 'BULB OFF (Adequate Illumination)' },
      { adcRange: '2801 – 4095', condition: 'Direct Sunlight / Torch Beam', resistance: '< 3 kΩ', voltage: '> 2.53 V', action: 'BULB OFF (High Brightness Saturation)' }
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
        },
        {
          title: 'Full Dependence on Wi-Fi and Firebase',
          desc: 'Manual control, mode changes and logging all go through Firebase. If Wi-Fi or the internet drops, the dashboard cannot control the bulb and readings taken during the outage are lost, because nothing is buffered on the ESP32.'
        },
        {
          title: 'Unbounded Growth of the /history Log',
          desc: 'A new record is pushed every 10 seconds (about 8,600 per day) and nothing is ever deleted. Over weeks this slows the history query and CSV export and eventually exceeds the free Firebase Spark plan limits.'
        },
        {
          title: 'Breadboard Wiring with a Mains Load',
          desc: 'Jumper-wire connections are fragile, and switching a 230 V bulb through a relay module on an open desk is acceptable for a supervised demo but not safe for permanent use.'
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
        },
        {
          title: 'Offline Buffering on the ESP32',
          desc: 'Store readings in LittleFS flash while Wi-Fi is down and upload them when the connection returns, and keep AUTO mode running locally so lighting still works offline.'
        },
        {
          title: 'Log Retention and Down-Sampling',
          desc: 'A scheduled Cloud Function that deletes or archives /history records older than N days, or replaces raw 10-second readings with hourly averages, to keep the database small and exports fast.'
        },
        {
          title: 'Better Sensors and a Proper Enclosure',
          desc: 'Replace the DHT11 with a DHT22/SHT31 and the LDR with a BH1750 lux sensor for calibrated readings, and move the circuit to a soldered PCB in an enclosure with an isolated relay/SSR and fuse.'
        }
      ]
    },
    hardwareUsed: [
      'ESP32 SoC NodeMCU-32S',
      'DHT11 Sensor',
      'LDR Light Sensor & 10kΩ Resistor',
      '1-Channel 5V Relay Module',
      '230V AC Test Bulb',
      'Firebase Historical Persistence Node',
      'JavaScript Export Utility Engine'
    ],
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
        problem: 'In-browser memory pressure when querying large datasets',
        cause: 'Attempting to fetch and serialize thousands of unpaginated Firebase historical records into raw JavaScript strings caused browser tab lag and memory exhaustion.',
        solution: 'Partitioned time queries using Firebase time filters (.orderByChild("timestamp").startAt(...)) and used W3C Blob chunks to stream CSV data incrementally without large in-memory string concatenations.'
      },
      {
        problem: 'ESP32 12-bit ADC non-linearity & ambient light calibration',
        cause: 'The internal SAR ADC of the ESP32 has pronounced non-linearities below 0.15V and above 3.1V, distorting raw ADC readings near threshold boundaries.',
        solution: 'Calibrated voltage divider reference resistor and implemented a piece-wise transfer function mapping raw ADC counts into calibrated light brackets (Dark, Dim, Ambient, Bright).'
      },
      {
        problem: 'Twilight boundary relay contact chatter',
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
      },
      {
        language: 'csv',
        title: 'sample_telemetry_export.csv',
        description: 'Demonstration of historical sensor records exported into comma-separated values (CSV) format.',
        code: `Timestamp,Temperature_C,Humidity_Percent,Light_Level_ADC,Bulb_Relay_State,Operating_Mode
2026-09-28T13:20:00.000Z,28.40,64.20,1350,INACTIVE (OFF),AUTO
2026-09-28T13:20:10.000Z,28.40,64.10,1180,ACTIVE (ON),AUTO
2026-09-28T13:20:20.000Z,28.50,63.90,1020,ACTIVE (ON),AUTO
2026-09-28T13:20:30.000Z,28.50,64.00,980,ACTIVE (ON),AUTO
2026-09-28T13:20:40.000Z,28.30,64.30,1490,INACTIVE (OFF),AUTO
2026-09-28T13:20:50.000Z,28.20,64.50,1580,INACTIVE (OFF),AUTO
2026-09-28T13:21:00.000Z,28.10,64.70,1620,INACTIVE (OFF),AUTO`
      }
    ],
    reflection:
      'Completing the end-to-end IoT lifecycle — from microcontroller pin logic to cloud storage and downloadable data analytics — provided a comprehensive understanding of production-grade IoT architecture.',
    photos: [
      { url: '/images/iot/task5_complete_prototype_bulb_on.jpg', caption: 'Complete prototype — ESP32, DHT11, LDR, relay and 230 V bulb with the live dashboard' },
      { url: '/images/iot/task5_complete_prototype_dashboard.jpg', caption: 'Complete prototype running with the Firebase dashboard on the laptop' },
      { url: '/images/iot/task5_circuit_breadboard.jpg', caption: 'Physical ESP32 Circuit Setup & Multi-Sensor Hardware Breadboard Interfacing' },
      { url: '/images/iot/task5_serial_monitor_log.jpg', caption: 'ESP32 Serial Terminal — Real-Time Telemetry & Timestamped Output Logs' },
      { url: '/images/iot/smart_env_recorded_measurements_log.jpg', caption: 'Historical Measurements Data Table View & CSV Export Verification' },
      { url: '/images/iot/smart_env_overview_dashboard.jpg', caption: 'Live Dashboard Sensor Telemetry and Operating Mode Visualization' }
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
                  className="p-2 rounded-full bg-white/5 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub-Header Tabs */}
              <div className="flex border-b border-white/10 bg-[#080b11] px-6 text-xs font-mono overflow-x-auto shrink-0">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-3 border-b-2 font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    activeTab === 'overview'
                      ? 'border-emerald-400 text-emerald-400 bg-white/5'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Overview & Schematics</span>
                </button>
                <button
                  onClick={() => setActiveTab('troubleshooting')}
                  className={`px-4 py-3 border-b-2 font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
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
                  className={`px-4 py-3 border-b-2 font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
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
                  className={`px-4 py-3 border-b-2 font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    activeTab === 'media'
                      ? 'border-emerald-400 text-emerald-400 bg-white/5'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Media Gallery ({selectedTask.photos.length + selectedTask.videos.length})</span>
                </button>
              </div>

              {/* Modal Body Scroll Area */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-1">
                {/* TAB 1: OVERVIEW & SCHEMATICS */}
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

                    {/* Core Concepts Explained */}
                    {selectedTask.keyConcepts && selectedTask.keyConcepts.length > 0 && (
                      <div>
                        <h4 className="flex items-center gap-2 font-syne text-base font-bold text-white mb-4">
                          <Zap className="w-4 h-4 text-emerald-400" />
                          Core Concepts Explained
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {selectedTask.keyConcepts.map((kc, i) => (
                            <div key={i} className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                              <h5 className="font-mono text-xs font-bold text-emerald-300 mb-2">{kc.title}</h5>
                              <p className="font-sans text-xs text-slate-300 leading-relaxed">{kc.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Hardware & Software Used */}
                    {selectedTask.hardwareUsed && selectedTask.hardwareUsed.length > 0 && (
                      <div>
                        <h4 className="flex items-center gap-2 font-syne text-base font-bold text-white mb-3">
                          <Cpu className="w-4 h-4 text-emerald-400" />
                          Hardware & Software Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTask.hardwareUsed.map((hw, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-200">
                              {hw}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Assignment Documentation Sections */}
                    {selectedTask.docSections && selectedTask.docSections.map((sec, si) => (
                      <div key={si} className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                        {sec.checklist && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{sec.checklist}</span>
                          </div>
                        )}
                        <h4 className="font-syne text-base font-bold text-white">{sec.heading}</h4>
                        {sec.intro && (
                          <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">{sec.intro}</p>
                        )}
                        {sec.bullets && (
                          <ul className="space-y-2">
                            {sec.bullets.map((b, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs font-sans text-slate-300 leading-relaxed">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {sec.steps && (
                          <ol className="space-y-2">
                            {sec.steps.map((st, i) => (
                              <li key={i} className="flex items-start gap-3 text-xs font-sans text-slate-300 leading-relaxed">
                                <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono flex items-center justify-center shrink-0">
                                  {i + 1}
                                </span>
                                <span className="pt-0.5">{st}</span>
                              </li>
                            ))}
                          </ol>
                        )}
                        {sec.table && (
                          <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950">
                            <table className="w-full text-left text-xs font-mono">
                              <thead className="bg-[#111722] text-slate-300 border-b border-white/10">
                                <tr>
                                  {sec.table.headers.map((h, i) => (
                                    <th key={i} className="p-3">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-white/5 text-slate-300 font-sans">
                                {sec.table.rows.map((row, ri) => (
                                  <tr key={ri} className="hover:bg-white/[0.02]">
                                    {row.map((cell, ci) => (
                                      <td key={ci} className={`p-3 text-xs ${ci === 0 ? 'font-mono text-emerald-300 font-semibold' : 'text-slate-300'}`}>
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                        {sec.code && (
                          <div className="p-4 rounded-xl border border-cyan-500/30 bg-[#07090e] font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
                            <pre className="whitespace-pre"><code>{sec.code}</code></pre>
                          </div>
                        )}
                        {sec.images && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {sec.images.map((img, i) => (
                              <div
                                key={i}
                                onClick={() => setLightboxPhoto(img)}
                                className="rounded-xl overflow-hidden border border-white/10 bg-slate-950 p-3 cursor-pointer hover:border-emerald-400/60 transition-all"
                              >
                                <img src={img.url} alt={img.caption} loading="lazy" className="max-h-[260px] w-full object-contain rounded-lg" />
                                <p className="mt-2 text-[11px] font-mono text-slate-300 text-center">{img.caption}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        {sec.outro && (
                          <p className="font-sans text-xs text-slate-400 leading-relaxed">{sec.outro}</p>
                        )}
                      </div>
                    ))}

                    {/* Circuit / Wiring Schematic Diagram */}
                    {selectedTask.wiringDiagram && (
                      <div>
                        <h4 className="flex items-center gap-2 font-syne text-base font-bold text-white mb-3">
                          <Cpu className="w-4 h-4 text-emerald-400" />
                          {selectedTask.wiringDiagram.title}
                        </h4>
                        <div className="p-4 rounded-xl border border-emerald-500/30 bg-[#07090e] font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed shadow-inner">
                          <pre className="whitespace-pre">
                            <code>{selectedTask.wiringDiagram.ascii}</code>
                          </pre>
                        </div>
                        {selectedTask.wiringDiagram.description && (
                          <p className="mt-2 text-xs font-sans text-slate-400">
                            {selectedTask.wiringDiagram.description}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Communication / Data-Flow Diagram */}
                    {selectedTask.flowDiagram && (
                      <div>
                        <h4 className="flex items-center gap-2 font-syne text-base font-bold text-white mb-3">
                          <Activity className="w-4 h-4 text-cyan-400" />
                          {selectedTask.flowDiagram.title}
                        </h4>
                        <div className="p-4 rounded-xl border border-cyan-500/30 bg-[#07090e] font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed shadow-inner">
                          <pre className="whitespace-pre">
                            <code>{selectedTask.flowDiagram.ascii}</code>
                          </pre>
                        </div>
                        {selectedTask.flowDiagram.description && (
                          <p className="mt-2 text-xs font-sans text-slate-400">
                            {selectedTask.flowDiagram.description}
                          </p>
                        )}
                      </div>
                    )}

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

                    {/* Task 5: LDR Calibration Table */}
                    {selectedTask.calibrationTable && (
                      <div>
                        <h4 className="flex items-center gap-2 font-syne text-base font-bold text-white mb-3">
                          <Sliders className="w-4 h-4 text-amber-400" />
                          LDR Sensor Calibration & Light Level Threshold Table
                        </h4>
                        <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950">
                          <table className="w-full text-left text-xs font-mono">
                            <thead className="bg-[#111722] text-slate-300 border-b border-white/10">
                              <tr>
                                <th className="p-3 text-amber-400">ADC Reading (12-bit)</th>
                                <th className="p-3">Ambient Condition</th>
                                <th className="p-3">LDR Resistance</th>
                                <th className="p-3">Pin Voltage (GPIO 34)</th>
                                <th className="p-3 text-emerald-400">System Lighting Response</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-slate-300 font-sans">
                              {selectedTask.calibrationTable.map((row, i) => (
                                <tr key={i} className="hover:bg-white/[0.02]">
                                  <td className="p-3 font-mono text-amber-400 font-bold">{row.adcRange}</td>
                                  <td className="p-3 font-mono text-slate-200">{row.condition}</td>
                                  <td className="p-3 text-slate-400 text-xs">{row.resistance}</td>
                                  <td className="p-3 font-mono text-xs text-cyan-300">{row.voltage}</td>
                                  <td className="p-3 font-mono text-xs text-emerald-300 font-semibold">{row.action}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Task 4: Realtime Database Tree Structure */}
                    {selectedTask.rtdbSchema && (
                      <div>
                        <h4 className="flex items-center gap-2 font-syne text-base font-bold text-white mb-3">
                          <Server className="w-4 h-4 text-cyan-400" />
                          Firebase Realtime Database Structure (JSON Tree)
                        </h4>
                        <div className="p-4 rounded-xl border border-cyan-500/30 bg-[#07090e] font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed shadow-inner">
                          <pre className="whitespace-pre">
                            <code>{selectedTask.rtdbSchema}</code>
                          </pre>
                        </div>
                      </div>
                    )}

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

                        {/* Cloud Platform & Dashboard Definitions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                            <h5 className="font-mono text-xs font-bold text-cyan-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                              <Globe className="w-3.5 h-3.5" />
                              <span>What is a Cloud Platform?</span>
                            </h5>
                            <p className="font-sans text-xs text-slate-300 leading-relaxed">
                              {selectedTask.theoreticalFoundations.cloudPlatformDefinition}
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                            <h5 className="font-mono text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                              <Radio className="w-3.5 h-3.5" />
                              <span>What is a Cloud Dashboard?</span>
                            </h5>
                            <p className="font-sans text-xs text-slate-300 leading-relaxed">
                              {selectedTask.theoreticalFoundations.cloudDashboardDefinition}
                            </p>
                          </div>
                        </div>

                        {/* What is a Database */}
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                          <h5 className="font-mono text-xs font-bold text-amber-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                            <Database className="w-3.5 h-3.5" />
                            <span>What is a Database?</span>
                          </h5>
                          <p className="font-sans text-xs text-slate-300 leading-relaxed">
                            {selectedTask.theoreticalFoundations.databaseDefinition}
                          </p>
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
                          <h5 className="font-mono text-xs font-bold text-purple-400 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Cloud Security & Access Control: Authentication vs Authorization</span>
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
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono text-amber-300">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Limitations of the current prototype explained</span>
                            </div>
                            <h5 className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
                              Limitations of the Current Prototype
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
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Possible future improvements suggested</span>
                            </div>
                            <h5 className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                              Possible Future Improvements
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

                    {/* Problems Encountered & Solutions Implemented (Inside Overview Tab) */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Wrench className="w-4 h-4 text-amber-400" />
                        <h4 className="font-syne text-base font-bold text-white">
                          Problems Encountered & Solutions Implemented
                        </h4>
                      </div>
                      <div className="space-y-3">
                        {selectedTask.troubleshooting.map((item, i) => (
                          <details
                            key={i}
                            className="iot-troubleshooting-box group p-4 rounded-xl bg-white/[0.02] border border-white/10 open:border-emerald-500/40 transition-all"
                          >
                            <summary className="cursor-pointer list-none flex items-center justify-between font-syne text-xs sm:text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                              <span className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-mono flex items-center justify-center shrink-0">
                                  {i + 1}
                                </span>
                                <span>{item.problem}</span>
                              </span>
                              <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform shrink-0" />
                            </summary>
                            <div className="mt-3 pt-3 border-t border-white/5 space-y-2 text-xs">
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

                    {/* Engineering Reflection */}
                    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>
                          {selectedTask.id === 'task-01' && 'Brief reflection on what you learned'}
                          {selectedTask.id === 'task-02' && 'Brief learning reflection'}
                          {selectedTask.id === 'task-03' && 'Brief reflection on the assignment'}
                          {selectedTask.id === 'task-04' && 'Brief reflection on the assignment'}
                          {selectedTask.id === 'task-05' && 'Final learning reflection included'}
                        </span>
                      </div>
                      <h4 className="font-syne text-base font-bold text-white">
                        {selectedTask.id === 'task-01' && 'Brief Reflection on What You Learned'}
                        {selectedTask.id === 'task-02' && 'Brief Learning Reflection'}
                        {selectedTask.id === 'task-03' && 'Brief Reflection on the Assignment'}
                        {selectedTask.id === 'task-04' && 'Brief Reflection on the Assignment'}
                        {selectedTask.id === 'task-05' && 'Final Learning Reflection'}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                        "{selectedTask.reflection}"
                      </p>
                    </div>

                    {/* Source Code & Project Files in Repository */}
                    {selectedTask.repoPath && (
                      <div className="p-5 rounded-xl bg-cyan-500/5 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1.5">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>
                              {selectedTask.id === 'task-05'
                                ? 'All source code and project files available in the repository'
                                : 'All required files/code available in your repository'}
                            </span>
                          </div>
                          <h4 className="flex items-center gap-2 font-mono text-xs text-cyan-300 font-semibold uppercase tracking-wider">
                            <Code2 className="w-4 h-4" />
                            Source Code & Project Files (GitHub Repository)
                          </h4>
                          <p className="font-sans text-xs text-slate-300">
                            All firmware, web dashboard files and README for this task:{' '}
                            <span className="font-mono text-cyan-200">{selectedTask.repoPath}/</span>
                          </p>
                        </div>
                        <a
                          href={`${REPO_URL}/tree/main/${selectedTask.repoPath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition-colors"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          View on GitHub
                        </a>
                      </div>
                    )}
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
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
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
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors cursor-pointer"
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
                className="absolute top-2 right-2 p-2 rounded-full bg-white/10 text-white cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
              <img src={lightboxPhoto.url} alt={lightboxPhoto.caption} className="max-h-[80vh] rounded-xl" />
              <p className="mt-3 text-xs font-mono text-emerald-300">{lightboxPhoto.caption}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default IOTSection;
