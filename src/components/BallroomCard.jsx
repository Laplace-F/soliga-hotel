export default function BallroomCard({
  title,
  image,
  size,
  capacity,
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

        {/* BADGES */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <span className="bg-white/90 backdrop-blur px-3 py-1 text-xs rounded">
            {size}
          </span>
          <span className="bg-white/90 backdrop-blur px-3 py-1 text-xs rounded">
            {capacity}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-8">
        <h3 className="font-serif text-2xl text-[#1f3a34] mb-4">
          {title}
        </h3>

        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          {desc}
        </p>

        <button className="group/cta flex items-center gap-2 text-sm font-medium tracking-wide text-[#1f3a34] hover:text-hotel-accent transition">
          VIEW DETAILS
          <span className="transition group-hover/cta:translate-x-1">→</span>
        </button>
      </div>

    </div>
  );
}
