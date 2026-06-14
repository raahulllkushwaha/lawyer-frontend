import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { adminApi } from '../../lib/adminApi.js';
import PageHeader from '../../components/admin/PageHeader.jsx';
import Loader from '../../components/ui/Loader.jsx';
import ErrorState from '../../components/ui/ErrorState.jsx';

const COLORS = ['#c8a96a', '#0b1f3a', '#2f5896', '#a8884a', '#7b99c9'];

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-soft">
      <p className="text-xs uppercase tracking-wider text-navy-700/50">{label}</p>
      <p className="heading-serif mt-1 text-3xl text-navy-900">{value ?? 0}</p>
    </div>
  );
}

export default function Dashboard() {
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ['analytics'], queryFn: adminApi.analytics.get });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorState onRetry={refetch} />;

  const a = data || {};
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Overview of your portfolio performance" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Visitors" value={a.totalVisitors} />
        <StatCard label="Today's Visitors" value={a.todayVisitors} />
        <StatCard label="Unique Visitors" value={a.uniqueVisitors} />
        <StatCard label="Unique Today" value={a.uniqueVisitorsToday} />
        <StatCard label="Total Contacts" value={a.totalContacts} />
        <StatCard label="New Contacts" value={a.newContacts} />
        <StatCard label="Appointments" value={a.totalAppointments} />
        <StatCard label="Pending Appts" value={a.pendingAppointments} />
        <StatCard label="Subscribers" value={a.newsletterSubscribers} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {a.dailyVisitors?.length > 0 && (
          <div className="rounded-xl bg-white p-5 shadow-soft">
            <h3 className="mb-4 font-semibold text-navy-900">Daily Visitors</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={a.dailyVisitors}>
                <XAxis dataKey={Object.keys(a.dailyVisitors[0] || {})[0]} tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey={Object.keys(a.dailyVisitors[0] || {})[1]} stroke="#c8a96a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        {a.deviceStats?.length > 0 && (
          <div className="rounded-xl bg-white p-5 shadow-soft">
            <h3 className="mb-4 font-semibold text-navy-900">Devices</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={a.deviceStats} dataKey={Object.keys(a.deviceStats[0] || {})[1]} nameKey={Object.keys(a.deviceStats[0] || {})[0]} outerRadius={90} label>
                  {a.deviceStats.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
        {a.browserStats?.length > 0 && (
          <div className="rounded-xl bg-white p-5 shadow-soft">
            <h3 className="mb-4 font-semibold text-navy-900">Browsers</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={a.browserStats}>
                <XAxis dataKey={Object.keys(a.browserStats[0] || {})[0]} tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey={Object.keys(a.browserStats[0] || {})[1]} fill="#0b1f3a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        {a.topCountries?.length > 0 && (
          <div className="rounded-xl bg-white p-5 shadow-soft">
            <h3 className="mb-4 font-semibold text-navy-900">Top Countries</h3>
            <ul className="space-y-2 text-sm">
              {a.topCountries.map((c, i) => {
                const keys = Object.keys(c);
                return <li key={i} className="flex justify-between border-b border-slate-100 pb-1"><span>{c[keys[0]]}</span><span className="font-semibold">{c[keys[1]]}</span></li>;
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
