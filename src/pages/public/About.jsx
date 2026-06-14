import Seo from '../../components/Seo.jsx';
import Section from '../../components/ui/Section.jsx';
import Loader from '../../components/ui/Loader.jsx';
import { useApiQuery } from '../../hooks/useApi.js';
import { ENDPOINTS } from '../../lib/endpoints.js';
import { formatDate } from '../../lib/format.js';

function Timeline({ items, render }) {
  return (
    <ol className="relative border-l border-gold/40 pl-6">
      {items.map((it, i) => (
        <li key={it.id ?? i} className="relative mb-8" data-reveal>
          <span className="absolute -left-[1.5rem] top-1.5 -translate-x-1/2 h-3 w-3 rounded-full bg-gold" />
          {render(it)}
        </li>
      ))}
    </ol>
  );
}
export default function About() {
  const { data: about, isLoading } = useApiQuery('about', ENDPOINTS.about);
  const { data: education } = useApiQuery('education', ENDPOINTS.education);
  const { data: experience } = useApiQuery('experience', ENDPOINTS.experience);

  if (isLoading) return <div className="pt-32"><Loader /></div>;

  return (
    <>
      <Seo title="About" description={about?.biography?.slice(0, 150)} />
      <Section eyebrow="Who I Am" title="About the Advocate" className="bg-cream pt-32">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="whitespace-pre-line leading-relaxed text-navy-800" data-reveal>{about?.biography}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {about?.mission && (
                <div className="card" data-reveal>
                  <h3 className="heading-serif text-lg">Mission</h3>
                  <p className="mt-2 text-sm text-navy-700/80">{about.mission}</p>
                </div>
              )}
              {about?.vision && (
                <div className="card" data-reveal>
                  <h3 className="heading-serif text-lg">Vision</h3>
                  <p className="mt-2 text-sm text-navy-700/80">{about.vision}</p>
                </div>
              )}
            </div>
          </div>

          <aside className="card h-fit" data-reveal>
            <h3 className="heading-serif text-lg">Credentials</h3>
            <dl className="mt-4 space-y-3 text-sm">
              {about?.barCouncilNumber && (
                <div><dt className="text-navy-700/60">Bar Council No.</dt><dd className="font-medium">{about.barCouncilNumber}</dd></div>
              )}
              {about?.barCouncilState && (
                <div><dt className="text-navy-700/60">Bar Council State</dt><dd className="font-medium">{about.barCouncilState}</dd></div>
              )}
              {about?.enrollmentYear && (
                <div><dt className="text-navy-700/60">Enrolled</dt><dd className="font-medium">{about.enrollmentYear}</dd></div>
              )}
            </dl>
            {about?.languagesKnown?.length > 0 && (
              <div className="mt-4">
                <p className="text-navy-700/60 text-sm">Languages</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {about.languagesKnown.map((l) => (
                    <span key={l} className="rounded-full bg-navy/10 px-3 py-1 text-xs text-navy-800">{l}</span>
                  ))}
                </div>
              </div>
            )}
            {about?.courtMemberships?.length > 0 && (
              <div className="mt-4">
                <p className="text-navy-700/60 text-sm">Court Memberships</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {about.courtMemberships.map((c) => <li key={c}>• {c}</li>)}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Section>

      <Section eyebrow="Background" title="Education & Experience" className="bg-white">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="heading-serif mb-6 text-xl">Education</h3>
            {education?.length ? (
              <Timeline
                items={education}
                render={(e) => (
                  <>
                    <p className="font-semibold text-navy-900">{e.degree}</p>
                    <p className="text-sm text-navy-700/80">{e.institution} • {e.year}</p>
                    {e.description && <p className="mt-1 text-sm text-navy-700/70">{e.description}</p>}
                  </>
                )}
              />
            ) : <p className="text-sm text-navy-700/60">No records yet.</p>}
          </div>
          <div>
            <h3 className="heading-serif mb-6 text-xl">Experience</h3>
            {experience?.length ? (
              <Timeline
                items={experience}
                render={(x) => (
                  <>
                    <p className="font-semibold text-navy-900">{x.title}</p>
                    <p className="text-sm text-navy-700/80">{x.organization}</p>
                    <p className="text-xs text-navy-700/60">
                      {formatDate(x.startDate)} – {x.current ? 'Present' : formatDate(x.endDate)}
                    </p>
                    {x.description && <p className="mt-1 text-sm text-navy-700/70">{x.description}</p>}
                  </>
                )}
              />
            ) : <p className="text-sm text-navy-700/60">No records yet.</p>}
          </div>
        </div>
      </Section>
    </>
  );
}
