export interface BlynkDeviceInfo {
  id: string;
  name: string;
  status: {
    online: boolean;
    lastActivity: number;
    firmware: string;
    ip: string;
    ssid: string;
    rssi: number;
  };
  template: {
    id: string;
    name: string;
  };
  metadata: {
    boardType: string;
    createdAt: number;
    updatedAt: number;
  };
}

export interface BlynkConfig {
  serverUrl: string;
  authToken: string;
  deviceId: string;
}

export interface BlynkPin {
  id: string;
  number: number;
  value: number;
  mode: 'INPUT' | 'OUTPUT';
  type: 'VIRTUAL' | 'DIGITAL' | 'ANALOG';
}

export interface BlynkNotification {
  id: string;
  message: string;
  timestamp: number;
  priority: 'LOW' | 'NORMAL' | 'HIGH';
} 