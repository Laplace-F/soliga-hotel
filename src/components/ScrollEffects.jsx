import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const directions = {
  up: { y: 22 },
  left: { x: -20 },
  right: { x: 20 },
  none: {},
};

export function Reveal({ as = "div", children, className = "", delay = 0, direction = "up", effect = "move", amount = 0.16 }) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  const offset = directions[direction] || directions.up;
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
    viewport={{ once: false, amount, margin: "0px 0px -5% 0px" }}
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
