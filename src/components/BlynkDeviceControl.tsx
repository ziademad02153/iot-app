import React, { useEffect, useState, useCallback } from 'react';
import { BlynkService } from '../services/blynk';
import { BlynkDevice, BlynkPin } from '../types/device';

interface BlynkDeviceControlProps {
  device: BlynkDevice;
  onStatusChange: (status: boolean) => void;
}

const BlynkDeviceControl: React.FC<BlynkDeviceControlProps> = ({
  device,
  onStatusChange,
}) => {
  const [blynk, setBlynk] = useState<BlynkService>();
  const [connected, setConnected] = useState(false);
  const [pinValues, setPinValues] = useState<Record<number, number>>({});

  const checkConnection = useCallback(async (blynkService: BlynkService) => {
    const isConnected = await blynkService.connect();
    setConnected(isConnected);
    onStatusChange(isConnected);
  }, [onStatusChange]);

  useEffect(() => {
    const blynkService = new BlynkService(device.authToken, device.serverUrl);
    setBlynk(blynkService);

    checkConnection(blynkService);
    const interval = setInterval(() => checkConnection(blynkService), 30000);

    return () => clearInterval(interval);
  }, [device, checkConnection]);

  const handlePinChange = async (pin: BlynkPin, value: number) => {
    if (!blynk || !connected) return;

    try {
      await blynk.setPinValue(pin.number, value);
      setPinValues(prev => ({ ...prev, [pin.number]: value }));
    } catch (error) {
      console.error('Error updating pin value:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className={`text-sm ${connected ? 'text-green-500' : 'text-red-500'}`}>
          {connected ? 'متصل' : 'غير متصل'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {device.pins.map(pin => (
          <div key={pin.id} className="bg-gray-50 p-4 rounded-lg">
            <label className="text-sm font-medium text-gray-700">
              {pin.label || `منفذ ${pin.number}`}
            </label>
            {pin.mode === 'OUTPUT' && (
              <input
                type="range"
                min="0"
                max="255"
                value={pinValues[pin.number] || 0}
                onChange={(e) => handlePinChange(pin, Number(e.target.value))}
                className="w-full mt-2"
              />
            )}
            {pin.mode === 'INPUT' && (
              <div className="text-lg font-medium mt-2">
                {pinValues[pin.number] || 0}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlynkDeviceControl; 