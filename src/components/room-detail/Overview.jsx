import {
  BedDouble,
  Users,
  Wifi,
  Expand,
  Check,
} from "lucide-react";

function Overview({ room }) {
  return (
    <section className="py-24 bg-[#fbfaf7]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* LEFT */}

          <div>

            <h2 className="font-serif text-5xl text-[#1F3A34] mb-8">
              Overview
            </h2>

            <p className="text-slate-600 leading-8 text-lg">
              {room.description}
            </p>

            <div className="mt-10 space-y-5">

              {room.features.map((feature, index) => (

                <div
                  key={index}
                  className="flex items-center gap-4"
                >

                  <div className="w-7 h-7 rounded-full bg-[#C6A46A]/15 flex items-center justify-center">

                    <Check
                      size={16}
                      className="text-[#C6A46A]"
                    />

                  </div>

                  <span className="text-slate-700">
                    {feature}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* RIGHT */}

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">

            <div className="grid grid-cols-2">

              <InfoCard
                icon={<Expand size={28} />}
                title="Room Size"
                value={room.size}
              />

              <InfoCard
                icon={<BedDouble size={28} />}
                title="Bed Type"
                value={room.bed}
              />

              <InfoCard
                icon={<Users size={28} />}
                title="Guests"
                value={room.guests}
              />

              <InfoCard
                icon={<Wifi size={28} />}
                title="Internet"
                value={room.wifi}
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

function InfoCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="p-10 border border-slate-100">

      <div className="text-[#C6A46A] mb-6">

        {icon}

      </div>

      <p className="text-sm text-slate-500">

        {title}

      </p>

      <h4 className="font-serif text-3xl text-[#1F3A34] mt-2">

        {value}

      </h4>

    </div>
  );
}

export default Overview;