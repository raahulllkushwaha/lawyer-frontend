import CrudManager from '../../components/admin/CrudManager.jsx';
import { adminApi } from '../../lib/adminApi.js';
import { CaseResultOutcome, enumOptions, enumLabel } from '../../lib/enums.js';

const num = (v) => (v === '' || v == null ? null : Number(v));

export default function CaseResultsAdmin() {
  return (
    <CrudManager
      title="Case Results" queryKey="admin-case-results" api={adminApi.caseResults}
      columns={[
        { key: 'title', header: 'Title' },
        { key: 'outcome', header: 'Outcome', render: (r) => (r.outcome ? enumLabel(r.outcome) : '') },
        { key: 'caseYear', header: 'Year' },
      ]}
      fields={[
        { name: 'title', label: 'Title', required: true },
        { name: 'outcome', label: 'Outcome', type: 'select', options: enumOptions(CaseResultOutcome) },
        { name: 'courtName', label: 'Court Name' },
        { name: 'caseType', label: 'Case Type' },
        { name: 'caseYear', label: 'Case Year', type: 'number' },
        { name: 'displayOrder', label: 'Display Order', type: 'number' },
        { name: 'summary', label: 'Summary', type: 'textarea', full: true },
      ]}
      toPayload={(v) => ({ ...v, caseYear: num(v.caseYear), displayOrder: num(v.displayOrder) })}
    />
  );
}
