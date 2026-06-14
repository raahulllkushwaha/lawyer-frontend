import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout.jsx';
import Home from './pages/public/Home.jsx';
import About from './pages/public/About.jsx';
import PracticeAreas from './pages/public/PracticeAreas.jsx';
import Achievements from './pages/public/Achievements.jsx';
import CaseResults from './pages/public/CaseResults.jsx';
import Testimonials from './pages/public/Testimonials.jsx';
import Blog from './pages/public/Blog.jsx';
import BlogDetail from './pages/public/BlogDetail.jsx';
import Faq from './pages/public/Faq.jsx';
import Contact from './pages/public/Contact.jsx';
import Appointment from './pages/public/Appointment.jsx';
import Resources from './pages/public/Resources.jsx';
import Media from './pages/public/Media.jsx';

import RequireAuth from './components/admin/RequireAuth.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import ProfileAdmin from './pages/admin/ProfileAdmin.jsx';
import EducationAdmin from './pages/admin/EducationAdmin.jsx';
import ExperienceAdmin from './pages/admin/ExperienceAdmin.jsx';
import PracticeAreasAdmin from './pages/admin/PracticeAreasAdmin.jsx';
import AchievementsAdmin from './pages/admin/AchievementsAdmin.jsx';
import CaseResultsAdmin from './pages/admin/CaseResultsAdmin.jsx';
import TestimonialsAdmin from './pages/admin/TestimonialsAdmin.jsx';
import BlogsAdmin from './pages/admin/BlogsAdmin.jsx';
import FaqsAdmin from './pages/admin/FaqsAdmin.jsx';
import ResourcesAdmin from './pages/admin/ResourcesAdmin.jsx';
import MediaAdmin from './pages/admin/MediaAdmin.jsx';
import AppointmentsAdmin from './pages/admin/AppointmentsAdmin.jsx';
import ContactsAdmin from './pages/admin/ContactsAdmin.jsx';
import NewsletterAdmin from './pages/admin/NewsletterAdmin.jsx';
import VisitorsAdmin from './pages/admin/VisitorsAdmin.jsx';

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/practice-areas" element={<PracticeAreas />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/case-results" element={<CaseResults />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/media" element={<Media />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment" element={<Appointment />} />
      </Route>

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ProfileAdmin />} />
        <Route path="education" element={<EducationAdmin />} />
        <Route path="experience" element={<ExperienceAdmin />} />
        <Route path="practice-areas" element={<PracticeAreasAdmin />} />
        <Route path="achievements" element={<AchievementsAdmin />} />
        <Route path="case-results" element={<CaseResultsAdmin />} />
        <Route path="testimonials" element={<TestimonialsAdmin />} />
        <Route path="blogs" element={<BlogsAdmin />} />
        <Route path="faqs" element={<FaqsAdmin />} />
        <Route path="resources" element={<ResourcesAdmin />} />
        <Route path="media" element={<MediaAdmin />} />
        <Route path="appointments" element={<AppointmentsAdmin />} />
        <Route path="contacts" element={<ContactsAdmin />} />
        <Route path="newsletter" element={<NewsletterAdmin />} />
        <Route path="visitors" element={<VisitorsAdmin />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
