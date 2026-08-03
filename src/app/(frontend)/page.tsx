import StatsSection from '@/components/sections/StatsSection';
import HeroContent from '@/components/sections/HeroContent';
import QuickNavCards from '@/components/sections/QuickNavCards';
import ScrollIndicator from '@/components/sections/ScrollIndicator';
import HeroSceneWrapper from '@/components/3d/HeroSceneWrapper';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <HeroSceneWrapper />

        {/* Content */}
        <HeroContent />

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* Stats Counter */}
      <StatsSection />

      {/* Quick Nav Cards */}
      <section className="py-20 bg-background">
        <QuickNavCards />
      </section>
    </div>
  );
}
