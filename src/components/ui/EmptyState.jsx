export default function EmptyState({ message = 'Nothing here yet.' }) {
  return (
    <div className="rounded-2xl border border-dashed border-navy/20 bg-white/60 py-14 text-center text-navy-700/70">
      {message}
    </div>
  );
}
