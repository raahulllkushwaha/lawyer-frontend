import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { adminApi } from '../../lib/adminApi.js';
import PageHeader from '../../components/admin/PageHeader.jsx';
import DataTable from '../../components/admin/DataTable.jsx';
import Modal from '../../components/admin/Modal.jsx';
import ConfirmDelete from '../../components/admin/ConfirmDelete.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { BlogStatus, enumOptions } from '../../lib/enums.js';
import { formatDate } from '../../lib/format.js';

const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const toArr = (s) => (s ? s.split(',').map((x) => x.trim()).filter(Boolean) : []);
const toStr = (a) => (Array.isArray(a) ? a.join(', ') : a || '');
const STATUS_TONE = { PUBLISHED: 'green', DRAFT: 'slate', ARCHIVED: 'red' };

export default function BlogsAdmin() {
  const { data, isLoading, refetch } = useQuery({ queryKey: ['admin-blogs'], queryFn: () => adminApi.blogs.list() });
  const rows = Array.isArray(data) ? data : data?.content || [];
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [delTarget, setDelTarget] = useState(null);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState(false);
  const { register, handleSubmit, reset, watch, setValue, formState: { isSubmitting } } = useForm();

  const openCreate = () => { setEditing(null); reset({ status: 'DRAFT' }); setPreview(false); setOpen(true); };
  const openEdit = (r) => { setEditing(r); reset({ ...r, tags: toStr(r.tags) }); setPreview(false); setOpen(true); };

  const onSubmit = async (v) => {
    const payload = { ...v, slug: v.slug || slugify(v.title || ''), tags: toArr(v.tags) };
    try {
      if (editing) await adminApi.blogs.update(editing.id, payload);
      else await adminApi.blogs.create(payload);
      toast.success(editing ? 'Updated' : 'Created'); setOpen(false); refetch();
    } catch (err) { toast.error(err.message); }
  };
  const confirmDelete = async () => {
    setBusy(true);
    try { await adminApi.blogs.remove(delTarget.id); toast.success('Deleted'); setDelTarget(null); refetch(); }
    catch (err) { toast.error(err.message); } finally { setBusy(false); }
  };

  return (
    <>
      <PageHeader title="Blogs" subtitle="Legal insights and articles" action={<button onClick={openCreate} className="btn-primary px-4 py-2 text-sm">+ New Article</button>} />
      <DataTable
        isLoading={isLoading} rows={rows}
        columns={[
          { key: 'title', header: 'Title' },
          { key: 'status', header: 'Status', render: (r) => <Badge tone={STATUS_TONE[r.status] || 'slate'}>{r.status}</Badge> },
          { key: 'category', header: 'Category' },
          { key: 'viewCount', header: 'Views' },
          { key: 'publishedAt', header: 'Published', render: (r) => formatDate(r.publishedAt) },
          { key: '_a', header: 'Actions', render: (r) => (
            <div className="flex gap-2">
              <button onClick={() => openEdit(r)} className="text-xs font-semibold text-navy-700">Edit</button>
              <button onClick={() => setDelTarget(r)} className="text-xs font-semibold text-red-600">Delete</button>
            </div>
          ) },
        ]}
      />

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Article' : 'New Article'} wide>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="field-label">Title *</label>
            <input className="field-input" {...register('title', { required: true })}
              onBlur={(e) => { if (!watch('slug')) setValue('slug', slugify(e.target.value)); }} />
          </div>
          <div><label className="field-label">Slug</label><input className="field-input" {...register('slug')} placeholder="auto from title" /></div>
          <div><label className="field-label">Status</label><select className="field-input" {...register('status')}>{enumOptions(BlogStatus).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
          <div><label className="field-label">Category</label><input className="field-input" {...register('category')} /></div>
          <div><label className="field-label">Tags (comma separated)</label><input className="field-input" {...register('tags')} /></div>
          <div className="sm:col-span-2"><label className="field-label">Cover Image URL</label><input className="field-input" {...register('coverImageUrl')} /></div>
          <div className="sm:col-span-2"><label className="field-label">Excerpt</label><textarea rows={2} className="field-input" {...register('excerpt')} /></div>
          <div className="sm:col-span-2">
            <div className="flex items-center justify-between"><label className="field-label">Content *</label><button type="button" onClick={() => setPreview((p) => !p)} className="text-xs text-gold-dark">{preview ? 'Edit' : 'Preview'}</button></div>
            {preview ? <div className="min-h-[8rem] whitespace-pre-line rounded-lg border bg-slate-50 p-4 text-sm">{watch('content')}</div> : <textarea rows={8} className="field-input" {...register('content', { required: true })} />}
          </div>
          <details className="sm:col-span-2 rounded-lg border p-3">
            <summary className="cursor-pointer text-sm font-semibold text-navy-700">SEO settings</summary>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div><label className="field-label">SEO Title</label><input className="field-input" {...register('seoTitle')} /></div>
              <div><label className="field-label">Canonical URL</label><input className="field-input" {...register('canonicalUrl')} /></div>
              <div className="sm:col-span-2"><label className="field-label">SEO Description</label><textarea rows={2} className="field-input" {...register('seoDescription')} /></div>
              <div className="sm:col-span-2"><label className="field-label">SEO Keywords</label><input className="field-input" {...register('seoKeywords')} /></div>
            </div>
          </details>
          <div className="sm:col-span-2 flex justify-end gap-3"><button type="button" onClick={() => setOpen(false)} className="btn-outline px-4 py-2 text-sm">Cancel</button><button disabled={isSubmitting} className="btn-primary px-4 py-2 text-sm">Save</button></div>
        </form>
      </Modal>
      <ConfirmDelete open={!!delTarget} onClose={() => setDelTarget(null)} onConfirm={confirmDelete} busy={busy} label="this article" />
    </>
  );
}
