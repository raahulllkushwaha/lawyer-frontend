import Seo from '../../components/Seo.jsx';
import Section from '../../components/ui/Section.jsx';
import Loader from '../../components/ui/Loader.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { useApiQuery } from '../../hooks/useApi.js';
import { ENDPOINTS } from '../../lib/endpoints.js';
import { enumLabel } from '../../lib/enums.js';
import { formatDate } from '../../lib/format.js';

export default function Achievements() {
  const { data, isLoading } = useApiQuery('achievements', ENDPOINTS.achievements);
  return (
    <>
      <Seo title="Achievements" />
      <Section eyebrow="Recognition" title="Achievements & Awards" className="bg-cream pt-32">
        {isLoading ? <Loader /> : !data?.length ? <EmptyState /> : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((a) => (
              <div key={a.id} className="card" data-reveal>
                {a.imageUrl && <img src={a.imageUrl} alt={a.title} className="mb-4 h-40 w-full rounded-lg object-cover" />}
                {a.type && <Badge tone="gold">{enumLabel(a.type)}</Badge>}
                <h3 className="heading-serif mt-3 text-lg">{a.title}</h3>
                {a.awardedBy && <p className="text-xs text-navy-700/60">{a.awardedBy} {a.achievementDate && `• ${formatDate(a.achievementDate)}`}</p>}
                {a.description && <p className="mt-2 text-sm text-navy-700/80">{a.description}</p>}
              </div>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
