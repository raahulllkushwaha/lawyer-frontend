# Lawyer Portfolio – Frontend

React (JavaScript) frontend for the `lawyer-portfolio-backend` Spring Boot API. Built with
**Vite + React 18, Tailwind CSS, Framer Motion, GSAP (ScrollTrigger), Lenis, React Three Fiber +
Drei, React Router, React Query, axios, react-hook-form, react-hot-toast, recharts**.

## Status

Delivered in batches via merge request:

- [x] **Batch 1** – Project scaffold, Tailwind legal theme, central API layer (`lib/api.js`,
      `lib/endpoints.js`, `lib/enums.js`), JWT auth context with refresh handling.
- [x] **Batch 2** – Public site (Navbar, Footer, animated Home + R3F hero, About, Practice Areas,
      Achievements, Case Results, Testimonials, Blog, Resources, Media, FAQ, Contact, Appointment).
- [x] **Batch 3** – Advanced admin panel (`/admin/login`, dashboard analytics with recharts, and
      full CRUD for Profile, Education, Experience, Practice Areas, Achievements, Case Results,
      Testimonials (approve/reject), Blogs (editor + preview + SEO), FAQs, Resources, Media, plus
      Appointments & Contacts inboxes with status workflow, Newsletter (CSV export) and Visitors).

## Admin access

Visit `/admin/login` and sign in with the backend admin credentials (seeded by `DataInitializer`).
Status-update calls assume `PATCH /api/admin/{entity}/{id}/status` with body `{status, adminNotes}`
(mirroring `StatusUpdateRequest`); if your controllers differ, adjust `src/lib/adminApi.js` in one place.

## Run locally

```bash
cd frontend
cp .env.example .env       # set VITE_API_BASE_URL to your backend (default http://localhost:8080)
npm install
npm run dev                # http://localhost:5173
```

## Build & zip for delivery

```bash
npm run build              # outputs static files to frontend/dist/
```

Then zip the `dist/` folder (e.g. `cd frontend && zip -r lawyer-portfolio-frontend.zip dist`).
The app is a static SPA and can be served by any static host or behind the backend.

## Backend contract notes

- Every API response is wrapped as `{ success, message, data }`; the axios layer auto-unwraps `data`.
- Auth: `POST /api/auth/login` and `POST /api/auth/refresh`. Tokens stored in `localStorage`.
- Admin routes live under `/api/admin/**` and require role `ROLE_ADMIN` or `ROLE_EDITOR`.
- Image fields (`profileImageUrl`, `coverImageUrl`, `imageUrl`, `fileUrl`) are **URLs** – the backend
  has no binary upload endpoint, so the admin panel accepts image/file URLs.
- CORS on the backend is restricted to `app.frontend-url`; set that to this app's origin.
# lawyer-frontend
