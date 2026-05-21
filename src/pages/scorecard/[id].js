import React from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Pill from '../../components/Pill';
import { mockScorecards, mockSchedule } from '../../data/mock';

export default function Scorecard() {
  const router = useRouter();
  const { id } = router.query;

  const scorecard = mockScorecards.find((s) => s.id === id) || mockScorecards[0];
  const match = mockSchedule.find((m) => m.id === scorecard?.matchId) || mockSchedule[0];

  if (!scorecard || !match) {
    return (
      <Layout>
        <Container>
          <p>Loading scorecard...</p>
        </Container>
      </Layout>
    );
  }

  const isWin = scorecard.result === 'Win';

  return (
    <Layout>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className={`p-4 text-center ${isWin ? 'neon-glow-primary' : ''}`}>
              <h2 className="mb-3">Scorecard</h2>
              <div className="mb-4">
                <h4 style={{ color: 'var(--bs-primary)' }}>Match vs {match.opponent}</h4>
                <p className="">{match.date} at {match.time}</p>
              </div>

              <div className="d-flex justify-content-center mb-4">
                <Pill variant={isWin ? 'primary' : 'secondary'} className="px-4 py-2 fs-5">
                  {scorecard.result}
                </Pill>
              </div>

              <div className="glass-panel p-3 rounded" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                {scorecard.score}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
