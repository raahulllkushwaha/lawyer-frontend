import Seo from '../../components/Seo.jsx';
import Section from '../../components/ui/Section.jsx';
import Loader from '../../components/ui/Loader.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { useApiQuery } from '../../hooks/useApi.js';
import { ENDPOINTS } from '../../lib/endpoints.js';
import { enumLabel } from '../../lib/enums.js';

const OUTCOME_TONE = { WON: 'green', SETTLED: 'gold', ACQUITTAL: 'green', BAIL_GRANTED: 'navy', FAVORABLE_ORDER: 'gold' };

export default function CaseResults() {
  const { data, isLoading } = useApiQuery('case-results', ENDPOINTS.caseResults);
  return (
    <>
      <Seo title="Case Results" />
      <Section eyebrow="Track Record" title="Notable Case Results" subtitle="A history of favorable outcomes for our clients." className="bg-cream pt-32">
        {isLoading ? <Loader /> : !data?.length ? <EmptyState /> : (
          <div className="grid gap-6 md:grid-cols-2">
            {data.map((c) => (
              <div key={c.id} className="card" data-reveal>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="heading-serif text-lg">{c.title}</h3>
                  {c.outcome && <Badge tone={OUTCOME_TONE[c.outcome] || 'gold'}>{enumLabel(c.outcome)}</Badge>}
                </div>
                <p className="mt-2 text-sm text-navy-700/80">{c.summary}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-xs text-navy-700/60">
                  {c.courtName && <span>{c.courtName}</span>}
                  {c.caseType && <span>• {c.caseType}</span>}
                  {c.caseYear && <span>• {c.caseYear}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
