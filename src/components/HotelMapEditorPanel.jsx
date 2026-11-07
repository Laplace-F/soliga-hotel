import { useRef, useState } from "react";
import { Copy, Download, Plus, Redo2, RotateCcw, Save, Trash2, Undo2, Upload } from "lucide-react";

const objectTypes = ["room", "building", "garden", "text", "marker"];
const categories = ["accommodation", "dining", "recreation", "facilities", "events"];
const fields = [
  ["x", "x", 0, 100, 0.1], ["y", "y", 0, 100, 0.1],
  ["width", "width", 0.5, 100, 0.1], ["height", "height", 0.5, 100, 0.1],
  ["rotation", "rotation", -360, 360, 1], ["fontSize", "fontSize", 4, 100, 1],
  ["layer", "layer", 0, 1000, 1],
];

export default function HotelMapEditorPanel({ t, objects, selected, canUndo, canRedo, referenceOpacity, onSelect, onChange, onAdd, onDuplicate, onDelete, onUndo, onRedo, onSave, onReset, onImport, onReferenceFile, onReferenceOpacity }) {
  const [newType, setNewType] = useState("room");
  const [message, setMessage] = useState("");
  const fileRef = useRef(null);
  const referenceRef = useRef(null);
  const tell = (text) => { setMessage(text); window.setTimeout(() => setMessage(""), 2800); };
  const exportJSON = () => {
    const blob = new Blob([`${JSON.stringify({ version: 1, coordinateSystem: "percent-center", canvas: { width: 1200, height: 800 }, objects }, null, 2)}\n`], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a"); link.href = url; link.download = "hotel-map.json"; link.click(); URL.revokeObjectURL(url);
  };
  const importFile = async (file) => {
    if (!file) return;
    try { await onImport(JSON.parse(await file.text())); tell(t("map.editor.imported")); }
    catch { tell(t("map.editor.invalidJson")); }
    if (fileRef.current) fileRef.current.value = "";
  };
  const layers = objects.map((item) => item.layer ?? 0);
  const minLayer = Math.min(...layers);
  const maxLayer = Math.max(...layers);

  return <aside aria-label={t("map.editor.title")} className="self-start overflow-hidden rounded-2xl border border-[#dfc9c1] bg-white shadow-[0_12px_45px_-32px_rgba(61,37,28,.5)]">
    <div className="bg-[#48121f] px-5 py-4 text-white"><p className="text-[10px] font-bold uppercase tracking-[.22em] text-white/65">Hotel Soliga</p><h2 className="mt-1 font-display text-xl">{t("map.editor.title")}</h2></div>
    <div className="space-y-5 p-4">
      <div className="grid grid-cols-2 gap-2">
        <button type="button" disabled={!canUndo} onClick={onUndo} className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-[#e4d8d1] text-xs font-semibold text-[#701f32] disabled:opacity-40"><Undo2 size={14}/>{t("map.editor.undo")}</button>
        <button type="button" disabled={!canRedo} onClick={onRedo} className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-[#e4d8d1] text-xs font-semibold text-[#701f32] disabled:opacity-40"><Redo2 size={14}/>{t("map.editor.redo")}</button>
      </div>
      <div className="space-y-2">
        <label className="block text-[10px] font-bold uppercase tracking-[.16em] text-[#766b6f]">{t("map.editor.addObject")}</label>
        <div className="flex gap-2"><select value={newType} onChange={(event) => setNewType(event.target.value)} className="h-10 min-w-0 flex-1 rounded-lg border border-[#e4d8d1] px-2 text-xs">{objectTypes.map((type) => <option key={type} value={type}>{t(`map.editor.types.${type}`)}</option>)}</select><button type="button" onClick={() => onAdd(newType)} className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#701f32] text-white" aria-label={t("map.editor.addObject")}><Plus size={17}/></button></div>
      </div>
      <label className="block text-[10px] font-bold uppercase tracking-[.16em] text-[#766b6f]">{t("map.editor.selectObject")}<select value={selected?.id ?? ""} onChange={(event) => onSelect(event.target.value)} className="mt-2 h-10 w-full rounded-lg border border-[#e4d8d1] px-2 text-xs font-normal normal-case tracking-normal"><option value="">—</option>{objects.map((item) => <option key={item.id} value={item.id}>{item.name || item.label || item.id}</option>)}</select></label>
      {selected && <section className="space-y-3 border-t border-[#eee6e1] pt-4">
        <div className="flex items-center justify-between gap-2"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#766b6f]">{t("map.editor.properties")}</p><div className="flex gap-1"><button type="button" onClick={onDuplicate} aria-label={t("map.editor.duplicate")} className="grid h-8 w-8 place-items-center rounded-lg text-[#701f32] hover:bg-[#f8f3ef]"><Copy size={14}/></button><button type="button" onClick={onDelete} aria-label={t("map.editor.delete")} className="grid h-8 w-8 place-items-center rounded-lg text-[#701f32] hover:bg-[#f8f3ef]"><Trash2 size={14}/></button></div></div>
        <label className="block text-xs font-medium">{t("map.editor.name")}<input value={selected.name ?? ""} onChange={(event) => onChange({ name: event.target.value, labelKey: null, detail: null, label: event.target.value })} className="mt-1.5 h-9 w-full rounded-lg border border-[#e4d8d1] px-2.5"/></label>
        <label className="block text-xs font-medium">{t("map.editor.category")}<select value={selected.category} onChange={(event) => onChange({ category: event.target.value })} className="mt-1.5 h-9 w-full rounded-lg border border-[#e4d8d1] px-2.5">{categories.map((category) => <option key={category} value={category}>{t(`map.categories.${category}`)}</option>)}</select></label>
        {selected.type === "marker" && <label className="flex items-center justify-between rounded-lg bg-[#f8f4f1] px-3 py-2 text-xs font-medium">{t("map.editor.showLabel")}<input type="checkbox" checked={selected.showLabel === true} onChange={(event) => onChange({ showLabel: event.target.checked })} className="accent-[#701f32]"/></label>}
        {selected.type === "room" && <><label className="block text-xs font-medium">{t("map.room")}<input value={selected.roomNumber} onChange={(event) => onChange({ roomNumber: event.target.value, name: event.target.value })} className="mt-1.5 h-9 w-full rounded-lg border border-[#e4d8d1] px-2.5"/></label><label className="block text-xs font-medium">{t("map.editor.roomType")}<select value={selected.roomType ?? "unconfirmed"} onChange={(event) => onChange({ roomType: event.target.value, color: event.target.value === "unconfirmed" ? "#8d8784" : ({ superior: "#c77944", deluxe: "#d98cc8", executive: "#8d57bc", junior: "#92cf59", grand: "#6fc9be", family: "#f1df58", kost: "#cbb39d" })[event.target.value] })} className="mt-1.5 h-9 w-full rounded-lg border border-[#e4d8d1] px-2.5">{["superior", "deluxe", "executive", "junior", "grand", "family", "kost", "unconfirmed"].map((type) => <option key={type} value={type}>{t(`map.roomTypes.${type}`)}</option>)}</select></label></>}
        <div className="grid grid-cols-2 gap-2">{fields.map(([key, label, min, max, step]) => <label key={key} className="text-[10px] font-medium text-[#655d60]">{t(`map.editor.fields.${label}`)}<input type="number" min={min} max={max} step={step} value={selected[key] ?? 0} onChange={(event) => onChange({ [key]: Number(event.target.value) })} className="mt-1 h-9 w-full rounded-lg border border-[#e4d8d1] px-2 text-xs text-[#171416]"/></label>)}</div>
        <label className="block text-xs font-medium">{t("map.editor.color")}<span className="mt-1.5 flex h-9 items-center gap-2 rounded-lg border border-[#e4d8d1] px-2"><input type="color" value={/^#[0-9a-f]{6}$/i.test(selected.color ?? "") ? selected.color : "#701f32"} onChange={(event) => onChange({ color: event.target.value })} className="h-6 w-8 cursor-pointer border-0 p-0"/><span className="font-mono text-[10px] text-[#655d60]">{selected.color}</span></span></label>
        <label className="flex items-center justify-between rounded-lg bg-[#f8f4f1] px-3 py-2 text-xs font-medium">{t("map.editor.visible")}<input type="checkbox" checked={selected.visible !== false} onChange={(event) => onChange({ visible: event.target.checked })} className="accent-[#701f32]"/></label>
        <div className="grid grid-cols-2 gap-2"><button type="button" disabled={(selected.layer ?? 0) === maxLayer} onClick={() => onChange({ layer: maxLayer + 1 })} className="h-9 rounded-lg border border-[#e4d8d1] text-[10px] font-semibold text-[#701f32] disabled:opacity-40">{t("map.editor.bringForward")}</button><button type="button" disabled={(selected.layer ?? 0) === minLayer} onClick={() => onChange({ layer: minLayer - 1 })} className="h-9 rounded-lg border border-[#e4d8d1] text-[10px] font-semibold text-[#701f32] disabled:opacity-40">{t("map.editor.sendBackward")}</button></div>
      </section>}

      <section className="space-y-2 border-t border-[#eee6e1] pt-4">
        <label className="block text-[10px] font-bold uppercase tracking-[.16em] text-[#766b6f]">{t("map.editor.floorPlan")}</label>
        <input ref={referenceRef} type="file" accept="image/*" onChange={(event) => onReferenceFile(event.target.files?.[0] ?? null)} className="block w-full text-[10px] text-[#655d60] file:mr-2 file:rounded-md file:border-0 file:bg-[#f3e9e4] file:px-2 file:py-2 file:text-[10px] file:font-semibold file:text-[#701f32]"/>
        <label className="flex items-center gap-2 text-[10px] text-[#655d60]">{t("map.editor.opacity")}<input type="range" min="0.1" max="0.9" step="0.05" value={referenceOpacity} onChange={(event) => onReferenceOpacity(Number(event.target.value))} className="min-w-0 flex-1 accent-[#701f32]"/></label>
      </section>
      <section className="space-y-2 border-t border-[#eee6e1] pt-4">
        <div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => { onSave(); tell(t("map.editor.saved")); }} className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-[#701f32] text-[10px] font-bold text-white"><Save size={14}/>{t("map.editor.save")}</button><button type="button" onClick={exportJSON} className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-[#701f32] text-[10px] font-bold text-[#701f32]"><Download size={14}/>{t("map.editor.export")}</button></div>
        <div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => fileRef.current?.click()} className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-[#e4d8d1] text-[10px] font-bold text-[#701f32]"><Upload size={14}/>{t("map.editor.import")}</button><button type="button" onClick={() => { if (window.confirm(t("map.editor.confirmReset"))) { onReset(); tell(t("map.editor.reset")); } }} className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-[#e4d8d1] text-[10px] font-bold text-[#701f32]"><RotateCcw size={14}/>{t("map.editor.reset")}</button></div>
        <p className="text-[10px] leading-5 text-[var(--muted)]">{t("map.editor.saveHelp")}</p>
        <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={(event) => importFile(event.target.files?.[0])}/>
        {message && <p role="status" className="rounded-lg bg-[#f1ece6] px-3 py-2 text-[10px] text-[#48121f]">{message}</p>}
      </section>
    </div>
  </aside>;
}
