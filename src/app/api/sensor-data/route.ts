import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        console.log("=====================================");
        console.log("POST /api/sensor-data");
        console.log("=====================================");

        // Generate simulated sensor data
        const sensorData = generateSensorData();
        console.log("`sensorData`: ", sensorData);

        // Return the sensor data
        return NextResponse.json({ data: sensorData});
    } catch (error) {
        console.error("Error fetching the data:", error);
        return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 });
    }
}

// Simulated sensor data generator
const generateSensorData = () => {
    return {
      timestamp: new Date().toISOString(),
      distance_cm: Math.round(100 + Math.random() * 10 - 5), // Random distance around 100 cm with +/- 5 cm noise
      floor: Math.floor(Math.random() * 5) + 1, // Random floor between 1 and 5
      current_status: Math.random() > 0.5 ? 1 : 0, // Random current status (0 or 1)
      co2_level_percent: Math.round(40 + Math.random() * 4 - 2), // Random CO2 level around 40% with +/- 2% noise
    };
  };