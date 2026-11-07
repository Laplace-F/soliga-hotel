import { lazy, Suspense, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, BedDouble, Building2, ChevronRight, Compass, MapPin, Minus, ParkingSquare, Plus, Search, Utensils, Waves, X } from "lucide-react";
import { mapObjects, roomTypeForMap } from "../data/hotelMap";
import { rooms } from "../data/rooms";
const HotelMapEditorPanel = import.meta.env.DEV ? lazy(() => import("../components/HotelMapEditorPanel")) : null;

const categories = ["all", "accommodation", "dining", "recreation", "facilities", "events"];
const roomColors = { superior: "#c77944", deluxe: "#d98cc8", executive: "#8d57bc", junior: "#92cf59", grand: "#6fc9be", family: "#f1df58", kost: "#cbb39d", unconfirmed: "#8d8784" };
const iconFor = { dining: Utensils, recreation: Waves, facilities: Building2, events: Compass };

function MapArtwork({ t, objects, selectedId, onSelect, editing = false, referenceImage, referenceOpacity = 0.5, onObjectChange, onGestureStart, onGestureEnd }) {
  const gesture = useRef(null);
  const pointInMap = (event) => {
    const svg = event.currentTarget.ownerSVGElement ?? event.currentTarget;
    const point = svg.createSVGPoint(); point.x = event.clientX; point.y = event.clientY;
    const transformed = point.matrixTransform(svg.getScreenCTM().inverse());
    return { x: transformed.x, y: transformed.y };
  };
  const beginGesture = (event, object, mode) => {
    event.preventDefault(); event.stopPropagation();
    const point = pointInMap(event);
    gesture.current = { id: object.id, mode, point, object, angle: Math.atan2(point.y - object.y * 8, point.x - object.x * 12) * 180 / Math.PI };
    event.currentTarget.setPointerCapture(event.pointerId);
    onSelect(object.id);
    onGestureStart();
  };
  const moveGesture = (event) => {
    if (!gesture.current) return;
    const state = gesture.current;
    const point = pointInMap(event);
    if (state.mode === "move") onObjectChange(state.id, { x: Math.max(0, Math.min(100, state.object.x + (point.x - state.point.x) / 12)), y: Math.max(0, Math.min(100, state.object.y + (point.y - state.point.y) / 8)) });
    if (state.mode === "resize") onObjectChange(state.id, { width: Math.max(0.5, Math.min(100, state.object.width + (point.x - state.point.x) / 6)), height: Math.max(0.5, Math.min(100, state.object.height + (point.y - state.point.y) / 4)) });
    if (state.mode === "rotate") {
      const angle = Math.atan2(point.y - state.object.y * 8, point.x - state.object.x * 12) * 180 / Math.PI;
      onObjectChange(state.id, { rotation: Math.round(state.object.rotation + angle - state.angle) });
    }
  };
  const endGesture = () => { if (gesture.current) { gesture.current = null; onGestureEnd(); } };
  const visibleObjects = objects.filter((object) => object.visible !== false);
  const orderedObjects = [...visibleObjects].sort((a, b) => (a.layer ?? 0) - (b.layer ?? 0));
  const selected = objects.find((object) => object.id === selectedId);
  return <svg viewBox="0 0 1200 800" role="img" aria-label={t("map.artworkAlt")} className="h-full w-full select-none" xmlns="http://www.w3.org/2000/svg" onPointerMove={moveGesture} onPointerUp={endGesture} onPointerCancel={endGesture}>
    <defs>
      <pattern id="gardenDots" width="34" height="34" patternUnits="userSpaceOnUse"><circle cx="5" cy="8" r="1.6" fill="#718d5d" opacity=".2"/><circle cx="26" cy="25" r="1.4" fill="#718d5d" opacity=".18"/></pattern>
      <pattern id="roofTiles" width="22" height="16" patternUnits="userSpaceOnUse"><path d="M0 8h22M11 0v8M0 8v8m22-8v8" stroke="#6d4a3b" strokeWidth="1" opacity=".18"/></pattern>
      <filter id="mapShadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#392b24" floodOpacity=".18"/></filter>
    </defs>
    <rect width="1200" height="800" fill="#f4ead6"/>
    <path d="M0 0h1200v800H0z" fill="#f7f3e9"/>
    <path d="M0 0h1200v800H0z" fill="url(#gardenDots)"/>
    {referenceImage && editing && <image href={referenceImage} x="0" y="0" width="1200" height="800" preserveAspectRatio="none" opacity={referenceOpacity} pointerEvents="none"/>}
    <path d="M0 395C192 316 267 440 410 398s210-92 335-21 239 75 455-8M385 0c-7 155 83 219 42 341s-88 205-14 459M815 0c-61 154 1 243 101 311s84 176 59 489" fill="none" stroke="#ddcfb4" strokeWidth="34" strokeLinecap="round"/>
    <path d="M0 395C192 316 267 440 410 398s210-92 335-21 239 75 455-8M385 0c-7 155 83 219 42 341s-88 205-14 459M815 0c-61 154 1 243 101 311s84 176 59 489" fill="none" stroke="#fffaf0" strokeWidth="23" strokeLinecap="round"/>
    <g fill="#66885d" opacity=".88"><circle cx="108" cy="216" r="26"/><circle cx="170" cy="272" r="18"/><circle cx="320" cy="215" r="22"/><circle cx="360" cy="634" r="27"/><circle cx="439" cy="682" r="18"/><circle cx="687" cy="562" r="25"/><circle cx="752" cy="608" r="18"/><circle cx="1041" cy="331" r="27"/><circle cx="1087" cy="285" r="17"/><circle cx="1070" cy="698" r="26"/><circle cx="1140" cy="651" r="20"/><circle cx="735" cy="137" r="19"/><circle cx="674" cy="114" r="15"/></g>
    <g fill="#96ad79" opacity=".85"><circle cx="108" cy="208" r="15"/><circle cx="320" cy="207" r="13"/><circle cx="360" cy="624" r="16"/><circle cx="687" cy="552" r="15"/><circle cx="1041" cy="321" r="17"/><circle cx="1070" cy="689" r="15"/></g>
    {orderedObjects.map((object) => {
      const sx = object.width * 12 / 100;
      const sy = object.height * 8 / 100;
      const Icon = iconFor[object.category] ?? MapPin;
      const label = object.labelKey ? t(object.labelKey) : (object.label || object.name || object.roomNumber || "");
      const fontSize = (object.fontSize || 12) / Math.max(sx, 0.1);
      const selectedObject = object.id === selectedId;
      const transform = `translate(${object.x * 12} ${object.y * 8}) rotate(${object.rotation || 0}) scale(${sx} ${sy})`;
      return <g key={object.id} data-map-marker role="button" tabIndex="0" aria-label={label} className={editing ? "cursor-move" : "cursor-pointer"} transform={transform}
        onClick={() => !editing && onSelect(object.id)} onKeyDown={(event) => !editing && (event.key === "Enter" || event.key === " ") && onSelect(object.id)}
        onPointerDown={editing ? (event) => beginGesture(event, object, "move") : undefined}>
        {object.type === "room" && <><rect x="-50" y="-50" width="100" height="100" rx="18" fill={object.color || roomColors[object.roomType] || roomColors.unconfirmed} stroke={selectedObject ? "#48121f" : "#fff"} strokeWidth={selectedObject ? 8 : 5} vectorEffect="non-scaling-stroke" filter="url(#mapShadow)"/><text transform={`scale(1 ${sx / sy})`} x="0" y={fontSize / 3} textAnchor="middle" fontSize={fontSize} fontWeight="800" fill="#fff" stroke="#56352c" strokeWidth="1" paintOrder="stroke">{object.roomNumber ?? object.name}</text></>}
        {object.type === "marker" && <><circle r="49" fill="#fffdf8" stroke="#fff" strokeWidth="6" filter="url(#mapShadow)"/><circle r="38" fill={object.color || "#701f32"}/><foreignObject x="-22" y="-22" width="44" height="44"><Icon size={40} color="#fff" strokeWidth={2.5}/></foreignObject>{(editing || object.showLabel) && <text transform={`scale(1 ${sx / sy})`} x="0" y="70" textAnchor="middle" fontSize={fontSize} fontWeight="700" fill="#48121f" stroke="#fffaf0" strokeWidth="5" paintOrder="stroke">{label}</text>}</>}
        {object.type === "building" && <>{object.shape === "circle" ? <circle r="48" fill={object.color || "#bd725c"} stroke={selectedObject ? "#48121f" : "#fff8e9"} strokeWidth={selectedObject ? 5 : 3} filter="url(#mapShadow)"/> : <rect x="-50" y="-50" width="100" height="100" rx="10" fill={object.color || "#bd725c"} stroke={selectedObject ? "#48121f" : "#fff8e9"} strokeWidth={selectedObject ? 5 : 3} filter="url(#mapShadow)"/>}{object.shape === "circle" ? <path d="M-28 1h56v27h-56zM-34-4 0-32 34-4" fill="#e8cf9f" stroke="#fff2d2" strokeWidth="5"/> : <><path d="M-42 -15H42M0 -45V45" fill="none" stroke="#f2d4ad" strokeWidth="2" opacity=".7"/><rect x="-45" y="-45" width="90" height="90" rx="8" fill="url(#roofTiles)"/></>}</>}
        {object.type === "garden" && <><ellipse rx="49" ry="44" fill={object.color || "#779a64"} stroke={selectedObject ? "#48121f" : "#dce5be"} strokeWidth="5"/><ellipse rx="37" ry="30" fill="#92ad72"/><path d="M-25 4Q0-30 27 3Q5 28-25 4Z" fill="#d9deb0" opacity=".45"/></>}
        {object.type === "text" && <text transform={`scale(1 ${sx / sy})`} x="0" y={fontSize / 3} textAnchor="middle" fontSize={fontSize} fontWeight="700" fill={object.color || "#48121f"} stroke="#fffaf0" strokeWidth="2" paintOrder="stroke">{label}</text>}
        {object.type !== "text" && object.type !== "room" && object.type !== "marker" && <text transform={`scale(1 ${sx / sy})`} x="0" y={fontSize / 3} textAnchor="middle" fontSize={fontSize} fontWeight="700" fill="#fff" stroke="#56352c" strokeWidth="1" paintOrder="stroke">{label}</text>}
      </g>;
    })}
    {editing && selected && selected.visible !== false && <g transform={`translate(${selected.x * 12} ${selected.y * 8}) rotate(${selected.rotation || 0}) scale(${selected.width * 12 / 100} ${selected.height * 8 / 100})`} pointerEvents="all">
      <rect x="-54" y="-54" width="108" height="108" fill="none" stroke="#701f32" strokeWidth="2" strokeDasharray="5 3" vectorEffect="non-scaling-stroke" pointerEvents="none"/>
      <circle data-map-handle cx="50" cy="50" r="12" fill="#fff" stroke="#701f32" strokeWidth="3" vectorEffect="non-scaling-stroke" className="cursor-nwse-resize" onPointerDown={(event) => beginGesture(event, selected, "resize")}/>
      <path d="M0-54v-26" stroke="#701f32" strokeWidth="2" vectorEffect="non-scaling-stroke" pointerEvents="none"/><circle data-map-handle cx="0" cy="-82" r="11" fill="#fff" stroke="#701f32" strokeWidth="3" vectorEffect="non-scaling-stroke" className="cursor-grab" onPointerDown={(event) => beginGesture(event, selected, "rotate")}/>
    </g>}
    <g opacity=".8"><path d="M1107 94v50m0-50-12 17m12-17 12 17" fill="none" stroke="#701f32" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><text x="1107" y="164" textAnchor="middle" fontSize="12" fontWeight="700" fill="#701f32">N</text></g>
  </svg>;
}

export default function HotelMapPage() {
  const { t } = useTranslation();
  const editorMode = import.meta.env.DEV && new URLSearchParams(window.location.search).get("editMap") === "1";
  const initialEditorObjects = () => {
    if (!editorMode) return mapObjects;
    try {
      const saved = JSON.parse(window.localStorage.getItem("hotelMapEditorDraft") || "null");
      return Array.isArray(saved?.objects) ? saved.objects : mapObjects;
    } catch { return mapObjects; }
  };
  const [editorObjects, setEditorObjects] = useState(initialEditorObjects);
  const objects = editorMode ? editorObjects : mapObjects;
  const [category, setCategory] = useState("all");
  const [selectedId, setSelectedId] = useState("lobby");
  const [query, setQuery] = useState("");
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [referenceImage, setReferenceImage] = useState("");
  const [referenceOpacity, setReferenceOpacity] = useState(0.5);
  const drag = useRef(null);
  const gestureSnapshot = useRef(null);
  const roomsById = useMemo(() => new Map(objects.filter((object) => object.type === "room").map((object) => [object.id, { ...object, number: String(object.roomNumber), category: object.roomType }])), [objects]);
  const locationsById = useMemo(() => new Map(objects.filter((object) => object.type !== "room").map((object) => [object.id, object])), [objects]);
  const allItems = useMemo(() => objects.filter((object) => ["room", "marker", "building", "garden", "text"].includes(object.type)), [objects]);
  const matches = useMemo(() => {
    const value = query.trim().toLocaleLowerCase();
    if (!value) return [];
    return allItems.filter((item) => {
      const name = item.type === "room" ? `${t("map.room")} ${item.roomNumber} ${t(`map.roomTypes.${item.roomType}`)}` : `${item.labelKey ? t(item.labelKey) : item.name} ${t(`map.categories.${item.category}`)}`;
      return name.toLocaleLowerCase().includes(value);
    }).slice(0, 7);
  }, [allItems, query, t]);
  const visibleObjects = objects.filter((object) => category === "all" || object.category === category);
  const selected = locationsById.get(selectedId) ?? roomsById.get(selectedId);
  const isRoom = selected?.type === "room";
  const roomSlug = isRoom ? roomTypeForMap(selected.roomType) : null;
  const roomData = roomSlug ? rooms.find((room) => room.slug === roomSlug) : null;
  const focusItem = (item) => {
    setSelectedId(item.id);
    setCategory(item.type === "room" ? "accommodation" : item.category);
    setSearchOpen(false);
    setQuery("");
    setScale((current) => Math.max(current, 1.2));
    const x = item.x / 100 - 0.5;
    const y = item.y / 100 - 0.5;
    setPan({ x: -x * 100, y: -y * 70 });
  };
  const recordHistory = (before = editorObjects) => { setUndoStack((stack) => [...stack.slice(-49), before]); setRedoStack([]); };
  const changeObject = (id, changes) => { if (!editorMode) return; recordHistory(); setEditorObjects((current) => current.map((object) => object.id === id ? { ...object, ...changes } : object)); if (changes.category) setCategory(changes.category); };
  const moveObject = (id, changes) => { if (!editorMode) return; setEditorObjects((current) => current.map((object) => object.id === id ? { ...object, ...changes } : object)); };
  const selectEditorObject = (id) => { setSelectedId(id); const item = objects.find((object) => object.id === id); if (item) setCategory(item.category); };
  const beginGesture = () => { gestureSnapshot.current = editorObjects; };
  const endGesture = () => { if (gestureSnapshot.current) { setUndoStack((stack) => [...stack.slice(-49), gestureSnapshot.current]); setRedoStack([]); gestureSnapshot.current = null; } };
  const startPan = (event) => { if (event.button !== 0 || event.target.closest("[data-map-marker], [data-map-handle], button, a, input")) return; drag.current = { x: event.clientX - pan.x, y: event.clientY - pan.y }; setDragging(true); event.currentTarget.setPointerCapture(event.pointerId); };
  const movePan = (event) => { if (drag.current) setPan({ x: Math.max(-250 * (scale - 1), Math.min(250 * (scale - 1), event.clientX - drag.current.x)), y: Math.max(-200 * (scale - 1), Math.min(200 * (scale - 1), event.clientY - drag.current.y)) }); };
  const stopPan = () => { drag.current = null; setDragging(false); };
  const zoom = (delta) => setScale((value) => Math.min(2.25, Math.max(1, Number((value + delta).toFixed(2)))));
  const addObject = (type) => {
    const number = Math.max(0, ...objects.map((object) => Number(object.roomNumber) || 0)) + 1;
    const id = type === "room" ? `room-${number}` : `${type}-${Date.now()}`;
    const categoryValue = type === "room" ? "accommodation" : type === "garden" ? "recreation" : type === "marker" ? "facilities" : "facilities";
    const color = type === "room" ? roomColors.unconfirmed : type === "garden" ? "#779a64" : type === "marker" ? "#701f32" : "#bd725c";
    const name = type === "room" ? String(number) : t(`map.editor.types.${type}`);
    const item = { id, type, name, label: name, category: categoryValue, roomNumber: type === "room" ? String(number) : undefined, roomType: type === "room" ? "unconfirmed" : undefined, showLabel: type === "marker", x: 50, y: 50, width: type === "text" ? 8 : 4, height: type === "text" ? 5 : 6, rotation: 0, color, visible: true, layer: Math.max(0, ...objects.map((object) => object.layer ?? 0)) + 1, fontSize: 13 };
    recordHistory(); setEditorObjects((current) => [...current, item]); setSelectedId(item.id); setCategory(item.category);
  };
  const duplicateObject = () => {
    if (!selected) return;
    const number = Math.max(0, ...objects.map((object) => Number(object.roomNumber) || 0)) + 1;
    const copy = { ...selected, id: selected.type === "room" ? `room-${number}` : `${selected.type}-${Date.now()}`, name: selected.type === "room" ? String(number) : `${selected.name} copy`, label: selected.type === "room" ? String(number) : `${selected.label || selected.name} copy`, labelKey: null, detail: null, roomNumber: selected.type === "room" ? String(number) : undefined, x: Math.min(98, selected.x + 2), y: Math.min(98, selected.y + 2), layer: Math.max(0, ...objects.map((object) => object.layer ?? 0)) + 1 };
    recordHistory(); setEditorObjects((current) => [...current, copy]); setSelectedId(copy.id); setCategory(copy.category);
  };
  const deleteObject = () => { if (!selected) return; recordHistory(); setEditorObjects((current) => current.filter((object) => object.id !== selected.id)); setSelectedId(""); };
  const undo = () => { if (!undoStack.length) return; const previous = undoStack.at(-1); setRedoStack((stack) => [...stack, editorObjects]); setEditorObjects(previous); setUndoStack((stack) => stack.slice(0, -1)); };
  const redo = () => { if (!redoStack.length) return; const next = redoStack.at(-1); setUndoStack((stack) => [...stack, editorObjects]); setEditorObjects(next); setRedoStack((stack) => stack.slice(0, -1)); };
  const saveDraft = () => window.localStorage.setItem("hotelMapEditorDraft", JSON.stringify({ version: 1, coordinateSystem: "percent-center", canvas: { width: 1200, height: 800 }, objects: editorObjects }));
  const importJSON = (data) => {
    const imported = Array.isArray(data) ? data : data?.objects;
    if (!Array.isArray(imported) || !imported.length || imported.some((object) => !object?.id || !["room", "marker", "building", "garden", "text"].includes(object.type) || ["x", "y", "width", "height"].some((key) => !Number.isFinite(Number(object[key]))))) throw new Error("Invalid map data");
    const ids = new Set();
    const normalized = imported.map((object) => { if (ids.has(object.id)) throw new Error("Duplicate object id"); ids.add(object.id); return { ...object, x: Math.max(0, Math.min(100, Number(object.x))), y: Math.max(0, Math.min(100, Number(object.y))), width: Math.max(0.5, Math.min(100, Number(object.width))), height: Math.max(0.5, Math.min(100, Number(object.height))), rotation: Number(object.rotation) || 0 }; });
    recordHistory(); setEditorObjects(normalized); setSelectedId(normalized[0]?.id ?? "");
  };
  const resetDraft = () => { recordHistory(); setEditorObjects(mapObjects); setSelectedId("lobby"); window.localStorage.removeItem("hotelMapEditorDraft"); };
  const loadReference = (file) => { if (referenceImage.startsWith("blob:")) URL.revokeObjectURL(referenceImage); setReferenceImage(file ? URL.createObjectURL(file) : ""); };

  return <main className="min-h-screen bg-[#f8f6f4] px-4 pb-16 pt-28 text-[#171416] md:px-8 md:pt-32">
    <div className="mx-auto max-w-7xl">
      {editorMode && <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#d8b4aa] bg-[#fff8f4] px-4 py-3 text-xs"><span className="font-bold uppercase tracking-[.16em] text-[#701f32]">{t("map.editor.devOnly")}</span><Link to="/hotel-map" className="font-semibold text-[#701f32] underline underline-offset-4">{t("map.editor.exit")}</Link></div>}
      <div className="mb-7 flex flex-col gap-4 md:mb-9 md:flex-row md:items-end md:justify-between">
        <div><p className="mb-3 text-[10px] font-bold uppercase tracking-[.3em] text-[#701f32]">{t("map.eyebrow")}</p><h1 className="font-display text-4xl leading-tight md:text-5xl">{t("map.title")}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">{t("map.intro")}</p></div>
        <p className="flex items-center gap-2 text-xs text-[var(--muted)]"><Compass size={16} className="text-[#701f32]"/>{t("map.gestureHint")}</p>
      </div>
      <div className="mb-4 grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="relative w-full min-w-0 max-w-xl">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#81777b]"/><input value={query} onChange={(event) => { setQuery(event.target.value); setSearchOpen(true); }} onFocus={() => setSearchOpen(true)} onKeyDown={(event) => { if (event.key === "Enter" && matches[0]) focusItem(matches[0]); if (event.key === "Escape") setSearchOpen(false); }} placeholder={t("map.searchPlaceholder")} aria-label={t("map.searchPlaceholder")} className="h-12 w-full rounded-full border border-[#e2d8d1] bg-white pl-11 pr-11 text-sm shadow-sm outline-none transition focus:border-[#701f32] focus:ring-2 focus:ring-[#701f32]/15"/>{query && <button type="button" onClick={() => { setQuery(""); setSearchOpen(false); }} aria-label={t("map.clearSearch")} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#81777b]"><X size={17}/></button>}
          {searchOpen && query && <div className="absolute z-30 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-[#eee5dc] bg-white p-2 shadow-xl">{matches.length ? matches.map((item) => <button key={item.id} type="button" onClick={() => focusItem(item)} className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition hover:bg-[#f8f3ef]"><span><span className="block font-semibold">{item.type === "room" ? `${t("map.room")} ${item.roomNumber}` : item.labelKey ? t(item.labelKey) : item.name}</span><span className="mt-1 block text-xs text-[var(--muted)]">{t(`map.categories.${item.category}`)}{item.type === "room" ? ` · ${t(`map.roomTypes.${item.roomType}`)}` : ""}</span></span><ChevronRight size={16} className="text-[#701f32]"/></button>) : <p className="px-3 py-4 text-sm text-[var(--muted)]">{t("map.noResults")}</p>}</div>}
        </div>
        <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1" role="group" aria-label={t("map.filtersLabel")}>{categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-semibold transition ${category === item ? "border-[#701f32] bg-[#701f32] text-white" : "border-[#ded4cd] bg-white text-[#5f595e] hover:border-[#701f32] hover:text-[#701f32]"}`}>{t(`map.categories.${item}`)}</button>)}</div>
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div>
          <div className="relative h-[460px] touch-none overflow-hidden rounded-[24px] border border-[#e7ded5] bg-[#f4ead6] shadow-[0_18px_60px_-35px_rgba(61,37,28,.45)] sm:h-[560px] lg:h-[650px]" onPointerDown={startPan} onPointerMove={movePan} onPointerUp={stopPan} onPointerCancel={stopPan} onLostPointerCapture={stopPan} style={{ cursor: dragging ? "grabbing" : "grab" }}>
          <div className="absolute inset-0 transition-transform duration-300 ease-out" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`, transformOrigin: "center" }}><MapArtwork t={t} objects={visibleObjects} selectedId={selectedId} onSelect={setSelectedId} editing={editorMode} referenceImage={referenceImage} referenceOpacity={referenceOpacity} onObjectChange={moveObject} onGestureStart={beginGesture} onGestureEnd={endGesture}/></div>
            <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-3 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#701f32] shadow-sm backdrop-blur">Hotel Soliga · Gunungsitoli</div>
            <div className="absolute right-4 top-4 flex flex-col overflow-hidden rounded-xl border border-white/80 bg-white/95 shadow-lg backdrop-blur">
              <button type="button" onClick={() => zoom(.2)} aria-label={t("map.zoomIn")} className="grid h-11 w-11 place-items-center text-[#701f32] transition hover:bg-[#f8f3ef]"><Plus size={18}/></button><span className="mx-2 border-t border-[#eee5dc]"/><button type="button" onClick={() => zoom(-.2)} aria-label={t("map.zoomOut")} className="grid h-11 w-11 place-items-center text-[#701f32] transition hover:bg-[#f8f3ef]"><Minus size={18}/></button><span className="mx-2 border-t border-[#eee5dc]"/><button type="button" onClick={() => { setPan({ x: 0, y: 0 }); setScale(1); }} aria-label={t("map.resetView")} className="grid h-11 w-11 place-items-center text-[#701f32] transition hover:bg-[#f8f3ef]"><Compass size={17}/></button>
            </div>
            <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-2 text-[10px] font-medium text-[#625b5d] shadow-sm backdrop-blur">{t("map.scale", { percent: Math.round(scale * 100) })}</div>
          </div>
          <div className="mt-4 rounded-2xl border border-[#e9dfd7] bg-white px-4 py-4 sm:px-5">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#701f32]">{t("map.legendTitle")}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2.5">{["superior", "deluxe", "executive", "junior", "grand", "family", "kost"].map((type) => <span key={type} className="flex items-center gap-2 text-[10px] text-[#615b5e] sm:text-xs"><span className="h-3 w-3 rounded-sm" style={{ backgroundColor: objects.find((object) => object.type === "room" && object.roomType === type)?.color || roomColors[type] }}/>{t(`map.roomTypes.${type}`)}</span>)}<span className="flex items-center gap-2 text-[10px] text-[#615b5e] sm:text-xs"><span className="grid h-4 w-4 place-items-center rounded-full bg-[#701f32] text-[8px] text-white">•</span>{t("map.legendFacilities")}</span></div>
            <p className="mt-3 text-[10px] leading-5 text-[var(--muted)]">{t("map.planNote")}</p>
          </div>
        </div>
        {editorMode && HotelMapEditorPanel ? <Suspense fallback={<aside className="min-h-[500px] rounded-2xl bg-white"/>}><HotelMapEditorPanel t={t} objects={objects} selected={selected} canUndo={undoStack.length > 0} canRedo={redoStack.length > 0} referenceOpacity={referenceOpacity} onSelect={selectEditorObject} onChange={(changes) => selected && changeObject(selected.id, changes)} onAdd={addObject} onDuplicate={duplicateObject} onDelete={deleteObject} onUndo={undo} onRedo={redo} onSave={saveDraft} onReset={resetDraft} onImport={importJSON} onReferenceFile={loadReference} onReferenceOpacity={setReferenceOpacity}/></Suspense> : <aside aria-live="polite" className="self-start overflow-hidden rounded-[24px] border border-[#e9dfd7] bg-white shadow-[0_12px_45px_-32px_rgba(61,37,28,.5)]">
          {selected?.image ? <img src={selected.image} alt={t(isRoom ? "map.roomPhotoAlt" : selected.detail ?? "map.roomPhotoAlt")} loading="lazy" className="h-44 w-full object-cover sm:h-52 xl:h-44"/> : <div className="relative grid h-44 place-items-center overflow-hidden bg-[#f0e4d9] sm:h-52 xl:h-44"><div className="absolute -right-8 -top-14 h-48 w-48 rounded-full bg-[#d7c5a9]/40"/><div className="absolute -bottom-24 -left-7 h-48 w-48 rounded-full bg-[#b7c39a]/55"/><div className="relative grid h-16 w-16 place-items-center rounded-full bg-white text-[#701f32] shadow-lg">{isRoom ? <BedDouble size={28}/> : selected?.category === "facilities" ? <ParkingSquare size={28}/> : <Building2 size={28}/>}</div></div>}
          <div className="p-5 sm:p-6"><div className="mb-3 flex items-center justify-between gap-3"><span className="rounded-full bg-[#f5ece7] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.14em] text-[#701f32]">{t(`map.categories.${isRoom ? "accommodation" : selected?.category ?? "facilities"}`)}</span>{isRoom && <span className="text-xs text-[var(--muted)]">{t("map.floor", { floor: selected.floor })}</span>}</div>
            <h2 className="font-display text-2xl leading-tight">{isRoom ? `${t("map.room")} ${selected.roomNumber}` : selected?.labelKey ? t(selected.labelKey) : selected?.name || t("map.locations.lobby")}</h2>
            {isRoom && <p className="mt-1 text-xs font-semibold text-[#701f32]">{selected.roomType === "unconfirmed" ? t("map.typeToConfirm") : t(`map.roomTypes.${selected.roomType}`)}</p>}
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{isRoom ? t(selected.roomType === "unconfirmed" ? "map.roomUnconfirmed" : "map.roomDescription", { type: t(`map.roomTypes.${selected.roomType}`) }) : selected?.detail ? t(`${selected.detail}.description`) : t("map.genericDescription")}</p>
            <div className="mt-5 flex flex-wrap gap-2">{isRoom && roomData ? <Link to={`/rooms/${roomData.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#701f32] px-4 text-xs font-semibold text-white transition hover:bg-[#48121f] hover:text-white">{t("map.viewRoom")}<ArrowUpRight size={15}/></Link> : !isRoom && selected?.category === "dining" ? <Link to="/#facilities" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#701f32] px-4 text-xs font-semibold text-white transition hover:bg-[#48121f] hover:text-white">{t("map.viewRelated")}<ArrowUpRight size={15}/></Link> : null}<a href="#contact" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#d9ccc4] px-4 text-xs font-semibold text-[#701f32] transition hover:bg-[#f8f3ef]">{t("nav.contact")}<ChevronRight size={15}/></a></div>
          </div>
        </aside>}
      </div>
    </div>
  </main>;
}
