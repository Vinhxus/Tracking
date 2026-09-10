import { useState } from "react";
import {
  Flame, Zap, Search, Bell, Settings, Plus, Dumbbell, GlassWater,
  Moon, Cookie, Languages, BookOpen, GraduationCap, Clock,
  NotebookPen, Sparkles, TreePine, CloudRain, Users, HeartHandshake,
  ThumbsUp, MessageSquareWarning, LayoutGrid, Activity, BarChart3, Map,
  ChevronRight,
} from "lucide-react";

// ---- category config -------------------------------------------------
const CATEGORIES = [
  {
    key: "health",
    name: "Sức Khỏe",
    subtitle: "VITALITY CORE",
    icon: Activity,
    accent: "#2DD4BF",
    glow: "rgba(45,212,191,0.18)",
    score: 94,
    habits: [
      { title: "Tập gym", sub: "3 buổi / tuần", points: 30, icon: Dumbbell, on: true },
      { title: "Uống đủ 2L nước", sub: "Hydration hàng ngày", points: 15, icon: GlassWater, on: true },
      { title: "Ngủ muộn sau 12h", sub: "Vi phạm nhịp sinh học", points: -20, icon: Moon, on: true },
      { title: "Ăn đồ ngọt", sub: "Vượt khẩu phần", points: -15, icon: Cookie, on: true },
    ],
  },
  {
    key: "study",
    name: "Học Tập",
    subtitle: "INTELLECT FLUX",
    icon: GraduationCap,
    accent: "#60A5FA",
    glow: "rgba(96,165,250,0.18)",
    score: 88,
    habits: [
      { title: "Học ngoại ngữ 30p", sub: "Speaking practice", points: 25, icon: Languages, on: true },
      { title: "Đọc sách chuyên sâu", sub: "Deep reading", points: 20, icon: BookOpen, on: true },
      { title: "Hoàn thành khóa học", sub: "Mastery milestone", points: 35, icon: GraduationCap, on: true },
      { title: "Trì hoãn công việc", sub: "Lỡ deadline", points: -25, icon: Clock, on: true },
    ],
  },
  {
    key: "mind",
    name: "Tinh Thần",
    subtitle: "INNER SANCTUARY",
    icon: Sparkles,
    accent: "#C084FC",
    glow: "rgba(192,132,252,0.18)",
    score: 91,
    habits: [
      { title: "Viết nhật ký", sub: "Phản tư cuối ngày", points: 15, icon: NotebookPen, on: true },
      { title: "Thiền định", sub: "Chánh niệm / ngày", points: 20, icon: Sparkles, on: true },
      { title: "Đi bộ thiên nhiên", sub: "Grounding", points: 15, icon: TreePine, on: true },
      { title: "Suy nghĩ tiêu cực", sub: "Vòng lặp lo âu", points: -15, icon: CloudRain, on: true },
    ],
  },
  {
    key: "social",
    name: "Xã Hội",
    subtitle: "TRIBE RESONANCE",
    icon: Users,
    accent: "#FB923C",
    glow: "rgba(251,146,60,0.18)",
    score: 85,
    habits: [
      { title: "Gặp bạn bè", sub: "Kết nối trực tiếp", points: 25, icon: Users, on: true },
      { title: "Giúp đỡ người khác", sub: "Cho đi giá trị", points: 30, icon: HeartHandshake, on: true },
      { title: "Lời khen đồng nghiệp", sub: "Nâng đỡ tinh thần", points: 10, icon: ThumbsUp, on: true },
      { title: "Tranh cãi vô bổ", sub: "Xung đột không cần thiết", points: -20, icon: MessageSquareWarning, on: true },
    ],
  },
];

const NAV = [
  { label: "Tổng quan", icon: LayoutGrid },
  { label: "Hoạt động", icon: Activity, active: true },
  { label: "Thống kê", icon: BarChart3 },
  { label: "Hành trình", icon: Map },
];

// ---- small pieces ------------------------------------------------------
function Toggle({ on, onClick, accent }) {
  return (
    <button
      onClick={onClick}
      className="relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200"
      style={{ backgroundColor: on ? accent : "#2A3140" }}
      aria-pressed={on}
    >
      <span
        className="absolute top-0.5 h-4 w-4 rounded-full bg-[#0B0E14] shadow-sm transition-transform duration-200"
        style={{ transform: on ? "translateX(18px)" : "translateX(2px)" }}
      />
    </button>
  );
}

function HabitCard({ habit, accent }) {
  const [on, setOn] = useState(habit.on);
  const positive = habit.points >= 0;
  const Icon = habit.icon;
  return (
    <div
      className="group flex items-center gap-3 rounded-xl border border-[#1E2530] bg-[#12161F] p-3 transition-colors hover:border-[#2A3140]"
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: positive ? `${accent}1A` : "rgba(239,68,68,0.12)" }}
      >
        <Icon className="h-4 w-4" style={{ color: positive ? accent : "#F87171" }} strokeWidth={1.8} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-[#E5E9F0]">{habit.title}</p>
        <p className="truncate text-[11px] text-[#6B7684]">{habit.sub}</p>
      </div>

      <span
        className="shrink-0 text-[12px] font-semibold tabular-nums"
        style={{ color: positive ? "#4ADE80" : "#F87171" }}
      >
        {positive ? "+" : ""}
        {habit.points}
      </span>

      <Toggle on={on} onClick={() => setOn((v) => !v)} accent={accent} />
    </div>
  );
}

function CategoryColumn({ cat }) {
  const Icon = cat.icon;
  return (
    <div className="flex min-w-[240px] flex-1 flex-col gap-3">
      <div className="flex items-center gap-2.5 rounded-xl border border-[#1E2530] bg-[#0F131B] px-3 py-2.5">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${cat.accent}1A` }}
        >
          <Icon className="h-4 w-4" style={{ color: cat.accent }} strokeWidth={1.8} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-[#E5E9F0]">{cat.name}</p>
          <p className="text-[10px] tracking-wide text-[#5B6473]">{cat.subtitle}</p>
        </div>
        <span
          className="rounded-md px-1.5 py-0.5 text-[11px] font-semibold tabular-nums"
          style={{ backgroundColor: `${cat.accent}1A`, color: cat.accent }}
        >
          {cat.score}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {cat.habits.map((h) => (
          <HabitCard key={h.title} habit={h} accent={cat.accent} />
        ))}
      </div>
    </div>
  );
}

// ---- shell ---------------------------------------------------------
function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 flex-col justify-between border-r border-[#1E2530] bg-[#0B0E14] p-4 lg:flex">
      <div>
        <div className="mb-8 flex items-center gap-2 px-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#2DD4BF] to-[#60A5FA]">
            <Zap className="h-4 w-4 text-[#0B0E14]" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[13px] font-semibold leading-none text-[#E5E9F0]">Ascend</p>
            <p className="text-[9px] tracking-wide text-[#5B6473]">MASTERY OS</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV.map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition-colors ${
                item.active
                  ? "bg-[#161C27] text-[#E5E9F0]"
                  : "text-[#6B7684] hover:bg-[#12161F] hover:text-[#9AA3B2]"
              }`}
            >
              <item.icon className="h-4 w-4" strokeWidth={1.8} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="rounded-xl border border-[#1E2530] bg-[#0F131B] p-3">
        <div className="mb-2 flex items-center justify-between text-[11px]">
          <span className="text-[#9AA3B2]">Lv. 24 Titan</span>
          <span className="text-[#5B6473]">7.420/10.000 XP</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1E2530]">
          <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-[#2DD4BF] to-[#60A5FA]" />
        </div>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="flex flex-1 items-center gap-2 rounded-lg border border-[#1E2530] bg-[#0F131B] px-3 py-2">
        <Search className="h-4 w-4 text-[#5B6473]" />
        <input
          placeholder="Tìm kiếm hoạt động, mục tiêu..."
          className="w-full bg-transparent text-[13px] text-[#E5E9F0] placeholder-[#5B6473] outline-none"
        />
      </div>
      <div className="flex items-center gap-1.5 rounded-lg border border-[#1E2530] bg-[#0F131B] px-3 py-2 text-[12px] text-[#E5E9F0]">
        <Flame className="h-4 w-4 text-[#FB923C]" />
        28 ngày streak
      </div>
      <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1E2530] bg-[#0F131B] text-[#9AA3B2] hover:text-[#E5E9F0]">
        <Bell className="h-4 w-4" />
      </button>
      <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1E2530] bg-[#0F131B] text-[#9AA3B2] hover:text-[#E5E9F0]">
        <Settings className="h-4 w-4" />
      </button>
    </div>
  );
}

function Header() {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="mb-1 text-[11px] tracking-wide text-[#5B6473]">Protocol Matrix 4.0</p>
        <h1 className="text-2xl font-semibold text-[#E5E9F0]">Quản lý &amp; Tùy biến Hoạt động</h1>
        <p className="mt-1 max-w-lg text-[13px] text-[#6B7684]">
          Thiết lập bảng điểm thưởng/phạt cho 4 trụ cột để dẫn dắt liên minh thắng hạng ngày
          qua ngày và tối ưu hóa trải nghiệm của bạn.
        </p>
      </div>
      <button
        className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-medium text-[#0B0E14] shadow-lg"
        style={{ backgroundColor: "#4ADE80", boxShadow: "0 0 24px rgba(74,222,128,0.35)" }}
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
        Tạo hoạt động mới
      </button>
    </div>
  );
}

function Footer() {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#1E2530] bg-[#0F131B] px-5 py-4">
      <div>
        <p className="text-[13px] font-medium text-[#E5E9F0]">Tỷ lệ Thưởng / Phạt đạt 3.0x tỷ lệ thưởng</p>
        <p className="mt-0.5 text-[11px] text-[#6B7684]">
          Hệ thống đang khích lệ tích cực — tiếp tục duy trì cân bằng này để tối ưu quá trình.
        </p>
      </div>
      <div className="flex items-center gap-6 text-[12px]">
        <div className="text-center">
          <p className="font-semibold text-[#E5E9F0]">12</p>
          <p className="text-[10px] text-[#5B6473]">Nhiệm vụ</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-[#F87171]">4</p>
          <p className="text-[10px] text-[#5B6473]">Cảnh báo</p>
        </div>
        <div className="flex items-center gap-1.5 text-[#9AA3B2]">
          <Clock className="h-3.5 w-3.5" />
          00:00 hàng ngày
          <ChevronRight className="h-3.5 w-3.5 text-[#5B6473]" />
        </div>
      </div>
    </div>
  );
}

export default function AscendDashboard() {
  return (
    <div className="flex h-full min-h-[720px] w-full bg-[#0B0E14] text-[#E5E9F0]" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <TopBar />
        <Header />
        <div className="flex flex-col gap-4 lg:flex-row">
          {CATEGORIES.map((cat) => (
            <CategoryColumn key={cat.key} cat={cat} />
          ))}
        </div>
        <Footer />
      </main>
    </div>
  );
}