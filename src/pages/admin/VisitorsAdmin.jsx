import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../lib/adminApi.js';
import PageHeader from '../../components/admin/PageHeader.jsx';
import DataTable from '../../components/admin/DataTable.jsx';
import { formatDate } from '../../lib/format.js';

export default function VisitorsAdmin() {
  const { data, isLoading } = useQuery({ queryKey: ['admin-visitors'], queryFn: () => adminApi.visitors.list() });
  const rows = Array.isArray(data) ? data : data?.content || [];
  return (
    <>
      <PageHeader title="Visitors" subtitle="Recent site traffic" />
      <DataTable
        isLoading={isLoading} rows={rows}
        columns={[
          { key: 'ipAddress', header: 'IP' },
          { key: 'location', header: 'Location', render: (r) => [r.city, r.state, r.country].filter(Boolean).join(', ') },
          { key: 'browser', header: 'Browser' },
          { key: 'os', header: 'OS' },
          { key: 'device', header: 'Device' },
          { key: 'visitedPage', header: 'Page' },
          { key: 'visitedAt', header: 'Visited', render: (r) => formatDate(r.visitedAt) },
        ]}
      />
    </>
  );
}
