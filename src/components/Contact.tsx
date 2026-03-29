"use client";

import { useState, useRef, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Send, Mail, CheckCircle, AlertCircle } from "lucide-react";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const data = new FormData(e.currentTarget);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: "New Portfolio Inquiry from Boshi.AI",
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      const json = await res.json();

      if (json.success) {
        setStatus("success");
        formRef.current?.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-brand-blue/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-brand-light/45 sm:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-brand-light/50"
            >
              {t("name_label")}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder={t("name_placeholder")}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[15px] text-white placeholder-brand-light/20 outline-none transition-all duration-200 focus:border-brand-blue/40 focus:ring-1 focus:ring-brand-blue/30"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-brand-light/50"
            >
              {t("email_label")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder={t("email_placeholder")}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[15px] text-white placeholder-brand-light/20 outline-none transition-all duration-200 focus:border-brand-blue/40 focus:ring-1 focus:ring-brand-blue/30"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-brand-light/50"
            >
              {t("message_label")}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder={t("message_placeholder")}
              className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[15px] text-white placeholder-brand-light/20 outline-none transition-all duration-200 focus:border-brand-blue/40 focus:ring-1 focus:ring-brand-blue/30"
            />
          </div>

          {/* Status messages */}
          {status === "success" && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3 text-sm text-emerald-400">
              <CheckCircle size={16} className="flex-shrink-0" />
              {t("success")}
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-400">
              <AlertCircle size={16} className="flex-shrink-0" />
              {t("error")}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue py-3.5 text-[15px] font-semibold text-white transition-all duration-300 ease-out hover:bg-blue-500 hover:shadow-[0_0_32px_rgba(59,130,246,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "sending" ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <>
                {t("submit")}
                <Send size={15} />
              </>
            )}
          </button>
        </motion.form>

        {/* Direct contact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="mb-4 text-sm text-brand-light/25">{t("or")}</p>
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://instagram.com/boshi.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-light/40 transition-colors duration-200 ease-out hover:text-brand-blue"
            >
              <InstagramIcon size={16} />
              {t("instagram")}
            </a>
            <a
              href="mailto:hello@boshi.ai"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-light/40 transition-colors duration-200 ease-out hover:text-brand-blue"
            >
              <Mail size={16} />
              hello@boshi.ai
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
