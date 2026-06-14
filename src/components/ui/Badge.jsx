const TONES = {
  gold: 'bg-gold/15 text-gold-dark',
  navy: 'bg-navy/10 text-navy-800',
  green: 'bg-emerald-100 text-emerald-700',
  red: 'bg-red-100 text-red-700',
  slate: 'bg-slate-100 text-slate-600',
};

export default function Badge({ children, tone = 'gold', className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${TONES[tone] || TONES.gold} ${className}`}>
      {children}
    </span>
  );
}
