import React from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import Pill from '../../components/Pill';
import { mockTeam } from '../../data/mock';

export default function TeamProfile() {
  const router = useRouter();
  const { id } = router.query;

  const team = mockTeam.id === id ? mockTeam : mockTeam;

  return (
    <Layout>
      <Container>
        <Card className="p-4 mb-4 neon-glow-primary">
          <div className="d-flex align-items-center mb-3">
            <h2 className="mb-0 me-3">{team.name}</h2>
            <Pill variant="primary">Active Team</Pill>
          </div>
          <p style={{ color: 'var(--outline)' }}>
            Welcome to the official team page for {team.name}. We are dedicated to dominating the court with skill and teamwork.
          </p>
        </Card>

        <h3 className="mb-3" style={{ color: 'var(--inverse-surface)' }}>Team Members</h3>
        <Row>
          {team.members.map((member) => (
            <Col md={6} lg={4} key={member.id} className="mb-3">
              <Card className="p-3 d-flex flex-row align-items-center">
                <Avatar initials={member.name.split(' ').map(n => n[0]).join('')} size={50} className="me-3" />
                <div>
                  <h5 className="mb-1">{member.name}</h5>
                  <Pill variant="secondary" style={{ fontSize: '0.7rem' }}>{member.status}</Pill>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
}
