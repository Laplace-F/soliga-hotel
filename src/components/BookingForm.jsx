import { useState } from "react";
import { useTranslation } from "react-i18next";
import { rooms } from "../data/rooms";

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
    const roomName = rooms.find((room) => room.slug === roomType)?.title || roomType;
    const details = `Room: ${roomName}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nRooms: ${count}`;
    const greeting = i18n.language.startsWith("id") ? "Halo Hotel Soliga, saya ingin menanyakan ketersediaan kamar:" : "Hello Hotel Soliga, I would like to ask about room availability:";
    window.open(`https://wa.me/6282273316767?text=${encodeURIComponent(`${greeting}\n${details}`)}`, "_blank", "noopener,noreferrer");
  };
  const field = "min-h-12 w-full border border-[var(--control-border)] bg-white px-3 text-sm text-[#171416] placeholder:text-[var(--muted)]";
  return <form onSubmit={submit} className="w-full">
    <div className={`grid gap-3 ${compact ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-5"}`}>
      <label className="text-xs font-medium text-white/80">{t("booking.roomType")}<select className={`${field} mt-2`} value={roomType} onChange={(e) => setRoomType(e.target.value)}>{rooms.map((room) => <option key={room.slug} value={room.slug}>{room.title}</option>)}</select></label>
      <label className="text-xs font-medium text-white/80">{t("booking.checkIn")}<input required type="date" min={today} value={checkIn} onChange={(e) => { setCheckIn(e.target.value); if (checkOut && checkOut <= e.target.value) setCheckOut(""); }} className={`${field} mt-2`} /></label>
      <label className="text-xs font-medium text-white/80">{t("booking.checkOut")}<input required type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={`${field} mt-2`} /></label>
      <label className="text-xs font-medium text-white/80">{t("booking.rooms")}<input required type="number" min="1" max="20" value={count} onChange={(e) => setCount(e.target.value)} className={`${field} mt-2`} /></label>
      <button type="submit" className={`${compact ? "sm:col-span-2 lg:col-span-4" : "md:col-span-5"} min-h-12 bg-white px-5 text-sm font-bold text-[#701f32] transition hover:bg-[#f2e9e8]`}>{t("booking.button")}</button>
    </div>
    <p aria-live="polite" role={error ? "alert" : undefined} className={`mt-3 min-h-5 text-sm ${error ? "text-white" : "text-white/60"}`}>{error || t("booking.helper")}</p>
  </form>;
}
