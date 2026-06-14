import Seo from '../../components/Seo.jsx';
import Section from '../../components/ui/Section.jsx';
import Loader from '../../components/ui/Loader.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { useApiQuery } from '../../hooks/useApi.js';
import { ENDPOINTS } from '../../lib/endpoints.js';
import { API_BASE_URL } from '../../lib/api.js';
import { enumLabel } from '../../lib/enums.js';

export default function Resources() {
  const { data, isLoading } = useApiQuery('resources', ENDPOINTS.resources);
  return (
    <>
      <Seo title="Resources" />
      <Section eyebrow="Free & Premium" title="Legal Resources" subtitle="Templates, guides and checklists." className="bg-cream pt-32">
        {isLoading ? <Loader /> : !data?.length ? <EmptyState /> : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((r) => (
              <div key={r.id} className="card flex flex-col" data-reveal>
                <div className="flex items-center justify-between">
                  {r.type && <Badge tone="navy">{enumLabel(r.type)}</Badge>}
                  <Badge tone={r.free ? 'green' : 'gold'}>{r.free ? 'Free' : 'Premium'}</Badge>
                </div>
                <h3 className="heading-serif mt-3 text-lg">{r.title}</h3>
                <p className="mt-2 flex-1 text-sm text-navy-700/80">{r.description}</p>
                <a href={`${API_BASE_URL}/api/resources/${r.id}/download`} target="_blank" rel="noreferrer" className="btn-outline mt-4 justify-center">
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
