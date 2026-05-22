import React, { useState } from 'react';
import Head from 'next/head';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { mockLeagues, mockDivisions } from '@/data/mock';
import Card from '@/components/Card';
import Pill from '@/components/Pill';

export default function LeaguePage() {
  const [selectedLeagueId, setSelectedLeagueId] = useState(mockLeagues[0]?.id);

  const selectedLeague = mockLeagues.find(l => l.id === selectedLeagueId);
  const divisions = mockDivisions.filter(d => d.leagueId === selectedLeagueId);

  return (
    <>
      <Head>
        <title>League | Pickleball Planner</title>
      </Head>
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="fw-bold m-0" style={{ color: 'var(--bs-primary)' }}>
            League
          </h1>
          <Form.Select
            value={selectedLeagueId}
            onChange={e => setSelectedLeagueId(e.target.value)}
            className="rounded-pill"
            style={{ width: '280px', backgroundColor: '#12141C', borderColor: '#1F222C', color: '#fff' }}
          >
            {mockLeagues.map(league => (
              <option key={league.id} value={league.id}>
                {league.seasonName}
              </option>
            ))}
          </Form.Select>
        </div>

        {selectedLeague && (
          <Row>
            <Col md={5}>
              <Card className="glass-panel p-4">
                <h5 className="text-uppercase mb-3" style={{ color: 'var(--outline)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                  Season
                </h5>
                <h3 className="fw-bold text-white mb-3">{selectedLeague.name}</h3>
                <Pill variant="primary" className="mb-3">{selectedLeague.seasonName}</Pill>
                <div className="mt-3" style={{ color: 'var(--outline)', fontSize: '0.9rem' }}>
                  <div className="mb-1">
                    <span className="fw-bold text-white">Start:</span> {selectedLeague.startDate}
                  </div>
                  <div>
                    <span className="fw-bold text-white">End:</span> {selectedLeague.endDate}
                  </div>
                </div>
              </Card>
            </Col>

            <Col md={7}>
              <Card className="glass-panel p-4">
                <h5 className="text-uppercase mb-3" style={{ color: 'var(--outline)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                  Divisions ({divisions.length})
                </h5>
                {divisions.length === 0 ? (
                  <p style={{ color: 'var(--outline)' }}>No divisions for this season.</p>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {divisions.map(division => (
                      <div
                        key={division.id}
                        className="d-flex justify-content-between align-items-center p-3 rounded"
                        style={{ backgroundColor: 'rgba(0, 229, 255, 0.05)', border: '1px solid #1F222C' }}
                      >
                        <span className="fw-bold text-white">{division.name}</span>
                        <Pill variant="secondary">{division.id.split('-')[0].toUpperCase()}</Pill>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
