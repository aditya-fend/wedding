// app/page.tsx
import Navbar from "@/components/user/home/Navbar";
import Hero from "@/components/user/home/Hero";
import Features from "@/components/user/home/Features";
import Pricing from "@/components/user/home/Pricing";
import Testimonials from "@/components/user/home/Testimonials";
import FinalCTA from "@/components/user/home/FinalCTA";
import Footer from "@/components/user/home/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
}