import { useState } from "react";
import { useTranslation } from "react-i18next";
import { rooms } from "../data/rooms";
import { hotelPolicies } from "../data/hotel";
import { formatPolicyTime } from "../utils/formatPolicyTime";
import { whatsappUrl } from "../utils/whatsappUrl";

export default function BookingForm({ compact = false }) {
  const { t, i18n } = useTranslation();
  const [roomType, setRoomType] = useState("deluxe");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [count, setCount] = useState("1");
  const [error, setError] = useState("");
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const submit = (event) => {
    event.preventDefault();
    if (!checkIn || !checkOut || !count || Number(count) < 1) return setError(t("booking.errorEmpty"));
    if (checkIn < today || checkOut <= checkIn) return setError(t("booking.errorDate"));
    setError("");
    const selectedRoom = rooms.find((room) => room.slug === roomType);
    const roomName = selectedRoom ? t(selectedRoom.nameKey) : roomType;
    const details = [
      t("booking.whatsappRoom", { room: roomName }),
      t("booking.whatsappCheckIn", { date: checkIn }),
      t("booking.whatsappCheckOut", { date: checkOut }),
      t("booking.whatsappRooms", { count }),
    ].join("\n");
    window.open(whatsappUrl(`${t("booking.whatsappGreeting")}\n${details}`), "_blank", "noopener,noreferrer");
  };
  const field = "min-h-12 w-full border border-[var(--control-border)] bg-white px-3 text-sm text-[#171416] placeholder:text-[var(--muted)]";
  return <form onSubmit={submit} className="w-full">
    <div className={`grid gap-3 ${compact ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-5"}`}>
      <label className="text-xs font-medium text-white/80">{t("booking.roomType")}<select className={`${field} mt-2`} value={roomType} onChange={(e) => setRoomType(e.target.value)}>{rooms.map((room) => <option key={room.slug} value={room.slug}>{t(room.nameKey)}</option>)}</select></label>
      <label className="text-xs font-medium text-white/80">{t("booking.checkIn")}<input required type="date" min={today} value={checkIn} onChange={(e) => { setCheckIn(e.target.value); if (checkOut && checkOut <= e.target.value) setCheckOut(""); }} className={`${field} mt-2`} /></label>
      <label className="text-xs font-medium text-white/80">{t("booking.checkOut")}<input required type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={`${field} mt-2`} /></label>
      <label className="text-xs font-medium text-white/80">{t("booking.rooms")}<input required type="number" min="1" max="20" value={count} onChange={(e) => setCount(e.target.value)} className={`${field} mt-2`} /></label>
      <button type="submit" className={`${compact ? "sm:col-span-2 lg:col-span-4" : "md:col-span-5"} min-h-12 bg-white px-5 text-sm font-bold text-[#701f32] transition hover:bg-[#f2e9e8]`}>{t("booking.button")}</button>
    </div>
    <p aria-live="polite" role={error ? "alert" : undefined} className={`mt-3 min-h-5 text-sm ${error ? "text-white" : "text-white/60"}`}>{error || t("booking.helper")}</p>
    <p className="mt-2 text-xs leading-5 text-white/75">{t("booking.policyTimes", { checkIn: formatPolicyTime(hotelPolicies.checkIn, i18n.language), checkOut: formatPolicyTime(hotelPolicies.checkOut, i18n.language) })}</p>
  </form>;
}
