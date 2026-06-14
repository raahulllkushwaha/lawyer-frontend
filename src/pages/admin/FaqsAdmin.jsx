import CrudManager from '../../components/admin/CrudManager.jsx';
import { adminApi } from '../../lib/adminApi.js';

const num = (v) => (v === '' || v == null ? null : Number(v));

export default function FaqsAdmin() {
  return (
    <CrudManager
      title="FAQs" queryKey="admin-faqs" api={adminApi.faqs}
      columns={[
        { key: 'question', header: 'Question' },
        { key: 'category', header: 'Category' },
        { key: 'active', header: 'Active', render: (r) => (r.active ? 'Yes' : 'No') },
      ]}
      fields={[
        { name: 'question', label: 'Question', required: true, full: true },
        { name: 'answer', label: 'Answer', type: 'textarea', required: true, full: true },
        { name: 'category', label: 'Category' },
        { name: 'displayOrder', label: 'Display Order', type: 'number' },
        { name: 'active', label: 'Active', type: 'checkbox', checkboxLabel: 'Visible on site' },
      ]}
      toForm={(r) => ({ ...r, active: r.active ?? true })}
      toPayload={(v) => ({ ...v, active: !!v.active, displayOrder: num(v.displayOrder) })}
    />
  );
}
