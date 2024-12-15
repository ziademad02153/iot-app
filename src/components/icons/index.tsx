import {
  Power,
  Thermometer,
  Droplets,
  Sun,
  Wind,
  Lightbulb,
  Fan,
  Timer,
  Bell,
  Settings,
  Activity,
  Home,
  BarChart2,
  Lock,
  Unlock,
  WifiOff,
  Wifi,
  AlertTriangle,
  Check,
  X,
  ChevronRight,
  Plus,
  Trash,
  Edit,
  Save,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  Calendar,
  Clock,
  Zap,
  Gauge,
  Cloud,
  Smartphone
} from 'lucide-react';

export const IoTIcons = {
  // Power Controls
  Power,
  ToggleOn: ToggleRight,
  ToggleOff: ToggleLeft,
  
  // Sensors
  Temperature: Thermometer,
  Humidity: Droplets,
  Light: Sun,
  AirQuality: Wind,
  
  // Devices
  Lamp: Lightbulb,
  Fan,
  Timer,
  
  // Navigation & UI
  Bell,
  Notification: Bell,
  Settings,
  Activity,
  Home,
  Analytics: BarChart2,
  
  // Status
  Locked: Lock,
  Unlocked: Unlock,
  Offline: WifiOff,
  Online: Wifi,
  Warning: AlertTriangle,
  Success: Check,
  Error: X,
  
  // Actions
  Next: ChevronRight,
  Add: Plus,
  Delete: Trash,
  Edit,
  Save,
  Refresh: RefreshCw,
  
  // Time
  Schedule: Calendar,
  Time: Clock,
  
  // Energy & Performance
  Energy: Zap,
  Performance: Gauge,
  
  // Connectivity
  Cloud,
  Mobile: Smartphone
}; 