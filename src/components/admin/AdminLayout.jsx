import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const NAV = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/profile', label: 'Profile' },
  { to: '/admin/education', label: 'Education' },
  { to: '/admin/experience', label: 'Experience' },
  { to: '/admin/practice-areas', label: 'Practice Areas' },
  { to: '/admin/achievements', label: 'Achievements' },
  { to: '/admin/case-results', label: 'Case Results' },
  { to: '/admin/testimonials', label: 'Testimonials' },
  { to: '/admin/blogs', label: 'Blogs' },
  { to: '/admin/faqs', label: 'FAQs' },
  { to: '/admin/resources', label: 'Resources' },
  { to: '/admin/media', label: 'Media' },
  { to: '/admin/appointments', label: 'Appointments' },
  { to: '/admin/contacts', label: 'Contacts' },
  { to: '/admin/newsletter', label: 'Newsletter' },
  { to: '/admin/visitors', label: 'Visitors' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const doLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-navy-900 text-cream transition-transform lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center px-6 font-serif text-xl font-bold"><span className="text-gold">&#9878;</span>&nbsp;Admin</div>
        <nav className="flex flex-col gap-0.5 overflow-y-auto px-3 pb-6" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm transition ${isActive ? 'bg-gold text-navy-900 font-semibold' : 'text-cream/80 hover:bg-navy-700'}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 sm:px-6">
          <button className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle sidebar">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm text-navy-700">{user?.username} · <span className="text-gold-dark">{user?.role?.replace('ROLE_', '')}</span></span>
            <button onClick={doLogout} className="btn-outline px-4 py-2 text-xs">Logout</button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
