import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Row, Col, Form } from 'react-bootstrap';
import { mockLeagues, mockDivisions } from '@/data/mock';
import Card from '@/components/Card';
import Pill from '@/components/Pill';
import LeagueCalendar from '@/components/LeagueCalendar';

export default function LeaguePage() {
  const router = useRouter();
  const { leagueId } = router.query;
  const [selectedLeagueId, setSelectedLeagueId] = useState(mockLeagues[0]?.id);
  const [prevLeagueId, setPrevLeagueId] = useState(null);

  if (leagueId && leagueId !== prevLeagueId) {
    setPrevLeagueId(leagueId);
    if (mockLeagues.some(l => l.id === leagueId)) {
      setSelectedLeagueId(leagueId);
    }
  }

  const selectedLeague = mockLeagues.find(l => l.id === selectedLeagueId);
  const divisions = mockDivisions.filter(d => d.leagueId === selectedLeagueId);

  return (
    <>
      <Head>
        <title>League | Pickleball Planner</title>
      </Head>
      <div className="py-2">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="fw-bold m-0" style={{ color: 'var(--bs-primary)' }}>
            League
          </h1>
          <Form.Select
            value={selectedLeagueId}
            onChange={e => setSelectedLeagueId(e.target.value)}
            className="rounded-pill"
            style={{ width: '280px', backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)', color: '#fff' }}
          >
            {mockLeagues.map(league => (
              <option key={league.id} value={league.id}>
                {league.seasonName}
              </option>
            ))}
          </Form.Select>
        </div>

        {selectedLeague && (
          <Row className="g-4">
            <Col md={5}>
              <Card className="glass-panel p-4" variant="accent">
                <h5 className="section-label mb-3">
                  Season
                </h5>
                <h3 className="fw-bold mb-3" style={{ color: '#dce3f1' }}>{selectedLeague.name}</h3>
                <Pill variant="primary" className="mb-4 align-self-start">{selectedLeague.seasonName}</Pill>
                <LeagueCalendar startDateStr={selectedLeague.startDate} endDateStr={selectedLeague.endDate} />
              </Card>
            </Col>

            <Col md={7}>
              <Card className="glass-panel p-4">
                <h5 className="section-label mb-3">
                  Divisions ({divisions.length})
                </h5>
                {divisions.length === 0 ? (
                  <p className="text-subtle">No divisions for this season.</p>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {divisions.map(division => (
                      <Card
                        key={division.id}
                        className="p-3"
                        variant="muted"
                        interactive
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold" style={{ color: '#dce3f1' }}>{division.name}</span>
                          <Pill variant="secondary">{division.id.split('-', 1)[0].toUpperCase()}</Pill>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}
