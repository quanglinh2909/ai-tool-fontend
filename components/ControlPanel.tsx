// components/ControlPanel.tsx
import { Trash2, MapPin } from 'lucide-react';

interface ControlPanelProps {
  onClear: () => void;
  onGetCoordinates: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onClear, onGetCoordinates }) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={onClear}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
      >
        <Trash2 size={20} />
        Xoá hết
      </button>
      <button
        onClick={onGetCoordinates}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
      >
        <MapPin size={20} />
        Lấy tọa độ
      </button>
    </div>
  );
};

export default ControlPanel;