"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.7,
    delay,
    ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
  },
});

const stats = [
  { value: "10+", key: "stats_websites" },
  { value: "3x", key: "stats_fast" },
  { value: "100%", key: "stats_satisfaction" },
] as const;

const particles = [
  { top: "15%", left: "10%", duration: "7s", delay: "0s" },
  { top: "25%", right: "15%", duration: "9s", delay: "1s" },
  { top: "60%", left: "20%", duration: "8s", delay: "2s" },
  { top: "70%", right: "25%", duration: "10s", delay: "0.5s" },
  { top: "40%", left: "80%", duration: "11s", delay: "3s" },
];

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ── Ambient background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        {/* Floating particles */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="hero-particle"
            style={{
              top: p.top,
              left: "left" in p ? p.left : undefined,
              right: "right" in p ? p.right : undefined,
              ["--duration" as string]: p.duration,
              ["--delay" as string]: p.delay,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-darker via-transparent to-brand-darker" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_70%)]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-24 pb-16 text-center">
        {/* Badge */}
        <motion.div {...fade(0.1)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/[0.06] px-4 py-1.5 text-[13px] font-medium text-brand-blue backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
            </span>
            {t("badge")}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fade(0.2)}
          className="mt-8 max-w-4xl font-heading text-[clamp(2.25rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
        >
          {t("headline")}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fade(0.3)}
          className="mt-6 max-w-[600px] text-base leading-relaxed text-brand-light/50 sm:text-lg md:text-xl"
        >
          {t("subheadline")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fade(0.4)}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="rounded-full bg-brand-blue px-8 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-blue-500 hover:shadow-[0_0_32px_rgba(59,130,246,0.4)]"
          >
            {t("cta_primary")}
          </a>
          <a
            href="#portfolio"
            className="rounded-full border border-white/10 px-8 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 ease-out hover:border-white/25 hover:bg-white/[0.04]"
          >
            {t("cta_secondary")}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fade(0.6)}
          className="mt-16 flex items-center gap-6 sm:gap-14"
        >
          {stats.map((s, i) => (
            <div key={s.key} className="relative flex flex-col items-center">
              {i > 0 && (
                <div className="absolute -left-3 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-white/10 sm:-left-7 sm:block" />
              )}
              <span className="font-heading text-2xl font-bold text-brand-blue sm:text-4xl">
                {s.value}
              </span>
              <span className="mt-1 text-[11px] font-medium tracking-wide text-brand-light/40 sm:text-sm">
                {t(s.key)}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <div className="h-8 w-[1px] bg-gradient-to-b from-transparent to-brand-light/20" />
          <ChevronDown size={16} className="text-brand-light/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
