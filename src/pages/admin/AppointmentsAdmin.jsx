import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { adminApi } from '../../lib/adminApi.js';
import PageHeader from '../../components/admin/PageHeader.jsx';
import DataTable from '../../components/admin/DataTable.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { AppointmentStatus, enumOptions } from '../../lib/enums.js';
import { formatDate } from '../../lib/format.js';

const TONE = { PENDING: 'gold', CONFIRMED: 'green', RESCHEDULED: 'navy', CANCELLED: 'red', COMPLETED: 'slate' };

export default function AppointmentsAdmin() {
  const { data, isLoading, refetch } = useQuery({ queryKey: ['admin-appointments'], queryFn: () => adminApi.appointments.list() });
  const rows = Array.isArray(data) ? data : data?.content || [];

  const update = async (id, status) => {
    try { await adminApi.appointments.setStatus(id, status); toast.success('Status updated'); refetch(); }
    catch (err) { toast.error(err.message); }
  };

  return (
    <>
      <PageHeader title="Appointments" subtitle="Consultation requests" />
      <DataTable
        isLoading={isLoading} rows={rows}
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'phone', header: 'Phone' },
          { key: 'appointmentDate', header: 'Date', render: (r) => formatDate(r.appointmentDate) },
          { key: 'appointmentTime', header: 'Time' },
          { key: 'caseType', header: 'Case Type' },
          { key: 'status', header: 'Status', render: (r) => <Badge tone={TONE[r.status] || 'slate'}>{r.status}</Badge> },
          { key: '_a', header: 'Set Status', render: (r) => (
            <select defaultValue={r.status} onChange={(e) => update(r.id, e.target.value)} className="rounded border px-2 py-1 text-xs">
              {enumOptions(AppointmentStatus).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          ) },
        ]}
      />
    </>
  );
}
