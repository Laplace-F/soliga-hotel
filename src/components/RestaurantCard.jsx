import { useTranslation } from "react-i18next";

const moments = [
  {
    image: "/images/resto.JPG",

    tag: "@soligahotel",
  },
  {
    image: "/images/resto2.JPG",

    tag: "@soligarestaurant",
  },
  {
    image: "/images/resto3.JPG",
    tag: "@soligabar",
  },
  {
    image: "/images/resto.JPG",
    tag: "@soligacafe",
  },
];

export default function RestaurantMoments() {
  const { t } = useTranslation();

  return (
<section className="bg-white py-28 px-6 overflow-hidden">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-sm tracking-[0.3em] text-hotel-accent mb-4">
            {t("restaurantMoments.label")}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1f3a34] mb-6">
            {t("restaurantMoments.title")}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t("restaurantMoments.subtitle")}
          </p>
        </div>

        {/* GALLERY */}
        <div className="flex gap-10 overflow-x-auto scrollbar-hide px-2">
          {moments.map((item, index) => (
            <div
              key={index}
              className="relative min-w-[280px] md:min-w-[360px] h-[420px] group"
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt="Dining moment"
                className="w-full h-full object-cover"
              />

              {/* FRAME */}
              <div className="absolute inset-4 border border-white/70 pointer-events-none" />

              {/* TAG */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-2 text-sm tracking-wide text-slate-700">
                {item.tag}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
