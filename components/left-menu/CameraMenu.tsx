import { FC, useState } from 'react';

interface CameraMenuItem {
  name: string;
  icon: string;
  href: string;
  badge?: string;
}

const cameraMenuItems: CameraMenuItem[] = [
  { name: 'Camera 1', icon: 'camera', href: '/camera/1' },
  { name: 'Camera 2', icon: 'camera', href: '/camera/2' },
  { name: 'Camera 3', icon: 'camera', href: '/camera/3' },
  { name: 'Camera 4', icon: 'camera', href: '/camera/4' },
];

interface CameraMenuProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const CameraMenu: FC<CameraMenuProps> = ({ isCollapsed, onToggleCollapse }) => {
  const [activeItem, setActiveItem] = useState('Camera 1');

  if (isCollapsed) {
    return (
      <aside className="w-16 bg-white border-r border-gray-200 flex flex-col items-center shadow-lg">
        <div className="p-4 w-full flex justify-center">
          <button 
            onClick={onToggleCollapse}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto w-full">
          {cameraMenuItems.map((item) => (
            <div key={item.name} className="relative py-2 flex justify-center">
              <button 
                onClick={() => setActiveItem(item.name)}
                className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                  activeItem === item.name 
                    ? 'bg-blue-50 text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {item.badge && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </nav>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-lg">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="ml-2 text-lg font-semibold text-gray-800">Cameras</span>
          </div>
          <button 
            onClick={onToggleCollapse}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <div className="px-4 py-2 space-y-1">
          {cameraMenuItems.map((item) => (
            <button 
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                activeItem === item.name 
                  ? 'bg-blue-50 text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center w-6 h-6 mr-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-medium">{item.name}</span>
              {item.badge && (
                <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default CameraMenu; 