import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { i18n } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-500 ease-in-out
        ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg translate-y-0"
            : "bg-transparent -translate-y-2"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* LOGO */}
        <div
          className={`font-serif tracking-wide transition-colors duration-500 ${
            scrolled ? "text-slate-800" : "text-white"
          }`}
        >
          <div className="text-2xl">Soliga</div>
          <div className="text-xs tracking-widest font-sans">HOTEL</div>
        </div>

        {/* DESKTOP MENU */}
        <ul
          className={`hidden md:flex gap-10 text-sm tracking-widest transition-colors duration-500 ${
            scrolled ? "text-slate-700" : "text-white"
          }`}
        >
          <li className="hover:opacity-70 cursor-pointer">HOME</li>
          <li className="hover:opacity-70 cursor-pointer">ROOMS</li>
          <li className="hover:opacity-70 cursor-pointer">BALLROOM</li>
          <li className="hover:opacity-70 cursor-pointer">RESTAURANT</li>
        </ul>

        {/* RIGHT ACTION */}
        <div className="flex items-center gap-4">

          {/* LANGUAGE SWITCH (DESKTOP) */}
          <div
            className={`hidden md:flex items-center gap-2 text-xs tracking-widest transition-colors duration-500 ${
              scrolled ? "text-slate-700" : "text-white"
            }`}
          >
            <button
              onClick={() => i18n.changeLanguage("id")}
              className={`hover:opacity-70 ${
                i18n.language === "id"
                  ? "font-bold underline underline-offset-4"
                  : ""
              }`}
            >
              ID
            </button>
            <span>/</span>
            <button
              onClick={() => i18n.changeLanguage("en")}
              className={`hover:opacity-70 ${
                i18n.language === "en"
                  ? "font-bold underline underline-offset-4"
                  : ""
              }`}
            >
              EN
            </button>
          </div>

          {/* BOOK NOW */}
          <button
            className={`px-5 py-2 border text-sm tracking-widest transition-all duration-500 ${
              scrolled
                ? "border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white"
                : "border-white text-white hover:bg-white hover:text-slate-800"
            }`}
          >
            BOOK NOW
          </button>

          {/* BURGER (MOBILE) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden text-2xl transition-colors duration-500 ${
              scrolled ? "text-slate-800" : "text-white"
            }`}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-500
          ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          ${scrolled ? "bg-white/95" : "bg-slate-900/95"}
        `}
      >
        <ul
          className={`flex flex-col gap-6 px-6 py-8 text-sm tracking-widest ${
            scrolled ? "text-slate-800" : "text-white"
          }`}
        >
          <li onClick={() => setMenuOpen(false)}>HOME</li>
          <li onClick={() => setMenuOpen(false)}>ROOMS</li>
          <li onClick={() => setMenuOpen(false)}>DINING</li>
          <li onClick={() => setMenuOpen(false)}>SPA</li>
        </ul>

        {/* LANGUAGE SWITCH (MOBILE) */}
        <div
          className={`flex justify-center gap-4 pb-6 text-xs tracking-widest ${
            scrolled ? "text-slate-800" : "text-white"
          }`}
        >
          <button
            onClick={() => i18n.changeLanguage("id")}
            className={`hover:opacity-70 ${
              i18n.language === "id"
                ? "font-bold underline underline-offset-4"
                : ""
            }`}
          >
            ID
          </button>
          <span>/</span>
          <button
            onClick={() => i18n.changeLanguage("en")}
            className={`hover:opacity-70 ${
              i18n.language === "en"
                ? "font-bold underline underline-offset-4"
                : ""
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  )
}
