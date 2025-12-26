import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#360503] text-gray-300 pt-16">
      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <h2 className="text-white text-2xl font-serif mb-4">
            Soliga{" "}
            <span className="block text-sm tracking-[0.3em] text-gray-400">
              HOTEL
            </span>
          </h2>

          <p className="text-sm leading-relaxed mb-6">
            {t("footer.description")}
          </p>

          <div className="flex gap-4">
            <div className="w-10 h-10 border border-white/30 flex items-center justify-center hover:bg-white/10 cursor-pointer">
              IG
            </div>
            <div className="w-10 h-10 border border-white/30 flex items-center justify-center hover:bg-white/10 cursor-pointer">
              FB
            </div>
            <div className="w-10 h-10 border border-white/30 flex items-center justify-center hover:bg-white/10 cursor-pointer">
              TW
            </div>
          </div>
        </div>

        {/* EXPLORE */}
        <div>
          <h3 className="text-white mb-4 font-semibold">
            {t("footer.explore.title")}
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer">
              {t("footer.explore.story")}
            </li>
            <li className="hover:text-white cursor-pointer">
              {t("footer.explore.accommodations")}
            </li>
            <li className="hover:text-white cursor-pointer">
              {t("footer.explore.dining")}
            </li>
            <li className="hover:text-white cursor-pointer">
              {t("footer.explore.spa")}
            </li>
            <li className="hover:text-white cursor-pointer">
              {t("footer.explore.experiences")}
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white mb-4 font-semibold">
            {t("footer.contact.title")}
          </h3>
          <ul className="space-y-4 text-sm">
            <li>
              {t("footer.contact.address.line1")}
              <br />
              {t("footer.contact.address.line2")}
            </li>
            <li>{t("footer.contact.phone")}</li>
            <li>{t("footer.contact.email")}</li>
          </ul>
        </div>

        {/* HOURS */}
        <div>
          <h3 className="text-white mb-4 font-semibold">
            {t("footer.hours.title")}
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span>{t("footer.hours.reception")}</span>
              <span>{t("footer.hours.receptionTime")}</span>
            </li>
            <li className="flex justify-between">
              <span>{t("footer.hours.restaurant")}</span>
              <span>{t("footer.hours.restaurantTime")}</span>
            </li>
            <li className="flex justify-between">
              <span>{t("footer.hours.spa")}</span>
              <span>{t("footer.hours.spaTime")}</span>
            </li>
            <li className="flex justify-between">
              <span>{t("footer.hours.pool")}</span>
              <span>{t("footer.hours.poolTime")}</span>
            </li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between text-sm text-gray-400">
          <p>{t("footer.copyright")}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">
              {t("footer.privacy")}
            </span>
            <span className="hover:text-white cursor-pointer">
              {t("footer.terms")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
