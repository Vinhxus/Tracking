import { createContext, useContext } from "react";
import type { Activity } from "./Card";
import type { Tag } from "./theme";

export interface NewActivityInput {
  name: string;
  tags: Tag[];
  score: number;
}

export interface ActivityContextValue {
  activities: Activity[];
  addActivity: (input: NewActivityInput) => void;
}

// Chỉ export context object + hook ở đây (không có component)
// -> file này an toàn 100% cho Fast Refresh.
export const ActivityContext = createContext<ActivityContextValue | null>(
  null
);

export function useActivities() {
  const ctx = useContext(ActivityContext);
  if (!ctx) {
    throw new Error(
      "useActivities phải được gọi bên trong <ActivityProvider>"
    );
  }
  return ctx;
}