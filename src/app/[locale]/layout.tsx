import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import BackToTop from "@/components/BackToTop";
import "../globals.css";

export const metadata: Metadata = {
  title: "Boshi.AI - AI-Powered Web Development",
  description:
    "Modern, fast, conversion-optimized websites for businesses that want to grow. Built with AI-powered precision in days, not weeks. Landing pages, business websites, web apps & AI integration.",
  keywords: [
    "web development",
    "AI websites",
    "Next.js developer",
    "landing page",
    "business website",
    "web application",
    "freelance developer",
    "Germany",
  ],
  authors: [{ name: "Samuel", url: "https://boshi.ai" }],
  creator: "Boshi.AI",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://boshi.ai" },
  openGraph: {
    title: "Boshi.AI - I Build Websites That Bring You Customers",
    description:
      "Modern, fast, conversion-optimized websites built with AI-powered precision in days, not weeks.",
    url: "https://boshi.ai",
    siteName: "Boshi.AI",
    locale: "en_US",
    type: "website",
    // images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boshi.AI - AI-Powered Web Development",
    description:
      "Modern, fast, conversion-optimized websites built with AI-powered precision.",
    // images: ["/og.png"],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect rx='20' width='100' height='100' fill='%233B82F6'/><text x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-size='60' font-weight='bold' fill='white' font-family='system-ui'>B</text></svg>",
  },
  metadataBase: new URL("https://boshi.ai"),
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "de")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="min-h-full flex flex-col font-body">
        <NextIntlClientProvider messages={messages}>
          <Nav />
          {children}
          <BackToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
