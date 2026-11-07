import mapConfig from "./hotelMap.json";

export const hotelMapConfig = mapConfig;
export const mapObjects = mapConfig.objects;
export const mapElements = mapConfig.elements ?? [];
export const mapLayers = mapConfig.layers ?? [];
export const mapBackground = mapConfig.background ?? { src: null, x: 0, y: 0, width: 100, height: 100, scale: 1, opacity: 1, rotation: 0, locked: true };
export const mapReference = mapConfig.reference ?? { src: null, opacity: 0.5, visible: true, locked: true };
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
