import React from 'react';
import { Zap, Clock, AlertTriangle, Power } from 'lucide-react';
import { Automation } from '../types/device';

interface AutomationCardProps {
  automation: Automation;
  onToggle: (id: string) => void;
  onEdit: (automation: Automation) => void;
}

const AutomationCard: React.FC<AutomationCardProps> = ({ automation, onToggle, onEdit }) => {
  const getTriggerIcon = () => {
    switch (automation.trigger.type) {
      case 'device':
        return <Zap className="w-5 h-5 text-blue-500" />;
      case 'schedule':
        return <Clock className="w-5 h-5 text-green-500" />;
      case 'condition':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {getTriggerIcon()}
          <h3 className="text-lg font-medium">{automation.name}</h3>
        </div>
        <button
          onClick={() => onToggle(automation.id)}
          className={`p-2 rounded-full ${
            automation.enabled ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 hover:bg-gray-400'
          }`}
        >
          <Power className="w-5 h-5 text-white" />
        </button>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div>
          <span className="font-medium">المشغل: </span>
          {automation.trigger.type === 'device' && 'عند تغير حالة الجهاز'}
          {automation.trigger.type === 'schedule' && 'جدول زمني'}
          {automation.trigger.type === 'condition' && 'شرط محدد'}
        </div>
        
        {automation.conditions.length > 0 && (
          <div>
            <span className="font-medium">الشروط: </span>
            {automation.conditions.length} شروط
          </div>
        )}
        
        <div>
          <span className="font-medium">الإجراءات: </span>
          {automation.actions.length} إجراءات
        </div>
      </div>

      <button
        onClick={() => onEdit(automation)}
        className="mt-4 w-full py-2 text-sm text-blue-600 hover:bg-blue-50 rounded"
      >
        تعديل الأتمتة
      </button>
    </div>
  );
};

export default AutomationCard;