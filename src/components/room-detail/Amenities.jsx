import {
  Tv,
  Wifi,
  Snowflake,
  Coffee,
  Briefcase,
  ShieldCheck,
  Bath,
  BedDouble,
} from "lucide-react";

const ICONS = {
  "Smart TV": Tv,
  "High-speed WiFi": Wifi,
  "Air Conditioner": Snowflake,
  "Coffee & Tea Maker": Coffee,
  "Working Desk": Briefcase,
  "Safe Deposit Box": ShieldCheck,
  "Hot Shower": Bath,
  "Premium king-size bed": BedDouble,

  // data baru
  "Mini Bar": Coffee,
  Wardrobe: BedDouble,
};

function Amenities({ room }) {
  return (
    <section className="py-24 bg-[#fbfaf7]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-2xl mx-auto mb-16">

          <p className="uppercase tracking-[0.35em] text-xs text-[#C6A46A] mb-4">
            Room Amenities
          </p>

          <h2 className="font-serif text-5xl text-[#1F3A34]">
            Everything You Need
          </h2>

          <p className="mt-6 text-slate-600 leading-8">
            Designed with premium facilities to make every stay more relaxing,
            comfortable, and memorable.
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {room.amenities.map((item, index) => {

            const Icon = ICONS[item] || Coffee;

            return (

              <div
                key={index}
                className="group bg-white rounded-3xl border border-slate-100 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="w-14 h-14 rounded-full bg-[#C6A46A]/10 flex items-center justify-center mb-6 transition group-hover:bg-[#C6A46A]">

                  <Icon
                    size={28}
                    className="text-[#C6A46A] group-hover:text-white transition"
                  />

                </div>

                <h3 className="font-medium text-[#1F3A34] leading-7">
                  {item}
                </h3>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}

export default Amenities;