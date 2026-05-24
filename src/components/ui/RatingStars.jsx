import { Star } from 'lucide-react';

export default function RatingStars({ rating, reviewCount }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1 sm:gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
        ))}
        {hasHalf && (
          <div className="relative">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-ocean-600" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
            </div>
          </div>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-ocean-600" />
        ))}
      </div>
      <span className="text-xs sm:text-sm font-medium text-white">{rating}</span>
      {reviewCount !== undefined && (
        <span className="text-[10px] sm:text-xs text-ocean-400">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}
