// Small formatting helpers shared across pages.
export const PLACEHOLDER_PORTRAIT =
  'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=900&q=80';

export function formatDate(value) {
  if (!value) return '';
  try {
    return new Date(value).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return String(value);
  }
}

export function readingTime(content = '') {
  const words = String(content).trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function pageContent(data) {
  // Normalizes either a Spring Page object or a plain array into { items, page, totalPages }.
  if (Array.isArray(data)) return { items: data, page: 0, totalPages: 1 };
  if (data && Array.isArray(data.content)) {
    return { items: data.content, page: data.number ?? 0, totalPages: data.totalPages ?? 1 };
  }
  return { items: [], page: 0, totalPages: 1 };
}
