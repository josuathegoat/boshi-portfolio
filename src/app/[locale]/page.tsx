import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: "Boshi.AI",
      url: "https://boshi.ai",
      description:
        "AI-powered web development. Modern, fast, conversion-optimized websites for businesses that want to grow.",
      founder: {
        "@type": "Person",
        name: "Samuel",
        jobTitle: "Web Developer",
        url: "https://boshi.ai",
      },
      areaServed: {
        "@type": "GeoShape",
        name: "Germany & Worldwide (Remote)",
      },
      serviceType: [
        "Web Development",
        "Landing Pages",
        "Business Websites",
        "Web Applications",
        "AI Integration",
      ],
      priceRange: "$$",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "hello@boshi.ai",
        url: "https://instagram.com/boshi.ai",
      },
    },
    {
      "@type": "WebSite",
      name: "Boshi.AI",
      url: "https://boshi.ai",
      inLanguage: ["en", "de"],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
