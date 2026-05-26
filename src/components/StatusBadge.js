import Pill from './Pill';

const variantMap = {
  active: { label: 'Active', variant: 'primary' },
  inactive: { label: 'Inactive', variant: 'secondary' },
  completed: { label: 'Completed', variant: 'primary' },
  scheduled: { label: 'Scheduled', variant: 'info' },
  pending: { label: 'Pending', variant: 'warning' },
  approved: { label: 'Approved', variant: 'primary' },
  rejected: { label: 'Rejected', variant: 'danger' },
  upcoming: { label: 'Upcoming', variant: 'info' },
  W: { label: 'Win', variant: 'primary' },
  L: { label: 'Loss', variant: 'secondary' },
};

export default function StatusBadge({ status, customLabel }) {
  const config = variantMap[status] || { label: status, variant: 'secondary' };
  return <Pill variant={config.variant}>{customLabel || config.label}</Pill>;
}
