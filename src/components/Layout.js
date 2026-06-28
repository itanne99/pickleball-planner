import { useState } from 'react';
import { Navbar, Nav, Container, Dropdown, Badge } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiBell, FiCalendar, FiUsers, FiAward, FiSettings, FiBarChart2, FiUser, FiHome } from 'react-icons/fi';
import { mockNotifications, mockLeagues, mockDivisions } from '@/data/mock';

const navLinks = [
  { href: '/playerDashboard', label: 'Dashboard', icon: <FiHome /> },
  { href: '/players', label: 'Players', icon: <FiUsers /> },
  { href: '/team/dashboard', label: 'Teams', icon: <FiUsers /> },
  { href: '/schedule', label: 'Schedule', icon: <FiCalendar /> },
  { href: '/analytics', label: 'Analytics', icon: <FiBarChart2 /> },
  { href: '/captains-portal', label: 'Captains Portal', icon: <FiSettings /> },
  { href: '/orgAdmin', label: 'Org Admin', icon: <FiSettings /> },
];

export default function Layout({ children }) {
  const { pathname } = useRouter();
  const showNav = pathname !== '/';
  const notifications = mockNotifications.filter(n => !n.read);

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: '#fff' }}>
      {showNav && (
        <Navbar variant="dark" bg="dark" expand="lg" className="border-bottom border-secondary">
          <Container>
            <Navbar.Brand as={Link} href="/" className="fw-bold">
              <span className="text-primary">Pickleball</span> Planner
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar">
              <Nav className="me-auto">
                {navLinks.map(link => (
                  <Nav.Link
                    key={link.href}
                    as={Link}
                    href={link.href}
                    active={pathname === link.href || pathname.startsWith(link.href + '/')}
                  >
                    {link.label}
                  </Nav.Link>
                ))}
                <LeagueDropdown />
              </Nav>
              <Nav>
                <NotificationBell count={notifications.length} />
                <Nav.Link as={Link} href="/profile" className="d-flex align-items-center gap-1">
                  <FiUser /> Profile
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
      <main className="py-4">
        <Container>{children}</Container>
      </main>
    </div>
  );
}

function LeagueDropdown() {
  const [show, setShow] = useState(false);
  const [activeLeagueId, setActiveLeagueId] = useState(null);
  const { pathname } = useRouter();

  const handleToggle = (isOpen) => {
    setShow(isOpen);
    if (!isOpen) {
      setActiveLeagueId(null);
    }
  };

  return (
    <Dropdown show={show} onToggle={handleToggle}>
      <Dropdown.Toggle
        as={Nav.Link}
        className="d-flex align-items-center gap-1 cursor-pointer"
        id="league-dropdown"
        active={pathname === '/league' || pathname.startsWith('/league/')}
      >
        Leagues
      </Dropdown.Toggle>
      <Dropdown.Menu align="start" className="bg-dark border-secondary p-0" style={{ minWidth: '450px' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, padding: '8px 16px', borderRight: '1px solid #333' }}>
            <div className="small fw-bold text-subtle px-2 py-1" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>League</div>
            {mockLeagues.map(league => {
              const isActive = activeLeagueId === league.id;
              return (
                <Dropdown.Item
                  key={league.id}
                  as={Link}
                  href={`/league?leagueId=${league.id}`}
                  className="small py-1 px-2 rounded transition-colors"
                  onMouseEnter={() => setActiveLeagueId(league.id)}
                  style={{
                    backgroundColor: isActive ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
                    color: isActive ? '#00E5FF' : '#dce3f1',
                    display: 'block',
                    textDecoration: 'none'
                  }}
                >
                  {league.name}
                </Dropdown.Item>
              );
            })}
          </div>
          <div style={{ flex: 1, padding: '8px 16px' }}>
            <div className="small fw-bold text-subtle px-2 py-1" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Division</div>
            {activeLeagueId ? (
              mockDivisions
                .filter(division => division.leagueId === activeLeagueId)
                .map(division => (
                  <Dropdown.Item
                    key={division.id}
                    as={Link}
                    href={`/league?leagueId=${activeLeagueId}`}
                    className="small py-1 px-2 rounded"
                    style={{
                      color: '#bac9cc',
                      display: 'block',
                      textDecoration: 'none'
                    }}
                  >
                    {division.name}
                  </Dropdown.Item>
                ))
            ) : (
              <div className="small px-2 py-1 text-subtle" style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: 0.6 }}>
                Hover league to view
              </div>
            )}
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

function NotificationBell({ count }) {
  const [show, setShow] = useState(false);
  const notifications = mockNotifications.slice(0, 5);

  return (
    <Dropdown show={show} onToggle={(isOpen) => setShow(isOpen)}>
      <Dropdown.Toggle as="div" className="nav-link d-flex align-items-center gap-1 cursor-pointer" id="notification-dropdown">
        <FiBell />
        {count > 0 && (
          <Badge pill bg="danger" className="position-absolute translate-middle" style={{ fontSize: '0.6rem' }}>
            {count}
          </Badge>
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu align="end" className="bg-dark border-secondary" style={{ width: '320px' }}>
        <Dropdown.Header className="d-flex justify-content-between align-items-center">
          <strong style={{ color: '#dce3f1' }}>Notifications</strong>
          <Link href="/notifications" className="small text-primary text-decoration-none">View All</Link>
        </Dropdown.Header>
        {notifications.map(n => (
          <Dropdown.Item key={n.id} as={Link} href="/notifications" className="text-wrap py-2">
            <div className="fw-semibold small" style={{ color: '#dce3f1' }}>{n.title || n.type}</div>
            <div className="small text-subtle text-truncate" style={{ maxWidth: '260px' }}>{n.message}</div>
          </Dropdown.Item>
        ))}
        {notifications.length === 0 && (
          <div className="text-center text-subtle py-3 small">No notifications</div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
