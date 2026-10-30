import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal } from 'lucide-react';

interface LoadingScreenProps {
  onRevealStart: () => void;
  onComplete: () => void;
}

const TELEMETRY_STEPS = [
  { threshold: 0, text: 'INITIALIZING KERNEL & HARDWARE STACK...' },
  { threshold: 22, text: 'CALIBRATING EMBEDDED SENSORS & GPIO BUS...' },
  { threshold: 50, text: 'ESTABLISHING IOT MESH TELEMETRY...' },
  { threshold: 78, text: 'COMPILING PROTOSEM 20-WEEK ARCHIVES...' },
  { threshold: 96, text: 'SYSTEM OPERATIONAL // PORTFOLIO READY' },
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onRevealStart, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const hasTriggeredRef = useRef(false);

  // Smooth numeric counter simulation
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Progressive acceleration and smooth settling
      const increment = current < 30 ? 2 : current < 70 ? 3 : current < 92 ? 2 : 1;
      current = Math.min(100, current + increment);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setIsReady(true);
      }
    }, 28);

    return () => clearInterval(interval);
  }, []);

  // When ready (100%), pause briefly then trigger the cinematic shutter lift
  useEffect(() => {
    if (!isReady || hasTriggeredRef.current) return;

    const timer = setTimeout(() => {
      hasTriggeredRef.current = true;
      // Start hero entrance reveal simultaneously with shutter lift
      onRevealStart();
      setIsExiting(true);
    }, 240);

    return () => clearTimeout(timer);
  }, [isReady, onRevealStart]);

  // Allow clicking anywhere or pressing space to fast-forward
  const handleFastForward = () => {
    if (hasTriggeredRef.current) return;
    setProgress(100);
    setIsReady(true);
    hasTriggeredRef.current = true;
    onRevealStart();
    setIsExiting(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        handleFastForward();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Get current status string based on progress
  const currentStatus =
    TELEMETRY_STEPS.slice()
      .reverse()
      .find((step) => progress >= step.threshold)?.text || TELEMETRY_STEPS[0].text;

  return (
    <div
      onClick={handleFastForward}
      className="fixed inset-0 z-[99999] select-none cursor-pointer overflow-hidden"
    >
      {/* Layer 1: Secondary Trailing Translucent Curtain with Parallax Lag */}
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: isExiting ? '-100%' : '0%' }}
        transition={{
          duration: 0.95,
          delay: 0.06,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="fixed inset-0 bg-[#0d121f]/90 backdrop-blur-md pointer-events-none"
      />

      {/* Layer 2: Main Solid Obsidian Curtain with Shutter Lift */}
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: isExiting ? '-100%' : '0%' }}
        transition={{
          duration: 0.88,
          ease: [0.76, 0, 0.24, 1],
        }}
        onAnimationComplete={() => {
          if (isExiting) {
            onComplete();
          }
        }}
        className="fixed inset-0 bg-[#06070a] text-white flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden"
      >
        {/* Subtle Architectural Grid Pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />

        {/* Cinematic Ambient Glow Center Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-amber-500/15 via-pink-500/15 to-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Top Editorial HUD Bar */}
        <div className="relative z-10 flex items-center justify-between text-xs font-mono tracking-wider text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold tracking-widest">SANJAY RAJENDRAN</span>
            <span className="text-white/20">/</span>
            <span className="text-amber-400 font-semibold">PORTFOLIO '26</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="text-emerald-400 font-medium hidden sm:inline">SYS.ONLINE // ECE</span>
            <span className="text-white/30 hidden sm:inline">•</span>
            <span className="text-cyan-400">KCT</span>
          </div>
        </div>

        {/* Centerpiece: Evolva-Grade High-Impact Counter & Telemetry */}
        <div className="relative z-10 max-w-2xl mx-auto w-full flex flex-col items-center text-center my-auto">
          {/* Minimal Tag Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-cyan-300 uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>ELECTRONICS & EMBEDDED SYSTEMS</span>
          </motion.div>

          {/* Huge Architectural Numerical Counter */}
          <div className="flex items-baseline justify-center select-none mb-3">
            <span className="font-syne font-black text-7xl sm:text-9xl md:text-[11rem] leading-none tracking-tighter text-white tabular-nums drop-shadow-[0_4px_30px_rgba(255,255,255,0.12)]">
              {progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : '100'}
            </span>
            <span className="font-mono font-bold text-2xl sm:text-4xl md:text-5xl text-amber-400 ml-1">
              %
            </span>
          </div>

          {/* Glowing Hairline Precision Progress Bar */}
          <div className="w-full max-w-md h-[2.5px] bg-white/10 rounded-full overflow-hidden my-6 relative shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400 rounded-full"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 16px rgba(236,72,153,0.9), 0 0 8px rgba(56,189,248,0.8)',
              }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Dynamic Kinetic Telemetry Line */}
          <div className="h-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStatus}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-300 tracking-wider uppercase"
              >
                <Terminal className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                <span className={progress === 100 ? 'text-amber-300 font-bold' : ''}>
                  {currentStatus}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Editorial HUD Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400 tracking-wider">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>COORDINATES:</span>
            <span className="text-slate-300 font-semibold">11°00'N 76°58'E</span>
          </div>

          <div className="text-[11px] text-amber-400/80 font-mono tracking-widest uppercase animate-pulse flex items-center gap-1.5">
            <span>[ CLICK OR SPACE TO ENTER ]</span>
          </div>
        </div>

        {/* The Signature Evolva Laser Edge (Bright glowing bottom line on departing curtain) */}
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-400 via-pink-500 via-purple-400 to-cyan-400 shadow-[0_0_25px_rgba(236,72,153,1),0_0_15px_rgba(56,189,248,1)] pointer-events-none" />
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
