import type { ReactNode } from "react";
 
type Theme = "emerald" | "blue" | "purple" | "orange" | "pink";
 
// Khai báo tường minh từng class Tailwind cho mỗi theme,
// tránh ghép chuỗi động (Tailwind JIT sẽ không nhận ra class ghép runtime).
const THEME_STYLES: Record<
  Theme,
  {
    border: string;
    iconBg: string;
    iconColor: string;
    percentText: string;
    barFrom: string;
    barTo: string;
  }
> = {
  emerald: {
    border: "border-l-emerald-400",
    iconBg: "bg-emerald-400/10",
    iconColor: "text-emerald-400",
    percentText: "text-emerald-400",
    barFrom: "from-emerald-400",
    barTo: "to-teal-200",
  },
  blue: {
    border: "border-l-blue-400",
    iconBg: "bg-blue-400/10",
    iconColor: "text-blue-400",
    percentText: "text-blue-400",
    barFrom: "from-blue-400",
    barTo: "to-cyan-200",
  },
  purple: {
    border: "border-l-purple-400",
    iconBg: "bg-purple-400/10",
    iconColor: "text-purple-400",
    percentText: "text-purple-400",
    barFrom: "from-purple-400",
    barTo: "to-violet-200",
  },
  orange: {
    border: "border-l-orange-400",
    iconBg: "bg-orange-400/10",
    iconColor: "text-orange-400",
    percentText: "text-orange-400",
    barFrom: "from-orange-400",
    barTo: "to-rose-300",
  },
  pink: {
    border: "border-l-pink-400",
    iconBg: "bg-pink-400/10",
    iconColor: "text-pink-400",
    percentText: "text-pink-400",
    barFrom: "from-pink-400",
    barTo: "to-rose-300",
  }
};
 
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