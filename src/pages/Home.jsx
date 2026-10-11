import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import Hero from "../components/Hero";
import BookingForm from "../components/BookingForm";
import RoomCard from "../components/RoomCard";
import Facilities from "../components/Facilities";
import FAQ from "../components/FAQ";
import { rooms } from "../data/rooms";

export default function Home() {
  const { t } = useTranslation();
  return <main>
    <Hero />
    <section id="story" className="bg-[#f8f6f4] px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[.85fr_1.15fr] md:items-center md:gap-20">
        <div><p className="mb-4 text-xs font-semibold uppercase tracking-[.28em] text-[#701f32]">{t("story.eyebrow")}</p><h2 className="font-display text-4xl leading-tight md:text-5xl">{t("story.title")}</h2></div>
        <div className="border-l-2 border-[#701f32] pl-6 md:pl-8"><p className="text-lg leading-8 text-[#5f595e]">{t("story.body")}</p><p className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#701f32]"><MapPin size={17} />{t("story.location")}</p><div className="mt-6 flex items-center gap-3"><img src="/images/soli.svg" alt="" className="h-10 w-10"/><span className="text-sm text-[#777177]">{t("story.welcome")}</span></div></div>
      </div>
      <div className="mx-auto mt-14 grid max-w-7xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {["/images/Home/hall.webp", "/images/Home/hill.webp", "/images/Home/image.webp", "/images/Home/herorev.png"].map((image, index) => <img key={image} src={image} alt={t(`story.photo${index + 1}`)} loading="lazy" className={`h-44 w-full object-cover md:h-64 ${index === 1 || index === 3 ? "md:mt-8" : ""}`} />)}
      </div>
    </section>
    <section id="rooms" className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between"><div className="max-w-xl"><p className="mb-4 text-xs font-semibold uppercase tracking-[.28em] text-[#701f32]">{t("rooms.eyebrow")}</p><h2 className="font-display text-4xl leading-tight md:text-5xl">{t("rooms.title")}</h2></div><p className="max-w-md text-sm leading-6 text-[#777177]">{t("rooms.subtitle")}</p></div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{rooms.map((room) => <RoomCard key={room.slug} room={room} />)}</div>
      </div>
    </section>
    <Facilities />
    <section id="booking" className="bg-[#48121f] px-6 py-16 text-white md:py-20"><div className="mx-auto grid max-w-7xl gap-9 md:grid-cols-[.8fr_1.2fr] md:items-center"><div><p className="mb-3 text-xs font-semibold uppercase tracking-[.25em] text-white/60">{t("booking.eyebrow")}</p><h2 className="font-display text-4xl md:text-5xl">{t("booking.title")}</h2><p className="mt-4 max-w-md leading-7 text-white/75">{t("booking.subtitle")}</p></div><BookingForm compact /></div></section>
    <FAQ />
  </main>;
}
