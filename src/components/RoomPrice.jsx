import { useTranslation } from "react-i18next";
import { formatRoomPrice } from "../utils/formatRoomPrice";

export default function RoomPrice({ room, className = "", tone = "light" }) {
  const { t } = useTranslation();
  const isDark = tone === "dark";
  const discountedPrice = room.discountPercent
    ? Math.round(room.price * (1 - room.discountPercent / 100))
    : room.price;

  return <p className={`${className} ${isDark ? "text-white" : "text-[#701f32]"}`}>
    {room.discountPercent ? <>
      <span className={`mb-1 inline-block rounded px-2 py-1 text-[9px] font-bold uppercase tracking-wide ${isDark ? "bg-white/15 text-white" : "bg-[#701f32]/10 text-[#701f32]"}`}>{t("rooms.discount", { percent: room.discountPercent })}</span>
      <span className={`block text-xs font-normal line-through ${isDark ? "text-white/70" : "text-[var(--muted)]"}`}>{formatRoomPrice(room.price)}</span>
      <span className="block">{formatRoomPrice(discountedPrice)}</span>
    </> : <span className="block">{formatRoomPrice(room.price)}</span>}
    <span className={`block text-[10px] font-normal ${isDark ? "text-white/75" : "text-[var(--muted)]"}`}>{t("rooms.priceNote")}</span>
  </p>;
}
