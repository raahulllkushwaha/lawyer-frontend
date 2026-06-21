import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/practice-areas', label: 'Practice' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/case-results', label: 'Results' },
  { to: '/blog', label: 'Insights' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/media', label: 'Media' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || pathname !== '/';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'bg-cream/90 shadow-soft backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav className="container-page flex h-20 items-center justify-between">
        <Link to="/" className={`font-serif text-2xl font-bold ${solid ? 'text-navy-900' : 'text-cream'}`}>
          <span className="text-gold">&#9878;</span> Advocate
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    solid ? 'text-navy-800 hover:text-gold-dark' : 'text-cream/90 hover:text-gold'
                  } ${isActive ? 'text-gold-dark' : ''}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link to="/appointment" className="btn-gold">Book Consultation</Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden ${solid ? 'text-navy-900' : 'text-cream'}`}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-navy-900 lg:hidden"
          >
            <ul className="container-page flex flex-col gap-1 py-4">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} className="block rounded-lg px-3 py-3 text-cream/90 hover:bg-navy-700">
                    {l.label}
                  </NavLink>
                </li>
              ))}
              <li className="mt-2 px-3">
                <Link to="/appointment" className="btn-gold w-full">Book Consultation</Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
