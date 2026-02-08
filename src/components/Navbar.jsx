import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

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

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      setMenuOpen(false)
    }
  }

  const menuItemClass = `
    relative cursor-pointer tracking-widest
    after:content-[''] after:absolute after:left-0 after:-bottom-1
    after:w-0 after:h-[1px] after:bg-current
    after:transition-all after:duration-300
    hover:after:w-full
  `

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
          onClick={() => scrollToSection("hero")}
          className={`font-serif tracking-wide cursor-pointer transition-colors duration-500 ${
            scrolled ? "text-slate-800" : "text-white"
          }`}
        >
          <div className="text-2xl">Soliga</div>
          <div className="text-xs tracking-widest font-sans">HOTEL & CONVENTION</div>
        </div>

        {/* DESKTOP MENU */}
        <ul
          className={`hidden md:flex gap-10 text-sm transition-colors duration-500 ${
            scrolled ? "text-slate-700" : "text-white"
          }`}
        >
          <li className={menuItemClass} onClick={() => scrollToSection("hero")}>
            HOME
          </li>
          <li className={menuItemClass} onClick={() => scrollToSection("rooms")}>
            ROOMS
          </li>
          <li className={menuItemClass} onClick={() => scrollToSection("ballroom")}>
            BALLROOM
          </li>
          <li className={menuItemClass} onClick={() => scrollToSection("restaurant")}>
            RESTAURANT
          </li>
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
                i18n.language === "id" ? "font-bold underline underline-offset-4" : ""
              }`}
            >
              ID
            </button>
            <span>/</span>
            <button
              onClick={() => i18n.changeLanguage("en")}
              className={`hover:opacity-70 ${
                i18n.language === "en" ? "font-bold underline underline-offset-4" : ""
              }`}
            >
              EN
            </button>
          </div>

          {/* BOOK NOW */}
{/* BOOK NOW */}
<a
  href="https://wa.me/6282273316767?text=Halo%20saya%20ingin%20booking%20kamar"
  target="_blank"
  rel="noopener noreferrer"
  className={`inline-block px-5 py-2 border text-sm tracking-widest transition-all duration-500 ${
    scrolled
      ? "border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white"
      : "border-white text-white hover:bg-white hover:text-slate-800"
  }`}
>
  BOOK NOW
</a>

          {/* BURGER */}
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
          <li onClick={() => scrollToSection("hero")}>HOME</li>
          <li onClick={() => scrollToSection("rooms")}>ROOMS</li>
          <li onClick={() => scrollToSection("ballroom")}>BALLROOM</li>
          <li onClick={() => scrollToSection("restaurant")}>RESTAURANT</li>
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
              i18n.language === "id" ? "font-bold underline underline-offset-4" : ""
            }`}
          >
            ID
          </button>
          <span>/</span>
          <button
            onClick={() => i18n.changeLanguage("en")}
            className={`hover:opacity-70 ${
              i18n.language === "en" ? "font-bold underline underline-offset-4" : ""
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  )
}
