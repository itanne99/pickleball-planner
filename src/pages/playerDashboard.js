import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Row, Col } from 'react-bootstrap';
import { mockUser, mockSchedule } from '@/data/mock';
import Card from '@/components/Card';
import Pill from '@/components/Pill';
import Avatar from '@/components/Avatar';
import WinLossBadge from '@/components/WinLossBadge';
import { FiMapPin } from 'react-icons/fi';

export default function PlayerDashboard() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Pickleball Planner | Dashboard</title>
      </Head>
      <div className="py-2">
        {/* Hero Card */}
        <Card className="p-4 mb-5" variant="accent">
          <Row className="align-items-center">
            <Col md={8}>
              <h1 className="fw-bold mb-2" style={{ color: 'var(--bs-primary)' }}>
                Welcome back, {mockUser.name}
              </h1>
              <p className="mb-0 text-subtle">
                Ready to hit the courts? Check out your upcoming matches.
              </p>
            </Col>
            <Col md={4} className="text-md-end text-center mt-3 mt-md-0">
              <Avatar initials={mockUser.name.charAt(0)} size={100} className="neon-glow-primary" />
            </Col>
          </Row>
        </Card>

        {/* Quick Stats Row - uniform height matching upcoming card */}
        <Row className="mb-5 g-3">
          <Col md={4}>
            <Card className="p-4 text-center h-100 d-flex flex-column justify-content-center">
              <div className="section-label mb-2">Record</div>
              <WinLossBadge wins={mockUser.wins} losses={mockUser.losses} />
            </Card>
          </Col>
          <Col md={4}>
            <Card className="p-4 text-center h-100 d-flex flex-column justify-content-center">
              <div className="section-label mb-2">DUPR Rating</div>
              <div className="dupr-badge" style={{ fontSize: '1.5rem' }}>DUPR: {mockUser.dupr}</div>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="p-4 text-center h-100 d-flex flex-column justify-content-center">
              <div className="section-label mb-2">Upcoming</div>
              <div className="fw-bold" style={{ fontSize: '1.5rem', color: '#dce3f1' }}>{mockSchedule.length}</div>
              <div className="text-subtle small">matches</div>
            </Card>
          </Col>
        </Row>

        {/* Upcoming Schedules */}
        <h3 className="mb-4 fw-bold">Upcoming Schedules</h3>
        <Row>
          {mockSchedule.map((match) => (
            <Col md={6} lg={4} key={match.id} className="mb-4">
              <Card className="h-100 p-4 glass-panel" interactive onClick={() => router.push(`/scorecard/${match.id}`)}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Pill variant="primary">{match.date}</Pill>
                  <span className="text-subtle small">{match.time}</span>
                </div>
                <h5 className="mb-2 fw-bold" style={{ color: '#dce3f1' }}>{match.opponent}</h5>
                <p className="mb-0 text-subtle d-flex align-items-center gap-1">
                  <FiMapPin className="text-primary" /> {match.location}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
