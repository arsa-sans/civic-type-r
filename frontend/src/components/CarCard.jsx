import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

const CarCard = ({ car, index = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Use Unsplash images based on car category
  const getCarImage = (car) => {
    const images = {
      1: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=90&fit=crop',
      2: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=800&q=90&fit=crop',
      3: 'src/assets/civicCard.jpg',
    };
    return images[car.id] || images[1];
  };

  const badgeColors = {
    'Best Seller': 'bg-accent text-white',
    'New': 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    'Limited': 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <Link to={`/car/${car.id}`} className="block no-underline group">
        <div className="glass-card rounded-xl overflow-hidden">
          {/* Image Container */}
          <div className="relative h-56 sm:h-64 overflow-hidden bg-bg-secondary rounded-t-xl">
            <motion.img
              src={getCarImage(car)}
              alt={car.name}
              className="w-full h-full object-cover transition-transform duration-700 
                         group-hover:scale-110"
              whileHover={{ rotate: 1 }}
              loading="lazy"
            />
            
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent" />

            {/* Badge */}
            {car.badge && (
              <div className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-bold 
                              tracking-[0.15em] uppercase rounded-sm ${badgeColors[car.badge] || 'bg-accent/20 text-accent'}`}>
                {car.badge}
              </div>
            )}

            {/* Category tag */}
            <div className="absolute top-4 right-4 px-3 py-1 text-[10px] font-medium 
                           tracking-[0.15em] uppercase text-text-secondary bg-black/50 
                           backdrop-blur-sm rounded-sm">
              {car.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Year + Name */}
            <div className="mb-3">
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent">
                {car.year}
              </span>
              <h3 className="text-xl font-bold text-text-primary mt-1 group-hover:text-accent 
                            transition-colors duration-300">
                {car.name}
              </h3>
            </div>

            {/* Quick specs */}
            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-xs text-text-secondary">{car.power}</span>
              </div>
              <div className="w-px h-3 bg-border" />
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-text-secondary">{car.acceleration}</span>
              </div>
              <div className="w-px h-3 bg-border" />
              <span className="text-xs text-text-secondary">{car.topSpeed}</span>
            </div>

            {/* Divider */}
            <div className="divider-line mb-4" />

            {/* Price + CTA */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-text-muted tracking-[0.1em] uppercase">Starting at</span>
                <p className="text-lg font-bold text-text-primary font-display">{car.price}</p>
              </div>
              <div className="flex items-center gap-2 text-accent text-sm font-medium 
                            group-hover:gap-3 transition-all duration-300">
                <span>Details</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CarCard;
