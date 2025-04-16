// pages/dashboard.js
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Search, ChevronRight, MoreHorizontal, MessageCircle, Eye, Share2 } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('all');
  
  return (
    <div className="flex min-h-screen bg-white">
      <Head>
        <title>Dashboard - Team 1</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Sidebar */}
      <aside className="w-48 border-r border-gray-200">
        <div className="p-4">
          <div className="flex items-center mb-6">
            <svg className="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
            </svg>
          </div>

          <nav className="mt-8 space-y-6">
            <div className="flex flex-col space-y-6">
              <NavItem icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" label="App" active={true} />
              <NavItem icon="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" label="Ecommerce" />
              <NavItem icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" label="Analytics" />
              <NavItem icon="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" label="Banking" />
              <NavItem icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" label="Booking" />
              <NavItem icon="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" label="File" />
              <NavItem icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" label="Course" />
              <NavItem icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" label="User" hasChevron={true} />
              <NavItem icon="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" label="Product" hasChevron={true} />
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="flex items-center px-6 py-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-indigo-600 rounded flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <div className="text-xl font-semibold text-gray-800">Team 1</div>
              <div className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">Free</div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-800">List</h1>

          {/* Breadcrumb */}
          <div className="mt-4 flex items-center space-x-2 text-gray-500">
            <Link href="#" className="hover:text-gray-700">Dashboard</Link>
            <span>•</span>
            <Link href="#" className="hover:text-gray-700">Blog</Link>
            <span>•</span>
            <span className="text-gray-400">List</span>
          </div>

          {/* Search */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="pl-11 pr-4 py-3 w-full border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <div className="border-b border-gray-200">
              <div className="flex space-x-8">
                <TabButton label="All" count="19" active={activeTab === 'all'} onClick={() => setActiveTab('all')} />
                <TabButton label="Published" count="12" active={activeTab === 'published'} onClick={() => setActiveTab('published')} />
                <TabButton label="Draft" count="7" active={activeTab === 'draft'} onClick={() => setActiveTab('draft')} />
              </div>
            </div>
          </div>

          {/* Post */}
          <div className="mt-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center">
                <div className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                  Draft
                </div>
                <div className="text-gray-400">16 Apr 2025</div>
              </div>

              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                The Future of Renewable Energy: Innovations and Challenges Ahead
              </h2>

              <p className="mt-2 text-gray-500">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has bee...
              </p>

              <div className="mt-6 flex items-center justify-between">
                <button className="text-gray-400">
                  <MoreHorizontal className="h-6 w-6" />
                </button>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-1 text-gray-400">
                    <MessageCircle className="h-5 w-5" />
                    <span>1.95k</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Eye className="h-5 w-5" />
                    <span>9.91k</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Share2 className="h-5 w-5" />
                    <span>9.12k</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Components
function NavItem({ icon, label, active = false, hasChevron = false }:any) {
  return (
    <Link
      href="#"
      className={`flex items-center text-sm ${
        active ? 'text-gray-800 font-medium' : 'text-gray-500 hover:text-gray-800'
      }`}
    >
      <div className="mr-3">
        <svg
          className={`h-5 w-5 ${active ? 'text-gray-700' : 'text-gray-400'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
        </svg>
      </div>
      <span>{label}</span>
      {hasChevron && (
        <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
      )}
    </Link>
  );
}

function TabButton({ label, count, active, onClick }:any) {
  return (
    <button
      onClick={onClick}
      className={`pb-4 relative ${
        active
          ? 'text-gray-900 font-medium'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      <div className="flex items-center">
        <span>{label}</span>
        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
          active 
            ? 'bg-gray-900 text-white' 
            : label === 'Published' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-600'
        }`}>
          {count}
        </span>
      </div>
      {active && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></div>
      )}
    </button>
  );
}