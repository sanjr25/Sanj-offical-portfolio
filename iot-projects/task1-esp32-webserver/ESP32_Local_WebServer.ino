#include <WiFi.h>
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
  Serial.println("
[OK] Connected. IP Address: " + WiFi.localIP().toString());

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
}
