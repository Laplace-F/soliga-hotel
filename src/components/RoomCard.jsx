import {
  BedDouble,
  Users,
  Wifi,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function RoomCard({
  slug,
  title,
  price,
  image,
  size,
  desc,
}) {
  return (
    <div
      className="
      group
      bg-white
      rounded-3xl
      overflow-hidden
      border
      border-transparent
      transition-all
      duration-500
      hover:-translate-y-2
      hover:border-[#C6A46A]
      hover:shadow-[0_25px_60px_rgba(0,0,0,.12)]
    "
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden h-56 md:h-72">
        <img
          src={image}
          alt={title}
          className="
          w-full
          h-full
          object-cover
          transition-all
          duration-700
          group-hover:scale-110
        "
        />

        {/* Overlay */}
        <div
          className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/60
          via-black/10
          to-transparent
          opacity-70
          transition
          duration-500
          group-hover:opacity-90
        "
        />

        {/* Size */}
        <div
          className="
          absolute
          left-5
          bottom-5
          bg-white/90
          backdrop-blur
          rounded-full
          px-4
          py-2
          text-xs
          font-medium
          text-slate-700
          transition
          duration-300
          group-hover:-translate-y-1
        "
        >
          {size}
        </div>

        {/* Hover Button */}
        <div
          className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          opacity-0
          group-hover:opacity-100
          transition
          duration-500
        "
        >
          {/* <button
            className="
            bg-white
            text-[#1F3A34]
            px-6
            py-3
            rounded-full
            font-medium
            shadow-lg
            hover:bg-[#1F3A34]
            hover:text-white
            transition
          "
          >
            View Gallery
          </button> */}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 md:p-8">

        {/* Title + Price */}
        <div className="flex justify-between items-start gap-4">

          <h3
            className="
            font-serif
            text-2xl
            md:text-3xl
            text-[#1F3A34]
            leading-tight
          "
          >
            {title}
          </h3>

          <div className="text-right shrink-0">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              From
            </p>

            <h4 className="text-2xl font-semibold text-[#C6A46A]">
              {price}
            </h4>

            <span className="text-xs text-slate-500">
              / night
            </span>
          </div>
        </div>

        {/* Description */}
        <p
          className="
          mt-5
          text-slate-600
          leading-7
          text-sm
          md:text-base
          line-clamp-3
        "
        >
          {desc}
        </p>

        {/* Amenities */}
        <div
          className="
          mt-6
          flex
          flex-wrap
          gap-4
          text-sm
          text-slate-600
        "
        >
          <div className="flex items-center gap-2">
            <BedDouble size={18} />
            King Bed
          </div>

          <div className="flex items-center gap-2">
            <Users size={18} />
            2 Guests
          </div>

          <div className="flex items-center gap-2">
            <Wifi size={18} />
            Free Wifi
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-slate-200"></div>

        {/* CTA */}
     <Link
  to={`/rooms/${slug}`}
  className="
    inline-flex
    items-center
    gap-2
    font-medium
    tracking-wide
    text-[#1F3A34]
    transition
    hover:text-[#C6A46A]
  "
>
          <span
            className="
            relative
            after:absolute
            after:left-0
            after:-bottom-1
            after:h-[2px]
            after:w-0
            after:bg-current
            after:transition-all
            group-hover:after:w-full
          "
          >
            VIEW DETAILS
          </span>

          <ArrowRight
            size={18}
            className="
            transition
            group-hover:translate-x-2
          "
          />
        </Link>
      </div>
    </div>
  );
}