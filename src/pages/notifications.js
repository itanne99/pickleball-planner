import Head from 'next/head';
import { useState } from 'react';
import { Card, ListGroup, Badge, Button, Tabs, Tab } from 'react-bootstrap';
import { FiBell, FiCalendar, FiCheck, FiMail, FiAward, FiSpeaker, FiUsers } from 'react-icons/fi';
import { mockNotifications } from '@/data/mock';
import SectionHeader from '@/components/SectionHeader';
import { formatDistanceToNow } from 'date-fns';

const typeIcons = {
  match_reminder: <FiCalendar />,
  scorecard_approved: <FiCheck />,
  team_invite: <FiUsers />,
  league_update: <FiAward />,
  dupr_change: <FiAward />,
  announcement: <FiSpeaker />,
};

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState(mockNotifications);

  const filtered = filter === 'all' ? notifications : notifications.filter(n => n.read === (filter === 'read'));

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <Head>
        <title>Notifications | Pickleball Planner</title>
        <meta name="description" content="View and manage your notifications." />
      </Head>

      <SectionHeader
        title="Notifications"
        subtitle={`${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`}
        action={
          unreadCount > 0 && (
            <Button variant="outline-primary" size="sm" onClick={markAllRead}>
              Mark All Read
            </Button>
          )
        }
      />

      <Tabs activeKey={filter} onSelect={setFilter} className="mb-4" variant="pills">
        <Tab eventKey="all" title={`All (${notifications.length})`} />
        <Tab eventKey="unread" title={`Unread (${unreadCount})`} />
        <Tab eventKey="read" title={`Read (${notifications.length - unreadCount})`} />
      </Tabs>

      <Card className="glass-panel border-0">
        <ListGroup variant="flush">
          {filtered.map(n => (
            <ListGroup.Item
              key={n.id}
              className={`bg-transparent border-bottom border-secondary ${!n.read ? 'bg-dark-subtle' : ''}`}
              onClick={() => markRead(n.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex gap-3 py-3">
                <div className="text-primary fs-4 mt-1">
                  {typeIcons[n.type] || <FiBell />}
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <strong>{n.title}</strong>
                      {!n.read && <Badge bg="primary" className="ms-2">New</Badge>}
                    </div>
                    <small className="text-muted">
                      {n.createdAt || n.timestamp ? formatDistanceToNow(new Date(n.createdAt || n.timestamp), { addSuffix: true }) : 'recent'}
                    </small>
                  </div>
                  <p className="text-muted mb-0 small mt-1">{n.message}</p>
                </div>
              </div>
            </ListGroup.Item>
          ))}
          {filtered.length === 0 && (
            <div className="text-center text-muted py-5">
              No notifications to display.
            </div>
          )}
        </ListGroup>
      </Card>
    </>
  );
}
