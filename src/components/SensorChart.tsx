import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SensorData } from '../types/device';

interface SensorChartProps {
  data: SensorData[];
  title: string;
  unit: string;
}

const SensorChart: React.FC<SensorChartProps> = ({ data, title, unit }) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatTime}
              style={{ fontFamily: 'Arial' }}
            />
            <YAxis unit={unit} style={{ fontFamily: 'Arial' }} />
            <Tooltip
              labelFormatter={formatTime}
              formatter={(value: number) => [`${value}${unit}`, '']}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SensorChart;