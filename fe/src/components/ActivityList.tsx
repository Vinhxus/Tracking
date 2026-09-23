import { useEffect, useState } from "react";
import api from "../lib/axios.js";
import axios from "axios";
import Card from "./Card";

export interface Activity{
  _id: string;
  title: string;
  score: number;
  tags: string[];
}

interface ActivityListProps {
  date?: string;
}

export default function ActivityList({ date }: ActivityListProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    // getAct
    async function fetchActivities() {
      try {
        setLoading(true);
        const url = date ? `/getAct?date=${date}` : `/getAct`;
        const res = await api.get(url);
        if (!res.data.success) {
          throw new Error(res.data.message || "Failed to fetch activities");
        }
        if (!cancelled) setActivities(res.data.data);

      } catch (err) {
        if (!cancelled) {
          if (axios.isAxiosError(err)) {
            setError(err.response?.data?.message || err.message);
          } else {
            setError(err instanceof Error ? err.message : "Unknown error");
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchActivities();
    return () => {
      cancelled = true;
    };
  }, [date]); // gọi lại API mỗi khi date thay đổi

  function handleDeleteSuccess(id: string) {
    setActivities((prev) => prev.filter((a) => a._id !== id));
  }

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (activities.length === 0)
    return <div className="p-6 text-slate-400">No activity yet.</div>;

  return (
    <div className="flex gap-4 p-6 flex-wrap">
      {activities.map((a) => (
        <Card key={a._id} _id={a._id} title={a.title} score={a.score} tags={a.tags} onDeleteSuccess={handleDeleteSuccess}/>
      ))}
    </div>
  );
}