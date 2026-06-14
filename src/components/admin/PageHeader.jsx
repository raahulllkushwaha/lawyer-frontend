export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="heading-serif text-2xl">{title}</h1>
        {subtitle && <p className="text-sm text-navy-700/60">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
