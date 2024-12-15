import { useEffect, useState, useCallback, useMemo } from 'react';
import { IoTIcons } from './icons';
import { Device } from '../types/device';
import { DeviceService } from '../services/deviceService';

const BLYNK_AUTH_TOKEN = 'YOUR_AUTH_TOKEN';
const BLYNK_SERVER_URL = 'https://blynk.cloud';

const Dashboard = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const deviceService = useMemo(() => new DeviceService({
    token: BLYNK_AUTH_TOKEN,
    server: BLYNK_SERVER_URL
  }), []);

  const loadDevices = useCallback(async () => {
    try {
      const deviceList = await deviceService.getDevices();
      setDevices(deviceList);
      setError(null);
    } catch (err) {
      setError('فشل في تحميل الأجهزة');
      console.error('Error loading devices:', err);
    } finally {
      setLoading(false);
    }
  }, [deviceService]);

  useEffect(() => {
    loadDevices();
    const interval = setInterval(loadDevices, 10000);
    return () => clearInterval(interval);
  }, [loadDevices]);

  const handleToggleDevice = async (device: Device) => {
    try {
      await deviceService.updateDeviceSettings(device.id, { status: !device.status });
      setDevices(devices.map(d => 
        d.id === device.id 
          ? { ...d, status: !d.status }
          : d
      ));
    } catch (err) {
      console.error('Error toggling device:', err);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (error) {
    return <div className="bg-red-50 p-4 rounded-lg text-red-600">{error}</div>;
  }

  const activeDevices = devices.filter(d => d.online);

  return (
    <div className="space-y-6">
      {/* عنوان الصفحة */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <IoTIcons.Add className="h-5 w-5 ml-2" />
          إضافة جهاز جديد
        </button>
      </div>

      {/* نظرة عامة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <IoTIcons.Activity className="h-6 w-6 text-blue-500" />
            </div>
            <div className="mr-4">
              <p className="text-sm text-gray-500">الأجهزة النشطة</p>
              <h3 className="text-xl font-bold">{activeDevices.length} جهاز</h3>
            </div>
          </div>
        </div>
      </div>

      {/* الأجهزة النشطة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeDevices.map(device => (
          <div key={device.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                {getDeviceIcon(device.type)}
                <div className="mr-3">
                  <h3 className="font-medium">{device.name}</h3>
                  <p className="text-sm text-gray-500">{device.location}</p>
                </div>
              </div>
              {device.type !== 'TEMPERATURE' && device.type !== 'HUMIDITY' && (
                <button 
                  onClick={() => handleToggleDevice(device)}
                  className={`p-2 rounded-full ${
                    device.status 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <IoTIcons.Power className="h-5 w-5" />
                </button>
              )}
              {(device.type === 'TEMPERATURE' || device.type === 'HUMIDITY') && (
                <div className="text-lg font-medium">
                  {device.value}{device.settings?.unit}
                </div>
              )}
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>
                {getDeviceStatus(device)}
              </span>
              <span>
                آخر تحديث: {formatLastUpdate(device.lastUpdate)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getDeviceIcon = (type: Device['type']) => {
  switch (type) {
    case 'LIGHT':
      return <IoTIcons.Lamp className="h-8 w-8 text-yellow-500" />;
    case 'FAN':
      return <IoTIcons.Fan className="h-8 w-8 text-blue-500" />;
    case 'TEMPERATURE':
      return <IoTIcons.Temperature className="h-8 w-8 text-red-500" />;
    case 'HUMIDITY':
      return <IoTIcons.Humidity className="h-8 w-8 text-blue-500" />;
    case 'MOTION':
      return <IoTIcons.Activity className="h-8 w-8 text-purple-500" />;
  }
};

const getDeviceStatus = (device: Device) => {
  if (!device.online) return 'غير متصل';
  if (device.type === 'LIGHT' || device.type === 'FAN') {
    return device.status ? 'يعمل' : 'متوقف';
  }
  return `${device.value}${device.settings?.unit || ''}`;
};

const formatLastUpdate = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  if (diff < 60000) return 'الآن';
  if (diff < 3600000) return `منذ ${Math.floor(diff / 60000)} دقيقة`;
  return date.toLocaleTimeString('ar-SA');
};

export default Dashboard; 