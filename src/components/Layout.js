import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const { pathname } = useRouter();
  const showNav = pathname !== '/';

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: '#fff' }}>
      {showNav && (
        <Navbar variant="dark" bg="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/" as={Link}>Pickleball Planner</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/playerDashboard" as={Link}>Dashboard</Nav.Link>
                <Nav.Link href="/team/dashboard" as={Link}>Team Dashboard</Nav.Link>
                <Nav.Link href="/admin" as={Link}>Admin</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
      <main>
        {children}
      </main>
    </div>
  );
}
