import { Device, Schedule, Scene, Automation } from '../types/device';

const schedules: Schedule[] = [
  {
    id: '1',
    enabled: true,
    time: '07:00',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    action: 'on',
    repeat: true
  },
  {
    id: '2',
    enabled: true,
    time: '23:00',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    action: 'off',
    repeat: true
  }
];

export const automations: Automation[] = [
  {
    id: '1',
    name: 'إضاءة تلقائية',
    enabled: true,
    trigger: {
      type: 'device',
      deviceId: '3' // motion sensor
    },
    conditions: [
      {
        type: 'value',
        operator: '<',
        value: 20,
        unit: 'lux'
      }
    ],
    actions: [
      {
        type: 'device',
        targetId: '1',
        action: 'on'
      }
    ]
  },
  {
    id: '2',
    name: 'توفير الطاقة',
    enabled: true,
    trigger: {
      type: 'schedule',
      schedule: {
        id: '3',
        enabled: true,
        time: '23:00',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        action: 'off',
        repeat: true
      }
    },
    conditions: [],
    actions: [
      {
        type: 'device',
        targetId: '1',
        action: 'off'
      }
    ]
  }
];

export const devices: Device[] = [
  {
    id: '1',
    name: 'غرفة المعيشة - إضاءة',
    type: 'light',
    status: false,
    room: 'غرفة المعيشة',
    settings: {
      brightness: 80,
      color: '#ffffff'
    },
    schedule: schedules,
    hasNotifications: true,
    lastUpdate: Date.now(),
    automations: [automations[0], automations[1]]
  },
  {
    id: '2',
    name: 'تكييف غرفة النوم',
    type: 'thermostat',
    status: true,
    value: 23,
    unit: '°C',
    room: 'غرفة النوم',
    settings: {
      temperature: 23,
      mode: 'auto'
    },
    hasNotifications: true,
    lastUpdate: Date.now()
  },
  {
    id: '3',
    name: 'حساس الحركة',
    type: 'motion',
    status: true,
    room: 'غرفة المعيشة',
    settings: {
      sensitivity: 80
    },
    hasNotifications: true,
    lastUpdate: Date.now()
  }
];

export const scenes: Scene[] = [
  {
    id: '1',
    name: 'وضع النوم',
    icon: 'moon',
    devices: [
      { deviceId: '1', status: false },
      { deviceId: '2', status: true, value: 24 }
    ]
  },
  {
    id: '2',
    name: 'وضع الراحة',
    icon: 'sun',
    devices: [
      { deviceId: '1', status: true },
      { deviceId: '2', status: true, value: 22 }
    ]
  }
];

export const generateSensorData = (hours: number) => {
  const data = [];
  const now = Date.now();
  
  for (let i = 0; i < hours; i++) {
    data.push({
      timestamp: now - (i * 3600000),
      value: Math.random() * 10 + 20,
      type: 'reading' as const
    });
  }
  
  return data;
};