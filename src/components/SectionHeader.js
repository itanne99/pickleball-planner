export default function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 className="mb-1" style={{ color: '#dce3f1' }}>{title}</h2>
        {subtitle && <p className="text-subtle mb-0">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
