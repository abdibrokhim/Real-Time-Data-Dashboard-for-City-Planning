'use client'

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';

const Dashboard = () => {
  const [sensorData, setSensorData] = useState<any[]>([]);
  const [refreshInterval, setRefreshInterval] = useState(2000);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/sensor-data'); // Replace with real API endpoint
      const sensorData = response.data.data;
      
      setSensorData((prevData) => [...prevData, sensorData]);
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  const data = {
    labels: sensorData.map((data) => new Date(data.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Distance (cm)',
        data: sensorData.map((data) => data.distance_cm),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'CO2 Level (%)',
        data: sensorData.map((data) => data.co2_level_percent),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Real-Time Data Dashboard for City Planning</h1>
      <div className="mb-4">
        <label htmlFor="refreshInterval" className="block mb-2">Refresh Interval (ms):</label>
        <input
          type="number"
          id="refreshInterval"
          value={refreshInterval}
          onChange={(e) => setRefreshInterval(Number(e.target.value))}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="bg-white p-6 rounded shadow">
        <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default Dashboard;
