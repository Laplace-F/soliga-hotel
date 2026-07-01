import { BedDouble, Users, Wifi, Expand, Calendar } from "lucide-react";

function HeroSection({ room }) {
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Background */}
      <img
        src={room.heroImage}
        alt={room.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20"></div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">

        <div className="max-w-7xl mx-auto w-full px-6">

          <div className="max-w-2xl">

            {/* Breadcrumb */}
            <p className="text-sm tracking-wider uppercase text-white/70 mb-6">
              Home / Rooms / {room.title}
            </p>

            {/* Title */}
            <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight">
              {room.title}
            </h1>

            {/* Description */}
            <p className="mt-8 text-lg text-white/80 leading-8">
              {room.description}
            </p>

            {/* Price */}
            <div className="mt-10">

              <p className="uppercase tracking-[0.3em] text-white/60 text-xs">
                FROM
              </p>

              <h2 className="text-[#D4B06A] text-5xl font-semibold mt-2">
                {room.price}
              </h2>

              <span className="text-white/70">
                / night
              </span>

            </div>

            {/* Quick Info */}
            <div className="mt-10 flex flex-wrap gap-8 text-white">

              <div className="flex items-center gap-2">
                <BedDouble size={22} />
                <span>{room.bed}</span>
              </div>

              <div className="flex items-center gap-2">
                <Users size={22} />
                <span>{room.guests}</span>
              </div>

              <div className="flex items-center gap-2">
                <Wifi size={22} />
                <span>{room.wifi}</span>
              </div>

              <div className="flex items-center gap-2">
                <Expand size={22} />
                <span>{room.size}</span>
              </div>

            </div>

            {/* Buttons */}
            <div className="mt-12 flex flex-wrap gap-5">

              <button className="bg-[#C6A46A] hover:bg-[#b89658] text-white px-8 py-4 rounded-lg transition flex items-center gap-3">

                BOOK NOW

                <Calendar size={18} />

              </button>

              <button className="border border-white text-white hover:bg-white hover:text-[#1F3A34] px-8 py-4 rounded-lg transition">

                CHECK AVAILABILITY

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default HeroSection;