import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Device } from '../../../types/device';

interface DeviceGPSProps {
  device: Device;
  onUpdateLocation: (id: string, lat: number, lng: number) => void;
}

const DeviceGPS = ({ device, onUpdateLocation }: DeviceGPSProps) => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0
  });

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-medium">موقع الجهاز</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-gray-500">خط العرض:</span>
          <div className="text-lg font-medium">{location.latitude.toFixed(6)}</div>
        </div>
        <div>
          <span className="text-gray-500">خط الطول:</span>
          <div className="text-lg font-medium">{location.longitude.toFixed(6)}</div>
        </div>
      </div>

      <button
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              const newLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              };
              setLocation(newLocation);
              onUpdateLocation(device.id, newLocation.latitude, newLocation.longitude);
            });
          }
        }}
        className="mt-4 w-full py-2 text-sm text-blue-600 hover:bg-blue-50 rounded"
      >
        تحديث الموقع
      </button>
    </div>
  );
};

export default DeviceGPS; 