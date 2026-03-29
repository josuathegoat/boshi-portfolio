"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    key: "project1",
    gradient: "from-brand-blue/20 via-blue-600/10 to-indigo-500/20",
    accentPos: "top-6 right-6",
  },
  {
    key: "project2",
    gradient: "from-emerald-500/15 via-teal-500/10 to-brand-blue/15",
    accentPos: "bottom-6 left-6",
  },
] as const;

export default function Portfolio() {
  const t = useTranslations("portfolio");

  return (
    <section id="portfolio" className="relative py-28 sm:py-36">
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

        {/* Project cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map(({ key, gradient, accentPos }, i) => {
            const tags = [
              t(`${key}_tag1`),
              t(`${key}_tag2`),
              t(`${key}_tag3`),
            ];

            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.15,
                  ease: [0.25, 0.4, 0.25, 1] as [
                    number,
                    number,
                    number,
                    number,
                  ],
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/[0.1] hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)]"
              >
                {/* Image placeholder */}
                <div className="shimmer relative aspect-video overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
                  />
                  {/* Grid pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />
                  {/* Floating accent dot */}
                  <div
                    className={`absolute ${accentPos} h-20 w-20 rounded-full bg-brand-blue/20 blur-2xl transition-transform duration-500 group-hover:scale-150`}
                  />
                  {/* Coming soon label */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium tracking-wider text-white/30 backdrop-blur-sm">
                      SCREENSHOT COMING
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <h3 className="font-heading text-xl font-semibold text-white">
                    {t(`${key}_title`)}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-brand-light/40">
                    {t(`${key}_desc`)}
                  </p>

                  {/* Tags + link */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-brand-blue/20 bg-brand-blue/[0.06] px-3 py-1 text-xs font-medium text-brand-blue/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-sm font-medium text-brand-light/50 transition-colors duration-200 hover:text-brand-blue"
                    >
                      {t("view_project")}
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Coming soon */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center text-sm text-brand-light/25"
        >
          {t("coming_soon")}
        </motion.p>
      </div>
    </section>
  );
}
