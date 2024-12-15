import { useState } from 'react';
import DeviceCard from './components/DeviceCard';
import SceneCard from './components/SceneCard';
import SensorChart from './components/SensorChart';
import { devices, scenes, generateSensorData } from './data/mockData';
import type { Device, DeviceSettings } from './types/device';
import { LayoutGrid, Wand2, LineChart } from 'lucide-react';

function App() {
  const [deviceList, setDeviceList] = useState<Device[]>(devices);
  const [activeTab, setActiveTab] = useState<'devices' | 'scenes' | 'analytics'>('devices');

  const handleToggleDevice = (id: string) => {
    setDeviceList(prev =>
      prev.map(device =>
        device.id === id ? { ...device, status: !device.status } : device
      )
    );
  };

  const handleUpdateSettings = (id: string, settings: DeviceSettings) => {
    setDeviceList(prev =>
      prev.map(device =>
        device.id === id ? { ...device, settings: { ...device.settings, ...settings } } : device
      )
    );
  };

  const handleActivateScene = (sceneId: string) => {
    const scene = scenes.find(s => s.id === sceneId);
    if (!scene) return;

    setDeviceList(prev =>
      prev.map(device => {
        const sceneDevice = scene.devices.find(d => d.deviceId === device.id);
        if (sceneDevice) {
          return {
            ...device,
            status: sceneDevice.status,
            value: sceneDevice.value || device.value
          };
        }
        return device;
      })
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'devices':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deviceList.map(device => (
              <DeviceCard
                key={device.id}
                device={device}
                onToggle={handleToggleDevice}
                onUpdateSettings={(settings) => handleUpdateSettings(device.id, settings)}
              />
            ))}
          </div>
        );
      case 'scenes':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenes.map(scene => (
              <SceneCard
                key={scene.id}
                scene={scene}
                onActivate={handleActivateScene}
              />
            ))}
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-6">
            <SensorChart
              title="درجة الحرارة"
              data={generateSensorData(24)}
              unit="°C"
            />
            <SensorChart
              title="استه��اك الطاقة"
              data={generateSensorData(24)}
              unit="kW"
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('devices')}
              className={`flex items-center gap-2 px-6 py-3 ${
                activeTab === 'devices'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-500'
              }`}
            >
              <LayoutGrid size={20} />
              الأجهزة
            </button>
            <button
              onClick={() => setActiveTab('scenes')}
              className={`flex items-center gap-2 px-6 py-3 ${
                activeTab === 'scenes'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-500'
              }`}
            >
              <Wand2 size={20} />
              المشاهد
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-6 py-3 ${
                activeTab === 'analytics'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-500'
              }`}
            >
              <LineChart size={20} />
              التحليلات
            </button>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
;/
export default App;