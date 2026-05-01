import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: '#fff' }}>
      <Navbar variant="dark" bg="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/" as={Link}>Pickleball Planner</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" as={Link}>Home</Nav.Link>
              <Nav.Link href="/team/dashboard" as={Link}>Team Dashboard</Nav.Link>
              <Nav.Link href="/admin" as={Link}>Admin</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className="p-4">
        {children}
      </main>
    </div>
  );
}
