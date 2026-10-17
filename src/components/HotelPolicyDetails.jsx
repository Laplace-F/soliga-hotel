import { useTranslation } from "react-i18next";
import { hotelPolicies } from "../data/hotel";
import { formatRoomPrice } from "../utils/formatRoomPrice";
import { formatPolicyTime } from "../utils/formatPolicyTime";

export default function HotelPolicyDetails({ className = "" }) {
  const { t, i18n } = useTranslation();
  const time = (value) => formatPolicyTime(value, i18n.language);
  const late = hotelPolicies.lateCheckOut;

  return <div className={`space-y-5 text-sm leading-6 text-[var(--muted)] ${className}`}>
    <div>
      <h3 className="font-semibold text-[#171416]">{t("policies.checkInHeading")}</h3>
      <p>{t("policies.checkInStandard", { time: time(hotelPolicies.checkIn) })}</p>
      <p className="mt-1">{t("policies.earlyCheckIn", { time: time(hotelPolicies.checkIn) })}</p>
    </div>
    <div>
      <h3 className="font-semibold text-[#171416]">{t("policies.checkOutHeading")}</h3>
      <ul className="list-disc space-y-1 pl-5">
        <li>{t("policies.checkOutStandard", { time: time(late.standardUntil) })}</li>
        <li>{t("policies.lateCheckOutFirst", { start: time(late.standardUntil), end: time(late.firstPeriodUntil), percent: late.firstPeriodPercent })}</li>
        <li>{t("policies.lateCheckOutSecond", { start: time(late.firstPeriodUntil), end: time(late.secondPeriodUntil), percent: late.secondPeriodPercent })}</li>
        <li>{t("policies.lateCheckOutOvernight", { time: time(late.additionalNightAfter) })}</li>
      </ul>
    </div>
    <div>
      <h3 className="font-semibold text-[#171416]">{t("policies.extraBedHeading")}</h3>
      <p>{t("policies.extraBed", { price: formatRoomPrice(hotelPolicies.extraBedPrice) })}</p>
    </div>
  </div>;
}
