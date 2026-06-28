import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import { mockTeams, mockLocations, mockDivisions } from '@/data/mock';
import Card from '@/components/Card';
import Pill from '@/components/Pill';
import Avatar from '@/components/Avatar';
import WinLossBadge from '@/components/WinLossBadge';

export default function TeamDashboard() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Team Dashboard | Pickleball Planner</title>
      </Head>
      <Container className="py-5">
        <h1 className="fw-bold mb-5" style={{ color: 'var(--bs-primary)' }}>
          Teams
        </h1>

        <Row>
          {mockTeams.map((team) => {
            const location = mockLocations.find(l => l.id === team.locationId);
            const divisions = mockDivisions.filter(d => d.leagueId === team.id || true);
            const totalWins = (team.wins || 0);
            const totalLosses = (team.losses || 0);

            return (
              <Col md={6} lg={4} key={team.id} className="mb-4">
                <Card className="h-100 p-4" interactive onClick={() => router.push(`/team/${team.id}`)}>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <Avatar initials={team.name.charAt(0)} size={50} style={{ border: '2px solid var(--bs-primary)' }} />
                    <div>
                      <h5 className="fw-bold mb-0" style={{ color: '#dce3f1' }}>{team.name}</h5>
                      <Pill variant={team.status === 'active' ? 'primary' : 'secondary'} style={{ fontSize: '0.7rem' }}>
                        {team.status}
                      </Pill>
                    </div>
                  </div>

                  {location && (
                    <div className="mb-2 text-subtle small">
                      &#128205; {location.name}
                    </div>
                  )}

                  <div className="mt-3">
                    <WinLossBadge wins={totalWins} losses={totalLosses} />
                  </div>

                  <div className="mt-2 text-subtle small">
                    {(team.playerIds?.length || 0)} player{(team.playerIds?.length || 0) !== 1 ? 's' : ''}
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
