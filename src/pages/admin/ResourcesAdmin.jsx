import CrudManager from '../../components/admin/CrudManager.jsx';
import { adminApi } from '../../lib/adminApi.js';
import { ResourceType, enumOptions, enumLabel } from '../../lib/enums.js';

const num = (v) => (v === '' || v == null ? null : Number(v));

export default function ResourcesAdmin() {
  return (
    <CrudManager
      title="Resources" queryKey="admin-resources" api={adminApi.resources}
      columns={[
        { key: 'title', header: 'Title' },
        { key: 'type', header: 'Type', render: (r) => (r.type ? enumLabel(r.type) : '') },
        { key: 'free', header: 'Free', render: (r) => (r.free ? 'Free' : 'Premium') },
      ]}
      fields={[
        { name: 'title', label: 'Title', required: true },
        { name: 'type', label: 'Type', type: 'select', options: enumOptions(ResourceType) },
        { name: 'fileUrl', label: 'File URL' },
        { name: 'fileSizeKb', label: 'File Size (KB)', type: 'number' },
        { name: 'free', label: 'Free', type: 'checkbox', checkboxLabel: 'Free download' },
        { name: 'description', label: 'Description', type: 'textarea', full: true },
      ]}
      toForm={(r) => ({ ...r, free: r.free ?? true })}
      toPayload={(v) => ({ ...v, free: !!v.free, fileSizeKb: num(v.fileSizeKb) })}
    />
  );
}
