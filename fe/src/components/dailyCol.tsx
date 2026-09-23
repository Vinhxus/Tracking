"use client";

import {DailyPart} from "./part";
import { Dumbbell, BrainCog, Sun, Users } from "lucide-react";
import api from '../lib/axios.js';
import axios from "axios";
import { type Theme } from './theme.js';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type StatType = "health" | "study" | "spirit" | "social";

interface DailyData {
  health: { exp: number; };
  study:  { exp: number; };
  spirit: { exp: number; };
  social: { exp: number; };
}

const PILLARS: { key: StatType; title: string; icon: React.ReactNode; theme: Theme }[] = [
  { key: "health", title: "Health", icon: <Dumbbell size={14} />, theme: "emerald" },
  { key: "study", title: "Study", icon: <BrainCog size={14} />, theme: "blue" },
  { key: "spirit", title: "Spirit", icon: <Sun size={14} />, theme: "purple" },
  { key: "social", title: "Social", icon: <Users size={14} />, theme: "orange" },
];

interface DailyProps {
  userId: string;
}

export default function DailyCol({ userId }: DailyProps) {
  const [stats, setStats] = useState<DailyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { date } = useParams(); // undefined nếu route không có :date

  useEffect(() => {
    let cancelled = false;
    async function fetchStats() {
      try {
        setLoading(true);

        const url = date
          ? `/daily/${date}`
          : `/daily`;

        const res = await api.get(url);
        const json = res.data;

        if (!json.success) {
          throw new Error(json.message || "Failed to fetch stats");
        }
        if (!cancelled) setStats(json.data);
      } catch (err) {
        if (!cancelled) {
          if (axios.isAxiosError(err)) {
            console.error("Server error detail:", err.response?.data);
            setError(err.response?.data?.message || err.message);
          } else {
            setError(err instanceof Error ? err.message : "Unknown error");
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, [userId, date]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!stats) return null;

  return (
    <div className="flex gap-4 p-6">
      {PILLARS.map((p) => (
        <DailyPart
          key={p.key}
          icon={p.icon}
          title={p.title}
          theme={p.theme}
          exp={stats[p.key].exp}
        />
      ))}
    </div>
  );
}