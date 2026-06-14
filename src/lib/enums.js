// Mirrors enums/Enums.java. Used for admin dropdowns and public labels.

const toLabel = (v) =>
  v
    .toLowerCase()
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

export const ContactStatus = ['NEW', 'VIEWED', 'CONTACTED', 'CONSULTATION_BOOKED', 'CLOSED'];
export const AppointmentStatus = ['PENDING', 'CONFIRMED', 'RESCHEDULED', 'CANCELLED', 'COMPLETED'];
export const BlogStatus = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];
export const AchievementType = ['LANDMARK_CASE', 'AWARD', 'PUBLICATION', 'CERTIFICATION', 'MEDIA_FEATURE'];
export const ResourceType = ['TEMPLATE', 'GUIDE', 'CHECKLIST', 'FORM', 'EBOOK'];
export const TestimonialStatus = ['PENDING', 'APPROVED', 'REJECTED'];
export const CaseResultOutcome = ['WON', 'SETTLED', 'ACQUITTAL', 'BAIL_GRANTED', 'FAVORABLE_ORDER'];
export const UserRole = ['ROLE_ADMIN', 'ROLE_EDITOR'];

export const enumLabel = toLabel;

export const enumOptions = (values) => values.map((v) => ({ value: v, label: toLabel(v) }));
