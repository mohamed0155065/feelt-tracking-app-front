"use client";
import React, { useEffect, useMemo, useState } from 'react';

// تعريف الـ Interface الخاص بالبيانات المستقبلة لمنع أي خطأ في الـ Type
interface DriverType {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  status: string;
}

interface TableProps {
  drivers: DriverType[];
  filter: string;
}

export const DriversTable: React.FC<TableProps> = ({ drivers, filter }) => {
const STATUS_MAP: Record<string, string> = {
  online: 'متصل',
  offline: 'غير متصل',
};

const filteredDrivers = useMemo(() => {

    if (filter === 'all') return drivers;

    const targetStatus = STATUS_MAP[filter];

    return drivers.filter(driver => driver.status === targetStatus);
  }, [drivers, filter]);

  return (
    <div className="w-full overflow-x-auto border border-slate-200 bg-white rounded-xl shadow-sm">
      <table className="w-full text-start border-collapse min-w-[700px]">
        <thead>
          <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-[11px] text-start font-bold">
            <th className="p-4 text-start">السائق</th>
            <th className="p-4 text-start">البريد الإلكتروني</th>
            <th className="p-4 text-start">الهاتف</th>
            <th className="p-4 text-start">المركبة</th>
            <th className="p-4 text-start">الحالة</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
          {filteredDrivers.map((d, i) => (
            <tr key={i} className="hover:bg-slate-50/40 transition-colors">
              <td className="p-4 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">
                  {d.name[0]}
                </div>
                <span className="font-bold text-slate-800">{d.name}</span>
              </td>
              <td className="p-4 font-mono text-slate-500 text-[11px]">{d.email}</td>
              <td className="p-4 font-mono text-slate-500 text-[11px]" dir="ltr">{d.phone}</td>
              <td className="p-4 font-mono text-slate-700 font-bold">{d.vehicle}</td>
              <td className="p-4">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${d.status === 'متصل' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                  }`}>
                  ● {d.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};