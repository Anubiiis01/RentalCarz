import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/Home/Hero";
import FeaturedFleet from "@/components/Home/FeaturedFleet";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedFleet />
      </main>
    </>
  );
}