import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();
  const items = [["story", "nav.story"], ["rooms", "nav.rooms"], ["facilities", "nav.facilities"], ["contact", "nav.contact"]];
  return <footer id="contact" className="bg-[#171416] px-6 pb-6 pt-14 text-white md:pt-20">
    <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/15 pb-12 md:grid-cols-[1.2fr_.8fr_1.2fr]">
      <div><Link to="/" className="inline-flex items-center gap-3"><img src="/images/Home/logo%20soliga%20transparan.png" alt="" className="h-12 w-12 object-contain" /><span className="font-display text-2xl">SOLIGA <small className="block font-sans text-[9px] tracking-[.3em]">HOTEL · NIAS</small></span></Link><p className="mt-5 max-w-sm text-sm leading-6 text-white/65">{t("footer.description")}</p></div>
      <div><h2 className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-white/55">{t("footer.explore.title")}</h2><ul className="space-y-3">{items.map(([id, key]) => <li key={id}><a href={`/#${id}`} className="text-sm text-white/85 transition hover:text-white">{t(key)}</a></li>)}</ul></div>
      <div><h2 className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-white/55">{t("footer.contact.title")}</h2><div className="space-y-4 text-sm text-white/85"><p className="flex gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-[#a84a5e]" /><span>{t("footer.contact.address.line1")} {t("footer.contact.address.line2")}</span></p><a className="flex items-center gap-3 hover:text-white" href="tel:+6281370291919"><Phone size={16} className="text-[#a84a5e]" />{t("footer.contact.phone")}</a><a className="flex items-center gap-3 hover:text-white" href="mailto:hotelsoliganias@gmail.com"><Mail size={16} className="text-[#a84a5e]" />{t("footer.contact.email")}</a></div><a href="https://wa.me/6282273316767?text=Halo%20saya%20ingin%20booking%20kamar" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 border border-white/40 px-4 py-3 text-xs font-semibold uppercase tracking-widest transition hover:bg-white hover:text-[#171416]">{t("nav.book")} <ArrowUpRight size={15} /></a></div>
    </div>
    <div className="mx-auto flex max-w-7xl flex-col gap-2 pt-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between"><span>{t("footer.copyright")}</span><span>{t("footer.location")}</span></div>
  </footer>;
}
