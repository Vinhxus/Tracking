import { PlusCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { TAG_ORDER, TAG_META, type Tag } from "../components/theme";
import api from '../lib/axios'
import { useNavigate } from "react-router-dom";

/**
 * CreateActivityPage
 * -------------------
 * A form to create a new activity:
 *  - Name (text input)
 *  - Tag (choose one or more of Health / Study / Spirit / Social)
 *  - Score (numeric input, can be negative for penalties)
 *
 * Khi submit hợp lệ, activity mới sẽ được thêm vào ActivityContext,
 * và tự động xuất hiện ở lưới Card (Card.tsx) vì cả 2 dùng chung context.
 */

export default function CreatePage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [score, setScore] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [justCreated, setJustCreated] = useState(false);
  const [loading, setLoading] = useState(false);

  function toggleTag(key: Tag) {
    setTags((prev) =>
      prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Enter activity's title.");
      return;
    }
    if (tags.length === 0) {
      setError("Choose at least 1 tag.");
      return;
    }
    if (score.trim() === "" || Number.isNaN(Number(score))) {
      setError("Give a valid score.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Đợi server phản hồi
      const response = await api.post('/create', {
        title: title.trim(), 
        tags, 
        score: Number(score)
      });

      console.log("Server response:", response.data);

      setTitle("");
      setTags([]);
      setScore("");
      setJustCreated(true);
      
      const date = new Date().toISOString().slice(0, 10)
      setTimeout(() => {
        setJustCreated(false);
        navigate(`/activities/${date}`)
      }, 1500);

    } catch (err: any) {
      console.error("API error:", err);
      setError(err.response?.data?.message || "Không thể kết nối đến server.");
    } finally {
      setLoading(false);
    }
    
  }

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <div className="w-1/2 rounded-2xl border-3 border-white/5 bg-[#0a0f1a] p-6 sm:p-7">
        <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl ">
          Create new activity
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="activity-name"
              className="mb-1.5 block text-xs font-semibold text-slate-300"
              style={{ letterSpacing: 0.5 }}
            >
              NAME
            </label>
            <input
              id="activity-name"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Chạy bộ 30 phút"
              className="w-full rounded-xl border border-white/10 bg-white/3 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
            />
          </div>

          {/* Tags */}
          <div>
            <label
              className="mb-1.5 block text-xs font-semibold text-slate-300 "
              style={{ letterSpacing: 0.5 }}
            >
              TAGS
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 ">
              {TAG_ORDER.map((key) => {
                const meta = TAG_META[key];
                const active = tags.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleTag(key)}
                    className={`cursor-pointer flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition ${
                      active
                        ? "border-white/20 bg-white/6 text-white"
                        : "border-white/10 bg-white/2 text-slate-400 hover:border-white/20 hover:text-slate-200"
                    }`}
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: meta.accent }}
                    />
                    {meta.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Score */}
          <div>
            <label
              htmlFor="activity-score"
              className="mb-1.5 block text-xs font-semibold text-slate-300"
              style={{ letterSpacing: 0.5 }}
            >
              SCORE
            </label>
            <input
              id="activity-score"
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="VD: 10 hoặc -5"
              className="w-full rounded-xl border border-white/10 bg-white/3 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
            />
          </div>

          {error && (
            <p className="rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-xs text-rose-300">
              {error}
            </p>
          )}

          {justCreated && (
            <p className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-300">
              Đã tạo activity thành công!
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              className="cursor-pointer flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-[#06251a] transition hover:bg-emerald-300 active:scale-[0.98]"
            >
              <PlusCircle size={14} />
              {loading ? "Creating activity..." : "Create activity"}
            </button>
          </div>
        </form>

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-white/5 bg-white/2 px-3 py-2 text-xs text-slate-400">
            <span>Affect to:</span>
            {tags.map((key) => {
              const meta = TAG_META[key];
              return (
                <span
                  key={key}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/3 px-2 py-0.5 font-semibold text-slate-200"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: meta.accent }}
                  />
                  {meta.label}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}