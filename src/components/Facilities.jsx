import { useTranslation } from "react-i18next";
import { Clock3, Map, Plane } from "lucide-react";

const icons = [Map, Plane, Clock3];
export default function Facilities() {
  const { t } = useTranslation();
  const items = t("facilities.items", { returnObjects: true });
  return <section id="facilities" className="bg-[#f8f6f4] px-6 py-20 md:py-28">
    <div className="mx-auto max-w-7xl">
      <div className="mb-12 max-w-2xl"><p className="mb-4 text-xs font-semibold uppercase tracking-[.28em] text-[#701f32]">{t("facilities.label")}</p><h2 className="font-display text-4xl leading-tight md:text-5xl">{t("facilities.title")}</h2><p className="mt-5 max-w-xl leading-7 text-[#777177]">{t("facilities.description")}</p></div>
      <div className="grid gap-4 md:grid-cols-3">{items.map((item, index) => { const Icon = icons[index] || Map; return <article key={item.title} className="border-t-2 border-[#701f32] bg-white p-6 md:p-8"><Icon size={25} strokeWidth={1.5} className="mb-8 text-[#701f32]" /><h3 className="font-display text-2xl">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#777177]">{item.desc}</p></article>; })}</div>
    </div>
  </section>;
}
