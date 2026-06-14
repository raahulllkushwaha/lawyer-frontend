import { Link } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../lib/api.js';
import { ENDPOINTS } from '../../lib/endpoints.js';
import { useApiQuery } from '../../hooks/useApi.js';

export default function Footer() {
  const { data: about } = useApiQuery('about-footer', ENDPOINTS.about);
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    try {
      await api.post(ENDPOINTS.newsletter, { email });
      toast.success('Subscribed! Thank you.');
      setEmail('');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  const socials = [
    { url: about?.linkedinUrl, label: 'LinkedIn' },
    { url: about?.twitterUrl, label: 'Twitter' },
    { url: about?.facebookUrl, label: 'Facebook' },
    { url: about?.instagramUrl, label: 'Instagram' },
  ].filter((s) => s.url);

  return (
    <footer className="bg-navy-900 text-cream/80">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-2xl font-bold text-cream"><span className="text-gold">&#9878;</span> Advocate</p>
          <p className="mt-4 text-sm leading-relaxed text-cream/70">
            Dedicated legal counsel committed to protecting your rights with integrity and diligence.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-cream">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/practice-areas" className="hover:text-gold">Practice Areas</Link></li>
            <li><Link to="/blog" className="hover:text-gold">Legal Insights</Link></li>
            <li><Link to="/resources" className="hover:text-gold">Resources</Link></li>
            <li><Link to="/appointment" className="hover:text-gold">Book Consultation</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-cream">Contact</h4>
          <ul className="space-y-2 text-sm text-cream/70">
            {about?.email && <li>{about.email}</li>}
            {about?.phone && <li>{about.phone}</li>}
            {about?.officeAddress && <li>{about.officeAddress}</li>}
            {(about?.city || about?.state) && <li>{[about.city, about.state].filter(Boolean).join(', ')}</li>}
          </ul>
          {socials.length > 0 && (
            <div className="mt-4 flex gap-3">
              {socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-wider text-gold hover:text-gold-light">
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-cream">Newsletter</h4>
          <form onSubmit={subscribe} className="flex flex-col gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="rounded-lg border border-cream/20 bg-navy-800 px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
            />
            <button disabled={busy} className="btn-gold">{busy ? 'Subscribing…' : 'Subscribe'}</button>
          </form>
        </div>
      </div>
      <div className="border-t border-cream/10 py-6 text-center text-xs text-cream/50">
        &copy; {new Date().getFullYear()} Advocate Rahul Kushwaha. All rights reserved.
      </div>
    </footer>
  );
}
