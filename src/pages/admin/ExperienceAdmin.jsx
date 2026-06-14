import CrudManager from '../../components/admin/CrudManager.jsx';
import { adminApi } from '../../lib/adminApi.js';
import { formatDate } from '../../lib/format.js';

const num = (v) => (v === '' || v == null ? null : Number(v));

export default function ExperienceAdmin() {
  return (
    <CrudManager
      title="Experience" queryKey="admin-experience" api={adminApi.experience}
      columns={[
        { key: 'title', header: 'Title' },
        { key: 'organization', header: 'Organization' },
        { key: 'period', header: 'Period', render: (r) => `${formatDate(r.startDate)} – ${r.current ? 'Present' : formatDate(r.endDate)}` },
      ]}
      fields={[
        { name: 'title', label: 'Title', required: true },
        { name: 'organization', label: 'Organization', required: true },
        { name: 'startDate', label: 'Start Date', type: 'date' },
        { name: 'endDate', label: 'End Date', type: 'date' },
        { name: 'current', label: 'Currently Working', type: 'checkbox', checkboxLabel: 'Yes, this is current' },
        { name: 'displayOrder', label: 'Display Order', type: 'number' },
        { name: 'description', label: 'Description', type: 'textarea', full: true },
      ]}
      toPayload={(v) => ({ ...v, current: !!v.current, displayOrder: num(v.displayOrder), endDate: v.current ? null : v.endDate || null, startDate: v.startDate || null })}
    />
  );
}
