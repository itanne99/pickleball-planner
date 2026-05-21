import React from 'react';
import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';
import { mockTeam } from '@/data/mock';
import Card from '@/components/Card';
import Pill from '@/components/Pill';
import Avatar from '@/components/Avatar';
import StatBar from '@/components/StatBar';

export default function TeamDashboard() {
  return (
    <>
      <Head>
        <title>Team Dashboard | Pickleball Planner</title>
      </Head>
      <Container className="py-5">
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h1 className="fw-bold mb-3" style={{ color: 'var(--bs-primary)' }}>
              {mockTeam.name}
            </h1>
            <p className=" mb-4">Team Dashboard and Roster</p>
            <StatBar label="Season Win Rate" value={75} max={100} variant="primary" className="mb-4 text-start" />
            <StatBar label="Team Chemistry" value={92} max={100} variant="secondary" className="text-start" />
          </Col>
        </Row>

        <h3 className="mb-4 fw-bold">Active Roster</h3>
        <Row>
          {mockTeam.members.map((member) => (
            <Col md={6} lg={4} key={member.id} className="mb-4">
              <Card className="h-100 p-4 d-flex flex-column align-items-center text-center glass-panel">
                <Avatar 
                  initials={member.name.charAt(0)} 
                  size={80} 
                  className="mb-3"
                  style={{ border: '2px solid var(--bs-primary)' }} 
                />
                <h5 className="fw-bold text-white mb-2">{member.name}</h5>
                <Pill variant={member.status === 'active' ? 'primary' : 'secondary'} className="mt-auto">
                  {member.status.toUpperCase()}
                </Pill>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
