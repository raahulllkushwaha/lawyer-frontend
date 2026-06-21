import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { adminApi } from '../../lib/adminApi.js';
import PageHeader from '../../components/admin/PageHeader.jsx';
import DataTable from '../../components/admin/DataTable.jsx';
import Modal from '../../components/admin/Modal.jsx';
import ConfirmDelete from '../../components/admin/ConfirmDelete.jsx';
import { formatDate } from '../../lib/format.js';

export default function MediaAdmin() {
  const { data, isLoading, refetch } = useQuery({ queryKey: ['admin-media'], queryFn: adminApi.media.list });
  const rows = Array.isArray(data) ? data : data?.content || [];
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [delTarget, setDelTarget] = useState(null);
  const [busy, setBusy] = useState(false);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const openCreate = () => { setEditing(null); reset({}); setOpen(true); };
  const openEdit = (row) => { setEditing(row); reset(row); setOpen(true); };

  const onSubmit = async (v) => {
    const payload = { ...v, displayOrder: v.displayOrder ? Number(v.displayOrder) : null };
    try {
      if (editing) await adminApi.media.update(editing.id, payload);
      else await adminApi.media.create(payload);
      toast.success(editing ? 'Updated' : 'Added');
      setOpen(false);
      refetch();
    } catch (err) { toast.error(err.message); }
  };
  const confirmDelete = async () => {
    setBusy(true);
    try { await adminApi.media.remove(delTarget.id); toast.success('Deleted'); setDelTarget(null); refetch(); }
    catch (err) { toast.error(err.message); } finally { setBusy(false); }
  };

  return (
    <>
      <PageHeader title="Media Mentions" subtitle="Press coverage and features" action={<button onClick={openCreate} className="btn-primary px-4 py-2 text-sm">+ Add New</button>} />
      <DataTable
        isLoading={isLoading} rows={rows}
        columns={[
          { key: 'title', header: 'Title' },
          { key: 'mediaOutlet', header: 'Outlet' },
          { key: 'mentionDate', header: 'Date', render: (r) => formatDate(r.mentionDate) },
          { key: '_a', header: 'Actions', render: (r) => (
            <div className="flex gap-2">
              <button onClick={() => openEdit(r)} className="text-xs font-semibold text-navy-700">Edit</button>
              <button onClick={() => setDelTarget(r)} className="text-xs font-semibold text-red-600">Delete</button>
            </div>
          ) },
        ]}
      />
      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Media Mention' : 'Add Media Mention'} wide>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
          <div><label className="field-label">Title *</label><input className="field-input" {...register('title', { required: true })} /></div>
          <div><label className="field-label">Media Outlet</label><input className="field-input" {...register('mediaOutlet')} /></div>
          <div><label className="field-label">Mention Date</label><input type="date" className="field-input" {...register('mentionDate')} /></div>
          <div><label className="field-label">Display Order</label><input type="number" className="field-input" {...register('displayOrder')} /></div>
          <div className="sm:col-span-2"><label className="field-label">Article URL</label><input className="field-input" {...register('articleUrl')} /></div>
          <div className="sm:col-span-2"><label className="field-label">Image URL</label><input className="field-input" {...register('imageUrl')} /></div>
          <div className="sm:col-span-2"><label className="field-label">Description</label><textarea rows={3} className="field-input" {...register('description')} /></div>
          <div className="sm:col-span-2 flex justify-end gap-3"><button type="button" onClick={() => setOpen(false)} className="btn-outline px-4 py-2 text-sm">Cancel</button><button disabled={isSubmitting} className="btn-primary px-4 py-2 text-sm">Save</button></div>
        </form>
      </Modal>
      <ConfirmDelete open={!!delTarget} onClose={() => setDelTarget(null)} onConfirm={confirmDelete} busy={busy} />
    </>
  );
}