import { useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ParallaxHeroImage, Reveal, SectionConnector } from "./ScrollEffects";
import { scrollToSection } from "../utils/scrollToSection";

export default function Hero() {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  return <section id="hero" className="relative flex min-h-[680px] items-end overflow-hidden bg-[#48121f] pb-16 pt-32 md:min-h-[760px] md:pb-24">
    <div ref={heroRef} className="absolute inset-0 z-0 overflow-hidden"><ParallaxHeroImage target={heroRef} alt={t("hero.imageAlt")} /></div>
    <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#171416]/95 via-[#171416]/80 to-[#171416]/60" />
    <div className="relative z-20 mx-auto w-full max-w-7xl px-6 text-white md:px-10">
      <div className="max-w-3xl">
        <Reveal as="p" className="mb-5 text-xs font-semibold uppercase tracking-[.28em] text-white" direction="up">{t("hero.eyebrow")}</Reveal>
        <Reveal as="h1" delay={0.08} className="font-display max-w-2xl text-5xl leading-[1.08] md:text-7xl">{t("hero.title")}</Reveal>
        <Reveal as="p" delay={0.16} className="mt-6 max-w-xl text-base leading-7 text-white md:text-lg">{t("hero.subtitle")}</Reveal>
        <Reveal delay={0.24} className="mt-9 flex flex-wrap gap-3">
          <button onClick={() => scrollToSection("rooms")} className="group inline-flex min-h-12 items-center gap-3 bg-[#701f32] px-6 text-sm font-semibold text-white transition hover:bg-[#a84a5e] active:scale-[.98]">{t("hero.roomsCta")} <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></button>
          <a href="https://wa.me/6282273316767?text=Halo%20saya%20ingin%20bertanya%20tentang%20Hotel%20Soliga" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center border border-white/70 px-6 text-sm font-semibold text-white transition hover:bg-white hover:text-[#171416] active:scale-[.98]">{t("hero.contactCta")}</a>
        </Reveal>
      </div>
      <Reveal as="div" delay={0.3} className="mt-16 flex items-center gap-3 text-xs uppercase tracking-[.2em] text-white"><span className="h-px w-10 bg-white" /> {t("hero.location")}</Reveal>
    </div>
    <button onClick={() => scrollToSection("story")} aria-label={t("hero.scrollLabel")} className="absolute bottom-8 right-8 z-20 hidden h-12 w-12 place-items-center border border-white/60 text-white transition hover:bg-white hover:text-[#171416] md:grid"><ArrowDown size={18} /></button>
    <SectionConnector variant="hero" />
  </section>;
}
