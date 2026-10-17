import { hotelContact } from "../data/hotel";

export function whatsappUrl(message) {
  return `https://wa.me/${hotelContact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
