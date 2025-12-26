import { useState } from "react"
import { useTranslation } from "react-i18next"

function FAQ() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = t("faq.items", { returnObjects: true })

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="bg-[#fbfaf7] py-28 px-6">
      <div className="max-w-4xl mx-auto">

        {/* SECTION HEADER */}
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] text-hotel-accent mb-4">
            {t("faq.label")}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1f3a34] mb-6">
            {t("faq.title")}
          </h2>
          <div className="w-12 h-[2px] bg-hotel-accent mx-auto"></div>
        </div>

        {/* FAQ LIST */}
        <div className="divide-y divide-black/10">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index

            return (
              <div
                key={index}
                className="py-8 transition-colors duration-300 hover:bg-white/60"
              >
                {/* QUESTION */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left group"
                >
                  <span className="font-serif text-lg text-[#1f3a34] transition group-hover:text-hotel-accent">
                    {faq.question}
                  </span>

                  <span
                    className={`ml-4 flex-shrink-0 w-10 h-10 rounded-full border border-hotel-accent text-hotel-accent flex items-center justify-center transition-all duration-500 ease-in-out
                    ${isOpen ? "rotate-45 bg-hotel-accent text-white" : "rotate-0"}
                  `}
                  >
                    +
                  </span>
                </button>

                {/* ANSWER */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out
                    ${
                      isOpen
                        ? "max-h-40 opacity-100 mt-4 translate-y-0"
                        : "max-h-0 opacity-0 translate-y-2"
                    }
                  `}
                >
                  <p className="text-gray-600 leading-relaxed pr-10">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default FAQ
