import { FC } from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import { useSidebarState } from '../hooks/useSidebarState';

const Header: FC = () => {
  const { toggleSidebar } = useSidebarState();

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="mr-4 text-gray-500">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-blue-600 text-white mr-2">
            <span className="text-sm font-medium">T</span>
          </div>
          <span className="font-medium">Team 1</span>
          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Free</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-gray-500">
          <Search size={20} />
        </button>
        <button className="text-gray-500">⌘K</button>
        <button className="text-gray-500">
          <img src="/api/placeholder/24/24" alt="English" className="w-6 h-6" />
        </button>
        <button className="relative text-gray-500">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">4</span>
        </button>
        <button className="text-gray-500">
          <Settings size={20} />
        </button>
        <button>
          <img src="/api/placeholder/32/32" alt="Profile" className="w-8 h-8 rounded-full" />
        </button>
      </div>
    </header>
  );
};

export default Header;
