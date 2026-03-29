"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Rocket, Globe, Code2, Brain } from "lucide-react";

const cards = [
  { key: "card1", icon: Rocket },
  { key: "card2", icon: Globe },
  { key: "card3", icon: Code2 },
  { key: "card4", icon: Brain },
] as const;

export default function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-brand-light/45 sm:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {cards.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
              }}
              className="service-card group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-[0_0_32px_rgba(59,130,246,0.08)] sm:p-8"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] text-brand-light/50 transition-all duration-300 ease-out group-hover:bg-brand-blue/10 group-hover:text-brand-blue">
                <Icon
                  size={22}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 ease-out group-hover:rotate-[-8deg]"
                />
              </div>
              <h3 className="font-heading text-lg font-semibold text-white">
                {t(`${key}_title`)}
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-brand-light/40">
                {t(`${key}_desc`)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-col items-center text-center"
        >
          <p className="max-w-md text-base text-brand-light/45">
            {t("cta")}
          </p>
          <a
            href="#contact"
            className="mt-6 rounded-full bg-brand-blue px-8 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-blue-500 hover:shadow-[0_0_32px_rgba(59,130,246,0.4)]"
          >
            {t("cta_button")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
