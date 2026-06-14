import CrudManager from '../../components/admin/CrudManager.jsx';
import { adminApi } from '../../lib/adminApi.js';

const num = (v) => (v === '' || v == null ? null : Number(v));

export default function EducationAdmin() {
  return (
    <CrudManager
      title="Education" queryKey="admin-education" api={adminApi.education}
      columns={[
        { key: 'degree', header: 'Degree' },
        { key: 'institution', header: 'Institution' },
        { key: 'year', header: 'Year' },
        { key: 'displayOrder', header: 'Order' },
      ]}
      fields={[
        { name: 'degree', label: 'Degree', required: true },
        { name: 'institution', label: 'Institution', required: true },
        { name: 'year', label: 'Year', required: true },
        { name: 'displayOrder', label: 'Display Order', type: 'number' },
        { name: 'description', label: 'Description', type: 'textarea', full: true },
      ]}
      toPayload={(v) => ({ ...v, displayOrder: num(v.displayOrder) })}
    />
  );
}
