import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import Scroll from "@/components/landing/Scrolling";
import HowItWorks from "@/components/landing/Howitwork";
import ChooseYourWorld from "@/components/landing/ChooseYourWorld";
import FAQSection from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Scroll />
      <HowItWorks />
      <ChooseYourWorld />
      <FAQSection />
      <Footer />
    </main>
  );
}
