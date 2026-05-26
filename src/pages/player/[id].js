import React from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import PlayerCard from '../../components/PlayerCard';
import StatBar from '../../components/StatBar';
import Pill from '../../components/Pill';
import { mockUser, mockTeam, mockTeams } from '../../data/mock';

export default function PlayerProfile() {
  const router = useRouter();
  const { id } = router.query;

  const user = id === mockUser.id ? mockUser : mockUser;

  const playerTeams = mockTeams.filter(t => t.playerIds.includes(user.id) || t.members?.some(m => m.id === user.id));

  return (
    <Layout>
      <Container className="py-4">
        <Row className="mb-4">
          <Col>
            <button
              className="btn btn-link text-subtle p-0 mb-3"
              onClick={() => router.back()}
              style={{ textDecoration: 'none', fontSize: '0.9rem' }}
            >
              &#8592; Back
            </button>
          </Col>
        </Row>

        {/* Profile Card */}
        <Row className="mb-4">
          <Col>
            <Card className="p-4">
              <PlayerCard
                player={user}
                winCount={user.wins}
                lossCount={user.losses}
                avatarSize={80}
              />
            </Card>
          </Col>
        </Row>

        {/* Team Affiliation */}
        {playerTeams.length > 0 && (
          <Card className="p-4 mb-4">
            <h5 className="mb-3 fw-bold" style={{ color: '#dce3f1' }}>Team Affiliation</h5>
            <div className="d-flex flex-wrap gap-2">
              {playerTeams.map(team => (
                <Link key={team.id} href={`/team/${team.id}`} passHref legacyBehavior>
                  <Pill variant="primary" className="card-interactive px-3 py-2" style={{ cursor: 'pointer', fontSize: '0.9rem' }}>
                    {team.name}
                  </Pill>
                </Link>
              ))}
            </div>
          </Card>
        )}

        {/* Performance Stats Card */}
        <Card className="p-4">
          <h5 className="mb-4 fw-bold" style={{ color: '#dce3f1' }}>Performance Stats</h5>
          <Row className="g-4">
            <Col md={6}>
              <StatBar label="Win Rate" value={65} max={100} className="mb-3" />
              <StatBar label="Matches Played" value={42} max={50} variant="secondary" />
            </Col>
          </Row>
        </Card>
      </Container>
    </Layout>
  );
}
