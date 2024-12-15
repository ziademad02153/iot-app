import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DataPoint } from '../types/device';

interface DeviceHistoryProps {
  data: DataPoint[];
  title: string;
  unit?: string;
}

const DeviceHistory: React.FC<DeviceHistoryProps> = ({ data, title, unit }) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getEventColor = (type: DataPoint['type']) => {
    switch (type) {
      case 'alert':
        return '#ef4444';
      case 'event':
        return '#3b82f6';
      default:
        return '#10b981';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
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
            <YAxis
              unit={unit}
              style={{ fontFamily: 'Arial' }}
            />
            <Tooltip
              labelFormatter={formatTime}
              formatter={(value: number) => [`${value}${unit || ''}`, '']}
            />
            {['reading', 'event', 'alert'].map((type) => (
              <Line
                key={type}
                type="monotone"
                dataKey="value"
                data={data.filter((d) => d.type === type)}
                stroke={getEventColor(type as DataPoint['type'])}
                strokeWidth={2}
                dot={type !== 'reading'}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DeviceHistory;