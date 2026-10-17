import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Reveal, SectionConnector } from "./ScrollEffects";

export default function FAQ() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const items = t("faq.items", { returnObjects: true });
  return <section className="relative bg-white px-6 py-20 md:py-28"><div className="mx-auto max-w-4xl">
    <Reveal className="mb-10"><p className="mb-4 text-xs font-semibold uppercase tracking-[.28em] text-[#701f32]">{t("faq.label")}</p><h2 className="font-display text-4xl md:text-5xl">{t("faq.title")}</h2></Reveal>
    <div className="border-t border-black/10">{items.map((item, i) => <Reveal key={item.question} delay={i * 0.06} direction="left" className="border-b border-black/10"><h3><button aria-expanded={active === i} onClick={() => setActive(active === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium"><span>{item.question}</span><ChevronDown size={18} className={`shrink-0 text-[#701f32] transition-transform ${active === i ? "rotate-180" : ""}`} /></button></h3>{active === i && <p className="max-w-3xl pb-6 pr-8 text-sm leading-7 text-[var(--muted)]">{item.answer}</p>}</Reveal>)}</div>
  </div><SectionConnector variant="faqFooter" /></section>;
}
