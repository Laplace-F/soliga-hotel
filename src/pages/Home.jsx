import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import Hero from "../components/Hero";
import BookingForm from "../components/BookingForm";
import RoomCard from "../components/RoomCard";
import Facilities from "../components/Facilities";
import FAQ from "../components/FAQ";
import { Reveal } from "../components/ScrollEffects";
import { rooms } from "../data/rooms";

const storyImages = [
  "/images/Home/hall.webp",
  "/images/Home/hill.webp",
  "/images/Home/image.webp",
  "/images/Home/hall2.webp",
];

export default function Home() {
  const { t } = useTranslation();
  return <main>
    <Hero />

    <section id="story" className="bg-[#f8f6f4] px-6 pb-20 pt-20 md:pb-28 md:pt-28">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[.85fr_1.15fr] md:items-center md:gap-20">
        <div>
          <Reveal as="p" className="mb-4 text-xs font-semibold uppercase tracking-[.28em] text-[#701f32]">{t("story.eyebrow")}</Reveal>
          <Reveal as="h2" delay={0.08} className="font-display text-4xl leading-tight md:text-5xl">{t("story.title")}</Reveal>
        </div>
        <Reveal delay={0.12} direction="right" className="border-l-2 border-[#701f32] pl-6 md:pl-8">
          <p className="text-lg leading-8 text-[#5f595e]">{t("story.body")}</p>
          <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#701f32]"><MapPin size={17} />{t("story.location")}</p>
          <div className="mt-6 flex items-center gap-3"><img src="/images/soli.svg" alt="" className="h-10 w-10 transition-transform duration-300 hover:rotate-6"/><span className="text-sm text-[#777177]">{t("story.welcome")}</span></div>
        </Reveal>
      </div>

      <div className="relative z-10 mx-auto mt-14 -mb-10 grid max-w-7xl grid-cols-2 gap-3 md:-mb-16 md:grid-cols-4 md:gap-5">
        {storyImages.map((image, index) => <Reveal key={image} effect="image" delay={index * 0.08} className={`overflow-hidden ${index === 1 || index === 3 ? "md:mt-8" : ""}`}>
          <img src={image} alt={t(`story.photo${index + 1}`)} loading="lazy" className="h-44 w-full object-cover transition-transform duration-700 hover:scale-[1.035] md:h-64" />
        </Reveal>)}
      </div>
    </section>

    <section id="rooms" className="bg-white px-6 pb-20 pt-32 md:pb-28 md:pt-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Reveal as="p" className="mb-4 text-xs font-semibold uppercase tracking-[.28em] text-[#701f32]">{t("rooms.eyebrow")}</Reveal>
            <Reveal as="h2" delay={0.08} className="font-display text-4xl leading-tight md:text-5xl">{t("rooms.title")}</Reveal>
          </div>
          <Reveal as="p" delay={0.12} className="max-w-md text-sm leading-6 text-[#777177]">{t("rooms.subtitle")}</Reveal>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, index) => <Reveal key={room.slug} effect="image" delay={(index % 3) * 0.09} amount={0.1}><RoomCard room={room} /></Reveal>)}
        </div>
      </div>
    </section>

    <Facilities />

    <FAQ />

    <section id="booking" className="relative overflow-hidden bg-[#48121f] px-6 pb-16 pt-20 text-white md:pb-20 md:pt-24">
      <svg aria-hidden="true" className="absolute inset-x-0 top-0 h-12 w-full text-white" viewBox="0 0 1440 64" preserveAspectRatio="none"><path fill="currentColor" d="M0 0h1440v16c-212 32-401 38-659 22C492 18 280 15 0 52V0Z"/></svg>
      <div className="relative mx-auto grid max-w-7xl gap-9 md:grid-cols-[.8fr_1.2fr] md:items-center">
        <div>
          <Reveal as="p" className="mb-3 text-xs font-semibold uppercase tracking-[.25em] text-white/60">{t("booking.eyebrow")}</Reveal>
          <Reveal as="h2" delay={0.08} className="font-display text-4xl md:text-5xl">{t("booking.title")}</Reveal>
          <Reveal as="p" delay={0.15} className="mt-4 max-w-md leading-7 text-white/75">{t("booking.subtitle")}</Reveal>
        </div>
        <Reveal delay={0.12}><BookingForm compact /></Reveal>
      </div>
    </section>

  </main>;
}
