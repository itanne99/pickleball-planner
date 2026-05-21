import React from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import Pill from '../../components/Pill';
import StatBar from '../../components/StatBar';
import { mockUser } from '../../data/mock';

export default function PlayerProfile() {
  const router = useRouter();
  const { id } = router.query;

  // We use mockUser as fallback
  const user = id === mockUser.id ? mockUser : mockUser;

  const getInitials = (name) => {
    return name.split(' ').map((n) => n[0]).join('');
  };

  return (
    <Layout>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="p-4 text-center neon-glow-primary">
              <div className="d-flex flex-column align-items-center mb-4">
                <Avatar initials={getInitials(user.name)} size={100} className="mb-3 neon-glow-primary" />
                <h2 className="mb-1">{user.name}</h2>
                <p className=" mb-2">{user.email}</p>
                <Pill>{user.role}</Pill>
              </div>

              <div className="text-start">
                <h5 className="mb-3" style={{ color: 'var(--inverse-surface)' }}>Performance Stats</h5>
                <StatBar label="Win Rate" value={65} max={100} className="mb-3" />
                <StatBar label="Matches Played" value={42} max={50} className="mb-3" variant="secondary" />
                <StatBar label="Agility" value={85} max={100} />
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
