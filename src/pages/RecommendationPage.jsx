import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import FilterBar from '../components/ui/FilterBar';
import DestinationCard from '../components/ui/DestinationCard';
import { destinations } from '../data/destinations';

export default function RecommendationPage() {
  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    search: '',
  });

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      if (filters.category !== 'all' && dest.category !== filters.category) return false;
      if (filters.difficulty !== 'all' && dest.difficulty !== filters.difficulty) return false;
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesName = dest.name.toLowerCase().includes(query);
        const matchesLocation = dest.location.toLowerCase().includes(query);
        const matchesDescription = dest.description.toLowerCase().includes(query);
        if (!matchesName && !matchesLocation && !matchesDescription) return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-ocean-800/50 border-b border-ocean-700/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <Compass className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Recommendations</h1>
            </div>
            <p className="text-ocean-300 max-w-2xl text-sm sm:text-base">
              Find your perfect underwater destination. Filter by activity type, difficulty level,
              or search for specific locations.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <FilterBar filters={filters} onFilterChange={setFilters} />
        </motion.div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-ocean-400">
            Showing <span className="text-white font-medium">{filteredDestinations.length}</span> of{' '}
            <span className="text-white font-medium">{destinations.length}</span> destinations
          </p>
        </div>

        {/* Results Grid */}
        {filteredDestinations.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {filteredDestinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <DestinationCard destination={dest} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 sm:py-20"
          >
            <Compass className="w-12 h-12 sm:w-16 sm:h-16 text-ocean-600 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">No destinations found</h3>
            <p className="text-ocean-400 mb-6 text-sm sm:text-base">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
            <button
              onClick={() => setFilters({ category: 'all', difficulty: 'all', search: '' })}
              className="px-6 py-3 bg-teal-500/20 text-teal-300 rounded-xl border border-teal-500/40 hover:bg-teal-500/30 transition-colors cursor-pointer text-sm"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
