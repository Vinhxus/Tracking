import type { Activity } from "./Card";

// --- Danh sách hoạt động mặc định ---
// TODO: thay bằng dữ liệu thực tế (props, API, store...) khi có backend.
export const initialActivities: Activity[] = [
  {
    id: "gym",
    title: "Tập gym",
    theme: "emerald",
    points: 30,
    detailLabel: "Rèn thể lực • 45p",
    tags: ["Health"],
  },
  {
    id: "ngoai-ngu",
    title: "Học ngoại ngữ 30p",
    theme: "blue",
    points: 25,
    detailLabel: "Mở rộng tư duy",
    tags: ["Study"],
  },
  {
    id: "nhat-ky",
    title: "Viết nhật ký",
    theme: "purple",
    points: 15,
    detailLabel: "Phản chiếu cảm xúc",
    tags: ["Spirit"],
  },
  {
    id: "ban-be",
    title: "Gặp gỡ bạn bè",
    theme: "orange",
    points: 25,
    detailLabel: "Tái tạo năng lượng",
    tags: ["Social"],
  },
];