import { useParams, Link } from 'react-router-dom';
import Seo from '../../components/Seo.jsx';
import Loader from '../../components/ui/Loader.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { useApiQuery } from '../../hooks/useApi.js';
import { ENDPOINTS } from '../../lib/endpoints.js';
import { formatDate, readingTime } from '../../lib/format.js';

export default function BlogDetail() {
  const { slug } = useParams();
  const { data: b, isLoading, isError } = useApiQuery(['blog', slug], ENDPOINTS.blogBySlug(slug));

  if (isLoading) return <div className="pt-32"><Loader /></div>;
  if (isError || !b) return (
    <div className="container-page py-40 text-center">
      <p className="text-navy-700">Article not found.</p>
      <Link to="/blog" className="btn-outline mt-4">Back to Insights</Link>
    </div>
  );

  return (
    <>
      <Seo title={b.seoTitle || b.title} description={b.seoDescription || b.excerpt} image={b.coverImageUrl} canonical={b.canonicalUrl} />
      <article className="bg-cream pt-32">
        <div className="container-page max-w-3xl">
          {b.category && <Badge tone="navy">{b.category}</Badge>}
          <h1 className="heading-serif mt-4 text-4xl sm:text-5xl">{b.title}</h1>
          <p className="mt-4 text-sm text-navy-700/60">
            {b.authorName && <>By {b.authorName} • </>}{formatDate(b.publishedAt)} • {readingTime(b.content)} min read • {b.viewCount ?? 0} views
          </p>
          {b.coverImageUrl && (
            <img src={b.coverImageUrl} alt={b.title} className="mt-8 w-full rounded-2xl object-cover shadow-soft" />
          )}
          <div className="prose prose-navy mt-8 max-w-none whitespace-pre-line leading-relaxed text-navy-800">
            {b.content}
          </div>
          {b.tags?.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {b.tags.map((t) => <span key={t} className="rounded-full bg-navy/10 px-3 py-1 text-xs text-navy-800">#{t}</span>)}
            </div>
          )}
          <div className="my-16">
            <Link to="/blog" className="btn-outline">← Back to Insights</Link>
          </div>
        </div>
      </article>
    </>
  );
}
