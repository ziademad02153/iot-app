import { Device, DeviceSettings as DeviceSettingsType, DeviceMode } from '../types/device';

interface DeviceSettingsProps {
  device: Device;
  onClose: () => void;
  onUpdate: (settings: Partial<DeviceSettingsType>) => void;
}

const DeviceSettings: React.FC<DeviceSettingsProps> = ({
  device,
  onClose,
  onUpdate,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let newSettings: Partial<DeviceSettingsType> = {};

    switch (device.type) {
      case 'LIGHT': {
        const lightSettings: Partial<DeviceSettingsType> = {
          brightness: Number(formData.get('brightness')),
          color: formData.get('color')?.toString() || '#ffffff'
        };
        newSettings = lightSettings;
        break;
      }
      case 'TEMPERATURE': {
        const tempSettings: Partial<DeviceSettingsType> = {
          temperature: Number(formData.get('temperature')),
          mode: formData.get('mode')?.toString() as DeviceMode
        };
        newSettings = tempSettings;
        break;
      }
      case 'FAN': {
        const fanSettings: Partial<DeviceSettingsType> = {
          speed: Number(formData.get('speed'))
        };
        newSettings = fanSettings;
        break;
      }
      case 'MOTION': {
        const motionSettings: Partial<DeviceSettingsType> = {
          sensitivity: Number(formData.get('sensitivity')),
          recordingEnabled: formData.get('recordingEnabled') === 'true'
        };
        newSettings = motionSettings;
        break;
      }
    }

    onUpdate(newSettings);
  };

  const renderSettings = () => {
    const settings = device.settings;

    switch (device.type) {
      case 'LIGHT': {
        const lightSettings = settings as Extract<DeviceSettingsType, { brightness: number }>;
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">السطوع</label>
              <input
                type="range"
                name="brightness"
                min="0"
                max="100"
                defaultValue={lightSettings.brightness}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">اللون</label>
              <input
                type="color"
                name="color"
                defaultValue={lightSettings.color}
                className="w-full h-10"
              />
            </div>
          </>
        );
      }
      case 'TEMPERATURE': {
        const tempSettings = settings as Extract<DeviceSettingsType, { temperature: number }>;
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">درجة الحرارة</label>
              <input
                type="number"
                name="temperature"
                min="16"
                max="30"
                defaultValue={tempSettings.temperature}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">الوضع</label>
              <select
                name="mode"
                defaultValue={tempSettings.mode}
                className="w-full p-2 border rounded"
              >
                <option value="auto">تلقائي</option>
                <option value="manual">يدوي</option>
                <option value="eco">اقتصادي</option>
                <option value="boost">تعزيز</option>
                <option value="away">خارج المنزل</option>
                <option value="sleep">وضع النوم</option>
              </select>
            </div>
          </>
        );
      }
      case 'FAN': {
        const fanSettings = settings as Extract<DeviceSettingsType, { speed: number }>;
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">السرعة</label>
            <input
              type="range"
              name="speed"
              min="0"
              max="100"
              defaultValue={fanSettings.speed}
              className="w-full"
            />
          </div>
        );
      }
      case 'MOTION': {
        const motionSettings = settings as Extract<DeviceSettingsType, { sensitivity: number }>;
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">الحساسية</label>
              <input
                type="range"
                name="sensitivity"
                min="0"
                max="100"
                defaultValue={motionSettings.sensitivity}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="recordingEnabled"
                  defaultChecked={motionSettings.recordingEnabled}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">تمكين التسجيل</span>
              </label>
            </div>
          </>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <form onSubmit={handleSubmit}>
        {renderSettings()}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded"
          >
            حفظ
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeviceSettings;