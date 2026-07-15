"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'الخريطة المباشرة', href: '/dashboard', icon: '📊' },
    { name: 'السائقون', href: '/drivers', icon: '👥' },
    { name: 'المركبات', href: '/vehicles', icon: '🚚' },
    { name: 'سجل الرحلات', href: '/history', icon: '⏱️' },
    { name: 'تطبيق السائق', href: '/tracking', icon: '📱', isPwa: true },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-800 font-cairo select-none" dir="rtl">
      {/* الـ Sidebar الكحلي الداكن جداً كما في الـ Figma */}
      <aside className="w-64 bg-[#0B132B] flex flex-col justify-between text-slate-400 shrink-0 shadow-xl border-e border-slate-900">
        <div>
          {/* شعار التطبيق */}
          <div className="p-5 flex items-center gap-3 border-b border-slate-800/40 bg-[#080E21]">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white text-base shadow-lg shadow-blue-500/20">
              🚚
            </div>
            <div>
              <h2 className="font-bold text-sm text-white leading-none">FleetTrack</h2>
              <span className="text-[10px] text-slate-500 block mt-1">إدارة الأسطول</span>
            </div>
          </div>
          
          {/* عناصر التنقل */}
          <nav className="p-4 space-y-1">
            <p className="text-[10px] font-bold text-slate-600 px-3 mb-3 tracking-wider">القائمة الرئيسية</p>
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-300 group text-xs ${
                    isActive 
                      ? 'bg-blue-600/15 text-blue-400 font-bold border-r-4 border-blue-500 rounded-r-none' 
                      : 'hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-sm transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                  {item.isPwa && (
                    <span className="text-[9px] bg-slate-800 text-slate-500 group-hover:text-slate-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">PWA</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* ذيل الـ Sidebar ومسؤول النظام */}
        <div className="p-4 border-t border-slate-800/50 bg-[#080E21] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex items-center justify-center text-xs shadow-sm">
              م
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">مدير النظام</p>
              <p className="text-[10px] text-slate-500 font-mono">admin@fleet.sa</p>
            </div>
          </div>
          <button 
            onClick={() => router.push('/login')}
            className="text-[11px] text-red-400 hover:text-red-300 p-1.5 rounded-md hover:bg-red-500/5 transition-colors"
            title="تسجيل الخروج"
          >
            ↩
          </button>
        </div>
      </aside>

      {/* مساحة المحتوى الرئيسية الفاتحة لـ بقية العناصر */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}