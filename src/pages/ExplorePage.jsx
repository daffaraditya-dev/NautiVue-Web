import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, X, Map } from 'lucide-react';
import ExploreMap from '../components/map/ExploreMap';
import Badge from '../components/ui/Badge';
import RatingStars from '../components/ui/RatingStars';
import { destinations } from '../data/destinations';

export default function ExplorePage() {
  const [selectedDestination, setSelectedDestination] = useState(null);

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      {/* Map */}
      <ExploreMap
        destinations={destinations}
        onDestinationClick={setSelectedDestination}
      />

      {/* Map Title Overlay */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute top-3 left-3 sm:top-4 sm:left-4 z-[1000]"
      >
        <div className="bg-ocean-900/80 backdrop-blur-md rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 border border-ocean-700/50">
          <div className="flex items-center gap-2">
            <Map className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400" />
            <div>
              <h1 className="text-xs sm:text-sm font-semibold text-white">Explore Destinations</h1>
              <p className="text-[10px] sm:text-xs text-ocean-400">{destinations.length} locations across Indonesia</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[1000]"
      >
        <div className="bg-ocean-900/80 backdrop-blur-md rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 border border-ocean-700/50">
          <p className="text-[10px] sm:text-xs text-ocean-400 mb-1.5 sm:mb-2 font-medium">Difficulty</p>
          <div className="flex sm:flex-col gap-2 sm:gap-1.5">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400" />
              <span className="text-[10px] sm:text-xs text-ocean-300">Beginner</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400" />
              <span className="text-[10px] sm:text-xs text-ocean-300">Intermediate</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
              <span className="text-[10px] sm:text-xs text-ocean-300">Advanced</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Selected Destination Info Card */}
      <AnimatePresence>
        {selectedDestination && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-auto sm:right-4 sm:w-80 md:w-96 z-[1000]"
          >
            <div className="bg-ocean-800/95 backdrop-blur-md rounded-xl sm:rounded-2xl border border-ocean-700/50 overflow-hidden shadow-2xl">
              <div className="relative h-32 sm:h-40">
                <img
                  src={selectedDestination.heroImage}
                  alt={selectedDestination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ocean-900/80 via-transparent to-transparent" />
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 bg-ocean-900/60 hover:bg-ocean-900/80 rounded-full text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-3 sm:bottom-3 sm:left-4">
                  <div className="flex gap-1.5 sm:gap-2">
                    <Badge label={selectedDestination.difficulty} variant="difficulty" />
                    <Badge label={selectedDestination.category} variant="category" />
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                  {selectedDestination.name}
                </h3>
                <div className="flex items-center gap-1 text-ocean-400 text-xs sm:text-sm mb-2">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{selectedDestination.location}</span>
                </div>
                <p className="text-ocean-300 text-xs sm:text-sm line-clamp-2 mb-3">
                  {selectedDestination.description}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <RatingStars rating={selectedDestination.rating} />
                  <Link
                    to={`/destination/${selectedDestination.id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-teal-500 hover:bg-teal-400 text-ocean-900 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
                  >
                    Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
