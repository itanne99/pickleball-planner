import { Card } from 'react-bootstrap';

export default function StatCard({ title, value, icon, subtitle, trend }) {
  const trendColor = trend?.startsWith('+') ? 'text-success' : (trend?.startsWith('-') ? 'text-danger' : '');

  return (
    <Card className="glass-panel border-0 h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <Card.Text className="text-subtle mb-1 small text-uppercase">{title}</Card.Text>
            <h3 className="mb-0 fw-bold" style={{ color: '#dce3f1' }}>{value}</h3>
            {subtitle && <Card.Text className="text-subtle mt-1 mb-0 small">{subtitle}</Card.Text>}
          </div>
          {icon && <div className="fs-2" style={{ color: '#00E5FF' }}>{icon}</div>}
        </div>
        {trend && (
          <div className={`mt-2 small ${trendColor}`}>
            {trend}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
