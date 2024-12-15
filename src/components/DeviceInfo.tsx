import React from 'react';
import { Device, BlynkDevice } from '../types/device';
import { Bell, BellOff, Clock, Settings } from 'lucide-react';

interface DeviceInfoProps {
  device: Device | BlynkDevice;
  onToggleNotifications?: () => void;
}

const DeviceInfo: React.FC<DeviceInfoProps> = ({ device, onToggleNotifications }) => {
  const isBlynkDevice = (device: Device | BlynkDevice): device is BlynkDevice => {
    return 'pins' in device;
  };

  const hasNotificationsEnabled = isBlynkDevice(device) 
    ? device.notifications.length > 0 
    : device.hasNotifications;

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{device.name}</h3>
        <div className="flex items-center gap-2">
          {onToggleNotifications && (
            <button
              onClick={onToggleNotifications}
              className={`p-2 rounded-full ${
                hasNotificationsEnabled ? 'text-blue-500' : 'text-gray-400'
              }`}
            >
              {hasNotificationsEnabled ? <Bell size={20} /> : <BellOff size={20} />}
            </button>
          )}
          {device.lastUpdate && (
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock size={16} />
              {new Date(device.lastUpdate).toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      {isBlynkDevice(device) && (
        <div className="space-y-2 mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">حالة الاتصال:</span>
            <span className={`${
              device.connectionStatus === 'online' ? 'text-green-500' : 'text-red-500'
            }`}>
              {device.connectionStatus === 'online' ? 'متصل' : 'غير متصل'}
            </span>
          </div>
          {device.firmware.updateAvailable && (
            <div className="bg-yellow-50 p-2 rounded text-sm text-yellow-700">
              يتوفر تحديث جديد للبرنامج الثابت
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            {device.pins.map(pin => (
              <div key={pin.id} className="bg-gray-50 p-2 rounded">
                <div className="text-sm font-medium">منفذ {pin.number}</div>
                <div className="text-sm text-gray-600">{pin.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {device.settings && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-gray-600">
            <Settings size={16} />
            <span className="text-sm">الإعدادات</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {Object.entries(device.settings).map(([key, value]) => (
              <div key={key} className="text-sm">
                <span className="text-gray-500">{key}:</span>{' '}
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceInfo; 