import { lazy, Suspense, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, BedDouble, Building2, ChevronRight, Compass, MapPin, Minus, ParkingSquare, Plus, Search, Utensils, Waves, X } from "lucide-react";
import { hotelMapConfig, roomTypeForMap } from "../data/hotelMap";
import { rooms } from "../data/rooms";
const HotelMapEditorPanel = import.meta.env.DEV ? lazy(() => import("../components/HotelMapEditorPanel")) : null;

const categories = ["all", "accommodation", "dining", "recreation", "facilities", "events"];
const roomColors = { superior: "#c77944", deluxe: "#d98cc8", executive: "#8d57bc", junior: "#92cf59", grand: "#6fc9be", family: "#f1df58", kost: "#cbb39d", unconfirmed: "#8d8784" };
const iconFor = { dining: Utensils, recreation: Waves, facilities: Building2, events: Compass };
const drawingTools = ["select", "pen", "rect", "polygon", "circle", "text", "eraser"];

function smoothPath(points, closed = false) {
  if (!points?.length) return "";
  const [first] = points;
  let path = `M ${first.x} ${first.y}`;
  for (let index = 0; index < points.length - 1; index += 1) {
    const previous = points[index - 1] ?? points[index];
    const start = points[index];
    const end = points[index + 1];
    const next = points[index + 2] ?? end;
    const c1 = { x: start.x + (end.x - previous.x) / 6, y: start.y + (end.y - previous.y) / 6 };
    const c2 = { x: end.x - (next.x - start.x) / 6, y: end.y - (next.y - start.y) / 6 };
    path += ` C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${end.x} ${end.y}`;
  }
  if (closed) path += " Z";
  return path;
}

function MapArtwork({ t, objects, elements, layers, background, reference, selectedId, selectedIds, onSelect, editing = false, tool = "select", draftPoints = [], draftShape, onCanvasPointerDown, onCanvasPointerMove, onCanvasPointerUp, onObjectChange, onDeleteObject, onGestureStart, onGestureEnd, onFinishDrawing }) {
  const gesture = useRef(null);
  const pointInMap = (event) => {
    const svg = event.currentTarget.ownerSVGElement ?? event.currentTarget;
    const point = svg.createSVGPoint(); point.x = event.clientX; point.y = event.clientY;
    const transformed = point.matrixTransform(svg.getScreenCTM().inverse());
    return { x: transformed.x, y: transformed.y };
  };
  const beginGesture = (event, object, mode, pointIndex = null) => {
    event.preventDefault(); event.stopPropagation();
    if (object.locked || layers.find((layer) => layer.id === object.layerId)?.locked) return;
    const point = pointInMap(event);
    const center = object.type === "background" ? { x: object.x * 12, y: object.y * 8 } : { x: object.x * 12, y: object.y * 8 };
    const angle = Math.atan2(point.y - center.y, point.x - center.x) * 180 / Math.PI;
    const groupIds = object.groupId ? allDrawableObjects.filter((item) => item.groupId === object.groupId).map((item) => item.id) : (selectedIds.includes(object.id) ? selectedIds : [object.id]);
    const groupItems = groupIds.map((id) => allDrawableObjects.find((item) => item.id === id)).filter(Boolean);
    gesture.current = { id: object.id, mode, point, object, angle, pointIndex, groupIds, groupItems };
    event.currentTarget.setPointerCapture(event.pointerId);
    onSelect(object.id, event);
    onGestureStart();
  };
  const moveGesture = (event) => {
    if (!gesture.current) return;
    const state = gesture.current;
    const point = pointInMap(event);
    if (state.mode === "move") state.groupItems.forEach((item) => onObjectChange(item.id, { x: Math.max(0, Math.min(100, item.x + (point.x - state.point.x) / 12)), y: Math.max(0, Math.min(100, item.y + (point.y - state.point.y) / 8)) }, true));
    if (state.mode === "resize") onObjectChange(state.id, { width: Math.max(0.5, Math.min(100, state.object.width + (point.x - state.point.x) / 6)), height: Math.max(0.5, Math.min(100, state.object.height + (point.y - state.point.y) / 4)) });
    if (state.mode === "rotate") {
      const angle = Math.atan2(point.y - state.object.y * 8, point.x - state.object.x * 12) * 180 / Math.PI;
      onObjectChange(state.id, { rotation: Math.round(state.object.rotation + angle - state.angle) });
    }
    if (state.mode === "point") {
      const dx = point.x - state.object.x * 12;
      const dy = point.y - state.object.y * 8;
      const radians = -(state.object.rotation || 0) * Math.PI / 180;
      const localX = Math.cos(radians) * dx - Math.sin(radians) * dy;
      const localY = Math.sin(radians) * dx + Math.cos(radians) * dy;
      const points = state.object.points.map((item, index) => index === state.pointIndex ? { x: Math.max(0, Math.min(100, localX / (state.object.width * 12 / 100) + 50)), y: Math.max(0, Math.min(100, localY / (state.object.height * 8 / 100) + 50)) } : item);
      onObjectChange(state.id, { points });
    }
  };
  const endGesture = () => { if (gesture.current) { gesture.current = null; onGestureEnd(); } };
  const layerOrder = (item) => layers.find((layer) => layer.id === item.layerId)?.order ?? 99;
  const layerVisible = (item) => layers.find((layer) => layer.id === item.layerId)?.visible !== false;
  const visibleObjects = objects.filter((object) => object.visible !== false && layerVisible(object));
  const visibleElements = elements.filter((element) => element.visible !== false && layerVisible(element));
  const orderedObjects = [...visibleObjects].sort((a, b) => layerOrder(a) - layerOrder(b) || (a.layer ?? 0) - (b.layer ?? 0));
  const orderedElements = [...visibleElements].sort((a, b) => layerOrder(a) - layerOrder(b) || (a.layer ?? 0) - (b.layer ?? 0));
  const backgroundObject = { ...background, id: "background-image", name: t("map.editor.background"), type: "background", layerId: "background" };
  const allDrawableObjects = [...objects, ...elements, backgroundObject];
  const selectedObjects = allDrawableObjects.filter((object) => selectedIds.includes(object.id) && object.visible !== false && (object.type === "background" || layerVisible(object)));
  const captureMapEvent = (event) => {
    if (!editing || tool === "select" || tool === "eraser") return;
    onCanvasPointerDown(event, pointInMap(event));
  };
  return <svg viewBox="0 0 1200 800" role="img" aria-label={t("map.artworkAlt")} className="h-full w-full select-none" xmlns="http://www.w3.org/2000/svg" onPointerDown={captureMapEvent} onPointerMove={(event) => { moveGesture(event); onCanvasPointerMove?.(event, pointInMap(event)); }} onPointerUp={(event) => { endGesture(); onCanvasPointerUp?.(event, pointInMap(event)); }} onPointerCancel={(event) => { endGesture(); onCanvasPointerUp?.(event, pointInMap(event)); }} onDoubleClick={() => editing && (tool === "pen" || tool === "polygon") && onFinishDrawing?.()}>
    <defs>
      <pattern id="gardenDots" width="34" height="34" patternUnits="userSpaceOnUse"><circle cx="5" cy="8" r="1.6" fill="#718d5d" opacity=".2"/><circle cx="26" cy="25" r="1.4" fill="#718d5d" opacity=".18"/></pattern>
      <pattern id="roofTiles" width="22" height="16" patternUnits="userSpaceOnUse"><path d="M0 8h22M11 0v8M0 8v8m22-8v8" stroke="#6d4a3b" strokeWidth="1" opacity=".18"/></pattern>
      <filter id="mapShadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#392b24" floodOpacity=".18"/></filter>
    </defs>
    <rect width="1200" height="800" fill="#f4ead6"/>
    <path d="M0 0h1200v800H0z" fill="#f7f3e9"/>
    <path d="M0 0h1200v800H0z" fill="url(#gardenDots)"/>
    {background.src && layers.find((layer) => layer.id === "background")?.visible !== false && <g data-map-marker transform={`translate(${background.x * 12} ${background.y * 8}) rotate(${background.rotation || 0}) scale(${background.width * (background.scale || 1) * 12 / 1000} ${background.height * (background.scale || 1) * 8 / 1000})`} opacity={background.opacity ?? 1} onPointerDown={editing && tool === "select" ? (event) => beginGesture(event, { ...background, id: "background-image", name: t("map.editor.background"), type: "background", layerId: "background" }, "move") : undefined}>
      <image href={background.src} x="-500" y="-500" width="1000" height="1000" preserveAspectRatio="none"/>
    </g>}
    {reference.src && reference.visible !== false && layers.find((layer) => layer.id === "reference")?.visible !== false && <image href={reference.src} x="0" y="0" width="1200" height="800" preserveAspectRatio="none" opacity={reference.opacity ?? 0.5} pointerEvents="none"/>}
    {orderedElements.map((element) => {
      const sx = element.width * 12 / 100;
      const sy = element.height * 8 / 100;
      const transform = `translate(${element.x * 12} ${element.y * 8}) rotate(${element.rotation || 0}) scale(${sx} ${sy})`;
      const pathData = smoothPath((element.points ?? []).map((point) => ({ x: point.x - 50, y: point.y - 50 })), element.closed || element.type === "polygon");
      const locked = element.locked || layers.find((layer) => layer.id === element.layerId)?.locked;
      return <g key={element.id} data-map-marker={editing ? "true" : undefined} role={editing ? "button" : undefined} tabIndex={editing ? 0 : undefined} aria-label={editing ? element.name : undefined} transform={transform} className={editing ? locked ? "cursor-not-allowed" : "cursor-move" : undefined} onClick={() => editing && tool === "eraser" && onDeleteObject(element.id)} onPointerDown={editing && tool === "select" ? (event) => beginGesture(event, element, "move") : editing && tool === "eraser" ? (event) => { event.stopPropagation(); onDeleteObject(element.id); } : undefined}>
        {element.type === "path" && <><path d={pathData} fill="none" stroke={element.stroke || "#ddcfb4"} strokeWidth={(element.strokeWidth || 12) / Math.max(Math.sqrt(sx * sy), 0.1)} strokeLinecap="round" strokeLinejoin="round"/>{element.innerStroke && <path d={pathData} fill="none" stroke={element.innerStroke} strokeWidth={(element.innerStrokeWidth || 6) / Math.max(Math.sqrt(sx * sy), 0.1)} strokeLinecap="round" strokeLinejoin="round"/>}</>}
        {element.type === "rect" && <rect x="-50" y="-50" width="100" height="100" rx={element.radius ?? 4} fill={element.fill || "none"} stroke={element.stroke || "none"} strokeWidth={(element.strokeWidth || 1) / Math.max(sx, 0.1)} opacity={element.opacity ?? 1}/>}
        {element.type === "polygon" && <path d={pathData} fill={element.fill || "#91a77a"} stroke={element.stroke || "none"} strokeWidth={(element.strokeWidth || 1) / Math.max(sx, 0.1)} opacity={element.opacity ?? 1}/>}
        {element.type === "circle" && <ellipse rx="48" ry="48" fill={element.fill || "#66885d"} stroke={element.stroke || "none"} strokeWidth={(element.strokeWidth || 1) / Math.max(sx, 0.1)} opacity={element.opacity ?? 1}/>}
        {element.type === "text" && <text transform={`scale(1 ${sx / sy})`} x="0" y="0" textAnchor="middle" dominantBaseline="middle" fontSize={(element.fontSize || 14) / Math.max(sx, 0.1)} fill={element.fill || "#48121f"} stroke={element.stroke || "#fffaf0"} strokeWidth="2" paintOrder="stroke">{element.text || element.name}</text>}
        {editing && tool === "select" && selectedIds.includes(element.id) && ["path", "polygon"].includes(element.type) && (element.points ?? []).map((point, index) => <circle key={`${element.id}-point-${index}`} data-map-handle cx={point.x - 50} cy={point.y - 50} r="5" fill="#fff" stroke="#701f32" strokeWidth="2" vectorEffect="non-scaling-stroke" className="cursor-grab" onPointerDown={(event) => beginGesture(event, element, "point", index)}/>)}
      </g>;
    })}
    {orderedObjects.map((object) => {
      const sx = object.width * 12 / 100;
      const sy = object.height * 8 / 100;
      const Icon = iconFor[object.category] ?? MapPin;
      const label = object.labelKey ? t(object.labelKey) : (object.label || object.name || object.roomNumber || "");
      const fontSize = (object.fontSize || 12) / Math.max(sx, 0.1);
      const selectedObject = selectedIds.includes(object.id);
      const transform = `translate(${object.x * 12} ${object.y * 8}) rotate(${object.rotation || 0}) scale(${sx} ${sy})`;
      const locked = object.locked || layers.find((layer) => layer.id === object.layerId)?.locked;
      return <g key={object.id} data-map-marker role="button" tabIndex="0" aria-label={label} className={editing ? locked ? "cursor-not-allowed" : "cursor-move" : "cursor-pointer"} transform={transform}
        onClick={() => editing && tool === "eraser" ? onDeleteObject(object.id) : !editing && onSelect(object.id)} onKeyDown={(event) => !editing && (event.key === "Enter" || event.key === " ") && onSelect(object.id, event)}
        onPointerDown={editing && tool === "select" ? (event) => beginGesture(event, object, "move") : editing && tool === "eraser" ? (event) => { event.stopPropagation(); onDeleteObject(object.id); } : undefined}>
        {object.type === "room" && <><rect x="-50" y="-50" width="100" height="100" rx="18" fill={object.color || roomColors[object.roomType] || roomColors.unconfirmed} stroke={selectedObject ? "#48121f" : "#fff"} strokeWidth={selectedObject ? 8 : 5} vectorEffect="non-scaling-stroke" filter="url(#mapShadow)"/><text transform={`scale(1 ${sx / sy})`} x="0" y={fontSize / 3} textAnchor="middle" fontSize={fontSize} fontWeight="800" fill="#fff" stroke="#56352c" strokeWidth="1" paintOrder="stroke">{object.roomNumber ?? object.name}</text></>}
        {object.type === "marker" && <><circle r="49" fill="#fffdf8" stroke="#fff" strokeWidth="6" filter="url(#mapShadow)"/><circle r="38" fill={object.color || "#701f32"}/><foreignObject x="-22" y="-22" width="44" height="44"><Icon size={40} color="#fff" strokeWidth={2.5}/></foreignObject>{(editing || object.showLabel) && <text transform={`scale(1 ${sx / sy})`} x="0" y="70" textAnchor="middle" fontSize={fontSize} fontWeight="700" fill="#48121f" stroke="#fffaf0" strokeWidth="5" paintOrder="stroke">{label}</text>}</>}
        {object.type === "building" && <>{object.shape === "circle" ? <circle r="48" fill={object.color || "#bd725c"} stroke={selectedObject ? "#48121f" : "#fff8e9"} strokeWidth={selectedObject ? 5 : 3} filter="url(#mapShadow)"/> : <rect x="-50" y="-50" width="100" height="100" rx="10" fill={object.color || "#bd725c"} stroke={selectedObject ? "#48121f" : "#fff8e9"} strokeWidth={selectedObject ? 5 : 3} filter="url(#mapShadow)"/>}{object.shape === "circle" ? <path d="M-28 1h56v27h-56zM-34-4 0-32 34-4" fill="#e8cf9f" stroke="#fff2d2" strokeWidth="5"/> : <><path d="M-42 -15H42M0 -45V45" fill="none" stroke="#f2d4ad" strokeWidth="2" opacity=".7"/><rect x="-45" y="-45" width="90" height="90" rx="8" fill="url(#roofTiles)"/></>}</>}
        {object.type === "garden" && <><ellipse rx="49" ry="44" fill={object.color || "#779a64"} stroke={selectedObject ? "#48121f" : "#dce5be"} strokeWidth="5"/><ellipse rx="37" ry="30" fill="#92ad72"/><path d="M-25 4Q0-30 27 3Q5 28-25 4Z" fill="#d9deb0" opacity=".45"/></>}
        {object.type === "text" && <text transform={`scale(1 ${sx / sy})`} x="0" y={fontSize / 3} textAnchor="middle" fontSize={fontSize} fontWeight="700" fill={object.color || "#48121f"} stroke="#fffaf0" strokeWidth="2" paintOrder="stroke">{label}</text>}
        {object.type !== "text" && object.type !== "room" && object.type !== "marker" && <text transform={`scale(1 ${sx / sy})`} x="0" y={fontSize / 3} textAnchor="middle" fontSize={fontSize} fontWeight="700" fill="#fff" stroke="#56352c" strokeWidth="1" paintOrder="stroke">{label}</text>}
      </g>;
    })}
    {editing && draftPoints.length > 0 && <path d={smoothPath(draftPoints.map((point) => ({ x: point.x * 12, y: point.y * 8 })))} fill="none" stroke="#701f32" strokeWidth="4" strokeDasharray="8 5" pointerEvents="none"/>}
    {editing && draftShape && <g pointerEvents="none"><rect x={draftShape.x} y={draftShape.y} width={draftShape.width} height={draftShape.height} fill={draftShape.type === "circle" ? "#779a64" : "#701f32"} fillOpacity=".22" stroke="#701f32" strokeWidth="3" strokeDasharray="7 4"/><circle cx={draftShape.x} cy={draftShape.y} r="4" fill="#701f32"/></g>}
    {editing && selectedObjects.map((item) => {
      const isBackground = item.type === "background";
      const width = item.width * (isBackground ? item.scale || 1 : 1);
      const height = item.height * (isBackground ? item.scale || 1 : 1);
      const isPrimary = item.id === selectedId;
      const locked = item.locked || layers.find((layer) => layer.id === item.layerId)?.locked;
      return <g key={`selection-${item.id}`} transform={`translate(${item.x * 12} ${item.y * 8}) rotate(${item.rotation || 0}) scale(${width * 12 / 100} ${height * 8 / 100})`} pointerEvents="all">
        <rect x="-52" y="-52" width="104" height="104" fill="none" stroke={isPrimary ? "#701f32" : "#a84a5e"} strokeWidth="2" strokeDasharray="5 3" vectorEffect="non-scaling-stroke" pointerEvents="none"/>
        {isPrimary && !locked && <><circle data-map-handle cx="50" cy="50" r="12" fill="#fff" stroke="#701f32" strokeWidth="3" vectorEffect="non-scaling-stroke" className="cursor-nwse-resize" onPointerDown={(event) => beginGesture(event, item, "resize")}/><path d="M0-54v-26" stroke="#701f32" strokeWidth="2" vectorEffect="non-scaling-stroke" pointerEvents="none"/><circle data-map-handle cx="0" cy="-82" r="11" fill="#fff" stroke="#701f32" strokeWidth="3" vectorEffect="non-scaling-stroke" className="cursor-grab" onPointerDown={(event) => beginGesture(event, item, "rotate")}/></>}
      </g>;
    })}
    <g opacity=".8"><path d="M1107 94v50m0-50-12 17m12-17 12 17" fill="none" stroke="#701f32" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><text x="1107" y="164" textAnchor="middle" fontSize="12" fontWeight="700" fill="#701f32">N</text></g>
  </svg>;
}

export default function HotelMapPage() {
  const { t } = useTranslation();
  const editorMode = import.meta.env.DEV && new URLSearchParams(window.location.search).get("editMap") === "1";
  const initialEditorConfig = () => {
    if (!editorMode) return hotelMapConfig;
    try {
      const saved = JSON.parse(window.localStorage.getItem("hotelMapEditorDraft") || "null");
      return saved?.objects ? { ...hotelMapConfig, ...saved, elements: saved.elements ?? hotelMapConfig.elements, layers: saved.layers ?? hotelMapConfig.layers, background: saved.background ?? hotelMapConfig.background, reference: saved.reference ?? hotelMapConfig.reference } : hotelMapConfig;
    } catch { return hotelMapConfig; }
  };
  const [editorConfig, setEditorConfig] = useState(initialEditorConfig);
  const config = editorMode ? editorConfig : hotelMapConfig;
  const { objects, elements, layers, background, reference } = config;
  const [category, setCategory] = useState("all");
  const [selectedId, setSelectedId] = useState("lobby");
  const [selectedIds, setSelectedIds] = useState(["lobby"]);
  const [query, setQuery] = useState("");
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [tool, setTool] = useState("select");
  const [draftPoints, setDraftPoints] = useState([]);
  const [draftShape, setDraftShape] = useState(null);
  const drag = useRef(null);
  const gestureSnapshot = useRef(null);
  const shapeDraft = useRef(null);
  const allItems = useMemo(() => [...objects, ...elements, { ...background, id: "background-image", type: "background", name: t("map.editor.background"), category: "background", layerId: "background" }], [objects, elements, background, t]);
  const matches = useMemo(() => {
    const value = query.trim().toLocaleLowerCase();
    if (!value) return [];
    return allItems.filter((item) => {
      if (item.type === "path" || item.type === "polygon" || item.type === "rect" || item.type === "circle") return `${item.name} ${item.category}`.toLocaleLowerCase().includes(value);
      if (item.type === "background") return t("map.editor.background").toLocaleLowerCase().includes(value);
      const name = item.type === "room" ? `${t("map.room")} ${item.roomNumber} ${t(`map.roomTypes.${item.roomType}`)}` : `${item.labelKey ? t(item.labelKey) : item.name} ${t(`map.categories.${item.category}`)}`;
      return name.toLocaleLowerCase().includes(value);
    }).slice(0, 7);
  }, [allItems, query, t]);
  const layerVisible = (item) => layers.find((layer) => layer.id === item.layerId)?.visible !== false;
  const visibleObjects = objects.filter((object) => (category === "all" || object.category === category) && layerVisible(object));
  const visibleElements = elements.filter(layerVisible);
  const selected = allItems.find((object) => object.id === selectedId);
  const isRoom = selected?.type === "room";
  const roomSlug = isRoom ? roomTypeForMap(selected.roomType) : null;
  const roomData = roomSlug ? rooms.find((room) => room.slug === roomSlug) : null;
  const focusItem = (item) => {
    setSelectedId(item.id); setSelectedIds([item.id]);
    if (categories.includes(item.category)) setCategory(item.type === "room" ? "accommodation" : item.category);
    setSearchOpen(false);
    setQuery("");
    setScale((current) => Math.max(current, 1.2));
    const x = item.x / 100 - 0.5;
    const y = item.y / 100 - 0.5;
    setPan({ x: -x * 100, y: -y * 70 });
  };
  const recordHistory = (before = editorConfig) => { setUndoStack((stack) => [...stack.slice(-49), before]); setRedoStack([]); };
  const updateItem = (current, id, changes) => ({ ...current, objects: current.objects.map((item) => item.id === id ? { ...item, ...changes } : item), elements: current.elements.map((item) => item.id === id ? { ...item, ...changes } : item), background: id === "background-image" ? { ...current.background, ...changes } : current.background });
  const changeObject = (id, changes) => { if (!editorMode) return; recordHistory(); setEditorConfig((current) => updateItem(current, id, changes)); if (changes.category && categories.includes(changes.category)) setCategory(changes.category); };
  const moveObject = (id, changes) => { if (!editorMode) return; setEditorConfig((current) => updateItem(current, id, changes)); };
  const selectEditorObject = (id, event) => {
    const item = allItems.find((object) => object.id === id);
    if (event?.shiftKey) {
      setSelectedIds((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
      setSelectedId(id);
    } else {
      const groupIds = item?.groupId ? allItems.filter((object) => object.groupId === item.groupId).map((object) => object.id) : [id];
      setSelectedIds(groupIds); setSelectedId(id);
    }
    if (item?.category && categories.includes(item.category)) setCategory(item.category);
  };
  const beginGesture = () => { gestureSnapshot.current = editorConfig; };
  const endGesture = () => { if (gestureSnapshot.current) { setUndoStack((stack) => [...stack.slice(-49), gestureSnapshot.current]); setRedoStack([]); gestureSnapshot.current = null; } };
  const startPan = (event) => { if (event.button !== 0 || (editorMode && tool !== "select") || event.target.closest("[data-map-marker], [data-map-handle], button, a, input")) return; drag.current = { x: event.clientX - pan.x, y: event.clientY - pan.y }; setDragging(true); event.currentTarget.setPointerCapture(event.pointerId); };
  const movePan = (event) => { if (drag.current) setPan({ x: Math.max(-250 * (scale - 1), Math.min(250 * (scale - 1), event.clientX - drag.current.x)), y: Math.max(-200 * (scale - 1), Math.min(200 * (scale - 1), event.clientY - drag.current.y)) }); };
  const stopPan = () => { drag.current = null; setDragging(false); };
  const zoom = (delta) => setScale((value) => Math.min(2.25, Math.max(1, Number((value + delta).toFixed(2)))));
  const getLayerForObject = (type, categoryValue) => type === "room" ? "rooms" : type === "marker" ? "facilities" : type === "text" ? "labels" : categoryValue === "road" ? "roads" : categoryValue === "parking" ? "parking" : categoryValue === "pool" ? "pool" : categoryValue === "recreation" || categoryValue === "landscape" || type === "garden" ? "landscape" : "buildings";
  const addObject = (type) => {
    const number = Math.max(0, ...objects.map((object) => Number(object.roomNumber) || 0)) + 1;
    const id = type === "room" ? `room-${number}` : `${type}-${Date.now()}`;
    const categoryValue = type === "room" ? "accommodation" : type === "garden" ? "recreation" : type === "marker" ? "facilities" : "facilities";
    const color = type === "room" ? roomColors.unconfirmed : type === "garden" ? "#779a64" : type === "marker" ? "#701f32" : "#bd725c";
    const name = type === "room" ? String(number) : t(`map.editor.types.${type}`);
    const item = { id, type, name, label: name, category: categoryValue, roomNumber: type === "room" ? String(number) : undefined, roomType: type === "room" ? "unconfirmed" : undefined, showLabel: type === "marker", x: 50, y: 50, width: type === "text" ? 8 : 4, height: type === "text" ? 5 : 6, rotation: 0, color, visible: true, layerId: getLayerForObject(type, categoryValue), layer: Math.max(0, ...allItems.map((object) => object.layer ?? 0)) + 1, fontSize: 13 };
    recordHistory(); setEditorConfig((current) => ({ ...current, objects: [...current.objects, item] })); setSelectedId(item.id); setSelectedIds([item.id]); setCategory(item.category);
  };
  const duplicateObject = () => {
    if (!selected) return;
    const number = Math.max(0, ...objects.map((object) => Number(object.roomNumber) || 0)) + 1;
    const copy = { ...selected, id: selected.type === "room" ? `room-${number}` : `${selected.type}-${objects.length + elements.length + 1}`, name: selected.type === "room" ? String(number) : `${selected.name} copy`, label: selected.type === "room" ? String(number) : `${selected.label || selected.name} copy`, labelKey: null, detail: null, roomNumber: selected.type === "room" ? String(number) : undefined, x: Math.min(98, selected.x + 2), y: Math.min(98, selected.y + 2), layer: Math.max(0, ...allItems.map((object) => object.layer ?? 0)) + 1 };
    recordHistory(); setEditorConfig((current) => ({ ...current, [elements.some((item) => item.id === selected.id) ? "elements" : "objects"]: [...(elements.some((item) => item.id === selected.id) ? current.elements : current.objects), copy] })); setSelectedId(copy.id); setSelectedIds([copy.id]); setCategory(copy.category);
  };
  const deleteObject = (id) => { const ids = id ? [id] : selectedIds; if (!ids.length) return; recordHistory(); setEditorConfig((current) => ({ ...current, objects: current.objects.filter((object) => !ids.includes(object.id)), elements: current.elements.filter((element) => !ids.includes(element.id)), background: ids.includes("background-image") ? { ...current.background, src: null } : current.background })); setSelectedIds([]); setSelectedId(""); };
  const undo = () => { if (!undoStack.length) return; const previous = undoStack.at(-1); setRedoStack((stack) => [...stack, editorConfig]); setEditorConfig(previous); setUndoStack((stack) => stack.slice(0, -1)); };
  const redo = () => { if (!redoStack.length) return; const next = redoStack.at(-1); setUndoStack((stack) => [...stack, editorConfig]); setEditorConfig(next); setRedoStack((stack) => stack.slice(0, -1)); };
  const saveDraft = () => window.localStorage.setItem("hotelMapEditorDraft", JSON.stringify(editorConfig));
  const importJSON = (data) => {
    const imported = Array.isArray(data) ? { ...hotelMapConfig, objects: data } : { ...hotelMapConfig, ...data };
    if (!Array.isArray(imported.objects) || !Array.isArray(imported.elements) || !Array.isArray(imported.layers)) throw new Error("Invalid map configuration");
    const ids = new Set();
    for (const item of [...imported.objects, ...imported.elements]) {
      if (!item?.id || ids.has(item.id) || ["x", "y", "width", "height"].some((key) => !Number.isFinite(Number(item[key])))) throw new Error("Invalid map element");
      ids.add(item.id);
    }
    const normalized = { ...imported, objects: imported.objects.map((item) => ({ ...item, x: Math.max(0, Math.min(100, Number(item.x))), y: Math.max(0, Math.min(100, Number(item.y))), width: Math.max(0.5, Math.min(100, Number(item.width))), height: Math.max(0.5, Math.min(100, Number(item.height))), rotation: Number(item.rotation) || 0 })), elements: imported.elements.map((item) => ({ ...item, x: Math.max(0, Math.min(100, Number(item.x))), y: Math.max(0, Math.min(100, Number(item.y))), width: Math.max(0.5, Math.min(100, Number(item.width))), height: Math.max(0.5, Math.min(100, Number(item.height))), rotation: Number(item.rotation) || 0 })), background: imported.background ?? hotelMapConfig.background, reference: imported.reference ?? hotelMapConfig.reference };
    recordHistory(); setEditorConfig(normalized); setSelectedId(normalized.objects[0]?.id ?? ""); setSelectedIds([normalized.objects[0]?.id].filter(Boolean));
  };
  const resetDraft = () => { recordHistory(); setEditorConfig(hotelMapConfig); setSelectedId("lobby"); setSelectedIds(["lobby"]); window.localStorage.removeItem("hotelMapEditorDraft"); };
  const updateLayer = (id, changes) => { recordHistory(); setEditorConfig((current) => ({ ...current, layers: current.layers.map((layer) => layer.id === id ? { ...layer, ...changes } : layer), background: id === "background" && changes.locked !== undefined ? { ...current.background, locked: changes.locked } : current.background, reference: id === "reference" && changes.locked !== undefined ? { ...current.reference, locked: changes.locked } : current.reference })); };
  const reorderLayer = (id, direction) => { const sorted = [...layers].sort((a, b) => a.order - b.order); const index = sorted.findIndex((layer) => layer.id === id); const target = index + direction; if (index < 0 || target < 0 || target >= sorted.length) return; [sorted[index], sorted[target]] = [sorted[target], sorted[index]]; recordHistory(); setEditorConfig((current) => ({ ...current, layers: current.layers.map((layer) => ({ ...layer, order: sorted.findIndex((item) => item.id === layer.id) })) })); };
  const selectLayer = (id) => { const ids = allItems.filter((item) => item.layerId === id).map((item) => item.id); setSelectedIds(ids); setSelectedId(ids[0] ?? ""); };
  const groupSelection = () => { if (selectedIds.length < 2) return; const groupId = `group-${Date.now()}`; recordHistory(); setEditorConfig((current) => ({ ...current, objects: current.objects.map((item) => selectedIds.includes(item.id) ? { ...item, groupId } : item), elements: current.elements.map((item) => selectedIds.includes(item.id) ? { ...item, groupId } : item) })); };
  const ungroupSelection = () => { const ids = selectedIds; recordHistory(); setEditorConfig((current) => ({ ...current, objects: current.objects.map((item) => ids.includes(item.id) ? { ...item, groupId: null } : item), elements: current.elements.map((item) => ids.includes(item.id) ? { ...item, groupId: null } : item) })); };
  const imageToDataUrl = async (file) => {
    const bitmap = await createImageBitmap(file);
    const ratio = Math.min(1, 2200 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas"); canvas.width = Math.max(1, Math.round(bitmap.width * ratio)); canvas.height = Math.max(1, Math.round(bitmap.height * ratio));
    const context = canvas.getContext("2d"); context.fillStyle = "#fff"; context.fillRect(0, 0, canvas.width, canvas.height); context.drawImage(bitmap, 0, 0, canvas.width, canvas.height); bitmap.close();
    return canvas.toDataURL("image/jpeg", 0.88);
  };
  const uploadBackground = async (file) => { if (!file) return; const src = await imageToDataUrl(file); recordHistory(); setEditorConfig((current) => ({ ...current, background: { ...current.background, src } })); };
  const uploadReference = async (file) => { if (!file) return; const src = await imageToDataUrl(file); recordHistory(); setEditorConfig((current) => ({ ...current, reference: { ...current.reference, src } })); };
  const updateBackground = (changes) => { recordHistory(); setEditorConfig((current) => ({ ...current, background: { ...current.background, ...changes }, layers: changes.locked !== undefined ? current.layers.map((layer) => layer.id === "background" ? { ...layer, locked: changes.locked } : layer) : current.layers })); };
  const updateReference = (changes) => { recordHistory(); setEditorConfig((current) => ({ ...current, reference: { ...current.reference, ...changes } })); };

  const addElement = (element) => { recordHistory(); setEditorConfig((current) => ({ ...current, elements: [...current.elements, element] })); setSelectedId(element.id); setSelectedIds([element.id]); };
  const makeVectorElement = (type, points, opts = {}) => {
    const xs = points.map((point) => point.x); const ys = points.map((point) => point.y);
    const left = Math.min(...xs); const right = Math.max(...xs); const top = Math.min(...ys); const bottom = Math.max(...ys);
    const widthPx = Math.max(12, right - left); const heightPx = Math.max(12, bottom - top);
    const localPoints = points.map((point) => ({ x: Math.max(0, Math.min(100, (point.x - left) / widthPx * 100)), y: Math.max(0, Math.min(100, (point.y - top) / heightPx * 100)) }));
    const layerId = type === "path" ? "roads" : type === "text" ? "labels" : opts.category === "building" ? "buildings" : opts.category === "parking" ? "parking" : opts.category === "pool" ? "pool" : "landscape";
    const element = { id: `${type}-${Date.now()}-${Math.round(Math.random() * 9999)}`, type, name: opts.name || t(`map.editor.types.${type}`), category: opts.category || (type === "path" ? "road" : layerId), layerId, x: (left + widthPx / 2) / 12, y: (top + heightPx / 2) / 8, width: widthPx / 12, height: heightPx / 8, rotation: 0, visible: true, locked: false, layer: Math.max(0, ...elements.map((item) => item.layer ?? 0)) + 1, points: type === "path" || type === "polygon" ? localPoints : undefined, smooth: type === "path", closed: type === "polygon", fill: opts.fill ?? "none", stroke: opts.stroke ?? "#ddcfb4", strokeWidth: opts.strokeWidth ?? 24, innerStroke: type === "path" ? "#fffaf0" : null, innerStrokeWidth: type === "path" ? 16 : 0, opacity: 1, fontSize: opts.fontSize ?? 14, text: opts.text };
    addElement(element);
  };
  const finishDrawing = () => {
    if (draftPoints.length >= (tool === "polygon" ? 3 : 2)) makeVectorElement(tool === "pen" ? "path" : "polygon", draftPoints, tool === "pen" ? {} : { category: "garden", fill: "#779a64", stroke: "#dce5be", strokeWidth: 2 });
    setDraftPoints([]); setDraftShape(null); shapeDraft.current = null;
  };
  const canvasPointerDown = (event, point) => {
    if (tool === "pen" || tool === "polygon") { event.preventDefault(); setDraftPoints((current) => [...current, point]); return; }
    if (tool === "text") { event.preventDefault(); makeVectorElement("text", [point, { x: point.x + 120, y: point.y + 40 }], { category: "facility", fill: "#48121f", text: t("map.editor.newLabel") }); return; }
    if (tool === "rect" || tool === "circle") { event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); shapeDraft.current = { type: tool, x: point.x, y: point.y, endX: point.x, endY: point.y }; setDraftShape({ type: tool, x: point.x, y: point.y, width: 0, height: 0 }); }
  };
  const canvasPointerMove = (_event, point) => { if (!shapeDraft.current) return; const draft = { ...shapeDraft.current, endX: point.x, endY: point.y }; shapeDraft.current = draft; const x = Math.min(draft.x, draft.endX); const y = Math.min(draft.y, draft.endY); setDraftShape({ type: draft.type, x, y, width: Math.abs(draft.endX - draft.x), height: Math.abs(draft.endY - draft.y) }); };
  const canvasPointerUp = (_event, point) => {
    if (!shapeDraft.current) return;
    const draft = { ...shapeDraft.current, endX: point.x, endY: point.y };
    const side = Math.max(16, Math.max(Math.abs(draft.endX - draft.x), Math.abs(draft.endY - draft.y)));
    const x1 = draft.type === "circle" ? draft.x - side / 2 : Math.min(draft.x, draft.endX);
    const y1 = draft.type === "circle" ? draft.y - side / 2 : Math.min(draft.y, draft.endY);
    const x2 = draft.type === "circle" ? x1 + side : Math.max(draft.endX, draft.x); const y2 = draft.type === "circle" ? y1 + side : Math.max(draft.endY, draft.y);
    if (Math.abs(x2 - x1) > 10 && Math.abs(y2 - y1) > 10) makeVectorElement(draft.type, [{ x: x1, y: y1 }, { x: x2, y: y2 }], draft.type === "circle" ? { category: "recreation", fill: "#83c9cc", stroke: "#fff", strokeWidth: 5 } : { category: "building", fill: "#bd725c", stroke: "#fff8e9", strokeWidth: 3 });
    shapeDraft.current = null; setDraftShape(null);
  };

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
      {editorMode && <div className="mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-[#e8ddd6] bg-white p-2 shadow-sm" role="toolbar" aria-label={t("map.editor.drawingTools")}>
        {drawingTools.map((toolName) => <button key={toolName} type="button" aria-pressed={tool === toolName} onClick={() => { setTool(toolName); setDraftPoints([]); setDraftShape(null); shapeDraft.current = null; }} className={`rounded-lg px-3 py-2 text-[10px] font-semibold transition ${tool === toolName ? "bg-[#701f32] text-white" : "text-[#5f595e] hover:bg-[#f8f3ef]"}`}>{t(`map.editor.tools.${toolName}`)}</button>)}
        {(tool === "pen" || tool === "polygon") && <><button type="button" onClick={finishDrawing} className="ml-auto rounded-lg bg-[#f2e9e5] px-3 py-2 text-[10px] font-semibold text-[#701f32]">{t("map.editor.finishShape")}</button><button type="button" onClick={() => setDraftPoints([])} className="rounded-lg px-3 py-2 text-[10px] text-[#701f32]">{t("map.editor.cancelDrawing")}</button></>}
      </div>}
      <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div>
          <div className="relative h-[460px] touch-none overflow-hidden rounded-[24px] border border-[#e7ded5] bg-[#f4ead6] shadow-[0_18px_60px_-35px_rgba(61,37,28,.45)] sm:h-[560px] lg:h-[650px]" onPointerDown={startPan} onPointerMove={movePan} onPointerUp={stopPan} onPointerCancel={stopPan} onLostPointerCapture={stopPan} style={{ cursor: dragging ? "grabbing" : "grab" }}>
          <div className="absolute inset-0 transition-transform duration-300 ease-out" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`, transformOrigin: "center" }}><MapArtwork t={t} objects={visibleObjects} elements={visibleElements} layers={layers} background={background} reference={reference} selectedId={selectedId} selectedIds={selectedIds} onSelect={editorMode ? selectEditorObject : (id) => { setSelectedId(id); setSelectedIds([id]); }} editing={editorMode} tool={tool} draftPoints={draftPoints} draftShape={draftShape} onCanvasPointerDown={canvasPointerDown} onCanvasPointerMove={canvasPointerMove} onCanvasPointerUp={canvasPointerUp} onObjectChange={moveObject} onDeleteObject={deleteObject} onGestureStart={beginGesture} onGestureEnd={endGesture} onFinishDrawing={finishDrawing}/></div>
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
        {editorMode && HotelMapEditorPanel ? <Suspense fallback={<aside className="min-h-[500px] rounded-2xl bg-white"/>}><HotelMapEditorPanel t={t} objects={allItems} selected={selected} selectedIds={selectedIds} layers={layers} background={background} reference={reference} tool={tool} canUndo={undoStack.length > 0} canRedo={redoStack.length > 0} onSelect={selectEditorObject} onChange={(changes) => selected && changeObject(selected.id, changes)} onAdd={addObject} onDuplicate={duplicateObject} onDelete={deleteObject} onUndo={undo} onRedo={redo} onSave={saveDraft} onReset={resetDraft} onImport={importJSON} onLayerChange={updateLayer} onLayerSelect={selectLayer} onLayerReorder={reorderLayer} onBackgroundChange={updateBackground} onReferenceChange={updateReference} onBackgroundFile={uploadBackground} onReferenceFile={uploadReference} onToolChange={setTool} onFinishDrawing={finishDrawing} onCancelDrawing={() => { setDraftPoints([]); setDraftShape(null); shapeDraft.current = null; }} onGroup={groupSelection} onUngroup={ungroupSelection}/></Suspense> : <aside aria-live="polite" className="self-start overflow-hidden rounded-[24px] border border-[#e9dfd7] bg-white shadow-[0_12px_45px_-32px_rgba(61,37,28,.5)]">
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
