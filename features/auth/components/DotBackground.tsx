'use client';

import React from 'react';

export default function DotBackground({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950"
      style={{
        backgroundImage: "radial-gradient(at 0% 0%, rgba(29, 78, 216, 0.15) 0, transparent 50%), radial-gradient(at 50% 0%, rgba(15, 23, 42, 0.3) 0, transparent 50%), radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 0)",
        backgroundSize: "100% 100%, 100% 100%, 24px 24px",
      }}
    >
      {children}
    </div>
  );
}