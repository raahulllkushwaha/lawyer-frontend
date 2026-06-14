import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../../components/Seo.jsx';
import Section from '../../components/ui/Section.jsx';
import Loader from '../../components/ui/Loader.jsx';
import HeroScene from '../../components/three/HeroScene.jsx';
import { useApiQuery } from '../../hooks/useApi.js';
import { useCountUp } from '../../hooks/useCountUp.js';
import { ENDPOINTS } from '../../lib/endpoints.js';
import { PLACEHOLDER_PORTRAIT } from '../../lib/format.js';

function Stat({ label, value }) {
  const { value: n, ref } = useCountUp(value || 0);
  return (
    <div ref={ref} className="text-center">
      <div className="heading-serif text-4xl text-gold-dark sm:text-5xl">{n}+</div>
      <div className="mt-1 text-sm uppercase tracking-wider text-navy-700/70">{label}</div>
    </div>
  );
}

export default function Home() {
  const { data: home, isLoading } = useApiQuery('home', ENDPOINTS.home);
  const { data: areas } = useApiQuery('practice-areas', ENDPOINTS.practiceAreas);

  return (
    <>
      <Seo title="Home" description={home?.heroDescription} />

      <section className="relative flex min-h-screen items-center overflow-hidden bg-navy-900 text-cream">
        <HeroScene />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-transparent" />
        <div className="container-page relative z-10 grid items-center gap-12 py-32 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="eyebrow text-gold">{home?.tagline || 'Trusted Legal Counsel'}</span>
            <h1 className="mt-4 font-serif text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
              {home?.name || 'Advocate'}
            </h1>
            {home?.experienceYears && (
              <p className="mt-3 text-lg text-gold-light">{home.experienceYears} of Experience</p>
            )}
            <p className="mt-6 max-w-xl text-cream/80">{home?.heroDescription}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/appointment" className="btn-gold">Book a Consultation</Link>
              <Link to="/about" className="btn-outline border-cream/40 text-cream hover:bg-cream hover:text-navy-900">
                Learn More
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="absolute -inset-4 rounded-[2rem] border border-gold/40" />
            <img
              src={home?.profileImageUrl || PLACEHOLDER_PORTRAIT}
              alt={home?.name || 'Lawyer portrait'}
              className="relative h-[28rem] w-full rounded-[2rem] object-cover shadow-gold"
            />
          </motion.div>
        </div>
      </section>

      <Section className="bg-cream">
        <div className="grid gap-10 rounded-3xl bg-white/80 p-10 shadow-soft sm:grid-cols-3">
          <Stat label="Cases Won" value={home?.casesWon} />
          <Stat label="Happy Clients" value={home?.totalClients} />
          <Stat label="Courts Practiced" value={home?.courtsPracticed} />
        </div>
      </Section>

      <Section eyebrow="What We Do" title="Practice Areas" subtitle="Focused expertise across key areas of law." className="bg-cream">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(areas || []).slice(0, 6).map((a) => (
              <div key={a.id} className="card transition hover:-translate-y-1 hover:shadow-gold" data-reveal>
               <div className="mb-4 text-3xl text-gold-dark">
        {a.icon ? <i className={`fas ${a.icon}`} /> : <span>⚖️</span>}
      </div>
                <h3 className="heading-serif text-xl">{a.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-navy-700/80">{a.description}</p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <Link to="/practice-areas" className="btn-primary">View All Practice Areas</Link>
        </div>
      </Section>

      <section className="bg-navy-900 py-20 text-center text-cream">
        <div className="container-page">
          <h2 className="heading-serif text-3xl text-cream sm:text-4xl">Need legal guidance?</h2>
          <p className="mx-auto mt-3 max-w-xl text-cream/75">Schedule a confidential consultation today.</p>
          <Link to="/appointment" className="btn-gold mt-8">Book Now</Link>
        </div>
      </section>
    </>
  );
}
