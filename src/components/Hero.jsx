import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();
  return <section id="hero" className="relative flex min-h-[680px] items-end overflow-hidden bg-[#48121f] pb-16 pt-32 md:min-h-[760px] md:pb-24">
    <img src="/images/Home/heroo.webp" alt={t("hero.imageAlt")} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#171416]/75 via-[#171416]/35 to-[#171416]/5" />
    <div className="relative mx-auto w-full max-w-7xl px-6 text-white md:px-10">
      <div className="reveal max-w-3xl">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[.28em] text-white/80">{t("hero.eyebrow")}</p>
        <h1 className="font-display max-w-2xl text-5xl leading-[1.08] md:text-7xl">{t("hero.title")}</h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-white/85 md:text-lg">{t("hero.subtitle")}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <button onClick={() => document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex min-h-12 items-center gap-3 bg-[#701f32] px-6 text-sm font-semibold text-white transition hover:bg-[#a84a5e]">{t("hero.roomsCta")} <ArrowRight size={17} /></button>
          <a href="https://wa.me/6282273316767?text=Halo%20saya%20ingin%20bertanya%20tentang%20Hotel%20Soliga" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center border border-white/70 px-6 text-sm font-semibold text-white transition hover:bg-white hover:text-[#171416]">{t("hero.contactCta")}</a>
        </div>
      </div>
      <div className="mt-16 flex items-center gap-3 text-xs uppercase tracking-[.2em] text-white/70"><span className="h-px w-10 bg-white/70" /> {t("hero.location")}</div>
    </div>
    <button onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })} aria-label={t("hero.scrollLabel")} className="absolute bottom-8 right-8 hidden h-12 w-12 place-items-center border border-white/60 text-white transition hover:bg-white hover:text-[#171416] md:grid"><ArrowDown size={18} /></button>
    <Link to="/rooms/deluxe" className="absolute bottom-0 right-0 hidden bg-[#701f32] px-8 py-5 text-sm font-semibold text-white md:block">{t("hero.featuredRoom")} <span aria-hidden="true">↗</span></Link>
  </section>;
}
