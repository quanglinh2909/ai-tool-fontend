// components/ControlPanel.tsx
import {Trash2, MapPin} from 'lucide-react';
import {useState} from "react";

interface ControlPanelProps {
    onClear: () => void;
    onGetCoordinates: () => void;
    arrowAngle: number;
    setArrowAngle: (angle: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({onClear, onGetCoordinates,arrowAngle,setArrowAngle}) => {

    return (
        <div className="flex space-x-4">
            <button
                onClick={onClear}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
            >
                <Trash2 size={20}/>
                Xoá hết
            </button>
            <button
                onClick={onGetCoordinates}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
                <MapPin size={20}/>
                Lấy tọa độ
            </button>
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Arrow Angle: {arrowAngle}°
                </label>
                <input
                    type="range"
                    min="0"
                    max="360"
                    value={arrowAngle}
                    onChange={(e) => setArrowAngle(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
            </div>

        </div>
    );
};

export default ControlPanel;