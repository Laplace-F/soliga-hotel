const roomTypes = [
  { slug: "superior", title: "Superior Room", price: "Rp 2.000.000", size: "32 m²", image: "/images/Superior/Superior (1).webp", gallery: 7 },
  { slug: "deluxe", title: "Deluxe Room", price: "Rp 4.000.000", size: "45 m²", image: "/images/Deluxe/Deluxe (7).webp", gallery: 7, guests: "2", bed: "King Bed", wifi: true, breakfast: true, checkIn: "14:00", checkOut: "12:00" },
  { slug: "junior-suite", title: "Junior Suite", price: "Rp 6.000.000", size: "60 m²", image: "/images/JuniorSuite/JuniorSuite (1).webp", gallery: 7 },
  { slug: "executive-suite", title: "Executive Suite", price: "Rp 8.000.000", size: "85 m²", image: "/images/Executive/Executive (1).webp", gallery: 8 },
  { slug: "grand-suite", title: "Grand Suite", price: "Rp 9.000.000", size: "120 m²", image: "/images/GrandSuite/GS (1).webp", gallery: 9 },
  { slug: "family-suite", title: "Family Suite", price: "Rp 10.000.000", size: "95 m²", image: "/images/FamilySuite/FS (1).webp", gallery: 8 },
].map((room) => ({
  ...room,
  shortDescription: "A comfortable place to pause during your stay in Gunungsitoli.",
  description: "Explore this room and contact our team to confirm current availability and details.",
  galleryImages: Array.from({ length: room.gallery }, (_, index) => {
    const number = index + 1;
    const path = room.slug === "grand-suite" ? `/images/GrandSuite/GS (${number}).webp`
      : room.slug === "family-suite" ? `/images/FamilySuite/FS (${number}).webp`
      : `/images/${room.slug === "junior-suite" ? "JuniorSuite" : room.slug === "executive-suite" ? "Executive" : room.title.split(" ")[0]}/${room.slug === "junior-suite" ? "JuniorSuite" : room.slug === "executive-suite" ? "Executive" : room.title.split(" ")[0]} (${number}).webp`;
    return { src: path, alt: `${room.title}, photo ${number}` };
  }),
}));

export const rooms = roomTypes;
