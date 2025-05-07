import { useSidebarState } from '@/hooks/useSidebarState';
import { SidebarItem } from '@/types';
import { FC, useState } from 'react';
import CollapsedSidebar from './CollapsedSidebar';

const cameraMenuItems = [
  { name: 'Camera 1', icon: 'camera', href: '/camera/1' },
  { name: 'Camera 2', icon: 'camera', href: '/camera/2' },
  { name: 'Camera 3', icon: 'camera', href: '/camera/3' },
  { name: 'Camera 4', icon: 'camera', href: '/camera/4' },
];

const sidebarItems: SidebarItem[] = [
  { name: 'App', icon: 'home', href: '#' },
  { 
    name: 'Camera', 
    icon: 'camera', 
    href: '#',
    submenu: cameraMenuItems,
    isOpen: false
  },
  { name: 'Analytics', icon: 'bar-chart-2', href: '#' },
  { name: 'Banking', icon: 'dollar-sign', href: '#' },
  { name: 'Booking', icon: 'calendar', href: '#' },
  { name: 'File', icon: 'file', href: '#' },
  { name: 'Course', icon: 'book', href: '#' },
];

const Sidebar: FC = () => {
  const { isCollapsed } = useSidebarState();
  const [activeItem, setActiveItem] = useState('App');
  const [openSubmenus, setOpenSubmenus] = useState<{[key: string]: boolean}>({});

  const toggleSubmenu = (itemName: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  if (isCollapsed) {
    return <CollapsedSidebar items={sidebarItems} activeItem={activeItem} />;
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4">
        <a href="#" className="flex items-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4L28 12V28H4V12L16 4Z" fill="#4ADE80" />
          </svg>
        </a>
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <div className="px-4 py-2 space-y-1">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <div key={item.name}>
                <button
                  onClick={() => toggleSubmenu(item.name)}
                  className={`
                    flex items-center w-full px-4 py-3 rounded-xl transition
                    ${activeItem === item.name ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-100'}
                  `}
                >
                  <div className="flex items-center justify-center w-6 h-6 mr-3">
                    {item.name === 'App' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {item.name === 'Camera' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {item.name === 'Analytics' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {item.name === 'Banking' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {item.name === 'Booking' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {item.name === 'File' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9l-7-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13 2v7h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {item.name === 'Course' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.submenu && (
                    <svg className={`ml-2 transition-transform ${openSubmenus[item.name] ? 'rotate-180' : ''}`} width="20" height="20">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
                </button>
                {item.submenu && openSubmenus[item.name] && (
                  <div className="ml-6 pl-2 relative">
                    {/* Vertical line for submenu */}
                    <div className="absolute left-0 top-0 h-full w-px bg-gray-200"></div>
                    <div className="space-y-1">
                      {item.submenu.map((sub, idx) => (
                        <div key={sub.name} className="relative flex items-center">
                          {/* Horizontal line connecting to submenu item */}
                          <div className="absolute -left-2 top-1/2 w-2 h-px bg-gray-200"></div>
                          <button
                            className={`
                              block w-full text-left px-4 py-2 rounded-lg
                              ${activeItem === sub.name ? 'bg-gray-100 font-bold text-black' : 'text-gray-500 hover:bg-gray-50'}
                            `}
                            onClick={() => setActiveItem(sub.name)}
                          >
                            {sub.name}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;