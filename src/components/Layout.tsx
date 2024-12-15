import React from 'react';
import { IoTIcons } from './icons';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 rtl">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <IoTIcons.Cloud className="h-8 w-8 text-blue-500" />
              <span className="mr-2 text-xl font-bold text-gray-900">لوحة تحكم IoT</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <IoTIcons.Notification className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <IoTIcons.Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 bg-white shadow-sm h-screen fixed right-0">
          <nav className="mt-5 px-2">
            <a href="#" className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-blue-600 bg-blue-50">
              <IoTIcons.Home className="ml-3 h-6 w-6" />
              الرئيسية
            </a>
            <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <IoTIcons.Activity className="ml-3 h-6 w-6" />
              الأجهزة
            </a>
            <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <IoTIcons.Analytics className="ml-3 h-6 w-6" />
              التحليلات
            </a>
            <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <IoTIcons.Schedule className="ml-3 h-6 w-6" />
              الجدولة
            </a>
            <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <IoTIcons.Energy className="ml-3 h-6 w-6" />
              استهلاك الطاقة
            </a>
            <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <IoTIcons.Bell className="ml-3 h-6 w-6" />
              الإشعارات
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 mr-64 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout; 