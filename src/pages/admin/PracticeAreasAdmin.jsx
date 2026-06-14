import CrudManager from '../../components/admin/CrudManager.jsx';
import { adminApi } from '../../lib/adminApi.js';

const num = (v) => (v === '' || v == null ? null : Number(v));

export default function PracticeAreasAdmin() {
  return (
    <CrudManager
      title="Practice Areas" queryKey="admin-practice-areas" api={adminApi.practiceAreas}
      columns={[
        { key: 'title', header: 'Title' },
        { key: 'icon', header: 'Icon' },
        { key: 'displayOrder', header: 'Order' },
        { key: 'active', header: 'Active', render: (r) => (r.active ? 'Yes' : 'No') },
      ]}
      fields={[
        { name: 'title', label: 'Title', required: true },
        { name: 'icon', label: 'Icon (emoji or name)' },
        { name: 'displayOrder', label: 'Display Order', type: 'number' },
        { name: 'active', label: 'Active', type: 'checkbox', checkboxLabel: 'Visible on site' },
        { name: 'description', label: 'Description', type: 'textarea', full: true },
      ]}
      toForm={(r) => ({ ...r, active: r.active ?? true })}
      toPayload={(v) => ({ ...v, active: !!v.active, displayOrder: num(v.displayOrder) })}
    />
  );
}
