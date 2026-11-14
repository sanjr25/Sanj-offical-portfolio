// Firebase Modular Web Dashboard (SDK v10/v11)
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
};
