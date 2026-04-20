// app/page.tsx
import Navbar from "@/components/user/home/Navbar";
import Hero from "@/components/user/home/Hero";
import Features from "@/components/user/home/Features";
import TemplateSection from "@/components/user/home/Template";
import Pricing from "@/components/user/home/Pricing";
import Testimonials from "@/components/user/home/Testimonials";
import FinalCTA from "@/components/user/home/FinalCTA";
import Footer from "@/components/user/home/Footer";

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Saji Janji",
    "description": "Platform pembuatan undangan pernikahan digital elegan, cepat, dan murah di Indonesia.",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Web",
    "url": "https://saji-janji.vercel.app",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "0",
      "priceCurrency": "IDR",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "150",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#F8F5F0]">
        <Navbar />

        <main>
          <Hero />

          <TemplateSection />
          
          <Features />
          
          <Pricing />
          
          <Testimonials />
          
          <FinalCTA />
        </main>

        <Footer />
      </div>
    </>
  );
}