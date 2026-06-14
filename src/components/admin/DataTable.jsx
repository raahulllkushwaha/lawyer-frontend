import Loader from '../ui/Loader.jsx';
import EmptyState from '../ui/EmptyState.jsx';

export default function DataTable({ columns, rows, isLoading, empty = 'No records yet.' }) {
  if (isLoading) return <Loader />;
  if (!rows?.length) return <EmptyState message={empty} />;
  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-navy-700/60">
          <tr>
            {columns.map((c) => <th key={c.key} className="px-4 py-3 font-semibold">{c.header}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, i) => (
            <tr key={row.id ?? i} className="hover:bg-slate-50">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 align-middle text-navy-800">
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
