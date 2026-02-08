import { useState } from "react"
import { useTranslation } from "react-i18next"

export default function BookingForm() {
  const { t, i18n } = useTranslation()

  const [roomType, setRoomType] = useState("executive")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [rooms, setRooms] = useState(1)
  const [error, setError] = useState("")

  const roomOptions = t("booking.roomOptions", { returnObjects: true })

  const handleSubmit = () => {
    if (!checkIn || !checkOut || !rooms) {
      setError(t("booking.errorEmpty"))
      return
    }

    if (checkOut <= checkIn) {
      setError(t("booking.errorDate"))
      return
    }

    setError("")

    const phoneNumber = "6282273316767"

    const message =
      i18n.language === "id"
        ? `
Halo Soliga Hotel

Saya ingin melakukan booking dengan detail berikut:
Tipe Kamar    : ${roomOptions[roomType]}
Check-in      : ${checkIn}
Check-out     : ${checkOut}
Jumlah Kamar  : ${rooms}

Apakah kamar tersedia?
        `
        : `
Hello Soliga Hotel

I would like to make a reservation with the following details:
Room Type       : ${roomOptions[roomType]}
Check-in        : ${checkIn}
Check-out       : ${checkOut}
Number of Rooms : ${rooms}

Is the room available?
        `

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`

    window.open(whatsappURL, "_blank")
  }

  return (
<section
  id="booking"
  className="relative py-24 px-4 sm:px-6 bg-[#fbfaf7] overflow-hidden"
>
  {/* BACKGROUND SVG */}
  <div
    className="absolute inset-0 bg-center bg-repeat opacity-[1] pointer-events-none"
    style={{
      backgroundImage: "url('/images/Home/Visiwig-Bricks.svg')",
    }}
  />

      <div className="max-w-6xl mx-auto">

        {/* CARD */}
 <div className="relative -mt-16 md:-mt-20 bg-white shadow-2xl rounded-2xl px-6 py-10">

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">

            {/* ROOM TYPE */}
            <div className="relative">
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="peer w-full border rounded-xl px-4 pt-6 pb-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-800"
              >
                {Object.entries(roomOptions).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <label className="absolute left-4 top-2 text-xs text-slate-500 peer-focus:text-slate-800">
                {t("booking.roomType")}
              </label>
            </div>

            {/* CHECK IN */}
            <div className="relative">
              <input
                type="date"
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value)
                  setCheckOut("")
                }}
                className="peer w-full border rounded-xl px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-slate-800"
              />
              <label className="absolute left-4 top-2 text-xs text-slate-500 peer-focus:text-slate-800">
                {t("booking.checkIn")}
              </label>
            </div>

            {/* CHECK OUT */}
            <div className="relative">
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="peer w-full border rounded-xl px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-slate-800"
              />
              <label className="absolute left-4 top-2 text-xs text-slate-500 peer-focus:text-slate-800">
                {t("booking.checkOut")}
              </label>
            </div>

            {/* ROOMS */}
            <div className="relative">
              <input
                type="number"
                min="1"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                className="peer w-full border rounded-xl px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-slate-800"
              />
              <label className="absolute left-4 top-2 text-xs text-slate-500 peer-focus:text-slate-800">
                {t("booking.rooms")}
              </label>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              className="w-full h-[52px] bg-slate-900 text-white rounded-xl font-medium tracking-wide hover:bg-slate-800 transition"
            >
              {t("booking.button")}
            </button>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <p className="mt-6 text-sm text-red-600 text-center">
              {error}
            </p>
          )}
        </div>

      </div>
    </section>
  )
}
