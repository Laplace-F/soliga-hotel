function Gallery({ room }) {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="flex items-end justify-between mb-10">

          <div>

            <p className="uppercase tracking-[0.35em] text-xs text-[#C6A46A] mb-3">
              Gallery
            </p>

            <h2 className="font-serif text-5xl text-[#1F3A34]">
              Explore the Room
            </h2>

          </div>

          <button className="hidden md:block border border-[#C6A46A] px-6 py-3 rounded-full text-[#1F3A34] hover:bg-[#C6A46A] hover:text-white transition">

            View All Photos

          </button>

        </div>

        {/* Gallery */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Left */}

          <div className="lg:col-span-2">

            <img
              src={room.gallery[0].src}
                alt={room.gallery[0].alt}
     
              className="w-full h-[520px] object-cover rounded-3xl hover:scale-[1.02] transition duration-500"
            />

          </div>

          {/* Right */}

          <div className="flex flex-col gap-5">

            <img
              src={room.gallery[1].src}
alt={room.gallery[1].alt}
            
              className="h-[250px] object-cover rounded-3xl hover:scale-[1.02] transition duration-500"
            />

            <img
              src={room.gallery[2].src}
alt={room.gallery[2].alt}
              className="h-[250px] object-cover rounded-3xl hover:scale-[1.02] transition duration-500"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Gallery;