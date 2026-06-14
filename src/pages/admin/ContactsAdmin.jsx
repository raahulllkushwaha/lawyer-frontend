import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { adminApi } from '../../lib/adminApi.js';
import PageHeader from '../../components/admin/PageHeader.jsx';
import DataTable from '../../components/admin/DataTable.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { ContactStatus, enumOptions, enumLabel } from '../../lib/enums.js';
import { formatDate } from '../../lib/format.js';

const TONE = { NEW: 'gold', VIEWED: 'navy', CONTACTED: 'green', CONSULTATION_BOOKED: 'green', CLOSED: 'slate' };

export default function ContactsAdmin() {
  const { data, isLoading, refetch } = useQuery({ queryKey: ['admin-contacts'], queryFn: () => adminApi.contacts.list() });
  const rows = Array.isArray(data) ? data : data?.content || [];

  const update = async (id, status) => {
    try { await adminApi.contacts.setStatus(id, status); toast.success('Status updated'); refetch(); }
    catch (err) { toast.error(err.message); }
  };

  return (
    <>
      <PageHeader title="Contact Messages" subtitle="Enquiries from the contact form" />
      <DataTable
        isLoading={isLoading} rows={rows}
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
          { key: 'phone', header: 'Phone' },
          { key: 'message', header: 'Message', render: (r) => <span className="line-clamp-2 max-w-xs">{r.message}</span> },
          { key: 'createdAt', header: 'Received', render: (r) => formatDate(r.createdAt) },
          { key: 'status', header: 'Status', render: (r) => <Badge tone={TONE[r.status] || 'slate'}>{r.status ? enumLabel(r.status) : ''}</Badge> },
          { key: '_a', header: 'Set Status', render: (r) => (
            <select defaultValue={r.status} onChange={(e) => update(r.id, e.target.value)} className="rounded border px-2 py-1 text-xs">
              {enumOptions(ContactStatus).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          ) },
        ]}
      />
    </>
  );
}
