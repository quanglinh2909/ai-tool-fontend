import { FC } from 'react';
import { SidebarItem } from '../types';
import CollapsedSidebar from './CollapsedSidebar';
import { useSidebarState } from '../hooks/useSidebarState';

const sidebarItems: SidebarItem[] = [
  { name: 'App', icon: 'home', href: '#' },
  { name: 'Ecommerce', icon: 'shopping-bag', href: '#' },
  { name: 'Analytics', icon: 'bar-chart-2', href: '#' },
  { name: 'Banking', icon: 'dollar-sign', href: '#' },
  { name: 'Booking', icon: 'calendar', href: '#' },
  { name: 'File', icon: 'file', href: '#' },
  { name: 'Course', icon: 'book', href: '#' },
  { name: 'User', icon: 'user', href: '#', badge: 4 },
  { name: 'Product', icon: 'package', href: '#' },
];

const Sidebar: FC = () => {
  const { isCollapsed } = useSidebarState();
  const activeItem = 'App'; // This could be dynamic based on current page

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
          {sidebarItems.map((item) => (
            <a 
              key={item.name}
              href={item.href} 
              className={`flex items-center px-4 py-3 rounded-lg ${
                activeItem === item.name ? 'bg-gray-100' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center w-6 h-6 mr-3">
                {item.name === 'App' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {item.name === 'Ecommerce' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                {item.name === 'User' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {item.name === 'Product' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 11-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span>{item.name}</span>
              {item.badge && (
                <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-500 rounded-full">
                  {item.badge}
                </span>
              )}
              {item.name === 'User' || item.name === 'Product' ? (
                <svg className="ml-auto w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              ) : null}
            </a>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;