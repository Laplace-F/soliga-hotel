import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, BedDouble, Building2, ChevronRight, Compass, MapPin, Minus, ParkingSquare, Plus, Search, Utensils, Waves, X } from "lucide-react";
import { mapLocations, mapRooms, roomTypeForMap } from "../data/hotelMap";
import { rooms } from "../data/rooms";

const categories = ["all", "accommodation", "dining", "recreation", "facilities", "events"];
const roomColors = { superior: "#c77944", deluxe: "#d98cc8", executive: "#8d57bc", junior: "#92cf59", grand: "#6fc9be", family: "#f1df58", kost: "#cbb39d", unconfirmed: "#8d8784" };
const iconFor = { dining: Utensils, recreation: Waves, facilities: Building2, events: Compass };

function MapArtwork({ t, visibleLocations, visibleRooms, selectedId, onSelect }) {
  return <svg viewBox="0 0 1200 800" role="img" aria-label={t("map.artworkAlt")} className="h-full w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="gardenDots" width="34" height="34" patternUnits="userSpaceOnUse"><circle cx="5" cy="8" r="1.6" fill="#718d5d" opacity=".2"/><circle cx="26" cy="25" r="1.4" fill="#718d5d" opacity=".18"/></pattern>
      <pattern id="roofTiles" width="22" height="16" patternUnits="userSpaceOnUse"><path d="M0 8h22M11 0v8M0 8v8m22-8v8" stroke="#6d4a3b" strokeWidth="1" opacity=".18"/></pattern>
      <filter id="mapShadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#392b24" floodOpacity=".18"/></filter>
    </defs>
    <rect width="1200" height="800" fill="#f4ead6"/>
    <path d="M0 0h1200v800H0z" fill="#f7f3e9"/>
    <path d="M0 0h1200v800H0z" fill="url(#gardenDots)"/>
    <path d="M0 395C192 316 267 440 410 398s210-92 335-21 239 75 455-8M385 0c-7 155 83 219 42 341s-88 205-14 459M815 0c-61 154 1 243 101 311s84 176 59 489" fill="none" stroke="#ddcfb4" strokeWidth="34" strokeLinecap="round"/>
    <path d="M0 395C192 316 267 440 410 398s210-92 335-21 239 75 455-8M385 0c-7 155 83 219 42 341s-88 205-14 459M815 0c-61 154 1 243 101 311s84 176 59 489" fill="none" stroke="#fffaf0" strokeWidth="23" strokeLinecap="round"/>
    <path d="M67 38h255v93H67z" fill="#d8e5c8" rx="32"/><path d="M77 48h235v73H77z" fill="#dbe8cf" rx="28"/>
    <g opacity=".9"><ellipse cx="530" cy="480" rx="185" ry="125" fill="#9eb97c"/><ellipse cx="530" cy="480" rx="155" ry="96" fill="#779a64"/><path d="M421 488c60-79 161-96 218-11-31 76-150 113-218 11Z" fill="#8aa96d"/><path d="M462 432c35 38 71 58 127 81M424 494c63-17 126-18 206 4" fill="none" stroke="#d9deb0" strokeWidth="5" opacity=".8"/></g>
    <g fill="#66885d" opacity=".88"><circle cx="108" cy="216" r="26"/><circle cx="170" cy="272" r="18"/><circle cx="320" cy="215" r="22"/><circle cx="360" cy="634" r="27"/><circle cx="439" cy="682" r="18"/><circle cx="687" cy="562" r="25"/><circle cx="752" cy="608" r="18"/><circle cx="1041" cy="331" r="27"/><circle cx="1087" cy="285" r="17"/><circle cx="1070" cy="698" r="26"/><circle cx="1140" cy="651" r="20"/><circle cx="735" cy="137" r="19"/><circle cx="674" cy="114" r="15"/></g>
    <g fill="#96ad79" opacity=".85"><circle cx="108" cy="208" r="15"/><circle cx="320" cy="207" r="13"/><circle cx="360" cy="624" r="16"/><circle cx="687" cy="552" r="15"/><circle cx="1041" cy="321" r="17"/><circle cx="1070" cy="689" r="15"/></g>
    {/* Main buildings are shown as shaded top-down footprints rather than schematic boxes. */}
    <g filter="url(#mapShadow)">
      <g><rect x="442" y="71" width="166" height="80" rx="12" fill="#a65344"/><rect x="449" y="78" width="152" height="65" rx="9" fill="#bd725c"/><path d="M449 101h152M524 78v65" stroke="#e5b68d" strokeWidth="3" opacity=".8"/><rect x="449" y="78" width="152" height="65" rx="9" fill="url(#roofTiles)"/></g>
      <g><rect x="618" y="121" width="152" height="70" rx="10" fill="#af654e"/><rect x="625" y="128" width="138" height="56" rx="7" fill="#d8b18a"/><path d="M625 149h138M694 128v56" stroke="#f4e0bd" strokeWidth="2"/><rect x="625" y="128" width="138" height="56" rx="7" fill="url(#roofTiles)"/></g>
      <g><rect x="120" y="279" width="244" height="116" rx="13" fill="#a95545"/><rect x="128" y="287" width="228" height="100" rx="9" fill="#c27b60"/><path d="M128 321h228M202 287v100M282 287v100" stroke="#f0c499" strokeWidth="3"/><rect x="128" y="287" width="228" height="100" rx="9" fill="url(#roofTiles)"/></g>
      <g><rect x="612" y="287" width="174" height="116" rx="13" fill="#a95545"/><rect x="620" y="295" width="158" height="100" rx="9" fill="#d4a477"/><path d="M620 328h158M699 295v100" stroke="#f1d7af" strokeWidth="3"/><rect x="620" y="295" width="158" height="100" rx="9" fill="url(#roofTiles)"/></g>
      <g><rect x="370" y="328" width="194" height="81" rx="12" fill="#873d37"/><rect x="378" y="336" width="178" height="65" rx="8" fill="#a75d4f"/><path d="M378 357h178" stroke="#d99b79" strokeWidth="3"/><rect x="378" y="336" width="178" height="65" rx="8" fill="url(#roofTiles)"/></g>
      <g><rect x="120" y="441" width="152" height="76" rx="12" fill="#a95545"/><rect x="128" y="449" width="136" height="60" rx="8" fill="#c27b60"/><path d="M128 478h136" stroke="#f0c499" strokeWidth="3"/><rect x="128" y="449" width="136" height="60" rx="8" fill="url(#roofTiles)"/></g>
      <g><rect x="863" y="390" width="214" height="154" rx="14" fill="#aaa9a5"/><rect x="873" y="400" width="194" height="134" rx="10" fill="#c7c6c0"/><path d="M888 414h164v105H888z" fill="#b5b4ae" stroke="#d9d7d0" strokeWidth="4"/></g>
      <g><rect x="906" y="589" width="158" height="96" rx="12" fill="#9f5647"/><rect x="914" y="597" width="142" height="80" rx="8" fill="#c98a64"/><path d="M914 623h142M984 597v80" stroke="#f1d4a6" strokeWidth="3"/><rect x="914" y="597" width="142" height="80" rx="8" fill="url(#roofTiles)"/></g>
      <g><rect x="139" y="607" width="152" height="89" rx="12" fill="#a95545"/><rect x="147" y="615" width="136" height="73" rx="8" fill="#b9735c"/><path d="M147 650h136M215 615v73" stroke="#efc59b" strokeWidth="3"/><rect x="147" y="615" width="136" height="73" rx="8" fill="url(#roofTiles)"/></g>
      <g><rect x="312" y="623" width="134" height="68" rx="24" fill="#83c9cc" stroke="#fff" strokeWidth="7"/><path d="M326 642q53-19 105 0" fill="none" stroke="#d5f3e9" strokeWidth="4"/></g>
    </g>
    <g fontFamily="DM Sans, sans-serif" fontSize="15" fontWeight="700" letterSpacing="1.5" fill="#553d32" textAnchor="middle">
      <text x="525" y="118">PONDOK LOBBY</text><text x="694" y="164">FRONT OFFICE</text><text x="241" y="342">CAFFÈ RESTO</text><text x="699" y="354">RESTO</text><text x="467" y="377" fill="#fff4df">CINTA LOUNGE</text><text x="529" y="490">TAMAN</text><text x="970" y="477">PARKIR</text><text x="979" y="642">MUSHOLA</text><text x="379" y="662">PONDOK KOLAM</text><text x="214" y="659" fill="#fff4df">MEETING HALL</text>
    </g>
    <g><circle cx="532" cy="268" r="31" fill="#9d7047" stroke="#f8edda" strokeWidth="7"/><path d="M518 267h28v17h-28zM515 265l17-12 17 12" fill="#e8cf9f" stroke="#fff2d2" strokeWidth="3"/><text x="532" y="316" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5e4738">GAZEBO</text></g>
    {visibleRooms.map((room) => <g key={room.id} data-map-marker role="button" tabIndex="0" aria-label={`${t("map.room")} ${room.number}`} onClick={() => onSelect(room.id)} onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && onSelect(room.id)} className="cursor-pointer">
      <rect x={room.x - 20} y={room.y - 14} width="40" height="28" rx="7" fill={roomColors[room.category]} stroke={selectedId === room.id ? "#48121f" : "#fff"} strokeWidth={selectedId === room.id ? 4 : 2.5} filter="url(#mapShadow)" className="transition-all duration-200 hover:brightness-110"/><text x={room.x} y={room.y + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff" stroke="#56352c" strokeWidth=".5" paintOrder="stroke">{room.number}</text>
    </g>)}
    {visibleLocations.map((place) => { const Icon = iconFor[place.category] ?? MapPin; return <g key={place.id} data-map-marker role="button" tabIndex="0" aria-label={t(place.detail)} onClick={() => onSelect(place.id)} onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && onSelect(place.id)} className="cursor-pointer">
      <circle cx={place.x} cy={place.y} r={selectedId === place.id ? 25 : 22} fill="#fffdf8" stroke="#fff" strokeWidth="4" filter="url(#mapShadow)" className="transition-all duration-200 hover:r-24"/><circle cx={place.x} cy={place.y} r="17" fill="#701f32"/><foreignObject x={place.x - 9} y={place.y - 9} width="18" height="18"><Icon size={18} color="#fff" strokeWidth={2.5}/></foreignObject>
    </g>; })}
    <g opacity=".8"><path d="M1107 94v50m0-50-12 17m12-17 12 17" fill="none" stroke="#701f32" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><text x="1107" y="164" textAnchor="middle" fontSize="12" fontWeight="700" fill="#701f32">N</text></g>
  </svg>;
}

export default function HotelMapPage() {
  const { t } = useTranslation();
  const [category, setCategory] = useState("all");
  const [selectedId, setSelectedId] = useState("lobby");
  const [query, setQuery] = useState("");
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const drag = useRef(null);
  const roomsById = useMemo(() => new Map(mapRooms.map((room) => [room.id, room])), []);
  const locationsById = useMemo(() => new Map(mapLocations.map((location) => [location.id, location])), []);
  const allItems = useMemo(() => [...mapLocations, ...mapRooms.map((room) => ({ ...room, category: "accommodation", detail: "" }))], []);
  const matches = useMemo(() => {
    const value = query.trim().toLocaleLowerCase();
    if (!value) return [];
    return allItems.filter((item) => {
      const name = item.number ? `${t("map.room")} ${item.number} ${t(`map.roomTypes.${item.category}`)}` : `${t(item.detail)} ${t(`map.categories.${item.category}`)}`;
      return name.toLocaleLowerCase().includes(value);
    }).slice(0, 7);
  }, [allItems, query, t]);
  const visibleRooms = category === "all" || category === "accommodation" ? mapRooms : [];
  const visibleLocations = mapLocations.filter((place) => category === "all" || place.category === category);
  const selected = locationsById.get(selectedId) ?? roomsById.get(selectedId);
  const isRoom = Boolean(selected?.number);
  const roomSlug = isRoom ? roomTypeForMap(selected.category) : null;
  const roomData = roomSlug ? rooms.find((room) => room.slug === roomSlug) : null;
  const focusItem = (item) => {
    setSelectedId(item.id);
    setCategory(item.number ? "accommodation" : item.category);
    setSearchOpen(false);
    setQuery("");
    setScale((current) => Math.max(current, 1.2));
    const x = item.x / 1200 - 0.5;
    const y = item.y / 800 - 0.5;
    setPan({ x: -x * 100, y: -y * 70 });
  };
  const startPan = (event) => { if (event.button !== 0 || event.target.closest("[data-map-marker], button, a, input")) return; drag.current = { x: event.clientX - pan.x, y: event.clientY - pan.y }; setDragging(true); event.currentTarget.setPointerCapture(event.pointerId); };
  const movePan = (event) => { if (drag.current) setPan({ x: Math.max(-250 * (scale - 1), Math.min(250 * (scale - 1), event.clientX - drag.current.x)), y: Math.max(-200 * (scale - 1), Math.min(200 * (scale - 1), event.clientY - drag.current.y)) }); };
  const stopPan = () => { drag.current = null; setDragging(false); };
  const zoom = (delta) => setScale((value) => Math.min(2.25, Math.max(1, Number((value + delta).toFixed(2)))));

  return <main className="min-h-screen bg-[#f8f6f4] px-4 pb-16 pt-28 text-[#171416] md:px-8 md:pt-32">
    <div className="mx-auto max-w-7xl">
      <div className="mb-7 flex flex-col gap-4 md:mb-9 md:flex-row md:items-end md:justify-between">
        <div><p className="mb-3 text-[10px] font-bold uppercase tracking-[.3em] text-[#701f32]">{t("map.eyebrow")}</p><h1 className="font-display text-4xl leading-tight md:text-5xl">{t("map.title")}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">{t("map.intro")}</p></div>
        <p className="flex items-center gap-2 text-xs text-[var(--muted)]"><Compass size={16} className="text-[#701f32]"/>{t("map.gestureHint")}</p>
      </div>
      <div className="mb-4 grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="relative w-full min-w-0 max-w-xl">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#81777b]"/><input value={query} onChange={(event) => { setQuery(event.target.value); setSearchOpen(true); }} onFocus={() => setSearchOpen(true)} onKeyDown={(event) => { if (event.key === "Enter" && matches[0]) focusItem(matches[0]); if (event.key === "Escape") setSearchOpen(false); }} placeholder={t("map.searchPlaceholder")} aria-label={t("map.searchPlaceholder")} className="h-12 w-full rounded-full border border-[#e2d8d1] bg-white pl-11 pr-11 text-sm shadow-sm outline-none transition focus:border-[#701f32] focus:ring-2 focus:ring-[#701f32]/15"/>{query && <button type="button" onClick={() => { setQuery(""); setSearchOpen(false); }} aria-label={t("map.clearSearch")} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#81777b]"><X size={17}/></button>}
          {searchOpen && query && <div className="absolute z-30 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-[#eee5dc] bg-white p-2 shadow-xl">{matches.length ? matches.map((item) => <button key={item.id} type="button" onClick={() => focusItem(item)} className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition hover:bg-[#f8f3ef]"><span><span className="block font-semibold">{item.number ? `${t("map.room")} ${item.number}` : t(item.detail)}</span><span className="mt-1 block text-xs text-[var(--muted)]">{t(`map.categories.${item.number ? "accommodation" : item.category}`)}{item.number ? ` · ${t(`map.roomTypes.${item.category}`)}` : ""}</span></span><ChevronRight size={16} className="text-[#701f32]"/></button>) : <p className="px-3 py-4 text-sm text-[var(--muted)]">{t("map.noResults")}</p>}</div>}
        </div>
        <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1" role="group" aria-label={t("map.filtersLabel")}>{categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-semibold transition ${category === item ? "border-[#701f32] bg-[#701f32] text-white" : "border-[#ded4cd] bg-white text-[#5f595e] hover:border-[#701f32] hover:text-[#701f32]"}`}>{t(`map.categories.${item}`)}</button>)}</div>
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div>
          <div className="relative h-[460px] touch-none overflow-hidden rounded-[24px] border border-[#e7ded5] bg-[#f4ead6] shadow-[0_18px_60px_-35px_rgba(61,37,28,.45)] sm:h-[560px] lg:h-[650px]" onPointerDown={startPan} onPointerMove={movePan} onPointerUp={stopPan} onPointerCancel={stopPan} onLostPointerCapture={stopPan} style={{ cursor: dragging ? "grabbing" : "grab" }}>
            <div className="absolute inset-0 transition-transform duration-300 ease-out" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`, transformOrigin: "center" }}><MapArtwork t={t} visibleLocations={visibleLocations} visibleRooms={visibleRooms} selectedId={selectedId} onSelect={setSelectedId}/></div>
            <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-3 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#701f32] shadow-sm backdrop-blur">Hotel Soliga · Gunungsitoli</div>
            <div className="absolute right-4 top-4 flex flex-col overflow-hidden rounded-xl border border-white/80 bg-white/95 shadow-lg backdrop-blur">
              <button type="button" onClick={() => zoom(.2)} aria-label={t("map.zoomIn")} className="grid h-11 w-11 place-items-center text-[#701f32] transition hover:bg-[#f8f3ef]"><Plus size={18}/></button><span className="mx-2 border-t border-[#eee5dc]"/><button type="button" onClick={() => zoom(-.2)} aria-label={t("map.zoomOut")} className="grid h-11 w-11 place-items-center text-[#701f32] transition hover:bg-[#f8f3ef]"><Minus size={18}/></button><span className="mx-2 border-t border-[#eee5dc]"/><button type="button" onClick={() => { setPan({ x: 0, y: 0 }); setScale(1); }} aria-label={t("map.resetView")} className="grid h-11 w-11 place-items-center text-[#701f32] transition hover:bg-[#f8f3ef]"><Compass size={17}/></button>
            </div>
            <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-2 text-[10px] font-medium text-[#625b5d] shadow-sm backdrop-blur">{t("map.scale", { percent: Math.round(scale * 100) })}</div>
          </div>
          <div className="mt-4 rounded-2xl border border-[#e9dfd7] bg-white px-4 py-4 sm:px-5">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#701f32]">{t("map.legendTitle")}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2.5">{["superior", "deluxe", "executive", "junior", "grand", "family", "kost"].map((type) => <span key={type} className="flex items-center gap-2 text-[10px] text-[#615b5e] sm:text-xs"><span className="h-3 w-3 rounded-sm" style={{ backgroundColor: roomColors[type] }}/>{t(`map.roomTypes.${type}`)}</span>)}<span className="flex items-center gap-2 text-[10px] text-[#615b5e] sm:text-xs"><span className="grid h-4 w-4 place-items-center rounded-full bg-[#701f32] text-[8px] text-white">•</span>{t("map.legendFacilities")}</span></div>
            <p className="mt-3 text-[10px] leading-5 text-[var(--muted)]">{t("map.planNote")}</p>
          </div>
        </div>
        <aside aria-live="polite" className="self-start overflow-hidden rounded-[24px] border border-[#e9dfd7] bg-white shadow-[0_12px_45px_-32px_rgba(61,37,28,.5)]">
          {selected?.image ? <img src={selected.image} alt={t(isRoom ? "map.roomPhotoAlt" : selected.detail)} loading="lazy" className="h-44 w-full object-cover sm:h-52 xl:h-44"/> : <div className="relative grid h-44 place-items-center overflow-hidden bg-[#f0e4d9] sm:h-52 xl:h-44"><div className="absolute -right-8 -top-14 h-48 w-48 rounded-full bg-[#d7c5a9]/40"/><div className="absolute -bottom-24 -left-7 h-48 w-48 rounded-full bg-[#b7c39a]/55"/><div className="relative grid h-16 w-16 place-items-center rounded-full bg-white text-[#701f32] shadow-lg">{isRoom ? <BedDouble size={28}/> : selected?.id === "parking" ? <ParkingSquare size={28}/> : <Building2 size={28}/>}</div></div>}
          <div className="p-5 sm:p-6"><div className="mb-3 flex items-center justify-between gap-3"><span className="rounded-full bg-[#f5ece7] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.14em] text-[#701f32]">{t(`map.categories.${isRoom ? "accommodation" : selected?.category ?? "facilities"}`)}</span>{isRoom && <span className="text-xs text-[var(--muted)]">{t("map.floor", { floor: selected.floor })}</span>}</div>
            <h2 className="font-display text-2xl leading-tight">{isRoom ? `${t("map.room")} ${selected.number}` : t(selected?.detail ?? "map.locations.lobby")}</h2>
            {isRoom && <p className="mt-1 text-xs font-semibold text-[#701f32]">{selected.category === "unconfirmed" ? t("map.typeToConfirm") : t(`map.roomTypes.${selected.category}`)}</p>}
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{isRoom ? t(selected.category === "unconfirmed" ? "map.roomUnconfirmed" : "map.roomDescription", { type: t(`map.roomTypes.${selected.category}`) }) : t(`${selected?.detail}.description`)}</p>
            <div className="mt-5 flex flex-wrap gap-2">{isRoom && roomData ? <Link to={`/rooms/${roomData.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#701f32] px-4 text-xs font-semibold text-white transition hover:bg-[#48121f] hover:text-white">{t("map.viewRoom") }<ArrowUpRight size={15}/></Link> : !isRoom && selected?.category === "dining" ? <Link to="/#facilities" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#701f32] px-4 text-xs font-semibold text-white transition hover:bg-[#48121f] hover:text-white">{t("map.viewRelated")}<ArrowUpRight size={15}/></Link> : null}<a href="#contact" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#d9ccc4] px-4 text-xs font-semibold text-[#701f32] transition hover:bg-[#f8f3ef]">{t("nav.contact")}<ChevronRight size={15}/></a></div>
          </div>
        </aside>
      </div>
    </div>
  </main>;
}
