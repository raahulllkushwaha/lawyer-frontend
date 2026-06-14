import Modal from './Modal.jsx';

export default function ConfirmDelete({ open, onClose, onConfirm, busy, label = 'this item' }) {
  return (
    <Modal open={open} onClose={onClose} title="Confirm delete">
      <p className="text-sm text-navy-700">Are you sure you want to delete {label}? This cannot be undone.</p>
      <div className="mt-6 flex justify-end gap-3">
        <button onClick={onClose} className="btn-outline px-4 py-2 text-sm">Cancel</button>
        <button onClick={onConfirm} disabled={busy} className="btn px-4 py-2 text-sm bg-red-600 text-white hover:bg-red-700">
          {busy ? 'Deleting…' : 'Delete'}
        </button>
      </div>
    </Modal>
  );
}
