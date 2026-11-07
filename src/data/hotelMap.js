// Room locations follow the guest-supplied floor plan. Colors are read from its legend;
// entries marked unconfirmed should be checked against the hotel's current room inventory.
const roomClusters = [
  { ids: [101, 102, 103, 104, 105, 106], x: 850, y: 215, dx: 0, dy: 48, columns: 1 },
  { ids: [201, 202, 203, 204, 205, 206, 207], x: 960, y: 178, dx: 0, dy: 45, columns: 1 },
  { ids: [107, 108, 109, 110, 111], x: 955, y: 505, dx: 0, dy: 45, columns: 1 },
  { ids: [112, 114], x: 910, y: 465, dx: 64, dy: 0, columns: 2 },
  { ids: [121, 122], x: 148, y: 485, dx: 0, dy: 44, columns: 1 },
  { ids: [123, 124, 125, 126], x: 286, y: 438, dx: 66, dy: 0, columns: 4 },
  { ids: [120, 119, 118, 117, 127], x: 270, y: 554, dx: 68, dy: 0, columns: 5 },
  { ids: [115, 116, 128], x: 650, y: 495, dx: 0, dy: 44, columns: 1 },
  { ids: [220, 219, 218], x: 214, y: 742, dx: 64, dy: 0, columns: 3 },
  { ids: [212, 211, 210], x: 515, y: 742, dx: 64, dy: 0, columns: 3 },
  { ids: [215, 217, 214], x: 388, y: 780, dx: 82, dy: 0, columns: 3 },
  { ids: [216, 209, 208], x: 865, y: 742, dx: 64, dy: 0, columns: 3 },
];

const categoryByRoom = {
  101: "executive", 102: "executive", 103: "executive", 104: "executive", 105: "executive", 106: "executive",
  201: "junior", 202: "executive", 203: "executive", 204: "executive", 205: "executive", 206: "executive", 207: "executive",
  107: "executive", 108: "executive", 109: "executive", 110: "executive", 111: "executive", 112: "deluxe",
  114: "deluxe", 115: "superior", 116: "superior", 117: "superior", 118: "superior", 119: "superior", 120: "deluxe", 121: "superior", 122: "superior",
  123: "kost", 124: "kost", 125: "kost", 126: "kost",
  127: "executive", 128: "executive",
  208: "junior", 209: "junior", 210: "junior", 211: "junior", 212: "junior", 214: "junior", 215: "junior", 216: "junior", 217: "family", 218: "family", 219: "grand", 220: "grand",
};
const roomDetails = Object.fromEntries(Object.entries(categoryByRoom).map(([number, category]) => [number, category]));

export const mapRooms = roomClusters.flatMap(({ ids, x, y, dx, dy, columns }) => ids.map((number, index) => {
  const col = index % columns;
  const row = Math.floor(index / columns);
  return {
    id: `room-${number}`,
    number: String(number),
    x: x + col * dx,
    y: y + row * dy,
    category: roomDetails[number] ?? "unconfirmed",
    floor: number < 200 ? 1 : ([214, 215, 217].includes(number) ? 3 : 2),
  };
}));

export const mapLocations = [
  { id: "lobby", category: "facilities", x: 520, y: 128, detail: "map.locations.lobby" },
  { id: "front-office", category: "facilities", x: 678, y: 188, detail: "map.locations.frontOffice" },
  { id: "caffe-resto", category: "dining", x: 245, y: 330, image: "/images/Home/resto.webp", detail: "map.locations.caffeResto" },
  { id: "restaurant", category: "dining", x: 698, y: 342, image: "/images/Home/resto2.webp", detail: "map.locations.restaurant" },
  { id: "cinta-lounge", category: "events", x: 430, y: 368, image: "/images/Home/hall2.webp", detail: "map.locations.cintaLounge" },
  { id: "gazebo", category: "recreation", x: 530, y: 268, detail: "map.locations.gazebo" },
  { id: "garden", category: "recreation", x: 532, y: 505, detail: "map.locations.garden" },
  { id: "parking", category: "facilities", x: 824, y: 420, detail: "map.locations.parking" },
  { id: "mushola", category: "facilities", x: 830, y: 625, detail: "map.locations.mushola" },
  { id: "pool", category: "recreation", x: 295, y: 690, image: "/images/Home/bck.webp", detail: "map.locations.pool" },
  { id: "kitchen-laundry", category: "facilities", x: 926, y: 625, detail: "map.locations.kitchenLaundry" },
  { id: "meeting-hall", category: "events", x: 180, y: 685, image: "/images/Home/hall.webp", detail: "map.locations.meetingHall" },
  { id: "kost", category: "accommodation", x: 275, y: 470, detail: "map.locations.kost" },
];

export const roomTypeForMap = (roomCategory) => ({
  superior: "superior", deluxe: "deluxe", executive: "executive-suite", junior: "junior-suite", family: "family-suite", grand: "grand-suite", kost: null,
}[roomCategory] ?? null);
