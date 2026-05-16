import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import CarCard from '../components/CarCard';
import LoadingSpinner from '../components/LoadingSpinner';
import useFetch from '../hooks/useFetch';

const HomePage = () => {
  const { data: cars, loading, error } = useFetch('/api/cars');
  const modelsRef = useRef(null);
  const modelsInView = useInView(modelsRef, { once: true, margin: '-100px' });

  return (
    <div className="noise-overlay">
      {/* Hero Section */}
      <HeroSection />

      {/* Transition gradient */}
      <div className="h-40 md:h-48 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary" />

      {/* Models Section */}
      <section id="models" className="py-24 md:py-32 px-6 lg:px-8 max-w-7xl mx-auto" ref={modelsRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={modelsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[10px] font-semibold tracking-[0.3em] uppercase 
                         text-accent mb-4">
            The Lineup
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-text-primary mb-6">
            Choose Your <span className="gradient-text-red">Weapon</span>
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Three variants. One legendary nameplate. 
            Each engineered to deliver an unparalleled driving experience.
          </p>
          <div className="divider-line max-w-xs mx-auto mt-10" />
        </motion.div>

        {/* Cars Grid */}
        {loading && <LoadingSpinner />}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="glass-card rounded-xl p-8 max-w-md mx-auto">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Connection Error
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                Could not connect to the API server. Make sure the backend is running.
              </p>
              <code className="text-xs text-accent bg-accent/10 px-3 py-1 rounded">
                {error}
              </code>
            </div>
          </motion.div>
        )}

        {cars && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {cars.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Performance Banner */}
      <section className="py-32 md:py-40 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 bg-accent/6 rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center px-6"
        >
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-accent mb-6 block">
            Engineering Excellence
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-black leading-tight mb-8">
            <span className="text-text-primary">BORN ON THE </span>
            <span className="gradient-text-red">TRACK.</span>
            <br />
            <span className="text-text-primary">BUILT FOR THE </span>
            <span className="gradient-text-red">ROAD.</span>
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Every component has been meticulously engineered at the Suzuka Circuit 
            and refined through countless hours of testing. The result is a machine 
            that bridges the gap between race car and daily driver.
          </p>
        </motion.div>
      </section>

      {/* Specs Overview Strip */}
      <section id="specs" className="py-20 md:py-28 border-y border-border bg-bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 lg:gap-20"
          >
            {[
              { value: '315', unit: 'HP', label: 'Max Power' },
              { value: '310', unit: 'lb-ft', label: 'Peak Torque' },
              { value: '5.0', unit: 's', label: '0-60 mph' },
              { value: '170', unit: 'mph', label: 'Top Speed' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="font-display text-5xl md:text-6xl font-bold text-accent mb-3">
                  {stat.value}
                  <span className="text-xl md:text-2xl text-text-muted ml-2">{stat.unit}</span>
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-text-muted font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
