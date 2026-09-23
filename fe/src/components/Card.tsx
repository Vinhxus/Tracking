import React from "react";
import { TAG_META, THEME_STYLES, type Tag } from "./theme";
import api from '../lib/axios'

interface CardProps {
   _id: string;
  title: string;
  score: number;
  tags: (Tag | string)[];
  onDeleteSuccess: (id: string) => void;
}


function normalizeTag(tag: string): Tag | null {
  const match = (Object.keys(TAG_META) as Tag[]).find(
    (key) => key.toLowerCase() === tag.toLowerCase()
  );
  return match ?? null;
}

const Card: React.FC<CardProps> = ({ _id, title, score, tags, onDeleteSuccess }) => {
  const resolvedTags = tags
    .map((t) => normalizeTag(t))
    .filter((t): t is Tag => t !== null);

  // Tag đầu tiên quyết định màu chủ đạo của card (viền trái + badge score)
  const primaryMeta = resolvedTags[0] ? TAG_META[resolvedTags[0]] : null;
  const primaryStyle = primaryMeta ? THEME_STYLES[primaryMeta.theme] : null;
  async function handleDelete() {
    try {
      const res = await api.delete(`/${_id}`);
      if (res.data.success) {
        onDeleteSuccess(_id); // callback truyền từ component cha
      }
    } catch (error) {
      console.error("Lỗi khi xoá activity:", error);
    }
  }
  return (
    <div
      className={[
        "relative flex items-start gap-4 rounded-2xl h-50 w-80 flex-wrap",
        "bg-[#12121c] pl-5 pr-4 py-3",
        "border border-white/5 border-l-4",
        primaryStyle ? primaryStyle.border : "border-l-slate-500",
      ].join(" ")}
    >
      {/* Title + tags */}
      <div className="flex flex-col w-full">
        <div className="flex gap-2 justify-between">
          <div className="min-w-0 overflow-auto">
            <h3 className="font-semibold text-white ">
              {title}
            </h3>

            <div className="mt-1.5 flex min-w-0 gap-3 overflow-hidden">
              {resolvedTags.map((tag) => {
                const meta = TAG_META[tag];
                return (
                  <span
                    key={tag}
                    className="flex min-w-0 shrink-0 items-center gap-1 truncate text-xs font-medium text-slate-400"
                  >
                    <span className="shrink-0" style={{ color: meta.accent }}>
                      {React.cloneElement(meta.icon as React.ReactElement, {
                        
                      })}
                    </span>
                    <span className="truncate">{meta.label}</span>
                  </span>
                );
              })}
            </div>
          </div>

        {/* Score badge */}
          <div
            className={[
              "shrink-0 rounded-full px-3 py-1 h-max",
              primaryStyle ? primaryStyle.iconBg : "bg-white/10",
            ].join(" ")}
          >
            <span
              className={[
                "text-sm font-bold",
                primaryStyle ? primaryStyle.percentText : "text-white",
              ].join(" ")}
            >
              {score >= 0 ? "+" : ""}
              {score}
            </span>
          </div>
        </div>
      </div>

      <button 
        onClick ={handleDelete}
        className="border rounded-2xl text-red-400 px-2 py-1 items-end cursor-pointer">
        delete
      </button>
    </div>
  );
};

export default Card;