import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85;
    }
  }, [videoLoaded]);

  const handleExplore = () => {
    const el = document.getElementById('models');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const createRipple = (e) => {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple-effect');
    const existing = button.getElementsByClassName('ripple-effect')[0];
    if (existing) existing.remove();
    button.appendChild(circle);
  };

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden" id="hero">
      {/* Video Background with Parallax */}
      <motion.div style={{ y: videoY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="w-full h-full object-cover"
          poster=""
        >
          <source src="/assets/header_civic.mp4" type="video/mp4" />
        </video>

        {/* Overlay gradient */}
        <div className="absolute inset-0 hero-video-overlay" />

        {/* Side vignette */}
        <div className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.8) 100%)',
          }}
        />
      </motion.div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(230,57,70,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(230,57,70,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-semibold 
                           tracking-[0.3em] uppercase text-accent border border-accent/30 
                           rounded-full bg-accent/5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            2024 Model Year
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black 
                     tracking-tight leading-[0.9] mb-6"
        >
          <span className="block text-text-primary">DRIVE THE</span>
          <span className="block gradient-text-red mt-2">FUTURE</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-text-secondary text-sm sm:text-base md:text-lg max-w-xl mb-10 
                     font-light tracking-wide leading-relaxed"
        >
          Experience the pinnacle of performance engineering.
          <br className="hidden sm:block" />
          The Honda Civic Type R redefines what&apos;s possible.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            id="explore-now-btn"
            onClick={(e) => { createRipple(e); handleExplore(); }}
            className="btn-primary ripple text-sm"
          >
            <span>Explore Now</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button
            onClick={handleExplore}
            className="btn-outline text-sm"
          >
            View Lineup
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-text-muted">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-text-muted/30 flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-accent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
