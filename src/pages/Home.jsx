import Hero from "../components/Hero";
import BookingForm from "../components/BookingForm";
import RoomCard from "../components/RoomCard";
import Facilities from "../components/Facilities";
import FAQ from "../components/FAQ";
import BallroomCard from "../components/BallroomCard";

import RestaurantCard from "../components/RestaurantCard";

export default function Home() { return (
    <>

{/* Hero */}
<section id="hero">
  <Hero />
</section>

{/* BookingCard */}
<section id="booking">
    <BookingForm />
 </section>
     
{/* Kamar */}
<section id="rooms" className="bg-[#fbfaf7] py-28 px-6">
        <div className="max-w-7xl mx-auto">

      
          {/* SECTION HEADER */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-sm tracking-[0.3em] text-hotel-accent mb-4">
              ACCOMMODATIONS
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1f3a34] mb-6">
              Our Signature Rooms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Discover refined spaces designed to elevate your stay, each
              offering comfort, privacy, and timeless elegance.
            </p>
          </div>
{/* ROOM SCROLL CONTAINER */}
<div
  ref={(el) => {
    if (!el) return;

    if (window.innerWidth < 768) {
      setTimeout(() => {
        el.scrollTo({
          left: 35,
          behavior: "smooth",
        });

        setTimeout(() => {
          el.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        }, 700);
      }, 800);
    }
  }}
  className="
    flex
    gap-6
    md:gap-8
    overflow-x-auto
    scroll-smooth
    snap-x
    snap-mandatory
    pb-4
    scrollbar-hide
    [-ms-overflow-style:none]
    [scrollbar-width:none]
    [&::-webkit-scrollbar]:hidden
  "
>
  <div className="snap-start min-w-[86%] sm:min-w-[340px] md:min-w-[360px] lg:min-w-[380px]">
    <RoomCard
    slug="superior"
      title="Superior Room"
      price="Rp 2.000.000"
      size="32 m²"
      image="/images/Superior/Superior (1).webp"
      desc="Comfortable elegance designed for restful stays with warm interior tones."
    />
  </div>

  <div className="snap-start min-w-[86%] sm:min-w-[340px] md:min-w-[360px] lg:min-w-[380px]">
    <RoomCard
    slug="deluxe"
      title="Deluxe Room"
      price="Rp 4.000.000"
      size="45 m²"
      image="/images/Deluxe/Deluxe (7).webp"
      desc="Refined comfort with enhanced space and serene garden views."
    />
  </div>

  <div className="snap-start min-w-[86%] sm:min-w-[340px] md:min-w-[360px] lg:min-w-[380px]">
    <RoomCard
    slug="junior-suite"
      title="Junior Suite"
      price="Rp 6.000.000"
      size="60 m²"
      image="/images/JuniorSuite/JuniorSuite (6).webp"
      desc="Spacious layout offering luxury amenities and elevated privacy."
    />
  </div>

  <div className="snap-start min-w-[86%] sm:min-w-[340px] md:min-w-[360px] lg:min-w-[380px]">
    <RoomCard
    slug="executive-suite"
      title="Executive Suite"
      price="Rp 8.000.000"
      size="85 m²"
      image="/images/Executive/Executive (1).webp"
      desc="Sophisticated ambiance tailored for business and leisure excellence."
    />
  </div>

  <div className="snap-start min-w-[86%] sm:min-w-[340px] md:min-w-[360px] lg:min-w-[380px]">
    <RoomCard
    slug="grand-suite"
      title="Grand Suite"
      price="Rp 9.000.000"
      size="120 m²"
      image="/images/GrandSuite/GS (1).webp"
      desc="Opulent interiors and panoramic vistas for distinguished guests."
    />
  </div>

  <div className="snap-start min-w-[86%] sm:min-w-[340px] md:min-w-[360px] lg:min-w-[380px] pr-5">
    <RoomCard
    slug="family-suite"
      title="Family Suite"
      price="Rp 10.000.000"
      size="95 m²"
      image="/images/FamilySuite/FS (1).webp"
      desc="Generous space thoughtfully arranged for memorable family stays."
    />
  </div>
</div>
        </div>
</section>

{/* Fasilitas */}
 <Facilities />


{/* Ballroom ke notepad ballroom */}


{/* Restoran */}
  <section id="restaurant" className="bg-white py-28 px-6">
      <RestaurantCard
        title="Sunset Lounge"
        image="/images/restaurant-lounge.jpg"
        cuisine="Cocktails & Light Bites"
        hours="Open Daily · 4 PM – 12 AM"
        desc="Relax with handcrafted cocktails and light gourmet bites in an intimate sunset setting."
      />

</section>

{/* FAQ */}
 <FAQ />
    </>
  );
}
