#include <WiFi.h>
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
      Serial.printf("Telemetry Pushed -> Temp: %.1f C | Hum: %.1f %% | LDR: %d
", temp, hum, rawLDR);
    }
  }

  // Real-time listener for manual cloud bulb toggle
  if (Firebase.RTDB.getBool(&fbdo, "/appliances/bulbState")) {
    bool bulbState = fbdo.to<bool>();
    digitalWrite(RELAYPIN, bulbState ? HIGH : LOW);
  }
}
