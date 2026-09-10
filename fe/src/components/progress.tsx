import React from "react";

interface RankProgressProps {
  label?: string;
  current?: number;
  target?: number;
  percentChange?: number;
}

export default function RankProgress({
  label = "PROGRESS",
  current = 1850,
  target = 2500,
  percentChange = 74,
}: RankProgressProps) {
  const percent = Math.min(100, (current / target) * 100);
  const formatNumber = (n: number) => n.toLocaleString("vi-VN");

  return (
    <div className="w-full max-w-xl rounded-2xl bg-linear-to-br from-[#0c1220] to-[#131b2e] px-6 py-5 shadow-lg">
      {/* Top row */}
      <div className="mb-3.5 flex items-baseline justify-between">
        <span className="text-xs font-bold tracking-widest text-emerald-300">
          {label}
        </span>

        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-extrabold text-emerald-400">
            {formatNumber(current)}
          </span>
          <span className="text-sm font-medium text-slate-400">
            / {formatNumber(target)} EXP
          </span>
          <span className="ml-1 text-sm font-bold text-emerald-400">
            +{percentChange}%
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-linear-to-r from-emerald-400 to-teal-200 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}