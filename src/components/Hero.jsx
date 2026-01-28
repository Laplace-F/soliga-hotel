import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  const scrollDown = () => {
    const nextSection = document.getElementById("rooms");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/heroo.jpeg')",
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-4xl">
          {/* EYEBROW */}
          <p className="text-xs md:text-sm tracking-[0.4em] text-white/80 mb-6">
            {t("hero.eyebrow")}
          </p>

          {/* TITLE */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight text-white mb-8">
            {t("hero.title")}
          </h1>

          {/* DIVIDER */}
          <div className="w-16 h-[2px] bg-hotel-accent mx-auto mb-8"></div>

          {/* SUBTITLE */}
          <p className="text-sm md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto">
            {t("hero.subtitle")}
          </p>
        </div>
      </div>

      {/* SCROLL DOWN ARROW */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/80 hover:text-white transition"
        aria-label="Scroll down"
      >

        <span className="text-2xl animate-bounce">
          ↓
        </span>
      </button>
    </section>
  );
}
