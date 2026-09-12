import { SlidersHorizontal, History } from "lucide-react";
import { THEME_STYLES, TAG_META, type Theme, type Tag } from "./theme";
import { useActivities } from "./activityStore";

export interface Activity {
  id: string;
  title: string;
  theme: Theme; // "emerald" | "blue" | "purple" | "orange"
  points: number;
  detailLabel: string; // vd: "Rèn thể lực • 45p"
  tags: Tag[]; // dùng để biết activity thuộc (các) mục nào
}

// --- 1 card đơn lẻ (export để dùng lại ở nơi khác, vd. render theo nhóm) ---
export function TaskCard({
  title,
  theme,
  points,
  detailLabel,
  tags,
}: Activity) {
  const s = THEME_STYLES[theme];

  return (
    <div
      className={`flex min-h-[210px] w-full flex-col justify-between rounded-xl border border-slate-800 border-l-4 ${s.border} bg-[#0d1424] py-4 pl-5 pr-4`}
    >
      {/* Header: icon + điểm thưởng */}
      <div className="flex items-start justify-between">
        <span
          className={`flex h-9 items-center justify-center rounded-lg px-2.5 text-xs font-bold ${s.iconBg} ${s.iconColor}`}
        >
          {points >= 0 ? `+${points}` : points}
        </span>
      </div>

      {/* Nội dung */}
      <div className="mt-3">
        <p className="text-[15px] font-semibold leading-snug text-slate-100">
          {title}
        </p>

        {detailLabel && (
          <p className="mt-2 whitespace-nowrap text-xs leading-relaxed text-slate-500">
            {detailLabel}
          </p>
        )}

        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-300"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: TAG_META[tag].accent }}
                />
                {TAG_META[tag].label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer: icon phụ */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-slate-600">
          <SlidersHorizontal size={16} />
          <History size={16} />
        </div>
      </div>
    </div>
  );
}

// --- Export default: lưới card, đọc trực tiếp từ ActivityContext ---
// Không tự giữ state nữa -> mọi activity mới tạo ở CreatePage sẽ tự
// xuất hiện ở đây vì cả hai cùng đọc/ghi chung 1 context.
export default function Card() {
  const { activities } = useActivities();

  return (
    <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
      {activities.map((a) => (
        <TaskCard key={a.id} {...a} />
      ))}
    </div>
  );
}