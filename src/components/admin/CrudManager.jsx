import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import PageHeader from './PageHeader.jsx';
import DataTable from './DataTable.jsx';
import Modal from './Modal.jsx';
import ConfirmDelete from './ConfirmDelete.jsx';

/**
 * Reusable CRUD screen.
 * @param title, subtitle
 * @param queryKey, api {list,create,update,remove}
 * @param columns  DataTable columns
 * @param fields   [{name,label,type,options,required,full,transform}]
 * @param toForm   map record -> form defaults (optional)
 * @param toPayload map form values -> request body (optional)
 */
export default function CrudManager({ title, subtitle, queryKey, api, columns, fields, toForm, toPayload }) {
  const { data, isLoading, refetch } = useQuery({ queryKey: [queryKey], queryFn: () => api.list() });
  const rows = Array.isArray(data) ? data : data?.content || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [delTarget, setDelTarget] = useState(null);
  const [busy, setBusy] = useState(false);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const openCreate = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (row) => { setEditing(row); reset(toForm ? toForm(row) : row); setModalOpen(true); };

  const onSubmit = async (values) => {
    const payload = toPayload ? toPayload(values) : values;
    try {
      if (editing) await api.update(editing.id, payload);
      else await api.create(payload);
      toast.success(editing ? 'Updated' : 'Created');
      setModalOpen(false);
      refetch();
    } catch (err) { toast.error(err.message); }
  };

  const confirmDelete = async () => {
    setBusy(true);
    try {
      await api.remove(delTarget.id);
      toast.success('Deleted');
      setDelTarget(null);
      refetch();
    } catch (err) { toast.error(err.message); } finally { setBusy(false); }
  };

  const cols = [
    ...columns,
    {
      key: '_actions', header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(row)} className="text-xs font-semibold text-navy-700 hover:text-gold-dark">Edit</button>
          <button onClick={() => setDelTarget(row)} className="text-xs font-semibold text-red-600 hover:text-red-700">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} action={<button onClick={openCreate} className="btn-primary px-4 py-2 text-sm">+ Add New</button>} />
      <DataTable columns={cols} rows={rows} isLoading={isLoading} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={`${editing ? 'Edit' : 'Add'} ${title}`} wide>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.name} className={f.full ? 'sm:col-span-2' : ''}>
              <label className="field-label">{f.label}{f.required && ' *'}</label>
              {f.type === 'textarea' ? (
                <textarea rows={f.rows || 3} className="field-input" {...register(f.name, { required: f.required })} />
              ) : f.type === 'select' ? (
                <select className="field-input" {...register(f.name, { required: f.required })}>
                  <option value="">Select…</option>
                  {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : f.type === 'checkbox' ? (
                <label className="flex items-center gap-2 pt-2"><input type="checkbox" {...register(f.name)} /> <span className="text-sm text-navy-700">{f.checkboxLabel || 'Yes'}</span></label>
              ) : (
                <input type={f.type || 'text'} className="field-input" {...register(f.name, { required: f.required })} />
              )}
            </div>
          ))}
          <div className="sm:col-span-2 mt-2 flex justify-end gap-3">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline px-4 py-2 text-sm">Cancel</button>
            <button disabled={isSubmitting} className="btn-primary px-4 py-2 text-sm">{isSubmitting ? 'Saving…' : 'Save'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDelete open={!!delTarget} onClose={() => setDelTarget(null)} onConfirm={confirmDelete} busy={busy} />
    </>
  );
}
