import { useTranslation } from "react-i18next";
import { Bell, Clock3, Car, Presentation, Utensils, Wifi } from "lucide-react";
import { Reveal, SectionConnector } from "./ScrollEffects";

const icons = [Utensils, Presentation, Car, Clock3, Wifi, Bell];
export default function Facilities() {
  const { t } = useTranslation();
  const items = t("facilities.items", { returnObjects: true });
  return <section id="facilities" className="relative bg-[#f8f6f4] px-6 py-20 md:py-28">
    <SectionConnector variant="rooms" />
    <div className="mx-auto max-w-7xl">
      <div className="mb-12 max-w-2xl"><Reveal as="p" className="mb-4 text-xs font-semibold uppercase tracking-[.28em] text-[#701f32]">{t("facilities.label")}</Reveal><Reveal as="h2" delay={0.08} className="font-display text-4xl leading-tight md:text-5xl">{t("facilities.title")}</Reveal><Reveal as="p" delay={0.14} className="mt-5 max-w-xl leading-7 text-[var(--muted)]">{t("facilities.description")}</Reveal></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((item, index) => { const Icon = icons[index] || Utensils; return <Reveal key={item.title} as="article" delay={(index % 3) * 0.1} amount={0.12} className="group border-t-2 border-[#701f32] bg-white p-6 transition-colors duration-300 hover:bg-[#fffdfc] md:p-8"><Icon size={25} strokeWidth={1.5} className="mb-8 text-[#701f32] transition-transform duration-300 group-hover:-translate-y-1" /><h3 className="font-display text-2xl">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.desc}</p></Reveal>; })}</div>
    </div>
    <SectionConnector variant="faq" />
  </section>;
}
