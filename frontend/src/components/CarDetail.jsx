import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const CarDetail = ({ car }) => {
  const specsRef = useRef(null);
  const featuresRef = useRef(null);
  const specsInView = useInView(specsRef, { once: true, margin: '-50px' });
  const featuresInView = useInView(featuresRef, { once: true, margin: '-50px' });

  // Gallery images from unsplash
  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=90&fit=crop',
      caption: 'Front View',
    },
    {
      url: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=1200&q=90&fit=crop',
      caption: 'Side Profile',
    },
    {
      url: 'https://images.unsplash.com/photo-1617654112368-307921291f50?w=1200&q=90&fit=crop',
      caption: 'Rear Design',
    },
    {
      url: 'https://images.unsplash.com/photo-1582531249566-e593e6f43e90?w=1200&q=90&fit=crop',
      caption: 'Interior',
    },
  ];

  // Animated counter
  const AnimCounter = ({ target, suffix = '', duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
      if (!inView) return;
      const num = parseFloat(target);
      if (isNaN(num)) return;

      let start = 0;
      const step = num / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= num) {
          setCount(num);
          clearInterval(timer);
        } else {
          setCount(Number.isInteger(num) ? Math.floor(start) : parseFloat(start.toFixed(1)));
        }
      }, 16);
      return () => clearInterval(timer);
    }, [inView, target, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
  };

  const specs = [
    { label: 'Engine', value: car.engine, icon: '⚙️' },
    { label: 'Power', value: car.power, icon: '⚡' },
    { label: 'Torque', value: car.torque, icon: '🔧' },
    { label: 'Transmission', value: car.transmission, icon: '🏎️' },
    { label: 'Drivetrain', value: car.drivetrain, icon: '🛞' },
    { label: 'Top Speed', value: car.topSpeed, icon: '💨' },
    { label: '0-60 mph', value: car.acceleration, icon: '⏱️' },
    { label: 'Weight', value: car.weight, icon: '⚖️' },
    { label: 'Fuel Economy', value: car.fuelEconomy, icon: '⛽' },
  ];

  return (
    <div className="space-y-20 lg:space-y-28">
      {/* Gallery Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Swiper
          modules={[Navigation, Pagination, EffectFade, Autoplay]}
          effect="fade"
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="w-full aspect-video max-h-[70vh] rounded-2xl overflow-hidden"
        >
          {galleryImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full">
                <img
                  src={img.url}
                  alt={`${car.name} - ${img.caption}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-xs tracking-[0.2em] uppercase text-text-secondary bg-black/40 
                                  backdrop-blur-sm px-3 py-1 rounded-sm">
                    {img.caption}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>

      {/* Stats Bar */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="glass-card rounded-xl p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="stat-card">
            <div className="stat-value">
              <AnimCounter target={car.powerNum || 315} suffix="" />
            </div>
            <div className="stat-label">Horsepower</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              <AnimCounter target={car.torqueNum || 310} suffix="" />
            </div>
            <div className="stat-label">lb-ft Torque</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              <AnimCounter target={car.topSpeedNum || 170} suffix="" />
            </div>
            <div className="stat-label">mph Top Speed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              <AnimCounter target={car.accelerationNum || 5.0} suffix="s" duration={1500} />
            </div>
            <div className="stat-label">0-60 mph</div>
          </div>
        </div>
      </motion.section>

      {/* Description */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 gradient-text">
          {car.tagline || 'The Ultimate Hot Hatch'}
        </h2>
        <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light">
          {car.description}
        </p>
      </motion.section>

      {/* Specifications */}
      <section ref={specsRef} id="specs">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={specsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-1 h-10 bg-accent rounded-full" />
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-wide">
              Specifications
            </h2>
          </div>

          <div className="glass-card rounded-xl p-8 md:p-10">
            {specs.map((spec, i) => (
              <motion.div
                key={spec.label}
                className="spec-row"
                initial={{ opacity: 0, x: -20 }}
                animate={specsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.5 }}
              >
                <span className="spec-label flex items-center gap-2">
                  <span className="text-base">{spec.icon}</span>
                  {spec.label}
                </span>
                <span className="spec-value">{spec.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section ref={featuresRef}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-1 h-10 bg-accent rounded-full" />
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-wide">
              Features
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {car.features?.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="glass-card rounded-lg p-5 md:p-6 flex items-center gap-4 group cursor-default"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-md bg-accent/10 
                              text-accent text-base font-bold group-hover:bg-accent/20 transition-colors flex-shrink-0">
                  ✓
                </div>
                <span className="text-sm md:text-base text-text-secondary group-hover:text-text-primary 
                              transition-colors">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default CarDetail;
