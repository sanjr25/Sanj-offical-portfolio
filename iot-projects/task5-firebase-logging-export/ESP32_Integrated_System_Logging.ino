#include <WiFi.h>
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
      Serial.printf("[HISTORICAL LOG] Stored entry at /history: Temp=%.1f, LDR=%d, Mode=%s
", temp, ldrVal, operatingMode.c_str());
    }
  }
}
