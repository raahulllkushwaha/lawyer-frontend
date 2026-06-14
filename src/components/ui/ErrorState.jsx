export default function ErrorState({ message = 'Could not load this section.', onRetry }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 py-12 text-center">
      <p className="text-sm text-red-700">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-outline mt-4">
          Try again
        </button>
      )}
    </div>
  );
}
