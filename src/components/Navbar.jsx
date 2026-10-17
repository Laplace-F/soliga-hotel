import { createElement, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { scrollToSection } from "../utils/scrollToSection";
import { whatsappUrl } from "../utils/whatsappUrl";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const reduceMotion = useReducedMotion();
  const location = useLocation();
  const home = location.pathname === "/";
  const bookingUrl = whatsappUrl(t("booking.whatsappGreeting"));
  const close = () => setOpen(false);
  const jump = (id) => {
    close();
    if (!home) window.location.assign(`/#${id}`);
    else scrollToSection(id);
  };
  const items = [["story", "nav.story"], ["rooms", "nav.rooms"], ["facilities", "nav.facilities"], ["contact", "nav.contact"]];

  return <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-white/95 text-[#171416] shadow-sm backdrop-blur-md">
    <nav aria-label={t("nav.label")} className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 md:px-8">
      <Link to="/" onClick={close} className="flex items-center gap-3" aria-label="Hotel Soliga home">
        <img src="/images/Home/logo%20soliga%20transparan.png" alt="" className="h-11 w-11 object-contain" />
        <span className="leading-none"><span className="font-display text-xl font-semibold tracking-wide">SOLIGA</span><span className="mt-1 block text-[9px] tracking-[.32em]">HOTEL · NIAS</span></span>
      </Link>
      <div className="hidden items-center gap-8 md:flex">
        {items.map(([id, key]) => <button key={id} onClick={() => jump(id)} className="group relative text-xs font-semibold uppercase tracking-[.14em] text-[#494348] transition hover:text-[#701f32]"><span>{t(key)}</span><span aria-hidden="true" className="absolute -bottom-2 left-0 h-px w-0 bg-[#701f32] transition-[width] duration-300 group-hover:w-full" /></button>)}
        <div className="flex items-center gap-2 border-l border-black/10 pl-5 text-xs" aria-label={t("nav.language")}>
          {["id", "en"].map((lang) => <button key={lang} onClick={() => i18n.changeLanguage(lang)} aria-pressed={i18n.language.startsWith(lang)} className={`uppercase ${i18n.language.startsWith(lang) ? "font-bold text-[#701f32]" : "text-[var(--muted)]"}`}>{lang}</button>)}
        </div>
        <a href={bookingUrl} target="_blank" rel="noreferrer" className="bg-[#701f32] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-[#48121f] hover:text-white active:text-white focus-visible:text-white">{t("nav.book")}</a>
      </div>
      <button type="button" onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center text-[#701f32] md:hidden" aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
    </nav>
    <AnimatePresence initial={false}>{open && createElement(motion.div, {
      initial: reduceMotion ? false : { opacity: 0, y: -8 },
      animate: { opacity: 1, y: 0 },
      exit: reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 },
      transition: { duration: reduceMotion ? 0 : 0.2 },
      className: "border-t border-black/10 bg-white px-6 pb-6 pt-3 shadow-lg md:hidden",
    }, <div className="flex flex-col">
      {items.map(([id, key]) => <button key={id} onClick={() => jump(id)} className="border-b border-black/5 py-4 text-left text-sm font-semibold uppercase tracking-wider">{t(key)}</button>)}
      <div className="flex items-center justify-between py-5"><div className="flex gap-4">{["id", "en"].map((lang) => <button key={lang} onClick={() => i18n.changeLanguage(lang)} aria-pressed={i18n.language.startsWith(lang)} className="uppercase">{lang}</button>)}</div><a onClick={close} href={bookingUrl} target="_blank" rel="noreferrer" className="bg-[#701f32] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:text-white active:text-white focus-visible:text-white">{t("nav.book")}</a></div>
    </div>)}</AnimatePresence>
  </header>;
}
