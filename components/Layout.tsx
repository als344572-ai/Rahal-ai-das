
import React from 'react';
import { AppSection } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeSection, setActiveSection }) => {
  const navItems = [
    { id: AppSection.DASHBOARD, label: 'لوحة التحكم', icon: 'fa-chart-pie' },
    { id: AppSection.ADMIN, label: 'لوحة تحكم المدير', icon: 'fa-user-shield' },
    { id: AppSection.STATISTICS, label: 'الإحصائيات', icon: 'fa-poll' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        <div className="p-6">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
              <i className="fas fa-brain text-xl"></i>
            </div>
            <span className="text-xl font-bold tracking-tight">AI Unified</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <i className={`fas ${item.icon} w-5`}></i>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="bg-slate-800/50 p-4 rounded-xl">
            <p className="text-xs text-slate-400 uppercase font-semibold mb-2">User Info</p>
            <div className="flex items-center space-x-3">
              <img src="https://picsum.photos/seed/admin/40/40" className="rounded-full" alt="avatar" />
              <div>
                <p className="text-sm font-bold">Admin User</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-gray-800">
            {navItems.find(i => i.id === activeSection)?.label}
          </h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
              <i className="fas fa-bell"></i>
            </button>
            <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
              <i className="fas fa-cog"></i>
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
