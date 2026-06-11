import { LoadingScreen } from '@/components/LoadingScreen';
import { Navbar } from '@/components/Navbar';
import { ThemeGallery } from '@/components/ThemeGallery';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { JourneySection } from '@/components/JourneySection';
import { SenaCloudSection } from '@/components/SenaCloudSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { StatusSection } from '@/components/StatusSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { MusicPlayer } from '@/components/MusicPlayer';
import { Playground } from '@/components/Playground';

export default function Home() {
  return (
    <main className="bg-primary text-primary transition-theme">
      <LoadingScreen />
      <Navbar />
      <ThemeGallery />
      <HeroSection />
      <AboutSection />
      <JourneySection />
      <SenaCloudSection />
      <ProjectsSection />
      <StatusSection />
      <ContactSection />
      <Footer />
      <MusicPlayer />
      <Playground />
    </main>
  );
}
