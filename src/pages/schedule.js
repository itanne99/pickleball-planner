import Head from 'next/head';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, Button, Row, Col, Tabs, Tab, Badge, Modal } from 'react-bootstrap';
import { FiCalendar, FiClock, FiMapPin, FiX } from 'react-icons/fi';
import { mockMatches, mockTeams, mockLocations, mockLeagues } from '@/data/mock';
import SectionHeader from '@/components/SectionHeader';
import StatusBadge from '@/components/StatusBadge';
import { useToast } from '@/components/ToastProvider';
import { format } from 'date-fns';

const teamMap = {};
mockTeams.forEach(t => { teamMap[t.id] = t.name; });

const locationMap = {};
mockLocations.forEach(l => { locationMap[l.id] = l.name; });

export default function SchedulePage() {
  const { addToast } = useToast();
  const [view, setView] = useState('upcoming');
  const [selectedMatch, setSelectedMatch] = useState(null);

  const matches = useMemo(() => {
    return mockMatches.map(m => ({
      ...m,
      homeTeamName: teamMap[m.homeTeamId] || 'Unknown',
      awayTeamName: teamMap[m.awayTeamId] || 'Unknown',
      locationName: locationMap[m.locationId] || 'Unknown',
    }));
  }, []);

  const upcoming = matches.filter(m => m.status === 'scheduled').sort((a, b) => new Date(a.date) - new Date(b.date));
  const past = matches.filter(m => m.status === 'completed').sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <Head>
        <title>Schedule | Pickleball Planner</title>
        <meta name="description" content="View match schedules." />
      </Head>

      <SectionHeader
        title="Schedule"
        subtitle={`${upcoming.length} upcoming matches`}
        action={
          <Button variant="primary" size="sm" onClick={() => addToast('Match creation is not active in prototype', 'warning')}>
            <FiCalendar className="me-1" /> New Match
          </Button>
        }
      />

      <Tabs activeKey={view} onSelect={setView} className="mb-4" variant="pills">
        <Tab eventKey="upcoming" title={`Upcoming (${upcoming.length})`} />
        <Tab eventKey="past" title={`Past (${past.length})`} />
      </Tabs>

      {view === 'upcoming' && (
        <Row xs={1} md={2} className="g-3">
          {upcoming.map(match => (
            <Col key={match.id}>
              <MatchCard match={match} onViewScorecard={() => setSelectedMatch(match)} />
            </Col>
          ))}
          {upcoming.length === 0 && (
            <Col>
              <div className="text-center text-subtle py-5">No upcoming matches scheduled.</div>
            </Col>
          )}
        </Row>
      )}

      {view === 'past' && (
        <Row xs={1} md={2} className="g-3">
          {past.map(match => (
            <Col key={match.id}>
              <MatchCard match={match} showScore onViewScorecard={() => setSelectedMatch(match)} />
            </Col>
          ))}
        </Row>
      )}

      {/* Scorecard Modal */}
      <Modal show={!!selectedMatch} onHide={() => setSelectedMatch(null)} centered size="lg">
        {selectedMatch && (
          <>
            <Modal.Header closeButton className="bg-dark border-secondary">
              <Modal.Title style={{ color: '#dce3f1' }}>
                {selectedMatch.homeTeamName} vs {selectedMatch.awayTeamName}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark">
              <div className="d-flex gap-3 mb-4 text-subtle small">
                <span><FiCalendar className="me-1" />{format(new Date(selectedMatch.date), 'MMM d, yyyy')}</span>
                <span><FiClock className="me-1" />{selectedMatch.time}</span>
                <span><FiMapPin className="me-1" />{selectedMatch.locationName}</span>
              </div>
              <div className="text-center">
                <StatusBadge status={selectedMatch.status} />
                {selectedMatch.status === 'completed' && selectedMatch.homeScore !== undefined && (
                  <div className="mt-3">
                    <div className="d-flex justify-content-center align-items-center gap-4">
                      <div className="text-center">
                        <div className="fw-bold" style={{ fontSize: '2rem', color: '#dce3f1' }}>{selectedMatch.homeScore}</div>
                        <div className="text-subtle small">{selectedMatch.homeTeamName}</div>
                      </div>
                      <div className="text-subtle" style={{ fontSize: '1.5rem' }}>-</div>
                      <div className="text-center">
                        <div className="fw-bold" style={{ fontSize: '2rem', color: '#dce3f1' }}>{selectedMatch.awayScore}</div>
                        <div className="text-subtle small">{selectedMatch.awayTeamName}</div>
                      </div>
                    </div>
                  </div>
                )}
                 {selectedMatch.status === 'scheduled' && (
                  <div className="mt-3">
                    <p className="text-subtle mb-3">Match not yet played</p>
                    <Link href={`/scorecard/new?matchId=${selectedMatch.id}`} className="btn btn-primary btn-sm">
                      Enter Scorecard Results
                    </Link>
                  </div>
                )}
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
}

function MatchCard({ match, showScore, onViewScorecard }) {
  return (
    <Card className="glass-panel border-0 card-interactive" style={{ cursor: 'pointer' }} onClick={onViewScorecard}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <StatusBadge status={match.status} />
          {showScore ? (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={(e) => { e.stopPropagation(); onViewScorecard(); }}
              style={{ borderColor: 'rgba(0, 229, 255, 0.3)', color: '#00E5FF' }}
            >
              View Scorecard
            </Button>
          ) : (
            <Link
              href={`/scorecard/new?matchId=${match.id}`}
              className="btn btn-outline-primary btn-sm"
              onClick={(e) => e.stopPropagation()}
              style={{ borderColor: 'rgba(0, 229, 255, 0.3)', color: '#00E5FF', textDecoration: 'none' }}
            >
              Enter Scorecard
            </Link>
          )}
        </div>
        <h5 className="mb-2" style={{ color: '#dce3f1' }}>
          {match.homeTeamName} <span className="text-subtle">vs</span> {match.awayTeamName}
        </h5>
        {showScore && match.status === 'completed' && (
          <div className="mb-2">
            <Badge bg="primary" className="me-2">{match.homeScore}</Badge>
            <Badge bg="secondary">{match.awayScore}</Badge>
          </div>
        )}
        <div className="d-flex gap-3 text-subtle small">
          <span><FiCalendar className="me-1" />{format(new Date(match.date), 'MMM d, yyyy')}</span>
          <span><FiClock className="me-1" />{match.time}</span>
        </div>
        <div className="text-subtle small mt-1">
          <FiMapPin className="me-1" />{match.locationName}
        </div>
      </Card.Body>
    </Card>
  );
}
