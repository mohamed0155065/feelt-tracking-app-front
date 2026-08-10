/**
 * دالة لتنسيق إجمالي الثواني إلى صيغة دقائق وثواني (مثال: 05:30)
 */
export const formatTime = (totalSecs: number): string => {
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return `${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`;
};