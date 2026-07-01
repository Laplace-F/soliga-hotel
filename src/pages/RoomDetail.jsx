import { useParams } from "react-router-dom";
import { rooms } from "../data/rooms";

import HeroSection from "../components/room-detail/HeroSection";
import Overview from "../components/room-detail/Overview";
import Gallery from "../components/room-detail/Gallery";
import Amenities from "../components/room-detail/Amenities";
function RoomDetail() {

  const { slug } = useParams();

  const room = rooms.find((item) => item.slug === slug);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Room tidak ditemukan.
      </div>
    );
  }

  return (
    <main className="bg-[#fbfaf7]">

      <HeroSection room={room} />
        <Overview room={room} />
        <Gallery room={room} />
        <Amenities room={room} />
    </main>
  );
}

export default RoomDetail;