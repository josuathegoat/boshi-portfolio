"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";

const navLinks = ["services", "portfolio", "about", "contact"] as const;

export default function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function switchLocale() {
    const next = locale === "en" ? "de" : "en";
    router.replace(pathname, { locale: next });
  }

  function scrollTo(id: string) {
    setMobileOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-brand-blue"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "glass border-b border-white/[0.04] shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="group flex items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue font-heading text-lg font-bold text-white transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
              B
            </div>
            <span className="font-heading text-xl font-semibold tracking-tight text-white">
              Boshi<span className="text-brand-blue">.AI</span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((key) => (
              <button
                key={key}
                onClick={() => scrollTo(key)}
                className="nav-link relative px-4 py-2 text-sm font-medium text-brand-light/70 transition-colors duration-200 ease-out hover:text-white"
              >
                {t(key)}
              </button>
            ))}

            <button
              onClick={switchLocale}
              className="ml-2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-brand-light/60 transition-all duration-200 ease-out hover:border-white/20 hover:text-white"
            >
              {locale === "en" ? "DE" : "EN"}
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="ml-4 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-blue-500 hover:shadow-[0_0_24px_rgba(59,130,246,0.35)]"
            >
              {t("cta")}
            </button>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={switchLocale}
              className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-brand-light/60 transition-all duration-200 ease-out hover:border-white/20 hover:text-white"
            >
              {locale === "en" ? "DE" : "EN"}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-brand-darker/95 backdrop-blur-xl lg:hidden"
          >
            {navLinks.map((key, i) => (
              <motion.button
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.07 }}
                onClick={() => scrollTo(key)}
                className="font-heading text-3xl font-semibold text-white transition-colors duration-200 ease-out hover:text-brand-blue"
              >
                {t(key)}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              onClick={() => scrollTo("contact")}
              className="mt-4 rounded-full bg-brand-blue px-8 py-3.5 text-lg font-semibold text-white transition-all duration-300 ease-out hover:shadow-[0_0_24px_rgba(59,130,246,0.35)]"
            >
              {t("cta")}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
