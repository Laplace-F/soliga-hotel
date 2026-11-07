import mapConfig from "./hotelMap.json";

export const mapObjects = mapConfig.objects;
export const mapRooms = mapObjects.filter((object) => object.type === "room").map((object) => ({
  ...object,
  number: String(object.roomNumber),
  x: object.x * 12,
  y: object.y * 8,
  category: object.roomType,
}));
export const mapLocations = mapObjects.filter((object) => object.type === "marker").map((object) => ({
  ...object,
  x: object.x * 12,
  y: object.y * 8,
}));

export const roomTypeForMap = (roomCategory) => ({
  superior: "superior",
  deluxe: "deluxe",
  executive: "executive-suite",
  junior: "junior-suite",
  family: "family-suite",
  grand: "grand-suite",
  kost: null,
}[roomCategory] ?? null);
