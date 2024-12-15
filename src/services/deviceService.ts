import { Device, DeviceSettings, DeviceType } from '../types/device';
import { BlynkClient } from '../lib/blynk';

interface DeviceResponse {
  id: string;
  name: string;
  type: DeviceType;
  location: string;
  pin: number;
  settings: {
    minValue: number;
    maxValue: number;
    unit: string;
    autoMode: boolean;
  };
}

export class DeviceService {
  private blynk: BlynkClient;

  constructor() {
    this.blynk = new BlynkClient({
      token: process.env.REACT_APP_BLYNK_TOKEN || '',
      server: process.env.REACT_APP_BLYNK_SERVER || '',
    });
  }

  async getDevices(): Promise<Device[]> {
    try {
      const response = await this.blynk.getDevices();
      return this.mapDevices(response);
    } catch (error) {
      console.error('Error fetching devices:', error);
      return [];
    }
  }

  private mapDevices(devices: DeviceResponse[]): Device[] {
    return devices.map(device => ({
      id: device.id,
      name: device.name,
      type: device.type,
      status: false,
      value: 0,
      location: device.location,
      lastUpdate: new Date(),
      online: true,
      pin: device.pin,
      settings: this.mapDeviceSettings(device.type, device.settings)
    }));
  }

  private mapDeviceSettings(type: DeviceType, baseSettings: DeviceResponse['settings']): DeviceSettings {
    const base = {
      minValue: baseSettings.minValue,
      maxValue: baseSettings.maxValue,
      unit: baseSettings.unit,
      autoMode: baseSettings.autoMode
    };

    switch (type) {
      case 'LIGHT':
        return {
          ...base,
          brightness: 100,
          color: '#ffffff'
        };
      case 'TEMPERATURE':
        return {
          ...base,
          temperature: 22,
          mode: 'auto'
        };
      case 'FAN':
        return {
          ...base,
          speed: 0
        };
      case 'MOTION':
        return {
          ...base,
          sensitivity: 50,
          recordingEnabled: false
        };
      case 'HUMIDITY':
        return {
          ...base,
          targetHumidity: 45
        };
    }
  }

  async updateDeviceSettings(deviceId: string, settings: Partial<DeviceSettings>): Promise<void> {
    try {
      await this.blynk.updateDeviceSettings(deviceId, settings);
    } catch (error) {
      console.error('Error updating device settings:', error);
      throw error;
    }
  }
} 