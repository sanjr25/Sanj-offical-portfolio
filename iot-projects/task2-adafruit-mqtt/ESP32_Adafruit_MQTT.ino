#include <WiFi.h>
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
  Serial.println("
[OK] Wi-Fi Connected!");

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
}
