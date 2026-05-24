const difficultyColors = {
  beginner: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  intermediate: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  advanced: 'bg-red-500/20 text-red-300 border-red-500/30',
};

const categoryColors = {
  diving: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  snorkeling: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'marine-life': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  beach: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
};

export default function Badge({ label, variant = 'default' }) {
  const colorMap = variant === 'difficulty' ? difficultyColors : variant === 'category' ? categoryColors : {};
  const colors = colorMap[label] || 'bg-ocean-700/50 text-ocean-200 border-ocean-600/50';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${colors}`}
    >
      {label?.replace('-', ' ')}
    </span>
  );
}
