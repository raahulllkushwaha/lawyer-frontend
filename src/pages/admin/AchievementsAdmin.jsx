import CrudManager from '../../components/admin/CrudManager.jsx';
import { adminApi } from '../../lib/adminApi.js';
import { AchievementType, enumOptions, enumLabel } from '../../lib/enums.js';

const num = (v) => (v === '' || v == null ? null : Number(v));

export default function AchievementsAdmin() {
  return (
    <CrudManager
      title="Achievements" queryKey="admin-achievements" api={adminApi.achievements}
      columns={[
        { key: 'title', header: 'Title' },
        { key: 'type', header: 'Type', render: (r) => (r.type ? enumLabel(r.type) : '') },
        { key: 'awardedBy', header: 'Awarded By' },
      ]}
      fields={[
        { name: 'title', label: 'Title', required: true },
        { name: 'type', label: 'Type', type: 'select', options: enumOptions(AchievementType), required: true },
        { name: 'awardedBy', label: 'Awarded By' },
        { name: 'achievementDate', label: 'Date', type: 'date' },
        { name: 'imageUrl', label: 'Image URL' },
        { name: 'displayOrder', label: 'Display Order', type: 'number' },
        { name: 'description', label: 'Description', type: 'textarea', full: true },
      ]}
      toPayload={(v) => ({ ...v, displayOrder: num(v.displayOrder), achievementDate: v.achievementDate || null })}
    />
  );
}
