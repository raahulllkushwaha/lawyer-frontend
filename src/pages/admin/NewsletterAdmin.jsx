import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../lib/adminApi.js';
import PageHeader from '../../components/admin/PageHeader.jsx';
import DataTable from '../../components/admin/DataTable.jsx';
import { formatDate } from '../../lib/format.js';

function exportCsv(rows) {
  const header = ['Email', 'Name', 'Subscribed At'];
  const lines = rows.map((r) => [r.email, r.name || '', r.createdAt || r.subscribedAt || ''].map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','));
  const blob = new Blob([[header.join(','), ...lines].join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'newsletter-subscribers.csv'; a.click();
  URL.revokeObjectURL(url);
}

export default function NewsletterAdmin() {
  const { data, isLoading } = useQuery({ queryKey: ['admin-newsletter'], queryFn: adminApi.newsletter.list });
  const rows = Array.isArray(data) ? data : data?.content || [];
  return (
    <>
      <PageHeader title="Newsletter" subtitle={`${rows.length} subscriber(s)`} action={<button onClick={() => exportCsv(rows)} className="btn-outline px-4 py-2 text-sm" disabled={!rows.length}>Export CSV</button>} />
      <DataTable
        isLoading={isLoading} rows={rows}
        columns={[
          { key: 'email', header: 'Email' },
          { key: 'name', header: 'Name' },
          { key: 'createdAt', header: 'Subscribed', render: (r) => formatDate(r.createdAt || r.subscribedAt) },
        ]}
      />
    </>
  );
}
