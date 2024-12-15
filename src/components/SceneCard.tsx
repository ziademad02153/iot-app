import React from 'react';
import { Moon, Users, Sun, Coffee } from 'lucide-react';
import { Scene } from '../types/device';

interface SceneCardProps {
  scene: Scene;
  onActivate: (id: string) => void;
}

const SceneCard: React.FC<SceneCardProps> = ({ scene, onActivate }) => {
  const getIcon = () => {
    switch (scene.icon) {
      case 'moon':
        return <Moon className="w-6 h-6 text-indigo-500" />;
      case 'users':
        return <Users className="w-6 h-6 text-orange-500" />;
      case 'sun':
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'coffee':
        return <Coffee className="w-6 h-6 text-brown-500" />;
      default:
        return null;
    }
  };

  return (
    <button
      onClick={() => onActivate(scene.id)}
      className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow w-full text-right"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getIcon()}
          <h3 className="text-lg font-medium">{scene.name}</h3>
        </div>
        <span className="text-sm text-gray-500">
          {scene.devices.length} أجهزة
        </span>
      </div>
    </button>
  );
};

export default SceneCard;