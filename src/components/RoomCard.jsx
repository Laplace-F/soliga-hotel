export default function RoomCard({
  title,
  price,
  image,
  size,
  desc,
}) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* SIZE BADGE */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-medium text-slate-700 rounded">
          {size}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-8">
        {/* TITLE + PRICE */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-serif text-2xl text-[#1f3a34]">
            {title}
          </h3>

          <div className="text-right">
            <p className="text-hotel-accent text-xl font-medium">
              {price}
            </p>
            <p className="text-xs text-slate-500">/ night</p>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          {desc}
        </p>

        {/* CTA */}
        <button className="group/cta flex items-center gap-2 text-sm font-medium tracking-wide text-[#1f3a34] hover:text-hotel-accent transition">
          VIEW DETAILS
          <span className="transition group-hover/cta:translate-x-1">→</span>
        </button>
      </div>
    </div>
  );
}
