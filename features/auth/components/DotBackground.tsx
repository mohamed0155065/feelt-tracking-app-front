"use client";

import React from "react";
import { cn } from "@/lib/utils"; // لو عندك helper زي clsx/cn

interface DotBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function DotBackground({
  children,
  className,
}: DotBackgroundProps) {
  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center relative overflow-hidden",
        "bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950",
        "bg-[radial-gradient(at_0%_0%,rgba(29,78,216,0.15)_0,transparent_50%),radial-gradient(at_50%_0%,rgba(15,23,42,0.3)_0,transparent_50%),radial-gradient(rgba(255,255,255,0.03)_1px,transparent_0)]",
        "bg-[length:100%_100%,100%_100%,24px_24px]",
        className
      )}
    >
      {children}
    </div>
  );
}