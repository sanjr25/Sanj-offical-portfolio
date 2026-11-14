/**
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
  const csvString = [headers.join(","), ...rows.map(r => r.join(","))].join("
");

  // Create W3C Blob for memory-safe chunking
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  // Synthesize anchor click to trigger instant download
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `iot_telemetry_historical_log_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();

  // Cleanup blob allocation
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
