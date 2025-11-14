

/**
 * تبدیل تاریخ به فرمت فارسی (مثلاً: 14 آبان 1404)
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('fa-IR', options);
};

/**
 * تبدیل به فرمت کوتاه (مثلاً: 14 آبان)
 */
export const formatDateShort = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric' };
  return date.toLocaleDateString('fa-IR', options);
};