import React from 'react';
import Head from 'next/head';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { mockUser, mockSchedule } from '@/data/mock';
import Card from '@/components/Card';
import Pill from '@/components/Pill';
import Avatar from '@/components/Avatar';

export default function PlayerDashboard() {
  return (
    <>
      <Head>
        <title>Pickleball Planner | Dashboard</title>
      </Head>
      <Container className="py-5">
        <Row className="mb-5 align-items-center">
          <Col md={8}>
            <h1 className="fw-bold mb-3" style={{ color: 'var(--bs-primary)' }}>
              Welcome back, {mockUser.name}
            </h1>
            <p className="fs-5 text-muted">
              Ready to hit the courts? Check out your upcoming matches.
            </p>
            <Button variant="primary" className="mt-3 rounded-pill px-4 py-2 neon-glow-primary fw-bold text-dark">
              Find a Match
            </Button>
          </Col>
          <Col md={4} className="text-md-end text-center mt-4 mt-md-0">
            <Avatar initials={mockUser.name.charAt(0)} size={120} className="neon-glow-primary" />
          </Col>
        </Row>

        <h3 className="mb-4 fw-bold">Upcoming Schedules</h3>
        <Row>
          {mockSchedule.map((match) => (
            <Col md={6} lg={4} key={match.id} className="mb-4">
              <Card className="h-100 p-4 glass-panel">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Pill variant="primary">{match.date}</Pill>
                  <span className="text-muted small">{match.time}</span>
                </div>
                <h5 className="mb-2 fw-bold text-white">{match.opponent}</h5>
                <p className="mb-0 text-muted d-flex align-items-center">
                  <span className="me-2">📍</span> {match.location}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
