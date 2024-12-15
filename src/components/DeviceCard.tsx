import React, { useState } from 'react';
import { Device, BlynkDevice, DeviceSettings as DeviceSettingsType } from '../types/device';
import DeviceInfo from './DeviceInfo';
import DeviceSettingsPanel from './DeviceSettings';

interface DeviceCardProps {
  device: Device | BlynkDevice;
  onToggle: (id: string) => void;
  onUpdateSettings?: (settings: DeviceSettingsType) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({
  device,
  onToggle,
  onUpdateSettings,
}) => {
  const [showSettings, setShowSettings] = useState(false);

  const handleUpdateSettings = (settings: DeviceSettingsType) => {
    if (onUpdateSettings) {
      onUpdateSettings(settings);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <DeviceInfo 
          device={device}
          onToggleNotifications={() => {
            console.log('Toggle notifications for device:', device.id);
          }}
        />
        
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => onToggle(device.id)}
            className={`px-4 py-2 rounded ${
              device.status
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {device.status ? 'تشغيل' : 'إيقاف'}
          </button>
          
          {device.settings && (
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              {showSettings ? 'إغلاق' : 'الإعدادات'}
            </button>
          )}
        </div>

        {showSettings && device.settings && (
          <DeviceSettingsPanel
            device={device}
            onClose={() => setShowSettings(false)}
            onUpdate={handleUpdateSettings}
          />
        )}
      </div>
    </div>
  );
};

export default DeviceCard;