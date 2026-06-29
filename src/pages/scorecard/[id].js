import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Row, Col, Card, Table, Badge, ListGroup } from 'react-bootstrap';
import { FiArrowLeft, FiCalendar, FiClock, FiMapPin, FiCheck, FiClock as FiPending } from 'react-icons/fi';
import { getMatchById, getScorecardById, getTeamById, getLocationById } from '@/data/mock';
import SectionHeader from '@/components/SectionHeader';
import StatusBadge from '@/components/StatusBadge';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ScorecardPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <LoadingSpinner fullScreen />;

  const match = getMatchById(id);
  if (!match) {
    return (
      <>
        <Head><title>Match Not Found | Pickleball Planner</title></Head>
        <div className="text-center py-5">
          <h2>Match not found</h2>
          <Link href="/schedule" className="btn btn-primary mt-3">Back to Schedule</Link>
        </div>
      </>
    );
  }

  const homeTeam = getTeamById(match.homeTeamId);
  const awayTeam = getTeamById(match.awayTeamId);
  const location = getLocationById(match.locationId);
  const scorecard = match.scorecardId ? getScorecardById(match.scorecardId) : null;

  return (
    <>
      <Head>
        <title>Scorecard - {homeTeam?.name} vs {awayTeam?.name} | Pickleball Planner</title>
        <meta name="description" content={`Match scorecard for ${homeTeam?.name} vs ${awayTeam?.name}`} />
      </Head>

      <div className="mb-4">
        <Link href="/schedule" className="btn btn-outline-secondary btn-sm">
          <FiArrowLeft className="me-1" /> Back to Schedule
        </Link>
      </div>

      <SectionHeader
        title={`${homeTeam?.name} vs ${awayTeam?.name}`}
        subtitle={`${formatDate(match.date)} at ${match.time}`}
      />

      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card className="glass-panel border-0">
            <Card.Body>
              <h6 className="text-muted mb-2">Match Details</h6>
              <ListGroup variant="flush" className="small">
                <ListGroup.Item className="bg-transparent border-0 px-0 d-flex align-items-center gap-2 text-muted">
                  <FiCalendar size={14} /> {formatDate(match.date)}
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 px-0 d-flex align-items-center gap-2 text-muted">
                  <FiClock size={14} /> {match.time}
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 px-0 d-flex align-items-center gap-2 text-muted">
                  <FiMapPin size={14} /> {location?.name || 'TBD'}
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <StatusBadge status={match.status} />
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="glass-panel border-0">
            <Card.Body className="text-center">
              <Row className="align-items-center">
                <Col>
                  <h3 className="mb-0">{homeTeam?.name}</h3>
                  {match.status === 'completed' && (
                    <h1 className="display-4 fw-bold text-primary mb-0">{match.homeScore}</h1>
                  )}
                </Col>
                <Col xs="auto">
                  <div className="text-muted fs-1 fw-bold">VS</div>
                </Col>
                <Col>
                  <h3 className="mb-0">{awayTeam?.name}</h3>
                  {match.status === 'completed' && (
                    <h1 className="display-4 fw-bold mb-0">{match.awayScore}</h1>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {scorecard ? (
        <>
          <Card className="glass-panel border-0 mb-4">
            <Card.Header className="bg-transparent border-bottom border-secondary d-flex justify-content-between align-items-center">
              <Card.Title className="mb-0">Set-by-Set Results</Card.Title>
              <StatusBadge status={scorecard.status} />
            </Card.Header>
            <Card.Body className="p-0">
              <Table hover variant="dark" className="mb-0">
                <thead>
                  <tr>
                    <th>Set</th>
                    <th>{homeTeam?.name}</th>
                    <th>{awayTeam?.name}</th>
                    <th>Duration</th>
                    <th>Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {scorecard.sets.map(set => (
                    <tr key={set.setNumber}>
                      <td><Badge bg="secondary">Set {set.setNumber}</Badge></td>
                      <td className={`fw-bold ${set.homeScore > set.awayScore ? 'text-success' : ''}`}>{set.homeScore}</td>
                      <td className={`fw-bold ${set.awayScore > set.homeScore ? 'text-success' : ''}`}>{set.awayScore}</td>
                      <td className="text-muted">{set.duration}</td>
                      <td>
                        <Badge bg={set.homeScore > set.awayScore ? 'success' : 'danger'}>
                          {set.homeScore > set.awayScore ? homeTeam?.name : awayTeam?.name}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {scorecard.notes && (
            <Card className="glass-panel border-0">
              <Card.Body>
                <h6 className="text-muted mb-2">Notes</h6>
                <p className="mb-0">{scorecard.notes}</p>
              </Card.Body>
            </Card>
          )}
        </>
      ) : (match.status === 'scheduled' ? (
        <Card className="glass-panel border-0 text-center py-5">
          <Card.Body>
            <FiPending size={48} className="text-muted mb-3" />
            <h4>Scorecard Not Yet Entered</h4>
            <p className="text-muted">Enter the match results after the match is completed.</p>
            <Link href={`/scorecard/new?matchId=${match.id}`} className="btn btn-primary">
              Enter Scorecard
            </Link>
          </Card.Body>
        </Card>
      ) : null)}
    </>
  );
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}
