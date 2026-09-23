/**
 * Chuyển 1 đối tượng Date thành chuỗi "YYYY-MM-DD" theo đúng giờ địa phương
 * (mặc định Asia/Ho_Chi_Minh), thay vì dùng toISOString() (luôn theo UTC).
 */
export function toDateStr(date = new Date(), timeZone = "Asia/Ho_Chi_Minh") {
  // "en-CA" locale trả về định dạng sẵn là YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", { timeZone }).format(date);
}