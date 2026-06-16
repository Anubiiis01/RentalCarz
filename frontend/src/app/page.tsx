import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedFleet from "@/components/home/FeaturedFleet";
import HowItWorks from "@/components/home/HowItWorks";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedFleet />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}