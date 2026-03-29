"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Zap, Cpu, BadgeDollarSign, Headphones } from "lucide-react";

const trustCards = [
  { key: "trust1", icon: Zap },
  { key: "trust2", icon: Cpu },
  { key: "trust3", icon: BadgeDollarSign },
  { key: "trust4", icon: Headphones },
] as const;

const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "AI Tools",
  "Vercel",
];

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          {t("title")}
        </motion.h2>

        {/* Two-column: intro + trust cards */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: personal intro */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <p className="text-[17px] leading-[1.8] text-brand-light/55">
              {t("p1")}
            </p>
            <p className="text-[17px] leading-[1.8] text-brand-light/55">
              {t("p2")}
            </p>
            {/* Subtle accent line */}
            <div className="pt-2">
              <div className="h-px w-16 bg-gradient-to-r from-brand-blue/50 to-transparent" />
            </div>
          </motion.div>

          {/* Right: trust cards */}
          <div className="grid grid-cols-2 gap-4">
            {trustCards.map(({ key, icon: Icon }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.1,
                  ease: [0.25, 0.4, 0.25, 1] as [
                    number,
                    number,
                    number,
                    number,
                  ],
                }}
                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/20 hover:shadow-[0_0_24px_rgba(59,130,246,0.06)]"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue transition-colors duration-300 group-hover:bg-brand-blue/15">
                  <Icon size={18} strokeWidth={1.8} />
                </div>
                <h3 className="font-heading text-sm font-semibold text-white">
                  {t(`${key}_title`)}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-brand-light/35">
                  {t(`${key}_desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech stack marquee */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 overflow-hidden"
        >
          <p className="mb-5 text-center text-xs font-medium tracking-widest text-brand-light/20 uppercase">
            Built with
          </p>
          <div className="relative">
            {/* Fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-brand-darker to-transparent sm:w-24" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-brand-darker to-transparent sm:w-24" />

            <div className="marquee-track flex w-max gap-4">
              {[...stack, ...stack].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="flex-shrink-0 rounded-full border border-white/[0.06] bg-white/[0.02] px-5 py-2 text-sm font-medium text-brand-light/30"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
