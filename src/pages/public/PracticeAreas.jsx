import Seo from '../../components/Seo.jsx';
import Section from '../../components/ui/Section.jsx';
import Loader from '../../components/ui/Loader.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import { useApiQuery } from '../../hooks/useApi.js';
import { ENDPOINTS } from '../../lib/endpoints.js';

export default function PracticeAreas() {
  const { data, isLoading } = useApiQuery('practice-areas', ENDPOINTS.practiceAreas);
  return (
    <>
      <Seo title="Practice Areas" />
      <Section eyebrow="Expertise" title="Practice Areas" subtitle="Comprehensive legal services tailored to your needs." className="bg-cream pt-32">
        {isLoading ? <Loader /> : !data?.length ? <EmptyState /> : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((a) => (
              <div key={a.id} className="card transition hover:-translate-y-1 hover:shadow-gold" data-reveal>
                <div className="mb-4 text-4xl">{a.icon || '⚖️'}</div>
                <h3 className="heading-serif text-xl">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-700/80">{a.description}</p>
              </div>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
