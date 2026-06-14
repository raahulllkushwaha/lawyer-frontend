import Seo from '../../components/Seo.jsx';
import Section from '../../components/ui/Section.jsx';
import Loader from '../../components/ui/Loader.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import { useApiQuery } from '../../hooks/useApi.js';
import { ENDPOINTS } from '../../lib/endpoints.js';
import { formatDate } from '../../lib/format.js';

export default function Media() {
  const { data, isLoading } = useApiQuery('media', ENDPOINTS.media);
  return (
    <>
      <Seo title="Media" />
      <Section eyebrow="In The Press" title="Media Mentions" className="bg-cream pt-32">
        {isLoading ? <Loader /> : !data?.length ? <EmptyState /> : (
          <div className="grid gap-6 md:grid-cols-2">
            {data.map((m) => (
              <a key={m.id} href={m.articleUrl || '#'} target="_blank" rel="noreferrer" className="card flex gap-4 transition hover:shadow-gold" data-reveal>
                {m.imageUrl && <img src={m.imageUrl} alt={m.title} className="h-20 w-20 flex-shrink-0 rounded-lg object-cover" />}
                <div>
                  <h3 className="heading-serif text-lg">{m.title}</h3>
                  <p className="text-xs text-gold-dark">{m.mediaOutlet} {m.mentionDate && `• ${formatDate(m.mentionDate)}`}</p>
                  {m.description && <p className="mt-1 line-clamp-2 text-sm text-navy-700/80">{m.description}</p>}
                </div>
              </a>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
