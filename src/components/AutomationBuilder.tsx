import React, { useState } from 'react';
import { Plus, Trash2, Clock, Zap } from 'lucide-react';
import { 
  Automation,
  Device, 
  BlynkDevice,
  BlynkPin,
  Trigger,
  Condition,
  Action
} from '../types/device';

interface AutomationBuilderProps {
  devices: (Device | BlynkDevice)[];
  onSave: (automation: Automation) => void;
  onCancel: () => void;
  initialAutomation?: Automation;
}

const AutomationBuilder: React.FC<AutomationBuilderProps> = ({
  devices,
  onSave,
  onCancel,
  initialAutomation,
}) => {
  const [automation, setAutomation] = useState<Automation>(
    initialAutomation || {
      id: crypto.randomUUID(),
      name: '',
      enabled: true,
      trigger: { type: 'device' },
      conditions: [],
      actions: [],
    }
  );

  const isBlynkDevice = (device: Device | BlynkDevice): device is BlynkDevice => {
    return 'pins' in device;
  };

  const renderDeviceTriggerOptions = () => {
    return devices.map((device) => {
      if (isBlynkDevice(device)) {
        return device.pins.map((pin: BlynkPin) => (
          <option key={`${device.id}-${pin.id}`} value={`${device.id}:${pin.id}`}>
            {device.name} - منفذ {pin.number}
          </option>
        ));
      }
      return (
        <option key={device.id} value={device.id}>
          {device.name}
        </option>
      );
    });
  };

  const addCondition = () => {
    setAutomation((prev) => ({
      ...prev,
      conditions: [
        ...prev.conditions,
        { type: 'value', operator: '>', value: 0, unit: '' },
      ],
    }));
  };

  const addAction = () => {
    setAutomation((prev) => ({
      ...prev,
      actions: [
        ...prev.actions,
        { type: 'device', targetId: '', action: 'on', value: 0 },
      ],
    }));
  };

  const removeCondition = (index: number) => {
    setAutomation((prev) => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index),
    }));
  };

  const removeAction = (index: number) => {
    setAutomation((prev) => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index),
    }));
  };

  const handleTriggerTypeChange = (type: Trigger['type']) => {
    setAutomation((prev) => ({
      ...prev,
      trigger: { type },
    }));
  };

  const handleConditionTypeChange = (index: number, type: Condition['type']) => {
    setAutomation((prev) => ({
      ...prev,
      conditions: prev.conditions.map((c, i) =>
        i === index ? { ...c, type } : c
      ),
    }));
  };

  const handleActionTypeChange = (index: number, type: Action['type']) => {
    setAutomation((prev) => ({
      ...prev,
      actions: prev.actions.map((a, i) =>
        i === index ? { ...a, type } : a
      ),
    }));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Zap className="w-6 h-6 text-blue-500" />
        إعداد الأتمتة
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            اسم الأتمتة
          </label>
          <input
            type="text"
            value={automation.name}
            onChange={(e) =>
              setAutomation((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full p-2 border rounded"
            placeholder="أدخل اسم الأتمتة"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            المشغل
          </h3>
          <select
            value={automation.trigger.type}
            onChange={(e) => handleTriggerTypeChange(e.target.value as Trigger['type'])}
            className="w-full p-2 border rounded"
          >
            <option value="device">تغير حالة الجهاز</option>
            <option value="schedule">جدول زمني</option>
            <option value="condition">شرط محدد</option>
          </select>
          {automation.trigger.type === 'device' && (
            <select
              className="mt-2 w-full p-2 border rounded"
              value={automation.trigger.deviceId || ''}
              onChange={(e) =>
                setAutomation((prev) => ({
                  ...prev,
                  trigger: { ...prev.trigger, deviceId: e.target.value },
                }))
              }
            >
              <option value="">اختر جهاز</option>
              {renderDeviceTriggerOptions()}
            </select>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium">الشروط</h3>
            <button
              onClick={addCondition}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Plus className="w-4 h-4" />
              إضافة شرط
            </button>
          </div>
          {automation.conditions.map((condition, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <select
                value={condition.type}
                onChange={(e) => handleConditionTypeChange(index, e.target.value as Condition['type'])}
                className="flex-1 p-2 border rounded"
              >
                <option value="value">قيمة</option>
                <option value="time">وقت</option>
                <option value="device">جهاز</option>
              </select>
              <button
                onClick={() => removeCondition(index)}
                className="p-2 text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium">الإجراءات</h3>
            <button
              onClick={addAction}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Plus className="w-4 h-4" />
              إضافة إجراء
            </button>
          </div>
          {automation.actions.map((action, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <select
                value={action.type}
                onChange={(e) => handleActionTypeChange(index, e.target.value as Action['type'])}
                className="flex-1 p-2 border rounded"
              >
                <option value="device">تحكم بجهاز</option>
                <option value="scene">تفعيل مشهد</option>
                <option value="notification">إرسال إشعار</option>
              </select>
              <button
                onClick={() => removeAction(index)}
                className="p-2 text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            إلغاء
          </button>
          <button
            onClick={() => onSave(automation)}
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
          >
            حفظ الأتمتة
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutomationBuilder;
            ))}