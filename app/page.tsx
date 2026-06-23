import Header from "@/components/Header";
import PersonaBar from "@/components/PersonaBar";
import Hero from "@/components/Hero";
import QuickActions from "@/components/QuickActions";
import FocusAreas from "@/components/FocusAreas";
import News from "@/components/News";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import AiAssistant from "@/components/AiAssistant";

export default function Home() {
  return (
    <>
      <Header />
      <PersonaBar />
      <main id="main">
        <Hero />
        <QuickActions />
        <FocusAreas />
        <News />
        <CtaBand />
      </main>
      <Footer />
      <AiAssistant />
    </>
  );
}
