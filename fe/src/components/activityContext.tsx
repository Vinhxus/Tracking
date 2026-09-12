import { useState, type ReactNode } from "react";
import { TAG_META } from "./theme";
import type { Activity } from "./Card";
import { ActivityContext, type NewActivityInput } from "./activityStore";
import { initialActivities } from "./initial";

// File này CHỈ export 1 component duy nhất (ActivityProvider)
// -> tương thích Fast Refresh. Context object + hook `useActivities`
// nằm ở "./activityStore", data mặc định nằm ở "./initialActivities".
export function ActivityProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  function addActivity({ name, tags, score }: NewActivityInput) {
    // Tag đầu tiên quyết định icon + theme (màu chủ đạo) của card,
    // nhưng card vẫn hiển thị đầy đủ tất cả các tag đã chọn.
    const primaryTag = tags[0];
    const meta = TAG_META[primaryTag];

    const newActivity: Activity = {
      id: `activity-${Date.now()}`,
      title: name,
      theme: meta.theme,
      points: score,
      detailLabel: tags.map((t) => TAG_META[t].label).join(" • "),
      tags,
    };

    setActivities((prev) => [newActivity, ...prev]);
  }

  return (
    <ActivityContext.Provider value={{ activities, addActivity }}>
      {children}
    </ActivityContext.Provider>
  );
}