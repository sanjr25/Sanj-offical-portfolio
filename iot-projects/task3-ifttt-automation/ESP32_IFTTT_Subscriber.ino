#include <WiFi.h>
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
        Serial.printf("[IFTTT Event Received] Command: %s
", message);

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
}
