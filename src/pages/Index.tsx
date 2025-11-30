import { LandingHero } from "@/components/landing/LandingHero";
import { StatsSection } from "@/components/landing/StatsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { ImpactSection } from "@/components/landing/ImpactSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "@/components/landing/Footer";
import { LandingNav } from "@/components/landing/LandingNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <LandingHero />
      <StatsSection />
      <FeaturesSection />
      <ImpactSection />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
