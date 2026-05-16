import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CarDetail from '../components/CarDetail';
import { PageLoader } from '../components/LoadingSpinner';
import useFetch from '../hooks/useFetch';

const DetailPage = () => {
  const { id } = useParams();
  const { data: car, loading, error } = useFetch(`/api/cars/${id}`);

  if (loading) return <PageLoader />;

  if (error || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-xl p-10 text-center max-w-md"
        >
          <div className="text-5xl mb-4">🏎️</div>
          <h2 className="font-display text-2xl font-bold text-text-primary mb-3">
            Car Not Found
          </h2>
          <p className="text-sm text-text-secondary mb-6">
            {error || `The car with ID "${id}" doesn't exist in our lineup.`}
          </p>
          <Link to="/" className="btn-primary text-sm no-underline inline-block">
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-bg-primary pt-32 pb-20"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-12"
        >
          <Link
            to="/"
            className="text-xs tracking-[0.15em] uppercase text-text-muted hover:text-accent 
                       transition-colors no-underline flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>
          <span className="text-text-muted text-xs">/</span>
          <span className="text-xs tracking-[0.15em] uppercase text-text-secondary">
            {car.name}
          </span>
        </motion.div>

        {/* Title Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-accent block mb-3">
            {car.year} • {car.category}
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-black text-text-primary mb-6">
            {car.name}
          </h1>
          <div className="flex items-center gap-8">
            <span className="font-display text-3xl font-bold text-accent">{car.price}</span>
            {car.badge && (
              <span className="px-4 py-2 text-[10px] font-bold tracking-[0.15em] uppercase 
                             bg-accent/10 text-accent border border-accent/20 rounded-sm">
                {car.badge}
              </span>
            )}
          </div>
        </motion.div>

        {/* Car Detail Component */}
        <CarDetail car={car} />
      </div>
    </motion.div>
  );
};

export default DetailPage;
