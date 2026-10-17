export function formatPolicyTime(time, language) {
  const [hour, minute] = time.split(":").map(Number);
  const paddedMinute = String(minute).padStart(2, "0");
  if (language.startsWith("id")) return `${String(hour).padStart(2, "0")}.${paddedMinute}`;
  const twelveHour = hour % 12 || 12;
  return `${twelveHour}:${paddedMinute} ${hour >= 12 ? "PM" : "AM"}`;
}
