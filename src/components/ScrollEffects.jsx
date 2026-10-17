import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const directions = {
  up: { y: 22 },
  left: { x: -20 },
  right: { x: 20 },
  none: {},
};

export function Reveal({ as = "div", children, className = "", delay = 0, direction = "up", effect = "move", amount = 0.05 }) {
  const reduceMotion = useReducedMotion();
  const [revealFallback, setRevealFallback] = useState(false);
  const MotionTag = motion[as] || motion.div;
  const offset = directions[direction] || directions.up;
  useEffect(() => {
    if (reduceMotion) return;
    const timeout = window.setTimeout(() => setRevealFallback(true), 1800);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);
  const variants = {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      ...(!reduceMotion && effect === "image" ? { clipPath: "inset(0 0 100% 0)" } : {}),
      ...(!reduceMotion && effect !== "image" ? offset : {}),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      ...(!reduceMotion && effect === "image" ? { clipPath: "inset(0 0 0% 0)" } : {}),
      transition: { duration: reduceMotion ? 0 : 0.58, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return <MotionTag
    className={className}
    variants={variants}
    initial="hidden"
    whileInView="visible"
    animate={revealFallback ? "visible" : undefined}
    onViewportEnter={() => setRevealFallback(true)}
    viewport={{ once: true, amount, margin: "0px" }}
  >{children}</MotionTag>;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div
    aria-hidden="true"
    className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[#701f32]"
    style={{ scaleX: scrollYProgress }}
  />;
}

const connectorStyles = {
  hero: {
    placement: "bottom-0 h-14 md:h-20",
    layers: [
      { fill: "var(--maroon-light)", opacity: 0.2, d: "M0 24 C220 62 410 4 670 26 C990 52 1160 62 1440 18 V100 H0Z" },
      { fill: "var(--warm-white)", d: "M0 43 C250 78 420 24 700 42 C1020 61 1190 73 1440 37 V100 H0Z" },
    ],
  },
  rooms: {
    placement: "top-0 h-12 md:h-14",
    layers: [
      { fill: "var(--maroon-light)", opacity: 0.18, d: "M0 0 H1440 V38 C1190 53 1010 17 760 31 C490 48 248 55 0 32Z" },
      { fill: "var(--surface-white)", d: "M0 0 H1440 V25 C1190 42 1010 7 760 20 C490 37 248 43 0 21Z" },
    ],
  },
  faq: {
    placement: "bottom-0 h-12 md:h-16",
    layers: [
      { fill: "var(--maroon-light)", opacity: 0.16, d: "M0 29 C240 7 460 52 720 31 C1010 8 1200 10 1440 37 V100 H0Z" },
      { fill: "var(--surface-white)", d: "M0 41 C240 21 460 63 720 43 C1010 20 1200 22 1440 49 V100 H0Z" },
    ],
  },
  faqFooter: {
    placement: "bottom-0 h-16 md:h-20",
    layers: [
      { fill: "var(--maroon-light)", opacity: 0.42, d: "M0 42 C190 28 330 8 520 20 C740 34 840 57 1040 48 C1210 40 1320 18 1440 28 V100 H0Z" },
      { fill: "var(--maroon)", opacity: 0.88, d: "M0 58 C210 45 350 26 560 34 C770 43 900 62 1080 53 C1240 45 1340 33 1440 39 V100 H0Z" },
      { fill: "var(--maroon-dark)", d: "M0 75 C200 62 380 47 580 51 C800 56 930 73 1110 66 C1260 60 1360 48 1440 52 V100 H0Z" },
    ],
  },
  reservation: {
    placement: "top-0 h-12 md:h-14",
    layers: [
      { fill: "var(--maroon-light)", opacity: 0.2, d: "M0 0 H1440 V34 C1210 15 1030 53 780 34 C520 15 280 53 0 37Z" },
      { fill: "var(--surface-white)", d: "M0 0 H1440 V22 C1210 7 1030 38 780 23 C520 8 280 42 0 25Z" },
    ],
  },
  storyReservation: {
    placement: "top-0 h-12 md:h-14",
    layers: [
      { fill: "var(--maroon-light)", opacity: 0.2, d: "M0 0 H1440 V34 C1210 15 1030 53 780 34 C520 15 280 53 0 37Z" },
      { fill: "var(--warm-white)", d: "M0 0 H1440 V22 C1210 7 1030 38 780 23 C520 8 280 42 0 25Z" },
    ],
  },
  reservationRooms: {
    placement: "top-0 h-12 md:h-14",
    layers: [
      { fill: "var(--maroon-light)", opacity: 0.18, d: "M0 0 H1440 V38 C1190 53 1010 17 760 31 C490 48 248 55 0 32Z" },
      { fill: "#48121f", d: "M0 0 H1440 V25 C1190 42 1010 7 760 20 C490 37 248 43 0 21Z" },
    ],
  },
};

export function SectionConnector({ variant }) {
  const connector = connectorStyles[variant];
  if (!connector) return null;
  return <svg aria-hidden="true" focusable="false" className={`pointer-events-none absolute inset-x-0 z-10 w-full ${connector.placement}`} viewBox="0 0 1440 100" preserveAspectRatio="none">
    {connector.layers.map((layer, index) => <path key={index} d={layer.d} fill={layer.fill} opacity={layer.opacity ?? 1} />)}
  </svg>;
}

export function ParallaxHeroImage({ target, alt }) {
  const reduceMotion = useReducedMotion();
  const [distance, setDistance] = useState(() => typeof window === "undefined" ? 0 : window.innerWidth < 768 ? 0 : window.innerWidth < 1024 ? 14 : 28);
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end start"] });
  useEffect(() => {
    const updateDistance = () => setDistance(window.innerWidth < 768 ? 0 : window.innerWidth < 1024 ? 14 : 28);
    window.addEventListener("resize", updateDistance, { passive: true });
    return () => window.removeEventListener("resize", updateDistance);
  }, []);
  const y = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : distance]);
  return <motion.img
    src="/images/Home/heroo.webp"
    alt={alt}
    fetchPriority="high"
    className="absolute inset-0 h-full w-full scale-[1.06] object-cover object-center"
    style={{ y }}
  />;
}
