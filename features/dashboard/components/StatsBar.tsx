import React from 'react';
import { SystemStats } from '../types';

export const StatsBar: React.FC<{ stats: SystemStats }> = ({ stats }) => {
  const cards = [
    { title: 'إجمالي الأسطول', count: stats.total, color: 'text-blue-500', bg: 'bg-blue-500/5' },
    { title: 'متصل الآن', count: stats.online, color: 'text-emerald-500', bg: 'bg-emerald-500/5' },
    { title: 'خامل', count: stats.idle, color: 'text-amber-500', bg: 'bg-amber-500/5' },
    { title: 'غير متصل', count: stats.offline, color: 'text-zinc-500', bg: 'bg-zinc-500/5' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {cards.map((c, i) => (
        <div key={i} className={`p-4 border border-zinc-800 bg-zinc-900/40 rounded-xl flex items-center justify-between ${c.bg}`}>
          <span className="text-xs text-zinc-400 font-medium">{c.title}</span>
          <span className={`text-xl font-bold ${c.color}`}>{c.count}</span>
        </div>
      ))}
    </div>
  );
};