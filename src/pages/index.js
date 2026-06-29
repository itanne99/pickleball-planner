import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FiCalendar, FiUsers, FiBarChart2, FiSettings } from 'react-icons/fi';

const features = [
  {
    icon: <FiCalendar className="fs-2 text-primary mb-3 d-block" />,
    title: 'Smart Scheduling',
    description: 'Find matches, book courts, and coordinate with your team. Never miss a game with intelligent conflict detection.',
  },
  {
    icon: <FiUsers className="fs-2 text-primary mb-3 d-block" />,
    title: 'Team Management',
    description: 'Build rosters, assign roles, and keep everyone in sync. From casual squads to competitive leagues.',
  },
  {
    icon: <FiBarChart2 className="fs-2 text-primary mb-3 d-block" />,
    title: 'Scorecards & Stats',
    description: 'Track every point, every game, every match. Detailed analytics to find your edge and measure progress.',
  },
  {
    icon: <FiSettings className="fs-2 text-primary mb-3 d-block" />,
    title: 'Admin Tools',
    description: 'Full league configuration, role-based permissions, and oversight dashboards for organizers.',
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Pickleball Planner | Your Game. Your Team. Your Edge.</title>
        <meta name="description" content="The all-in-one platform for competitive pickleball. Schedule matches, manage teams, track stats, and dominate the court." />
      </Head>

      {/* Navbar */}
      <nav className="marketing-nav">
        <Container className="d-flex justify-content-between align-items-center py-3">
          <span className="fw-bold fs-4" style={{ color: 'var(--bs-primary)' }}>
            Pickleball Planner
          </span>
          <Link href="/playerDashboard" passHref legacyBehavior>
            <Button
              variant="primary"
              className="rounded-pill px-4 py-2 neon-glow-primary fw-bold text-dark"
            >
              Dashboard
            </Button>
          </Link>
        </Container>
      </nav>

      {/* Hero */}
      <section className="hero-gradient" style={{ paddingTop: '160px', paddingBottom: '80px' }}>
        <Container fluid className="text-center">
          <h1 className="fw-bold mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            Your Game. Your Team.<br />
            <span className="text-gradient">Your Edge.</span>
          </h1>
          <p className="fs-5 mx-auto mb-5" style={{ maxWidth: '640px', color: 'var(--bs-body-color)' }}>
            The all-in-one platform for competitive pickleball. Schedule matches, manage teams, track stats, and dominate the court.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link href="/playerDashboard" passHref legacyBehavior>
              <Button variant="primary" size="lg" className="rounded-pill px-5 py-3 neon-glow-primary fw-bold text-dark">
                Go to Dashboard
              </Button>
            </Link>
            <Button
              variant="outline-neon"
              size="lg"
              className="rounded-pill px-5 py-3 fw-bold"
              onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Features
            </Button>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '80px 0' }}>
        <Container>
          <h2 className="text-center fw-bold mb-5" style={{ fontSize: '2.5rem' }}>
            Everything You Need on the Court
          </h2>
          <Row>
            {features.map((feature) => (
              <Col md={6} lg={3} key={feature.title} className="mb-4">
                <div className="feature-card p-4 h-100">
                  {feature.icon}
                  <h5 className="fw-bold mb-2" style={{ color: 'var(--bs-primary)' }}>{feature.title}</h5>
                  <p className="mb-0" style={{ color: 'var(--bs-body-color)', opacity: 0.8 }}>{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Stats Bar */}
      <section style={{ padding: '48px 0', borderTop: '1px solid #1F222C', borderBottom: '1px solid #1F222C' }}>
        <Container fluid>
          <Row className="text-center">
            <Col>
              <div className="fw-bold" style={{ fontSize: '2rem', color: 'var(--bs-primary)' }}>500+</div>
              <div >Players</div>
            </Col>
            <Col>
              <div className="fw-bold" style={{ fontSize: '2rem', color: 'var(--bs-secondary)' }}>50+</div>
              <div >Teams</div>
            </Col>
            <Col>
              <div className="fw-bold" style={{ fontSize: '2rem', color: 'var(--bs-primary)' }}>2,000+</div>
              <div >Matches</div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="cta-section" style={{ padding: '80px 0' }}>
        <Container fluid className="text-center">
          <h2 className="fw-bold mb-4" style={{ fontSize: '2.5rem' }}>
            Ready to Elevate Your Game?
          </h2>
          <p className="fs-5 mx-auto mb-5" style={{ maxWidth: '500px', color: 'var(--bs-body-color)', opacity: 0.8 }}>
            Join players and teams already using Pickleball Planner to stay organized and competitive.
          </p>
          <Link href="/playerDashboard" passHref legacyBehavior>
            <Button variant="primary" size="lg" className="rounded-pill px-5 py-3 neon-glow-primary fw-bold text-dark">
              Go to Dashboard
            </Button>
          </Link>
        </Container>
      </section>
    </>
  );
}
