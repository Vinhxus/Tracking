import type { ReactNode } from "react";
import { HeartPulse, Brain, Sparkles, Users } from "lucide-react";

export type Theme = "emerald" | "blue" | "purple" | "orange" ;

// Tag dùng ở form tạo activity (CreatePage) — mapping 1-1 sang Theme/màu/icon
// để card mới và mục (TitleCard) luôn đồng bộ nhau.
export type Tag = "Health" | "Study" | "Spirit" | "Social";

export interface TagMeta {
  theme: Theme;
  accent: string;
  icon: ReactNode;
  label: string; // nhãn hiển thị ở TitleCard
}

export const TAG_META: Record<Tag, TagMeta> = {
  Health: {
    theme: "emerald",
    accent: "#34D399",
    icon: <HeartPulse size={20} />,
    label: "Health",
  },
  Study: {
    theme: "blue",
    accent: "#38BDF8",
    icon: <Brain size={20} />,
    label: "Study",
  },
  Spirit: {
    theme: "purple",
    accent: "#A78BFA",
    icon: <Sparkles size={20} />,
    label: "Spirit",
  },
  Social: {
    theme: "orange",
    accent: "#FB7185",
    icon: <Users size={20} />,
    label: "Social",
  },
};

export const TAG_ORDER: Tag[] = ["Health", "Study", "Spirit", "Social"];
 
// Khai báo tường minh từng class Tailwind cho mỗi theme,
// tránh ghép chuỗi động (Tailwind JIT sẽ không nhận ra class ghép runtime).
export interface ThemeStyle {
  border: string;
  iconBg: string;
  iconColor: string;
  percentText: string;
  barFrom: string;
  barTo: string;
}

export const THEME_STYLES: Record<Theme, ThemeStyle> = {
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
};