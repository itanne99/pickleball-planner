import React from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Pill from '../../components/Pill';
import PlayerCard from '../../components/PlayerCard';
import { mockTeam, mockLocations, mockDivisions, mockTeams } from '../../data/mock';

export default function TeamProfile() {
  const router = useRouter();
  const { id } = router.query;

  const foundTeam = mockTeams.find(t => t.id === id) || mockTeam;
  const location = mockLocations.find(l => l.id === foundTeam.locationId);
  const divisions = mockDivisions.slice(0, 2);

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

        {/* Team Header Card */}
        <Card className="p-4 mb-4" variant="accent">
          <div className="d-flex align-items-center mb-3">
            <h2 className="mb-0 me-3" style={{ color: '#dce3f1' }}>{foundTeam.name}</h2>
            <Pill variant={foundTeam.status === 'active' ? 'primary' : 'secondary'}>{foundTeam.status}</Pill>
          </div>
          <p className="text-subtle mb-3">
            Welcome to the official team page for {foundTeam.name}. We are dedicated to dominating the court with skill and teamwork.
          </p>
          <div className="d-flex flex-wrap gap-3">
            {location && (
              <div className="text-subtle small">
                &#128205; {location.name}
              </div>
            )}
            <div className="text-subtle small">
              {(foundTeam.playerIds?.length || foundTeam.members?.length || 0)} player{(foundTeam.playerIds?.length || foundTeam.members?.length || 0) !== 1 ? 's' : ''}
            </div>
          </div>
        </Card>

        {/* Divisions */}
        {divisions.length > 0 && (
          <Card className="p-4 mb-4">
            <h5 className="mb-3 fw-bold" style={{ color: '#dce3f1' }}>Divisions</h5>
            <div className="d-flex flex-wrap gap-2">
              {divisions.map(division => (
                <Pill key={division.id} variant="primary">{division.name}</Pill>
              ))}
            </div>
          </Card>
        )}

        {/* Team Members */}
        <h3 className="mb-4 fw-bold" style={{ color: '#dce3f1' }}>Team Members</h3>
        <Row>
          {(foundTeam.members || []).map((member) => (
            <Col md={6} lg={4} key={member.id} className="mb-3">
              <PlayerCard
                player={member}
                winCount={member.wins}
                lossCount={member.losses}
                avatarSize={55}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
}
