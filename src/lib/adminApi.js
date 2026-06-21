import api from './api.js';
import { ENDPOINTS } from './endpoints.js';

// Generic CRUD factory for admin entities that follow REST conventions:
// GET base (list), POST base (create), PUT base/{id} (update), DELETE base/{id}.
export function crud(base) {
  return {
    list: (params) => api.get(base, { params }),
    create: (body) => api.post(base, body),
    update: (id, body) => api.put(`${base}/${id}`, body),
    remove: (id) => api.delete(`${base}/${id}`),
  };
}

export const adminApi = {
  profile: {
    get: () => api.get(ENDPOINTS.admin.profile),
    update: (body) => api.put(ENDPOINTS.admin.profile, body),
  },
  education: crud(ENDPOINTS.admin.education),
  experience: crud(ENDPOINTS.admin.experience),
  practiceAreas: crud(ENDPOINTS.admin.practiceAreas),
  achievements: crud(ENDPOINTS.admin.achievements),
  caseResults: crud(ENDPOINTS.admin.caseResults),
  testimonials: {
    ...crud(ENDPOINTS.admin.testimonials),
    setStatus: (id, status, adminNotes) =>
      api.patch(`${ENDPOINTS.admin.testimonials}/${id}/status`, { status, adminNotes }),
  },
  blogs: crud(ENDPOINTS.admin.blogs),
  faqs: crud(ENDPOINTS.admin.faqs),
  resources: crud(ENDPOINTS.admin.resources),
media: {
    list: () => api.get(ENDPOINTS.admin.media),
    create: (body) => api.post(ENDPOINTS.admin.media, body),
    update: (id, body) => api.put(`${ENDPOINTS.admin.media}/${id}`, body),
    remove: (id) => api.delete(`${ENDPOINTS.admin.media}/${id}`),
},
  appointments: {
    list: (params) => api.get(ENDPOINTS.admin.appointments, { params }),
    setStatus: (id, status, adminNotes) =>
      api.patch(`${ENDPOINTS.admin.appointments}/${id}/status`, { status, adminNotes }),
  },
  contacts: {
    list: (params) => api.get(ENDPOINTS.admin.contacts, { params }),
    setStatus: (id, status, adminNotes) =>
      api.patch(`${ENDPOINTS.admin.contacts}/${id}/status`, { status, adminNotes }),
  },
  newsletter: { list: () => api.get(ENDPOINTS.admin.newsletter) },
  analytics: { get: () => api.get(ENDPOINTS.admin.analytics) },
  visitors: { list: (params) => api.get(ENDPOINTS.admin.visitors, { params }) },
};

// NOTE: status-update verb/path (PATCH .../{id}/status) and request body
// {status, adminNotes} mirror StatusUpdateRequest in Dto.java. If a controller
// uses a different verb/path, adjust here in one place.
