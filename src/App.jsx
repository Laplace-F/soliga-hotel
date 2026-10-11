import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Home from "./pages/Home";
import RoomDetail from "./pages/RoomDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import { ScrollProgress } from "./components/ScrollEffects";

function NotFound() {
  const { t } = useTranslation();
  return <main className="flex min-h-[75vh] flex-col items-center justify-center px-6 pt-24 text-center"><img src="/images/soli.svg" alt={t("errors.mascotAlt")} className="mb-5 h-24 w-24"/><p className="text-xs font-bold uppercase tracking-[.25em] text-[#701f32]">404</p><h1 className="mt-3 font-display text-4xl">{t("errors.title")}</h1><p className="mt-3 max-w-md text-[#777177]">{t("errors.body")}</p><Link to="/" className="mt-6 bg-[#701f32] px-6 py-3 text-sm font-semibold text-white">{t("errors.home")}</Link></main>;
}

export default function App() {
  const location = useLocation();
  const { i18n } = useTranslation();
  useEffect(() => { if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView(); else window.scrollTo(0, 0); }, [location.pathname, location.hash]);
  useEffect(() => {
    document.documentElement.lang = i18n.language.startsWith("en") ? "en" : "id";
    if (location.pathname === "/") document.title = "Hotel Soliga | Gunungsitoli, Nias";
  }, [i18n.language, location.pathname]);
  return <><ScrollProgress/><Navbar/><Routes><Route path="/" element={<Home/>}/><Route path="/rooms/:slug" element={<RoomDetail/>}/><Route path="*" element={<NotFound/>}/></Routes><Footer/></>;
}
