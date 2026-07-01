import { useTranslation } from "react-i18next";
import {
  MapIcon,
  TruckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const ICONS = {
  trekking: MapIcon,
  shuttle: TruckIcon,
  reception: ClockIcon,
};

function Facilities() {
  const { t } = useTranslation();
  const facilities = t("facilities.items", { returnObjects: true });

  return (
    <section className="bg-[#fbfaf7] py-20 md:py-28 px-5 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">

          <p className="uppercase tracking-[0.35em] text-xs md:text-sm text-hotel-accent font-medium mb-4">
            {t("facilities.label")}
          </p>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1f3a34] leading-tight">
            {t("facilities.title")}
          </h2>

          <p className="mt-6 text-gray-600 leading-8 text-base md:text-lg">
            {t("facilities.description")}
          </p>

        </div>

        {/* GRID */}

<div className="grid grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-8">

  {facilities.map((item, index) => {
    const Icon = ICONS[item.icon];

    return (
      <div
        key={index}
        className="group relative h-full bg-white rounded-2xl md:rounded-3xl border border-gray-100
        p-4 sm:p-5 md:p-8 lg:p-10
        transition-all duration-500
        hover:-translate-y-2 md:hover:-translate-y-3
        hover:shadow-xl hover:border-hotel-accent/20 overflow-hidden"
      >

        {/* Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-hotel-accent via-[#d4b06a] to-hotel-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

        {/* Icon */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-full bg-hotel-accent/10 flex items-center justify-center mx-auto mb-4 md:mb-8 transition-all duration-500 group-hover:bg-hotel-accent group-hover:scale-110">

<Icon className="w-10 h-10 text-hotel-accent transition-all duration-500 group-hover:text-yellow-500" />

        </div>

        {/* Title */}
        <h3 className="font-serif text-sm sm:text-base md:text-2xl text-[#1f3a34] text-center mb-2 md:mb-5 transition-colors group-hover:text-hotel-accent leading-snug">

          {item.title}

        </h3>

        {/* Description */}
        <p className="hidden md:block text-gray-600 leading-8 text-center text-[15px]">

          {item.desc}

        </p>

              </div>

            );
          })}

        </div>

      </div>
    </section>
  );
}

export default Facilities;