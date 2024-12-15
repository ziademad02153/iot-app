// أنواع الأجهزة المدعومة
export type DeviceType = 'LIGHT' | 'FAN' | 'TEMPERATURE' | 'HUMIDITY' | 'MOTION';

export type DeviceMode = 'auto' | 'manual' | 'eco' | 'boost' | 'away' | 'sleep';

interface BaseDeviceSettings {
  minValue?: number;
  maxValue?: number;
  unit?: string;
  autoMode?: boolean;
}

export interface LightSettings extends BaseDeviceSettings {
  brightness: number;
  color: string;
}

export interface TemperatureSettings extends BaseDeviceSettings {
  temperature: number;
  mode: DeviceMode;
}

export interface FanSettings extends BaseDeviceSettings {
  speed: number;
}

export interface MotionSettings extends BaseDeviceSettings {
  sensitivity: number;
  recordingEnabled: boolean;
}

export interface HumiditySettings extends BaseDeviceSettings {
  targetHumidity: number;
}

export type DeviceSettings = 
  | LightSettings 
  | TemperatureSettings 
  | FanSettings 
  | MotionSettings 
  | HumiditySettings;

// واجهة الجدول الزمني
export interface Schedule {
  id: string;
  enabled: boolean;
  time: string;
  days: string[];
  action: 'on' | 'off' | 'custom';
  value?: number;
  repeat: boolean;
}

// واجهة نقطة البيانات
export interface DataPoint {
  timestamp: number;
  value: number;
  type: 'reading' | 'event' | 'alert';
}

// واجهة الجهاز
export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  status: boolean;
  value: number;
  location: string;
  lastUpdate: Date;
  online: boolean;
  pin: number;
  settings: DeviceSettings;
}

// واجهة المشهد
export interface Scene {
  id: string;
  name: string;
  icon?: string;
  devices: Array<{
    deviceId: string;
    status: boolean;
    value?: number;
  }>;
}

// واجهة الأتمتة
export interface Automation {
  id: string;
  name: string;
  enabled: boolean;
  trigger: Trigger;
  conditions: Condition[];
  actions: Action[];
}

// واجهة المشغل
export interface Trigger {
  type: 'device' | 'schedule' | 'condition';
  deviceId?: string;
  schedule?: Schedule;
  condition?: Condition;
}

// واجهة الشرط
export interface Condition {
  type: 'value' | 'time' | 'device';
  deviceId?: string;
  operator: '>' | '<' | '==' | '!=' | '>=' | '<=';
  value: number | boolean | string;
  unit?: string;
}

// واجهة الإجراء
export interface Action {
  type: 'device' | 'scene' | 'notification';
  targetId: string;
  action: 'on' | 'off' | 'setValue' | 'activate';
  value?: number | string;
}

// أنواع Blynk الجديدة
export type BlynkWidgetType = 
  | 'button'
  | 'slider'
  | 'gauge'
  | 'graph'
  | 'terminal'
  | 'table'
  | 'map'
  | 'rgb'
  | 'video'
  | 'timer';

export interface BlynkPin {
  id: string;
  number: number;
  value: number;
  label: string;
  mode: 'INPUT' | 'OUTPUT';
  type: 'VIRTUAL' | 'DIGITAL' | 'ANALOG';
  widget?: {
    type: 'BUTTON' | 'SLIDER' | 'GAUGE' | 'LCD' | 'TERMINAL';
    properties: Record<string, any>;
  };
}

export interface BlynkNotification {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: number;
  read: boolean;
  priority: 'low' | 'normal' | 'high';
}

export interface BlynkTimer {
  id: string;
  name: string;
  enabled: boolean;
  startTime: string;
  endTime?: string;
  days: string[];
  repeat: boolean;
  actions: BlynkTimerAction[];
}

export interface BlynkTimerAction {
  pinId: string;
  value: number | string | boolean;
}

export interface BlynkDevice extends Device {
  authToken: string;
  serverUrl?: string;
  connectionStatus: 'online' | 'offline' | 'connecting';
  lastSync: number;
  firmware: {
    version: string;
    updateAvailable: boolean;
    lastUpdate: number;
  };
  pins: BlynkPin[];
  widgets: BlynkWidget[];
  timers: BlynkTimer[];
  notifications: BlynkNotification[];
}

export interface BlynkWidget {
  id: string;
  type: BlynkWidgetType;
  name: string;
  pinId: string;
  settings: {
    min?: number;
    max?: number;
    color?: string;
    labels?: string[];
    unit?: string;
    decimals?: number;
    refreshRate?: number;
  };
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}