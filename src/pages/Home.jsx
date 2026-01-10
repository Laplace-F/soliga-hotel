import Hero from "../components/Hero";
import BookingForm from "../components/BookingForm";
import RoomCard from "../components/RoomCard";
import Facilities from "../components/Facilities";
import FAQ from "../components/FAQ";
import BallroomCard from "../components/BallroomCard";

import RestaurantCard from "../components/RestaurantCard";

export default function Home() {
  
  return (
    <>
     
<section id="hero">
  <Hero />
</section>
  <section id="booking">  <BookingForm /> </section>
     


   {/* ROOMS SECTION */}
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


          {/* ROOM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <RoomCard
              title="Deluxe Suite"
              price="$450"
              size="65 m²"
              image="/images/room-deluxe.jpeg"
              desc="Spacious elegance with panoramic garden views and a private terrace for morning contemplation."
            />

            <RoomCard
              title="Junior Suite"
              price="$890"
              size="120 m²"
                image="/images/testt.JPG"
              desc="Wake to the sound of waves in this beachfront sanctuary with direct ocean access and infinity pool."
            />

            <RoomCard
              title="Family Suite"
              price="Rp 5.000.000"
              size="45 m²"
              image="/images/fam.JPG"
              desc="An intimate retreat surrounded by tropical flora, perfect for romantic escapes and quiet reflection."
            />
          </div>

        </div>
      </section>


      
           <Facilities />

           <section id="ballroom" className="bg-[#fbfaf7] py-28 px-6">
  <div className="max-w-7xl mx-auto">

    {/* SECTION HEADER */}
    <div className="text-center max-w-2xl mx-auto mb-20">
      <p className="text-sm tracking-[0.3em] text-hotel-accent mb-4">
        EVENTS & CELEBRATIONS
      </p>
      <h2 className="font-serif text-4xl md:text-5xl text-[#1f3a34] mb-6">
        Elegant Ballroom Venues
      </h2>
      <p className="text-gray-600 leading-relaxed">
        Host unforgettable weddings, meetings, and celebrations in our
        beautifully designed ballroom spaces.
      </p>
    </div>

    {/* GRID */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      <BallroomCard
        title="Grand Ballroom"
        image="/images/hall.JPG"
        size="500 m²"
        capacity="Up to 400 guests"
        desc="An elegant venue ideal for weddings, gala dinners, and grand celebrations."
      />

      <BallroomCard
        title="Emerald Ballroom"
        image="/images/hall2.JPG"
        size="300 m²"
        capacity="Up to 200 guests"
        desc="Perfect for corporate events, conferences, and sophisticated gatherings."
      />

      <BallroomCard
        title="Garden Pavilion"
        image="/images/hill.JPG"
        size="250 m²"
        capacity="Up to 150 guests"
        desc="A charming space surrounded by lush greenery for intimate celebrations."
      />
    </div>

  </div>
</section>



<section id="restaurant" className="bg-white py-28 px-6">


      <RestaurantCard
        title="Sunset Lounge"
        image="/images/restaurant-lounge.jpg"
        cuisine="Cocktails & Light Bites"
        hours="Open Daily · 4 PM – 12 AM"
        desc="Relax with handcrafted cocktails and light gourmet bites in an intimate sunset setting."
      />
 
</section>

            <FAQ />
    </>
  );
}
