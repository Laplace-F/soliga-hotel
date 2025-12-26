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
    <section className="bg-[#fbfaf7] py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-sm tracking-[0.3em] text-hotel-accent mb-4">
            {t("facilities.label")}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1f3a34] mb-6">
            {t("facilities.title")}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t("facilities.description")}
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {facilities.map((item, index) => {
            const Icon = ICONS[item.icon];

            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-12 text-center shadow-sm hover:shadow-xl transition duration-300"
              >
                {/* ICON */}
                <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-hotel-accent/10 flex items-center justify-center group-hover:bg-hotel-accent transition">
                  <Icon className="w-8 h-8 text-hotel-accent group-hover:text-white transition" />
                </div>

                {/* TITLE */}
                <h3 className="font-serif text-xl text-[#1f3a34] mb-4 group-hover:text-hotel-accent transition">
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-sm leading-relaxed">
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
