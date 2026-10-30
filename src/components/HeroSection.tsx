import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Mail, Terminal, Sparkles, User, Radio, RotateCcw } from 'lucide-react';
import BorderGlow from './BorderGlow';
import { LinkedInIcon, GitHubIcon } from './SocialIcons';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onExploreAbout: () => void;
  onExploreIOT?: () => void;
}

// Exact spring physics reverse-engineered from Evolva Framer Template
const evolvaSpring = {
  type: 'spring' as const,
  bounce: 0.1,
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onExploreAbout,
  onExploreIOT,
}) => {
  const [animKey, setAnimKey] = useState(0);

  const handleReplay = () => {
    setAnimKey((prev) => prev + 1);
  };

  return (
    <section
      id="home"
      key={animKey}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-6 overflow-hidden"
    >
      {/* Step 1: Background Glow Orbs - Initial gentle expansion & bloom (delay: 0s, duration: 1.5s) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-pink-500/25 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.1, ease: 'easeOut' }}
        className="absolute bottom-1/4 right-1/5 w-[500px] h-[500px] bg-cyan-500/25 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.2, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[160px] pointer-events-none"
      />

      {/* Main Hero Card Container */}
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Step 2: Status Tag Pill (Evolva Step 1: delay 0.35s, duration 1.2s, y: 60 -> 0) */}
        <div className="flex items-center justify-center mb-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              ...evolvaSpring,
              duration: 1.3,
              delay: 0.35,
            }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0c101a]/80 border border-white/15 text-xs font-mono text-slate-300 backdrop-blur-md shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="text-emerald-400 font-semibold tracking-wide">SYSTEM ACTIVE</span>
            <span className="text-white/30">•</span>
            <span className="text-amber-300">HARDWARE & EMBEDDED SYSTEMS</span>
            <span className="text-white/30 hidden sm:inline">•</span>
            <span className="text-cyan-400 font-medium hidden sm:inline">KCT ECE '28</span>
          </motion.div>
        </div>

        {/* Main Hero Card with Multi-Color Glowing Border */}
        <BorderGlow glowColor="#ec4899" edgeSensitivity={250} glowRadius={350} className="w-full">
          <div className="p-8 sm:p-12 md:p-14 flex flex-col items-center text-center justify-center">
            {/* Step 3: The Massive Name Headline (Evolva Step 2: delay 0.6s, duration 1.8s, y: 150 -> 0) */}
            <div className="w-full mb-3 overflow-hidden py-1">
              <motion.h1
                initial={{ opacity: 0.001, y: 150 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...evolvaSpring,
                  duration: 1.8,
                  delay: 0.6,
                }}
                className="font-syne font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase leading-tight bg-gradient-to-r from-amber-400 via-pink-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-[0_4px_24px_rgba(236,72,153,0.35)]"
              >
                SANJAY RAJENDRAN
              </motion.h1>
            </div>

            {/* Step 4: Occupation / Subtitle (Evolva Step 3: delay 0.75s, duration 1.5s, y: 100 -> 0) */}
            <div className="overflow-hidden py-0.5">
              <motion.p
                initial={{ opacity: 0.001, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...evolvaSpring,
                  duration: 1.5,
                  delay: 0.75,
                }}
                className="font-mono text-sm sm:text-lg text-cyan-300 font-bold tracking-wide"
              >
                Electronics & Communication Engineering Student
              </motion.p>
            </div>

            {/* Step 5: Domain Specialties Badges (Evolva Step 4: delay 0.9s, duration 1.4s, y: 60 -> 0) */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...evolvaSpring,
                duration: 1.4,
                delay: 0.9,
              }}
              className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-mono tracking-wider uppercase font-semibold"
            >
              <span className="text-amber-400">Embedded Systems</span>
              <span className="text-white/30">•</span>
              <a
                href="#iot"
                onClick={(e) => {
                  e.preventDefault();
                  if (onExploreIOT) onExploreIOT();
                }}
                className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/50 hover:decoration-emerald-400 flex items-center gap-1 transition-colors group cursor-pointer"
                title="Direct link to IoT & Smart Systems section"
              >
                <span>IoT & Smart Home</span>
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-125 transition-transform" />
              </a>
              <span className="text-white/30">•</span>
              <span className="text-cyan-400">Digital Electronics</span>
            </motion.div>

            {/* Step 6: Engineering Philosophy Card (Evolva Step 5: delay 1.1s, duration 1.6s, y: 70 -> 0, scale: 0.95 -> 1) */}
            <motion.div
              initial={{ opacity: 0, y: 70, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                ...evolvaSpring,
                duration: 1.6,
                delay: 1.1,
              }}
              className="mt-8 relative group max-w-2xl w-full"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-pink-500 to-cyan-500 rounded-2xl blur opacity-35 group-hover:opacity-75 transition duration-500" />
              <div className="relative px-6 py-4 rounded-2xl bg-[#0b0e17]/95 border border-white/15 flex flex-col sm:flex-row items-center gap-3 justify-center text-center sm:text-left">
                <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0 shadow-inner">
                  <Terminal className="w-5 h-5 animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[11px] font-mono text-amber-300 font-bold tracking-wider uppercase mb-0.5">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    ENGINEERING PHILOSOPHY
                  </div>
                  <p className="text-slate-100 text-sm sm:text-base font-sans italic font-medium">
                    "Bridging hardware and software, one build at a time."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons & Socials Container */}
            <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 w-full">
              {/* Step 7: Left Side / Action Buttons (Evolva Step 6: delay 1.3s, duration 1.6s, x: -80 -> 0) */}
              <motion.div
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  ...evolvaSpring,
                  duration: 1.6,
                  delay: 1.3,
                }}
                className="flex flex-wrap gap-3.5 justify-center"
              >
                <button
                  onClick={onExploreProjects}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 text-white font-syne font-bold text-xs sm:text-sm tracking-wide uppercase flex items-center gap-2 transition-all duration-300 shadow-lg shadow-pink-500/25 hover:scale-105 hover:shadow-pink-500/40 cursor-pointer"
                >
                  <span>View Hardware Projects</span>
                  <Wifi className="w-4 h-4 text-white" />
                </button>

                <a
                  href="#iot"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onExploreIOT) onExploreIOT();
                  }}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-syne font-bold text-xs sm:text-sm tracking-wide uppercase flex items-center gap-2 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:scale-105 hover:shadow-emerald-500/50 cursor-pointer"
                >
                  <span>IoT & Smart Systems</span>
                  <Radio className="w-4 h-4 text-slate-950" />
                </a>

                <button
                  onClick={onExploreAbout}
                  className="px-5 py-3 rounded-xl glass-panel border border-cyan-500/40 text-cyan-300 font-syne font-bold text-xs sm:text-sm tracking-wide uppercase flex items-center gap-2 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 cursor-pointer"
                >
                  <span>Explore Background</span>
                  <User className="w-4 h-4 text-cyan-400" />
                </button>
              </motion.div>

              {/* Step 8: Right Side / Social Badges (Evolva Step 7: delay 1.5s, duration 1.6s, x: 80 -> 0) */}
              <motion.div
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  ...evolvaSpring,
                  duration: 1.6,
                  delay: 1.5,
                }}
                className="flex items-center gap-2.5"
              >
                <a
                  href="mailto:sanjayrajendran25@gmail.com"
                  title="Email Sanjay"
                  className="p-3 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:border-cyan-400 hover:scale-110 transition-all shadow-sm"
                >
                  <Mail className="w-5 h-5" />
                </a>

                <a
                  href="https://www.linkedin.com/in/sanjay-rajendran-4a731032a?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="p-3 rounded-xl bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 hover:border-indigo-400 hover:scale-110 transition-all shadow-sm"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>

                <a
                  href="https://github.com/sanjr25"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 hover:border-emerald-400 hover:scale-110 transition-all shadow-sm"
                >
                  <GitHubIcon className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
          </div>
        </BorderGlow>

        {/* Step 9: Replay Button (Allows the user to re-trigger and enjoy the entrance animation anytime) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-6 flex justify-center"
        >
          <button
            onClick={handleReplay}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[11px] font-mono text-slate-400 hover:text-white transition-all cursor-pointer group"
            title="Replay the step-by-step entrance animation"
          >
            <RotateCcw className="w-3 h-3 group-hover:-rotate-90 transition-transform duration-300 text-amber-400" />
            <span>Replay Entrance Animation</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
