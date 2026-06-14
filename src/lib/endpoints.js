// Central registry of every backend route the frontend uses.
// Paths are relative to the axios baseURL (`${VITE_API_BASE_URL}/api`).
// Verified against the Spring Boot controllers in src/main/java/.../controller/.

export const ENDPOINTS = {
  // Auth
  login: '/auth/login',
  refresh: '/auth/refresh',

  // Public GET
  home: '/home',
  about: '/about',
  education: '/education',
  experience: '/experience',
  practiceAreas: '/practice-areas',
  achievements: '/achievements',
  testimonials: '/testimonials',
  blogs: '/blogs',
  blogBySlug: (slug) => `/blogs/${slug}`,
  faqs: '/faqs',
  caseResults: '/case-results',
  resources: '/resources',
  media: '/media',

  // Public POST
  contact: '/contact',
  appointments: '/appointments',
  newsletter: '/newsletter',
  submitTestimonial: '/testimonials',

  // Admin (base paths; CRUD verbs/ids appended by the api modules in Batch 3)
  admin: {
    profile: '/admin/profile',
    education: '/admin/education',
    experience: '/admin/experience',
    practiceAreas: '/admin/practice-areas',
    achievements: '/admin/achievements',
    testimonials: '/admin/testimonials',
    blogs: '/admin/blogs',
    faqs: '/admin/faqs',
    caseResults: '/admin/case-results',
    resources: '/admin/resources',
    media: '/admin/media',
    appointments: '/admin/appointments',
    contacts: '/admin/contacts',
    newsletter: '/admin/newsletter',
    analytics: '/admin/analytics',
    visitors: '/admin/visitors',
  },
};

export default ENDPOINTS;
