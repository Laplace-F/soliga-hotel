import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { Reveal } from "./ScrollEffects";
import { hotelContact } from "../data/hotel";
import { whatsappUrl } from "../utils/whatsappUrl";

export default function Footer() {
  const { t } = useTranslation();
  const items = [["story", "nav.story"], ["rooms", "nav.rooms"], ["facilities", "nav.facilities"], ["contact", "nav.contact"]];
  return <footer id="contact" className="relative overflow-hidden bg-[var(--maroon-dark)] px-6 pb-0 pt-20 text-white md:pt-24">
    <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/15 pb-12 md:grid-cols-[1.2fr_.8fr_1.2fr]">
      <Reveal><Link to="/" className="inline-flex items-center gap-3"><img src="/images/Home/logo%20soliga%20transparan.png" alt="" className="h-12 w-12 object-contain" /><span className="font-display text-2xl">SOLIGA <small className="block font-sans text-[9px] tracking-[.3em]">HOTEL · NIAS</small></span></Link><p className="mt-5 max-w-sm text-sm leading-6 text-white/65">{t("footer.description")}</p></Reveal>
      <Reveal delay={0.08}><h2 className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-white/55">{t("footer.explore.title")}</h2><ul className="space-y-3">{items.map(([id, key]) => <li key={id}><a href={`/#${id}`} className="text-sm text-white/85 underline-offset-4 transition hover:text-white hover:underline focus-visible:underline">{t(key)}</a></li>)}</ul></Reveal>
      <Reveal delay={0.16}><h2 className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-white/55">{t("footer.contact.title")}</h2><div className="space-y-4 text-sm text-white/85"><p className="flex gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-white/80" /><span>{t("footer.contact.address.line1")} {t("footer.contact.address.line2")}</span></p><a className="flex items-center gap-3 underline-offset-4 hover:text-white hover:underline focus-visible:underline" href={`tel:${hotelContact.phoneLink}`}><Phone size={16} className="text-white/80" />{hotelContact.phoneDisplay}</a><a className="flex items-center gap-3 underline-offset-4 hover:text-white hover:underline focus-visible:underline" href={`mailto:${hotelContact.email}`}><Mail size={16} className="text-white/80" />{hotelContact.email}</a></div><a href={whatsappUrl(t("booking.whatsappGreeting"))} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 border border-white/60 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-white hover:text-[#171416] active:bg-white active:text-[#171416] focus-visible:text-white">{t("nav.book")} <ArrowUpRight size={15} /></a></Reveal>
    </div>
    <div className="-mx-6 mt-8 border-t border-white/15 bg-[var(--maroon)] px-6 py-5">
      <Reveal as="div" direction="none" className="mx-auto flex max-w-7xl flex-col gap-2 text-xs text-white/85 sm:flex-row sm:items-center sm:justify-between"><span>{t("footer.copyright")}</span><span>{t("footer.location")}</span></Reveal>
    </div>
  </footer>;
}
