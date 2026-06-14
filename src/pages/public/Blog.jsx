import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo.jsx';
import Section from '../../components/ui/Section.jsx';
import Loader from '../../components/ui/Loader.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { useApiQuery } from '../../hooks/useApi.js';
import { ENDPOINTS } from '../../lib/endpoints.js';
import { pageContent, formatDate } from '../../lib/format.js';

export default function Blog() {
  const [page, setPage] = useState(0);
  const [q, setQ] = useState('');
  const { data, isLoading } = useApiQuery(['blogs', { page, q }], ENDPOINTS.blogs, { params: { page, size: 9, q: q || undefined } });
  const { items, totalPages } = pageContent(data);

  return (
    <>
      <Seo title="Legal Insights" description="Articles and legal insights." />
      <Section eyebrow="Blog" title="Legal Insights" subtitle="Articles, analysis and guidance on the law." className="bg-cream pt-32">
        <div className="mb-8 max-w-md">
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(0); }}
            placeholder="Search articles…"
            className="field-input"
          />
        </div>
        {isLoading ? <Loader /> : !items.length ? <EmptyState message="No articles found." /> : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((b) => (
              <Link to={`/blog/${b.slug}`} key={b.id} className="group card overflow-hidden p-0" data-reveal>
                {b.coverImageUrl && (
                  <div className="h-44 overflow-hidden">
                    <img src={b.coverImageUrl} alt={b.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                )}
                <div className="p-6">
                  {b.category && <Badge tone="navy">{b.category}</Badge>}
                  <h3 className="heading-serif mt-3 text-lg group-hover:text-gold-dark">{b.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-navy-700/80">{b.excerpt}</p>
                  <p className="mt-4 text-xs text-navy-700/50">{formatDate(b.publishedAt)} • {b.viewCount ?? 0} views</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i)} className={`h-9 w-9 rounded-full text-sm ${i === page ? 'bg-navy text-cream' : 'bg-white text-navy-700'}`}>
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
