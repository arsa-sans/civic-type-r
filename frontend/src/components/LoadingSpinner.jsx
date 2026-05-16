const LoadingSpinner = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card rounded-xl overflow-hidden">
          {/* Image skeleton */}
          <div className="skeleton h-56 sm:h-64" />
          
          {/* Content skeleton */}
          <div className="p-6 space-y-4">
            <div className="skeleton h-3 w-16" />
            <div className="skeleton h-6 w-3/4" />
            <div className="flex gap-3">
              <div className="skeleton h-4 w-16" />
              <div className="skeleton h-4 w-16" />
              <div className="skeleton h-4 w-16" />
            </div>
            <div className="divider-line" />
            <div className="flex items-center justify-between">
              <div className="skeleton h-6 w-24" />
              <div className="skeleton h-4 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Full page loading spinner
 */
export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-bg-primary">
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-2 border-accent/20 rounded-full" />
        <div className="absolute inset-0 border-2 border-transparent border-t-accent 
                      rounded-full animate-spin" />
      </div>
      <span className="text-xs tracking-[0.3em] uppercase text-text-muted animate-pulse">
        Loading
      </span>
    </div>
  </div>
);

export default LoadingSpinner;
