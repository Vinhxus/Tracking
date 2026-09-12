import type { ReactNode } from "react";
import { THEME_STYLES, type Theme } from "./theme";
 
export interface PartProps {
  icon: ReactNode;
  title: string; 
  theme: Theme;
  percent: number; 
  goalLabel?: string;
}

export default function Part({
  icon,
  title,
  theme,
  percent,
  goalLabel = "GOAL",
}: PartProps){
    const s = THEME_STYLES[theme];
    const clamped = Math.min(100, Math.max(0, percent));
    return(
    <div
      className={`w-full max-w-xs rounded-xl border border-slate-800 border-l-4 ${s.border} bg-[#0d1424] px-4 py-4`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <span
            className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-md ${s.iconBg} ${s.iconColor}`}
          >
            {icon}
          </span>
          <div>
            <div className="text-base font-semibold text-slate-100">
              {title}
            </div>
          </div>
        </div>

      </div>
 
      {/* Số liệu chính + % mục tiêu */}
      <div className="mb-2 flex items-end justify-between">
        <div className="text-right">
          <div className={`text-xl font-extrabold ${s.percentText}`}>
            {clamped}%
          </div>
          <div className="text-[10px] font-bold tracking-widest text-slate-500">
            {goalLabel}
          </div>
        </div>
      </div>
 
      {/* Progress bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full bg-linear-to-r ${s.barFrom} ${s.barTo} transition-all duration-500`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}