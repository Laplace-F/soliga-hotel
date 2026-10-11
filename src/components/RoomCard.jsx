import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function RoomCard({ room }) {
  const { t } = useTranslation();
  return <article className="group overflow-hidden border border-black/10 bg-[#f8f6f4] transition hover:border-[#701f32]/40">
    <Link to={`/rooms/${room.slug}`} aria-label={`${t("rooms.viewDetails")}: ${room.title}`} className="relative block aspect-[1.3/1] overflow-hidden bg-[#e7e1de]">
      <img src={room.image} alt={t("room.imageAlt", { room: room.title })} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
      <span className="absolute bottom-4 left-4 bg-white/95 px-3 py-2 text-xs font-medium text-[#171416]">{room.size}</span>
    </Link>
    <div className="p-5 md:p-6">
      <div className="flex items-start justify-between gap-3"><h3 className="font-display text-2xl">{room.title}</h3><p className="shrink-0 text-right text-sm font-semibold text-[#701f32]">{room.price}<span className="block text-[10px] font-normal text-[#777177]">{t("rooms.priceNote")}</span></p></div>
      <p className="mt-3 min-h-12 text-sm leading-6 text-[#777177]">{t("rooms.cardCopy")}</p>
      <Link to={`/rooms/${room.slug}`} className="mt-5 inline-flex items-center gap-2 border-t border-black/10 pt-4 text-xs font-bold uppercase tracking-[.14em] text-[#701f32]">{t("rooms.viewDetails")} <ArrowUpRight size={15} /></Link>
    </div>
  </article>;
}
