import { useState, useEffect } from 'react';
import { ArrowLeft, Layers, Sparkles } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Ballpit from './components/Ballpit';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WorkSection from './components/WorkSection';
import IOTSection from './components/IOTSection';
import ProtoSemSection from './components/ProtoSemSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export function App() {
  const [activePage, setActivePage] = useState<'home' | 'protosem' | 'contact'>('home');
  const [activeSection, setActiveSection] = useState('home');

  // Handle page switching & navigation
  const handleSelectNav = (id: string) => {
    if (id === 'protossem') {
      setActivePage('protosem');
      setActiveSection('protossem');
      window.history.pushState(null, '', '#protossem');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'contact') {
      setActivePage('contact');
      setActiveSection('contact');
      window.history.pushState(null, '', '#contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActivePage('home');
      setActiveSection(id);
      window.history.pushState(null, '', '#' + id);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  // Listen to direct URL hash navigation (e.g., #iot, #work, #about, #protossem, #contact)
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (!hash) return;

      if (hash === 'protossem' || hash === 'protosem') {
        setActivePage('protosem');
        setActiveSection('protossem');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'contact') {
        setActivePage('contact');
        setActiveSection('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (['home', 'about', 'work', 'iot'].includes(hash)) {
        setActivePage('home');
        setActiveSection(hash);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    };

    handleHashNavigation();
    window.addEventListener('hashchange', handleHashNavigation);

    // Refresh ScrollTrigger after initial mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (activePage !== 'home') return;

    const sections = ['home', 'about', 'work', 'iot'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePage]);

  return (
    <div className="relative min-h-screen bg-[#07080d] text-[#e2e8f0] font-sans overflow-hidden">
      {/* Custom Glowing Cursor Follower */}
      <CustomCursor />

      {/* Main Portfolio Content with Step-by-Step Evolva Entrance */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Extremely Vivid & Colorful 3D Ballpit Background */}
        <Ballpit
          count={42}
          gravity={0.02}
          friction={0.994}
          wallBounce={0.85}
          followCursor={true}
          colors={['#f59e0b', '#ec4899', '#8b5cf6', '#38bdf8', '#10b981', '#f43f5e', '#a855f7', '#06b6d4']}
          minSize={0.8}
          maxSize={1.6}
          className="fixed inset-0 opacity-90 pointer-events-none"
        />

        {/* Navigation Bar with StaggeredMenu and Step-by-Step Entrance */}
        <Navbar
          activeSection={activeSection}
          onSelectSection={handleSelectNav}
        />

        {/* Page Routing / Rendering */}
        <main className="flex-1">
          {activePage === 'home' && (
            <div className="space-y-12">
              <HeroSection
                onExploreProjects={() => handleSelectNav('work')}
                onExploreAbout={() => handleSelectNav('about')}
                onExploreIOT={() => handleSelectNav('iot')}
              />

              <AboutSection />

              <WorkSection />

              <IOTSection />
            </div>
          )}

          {activePage === 'protosem' && (
            <div className="pt-28 pb-16 px-6 max-w-7xl mx-auto min-h-screen">
              {/* Back to Home Navigation Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/15">
                <button
                  onClick={() => handleSelectNav('home')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-slate-950 font-mono text-xs font-bold uppercase transition-all shadow-md group cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Back to Main Portfolio</span>
                </button>

                <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-300">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>DEDICATED PROTOSEM PAGE (20 WEEKS)</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                </div>
              </div>

              {/* ProtoSem 20-Week Section Component */}
              <ProtoSemSection />
            </div>
          )}

          {activePage === 'contact' && (
            <div className="pt-24 pb-16 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
              {/* Dedicated Contact Page Component */}
              <ContactSection onBackToHome={() => handleSelectNav('home')} />
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
