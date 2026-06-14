import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { adminApi } from '../../lib/adminApi.js';
import PageHeader from '../../components/admin/PageHeader.jsx';
import DataTable from '../../components/admin/DataTable.jsx';
import ConfirmDelete from '../../components/admin/ConfirmDelete.jsx';
import Badge from '../../components/ui/Badge.jsx';

const TONE = { APPROVED: 'green', PENDING: 'gold', REJECTED: 'red' };

export default function TestimonialsAdmin() {
  const { data, isLoading, refetch } = useQuery({ queryKey: ['admin-testimonials'], queryFn: () => adminApi.testimonials.list() });
  const rows = Array.isArray(data) ? data : data?.content || [];
  const [delTarget, setDelTarget] = useState(null);
  const [busy, setBusy] = useState(false);

  const setStatus = async (id, status) => {
    try { await adminApi.testimonials.setStatus(id, status); toast.success(`Marked ${status}`); refetch(); }
    catch (err) { toast.error(err.message); }
  };
  const confirmDelete = async () => {
    setBusy(true);
    try { await adminApi.testimonials.remove(delTarget.id); toast.success('Deleted'); setDelTarget(null); refetch(); }
    catch (err) { toast.error(err.message); } finally { setBusy(false); }
  };

  return (
    <>
      <PageHeader title="Testimonials" subtitle="Approve or reject client submissions" />
      <DataTable
        isLoading={isLoading} rows={rows}
        columns={[
          { key: 'clientName', header: 'Client' },
          { key: 'rating', header: 'Rating', render: (r) => '★'.repeat(r.rating || 0) },
          { key: 'feedback', header: 'Feedback', render: (r) => <span className="line-clamp-2 max-w-xs">{r.feedback}</span> },
          { key: 'status', header: 'Status', render: (r) => <Badge tone={TONE[r.status] || 'slate'}>{r.status}</Badge> },
          { key: '_a', header: 'Actions', render: (r) => (
            <div className="flex gap-2">
              <button onClick={() => setStatus(r.id, 'APPROVED')} className="text-xs font-semibold text-emerald-600">Approve</button>
              <button onClick={() => setStatus(r.id, 'REJECTED')} className="text-xs font-semibold text-amber-600">Reject</button>
              <button onClick={() => setDelTarget(r)} className="text-xs font-semibold text-red-600">Delete</button>
            </div>
          ) },
        ]}
      />
      <ConfirmDelete open={!!delTarget} onClose={() => setDelTarget(null)} onConfirm={confirmDelete} busy={busy} />
    </>
  );
}
