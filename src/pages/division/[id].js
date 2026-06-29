import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Row, Col, Table } from 'react-bootstrap';
import { FiArrowLeft, FiCalendar, FiAward } from 'react-icons/fi';
import { mockDivisions, mockLeagues, mockMatches, mockTeams } from '@/data/mock';
import Card from '@/components/Card';
import Pill from '@/components/Pill';

export default function DivisionPage() {
  const router = useRouter();
  const { id } = router.query;

  const division = mockDivisions.find(d => d.id === id);
  if (!division) {
    return (
      <div className="text-center py-5 text-subtle">
        <h3>Division not found</h3>
        <Link href="/league" className="btn btn-primary mt-3">Back to Leagues</Link>
      </div>
    );
  }

  const league = mockLeagues.find(l => l.id === division.leagueId);

  // Filter matches for this division (case-insensitive name inclusion match) and sort by date ASC
  const divisionMatches = mockMatches
    .filter(m => division.name.toLowerCase().includes(m.division.toLowerCase()))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Find all teams participating in this division's matches or matching the league
  const teamIdsInDivision = new Set();
  divisionMatches.forEach(m => {
    teamIdsInDivision.add(m.homeTeamId);
    teamIdsInDivision.add(m.awayTeamId);
  });

  // Fallback to league teams if no matches have occurred yet
  if (teamIdsInDivision.size === 0 && league) {
    league.teamIds.forEach(tid => teamIdsInDivision.add(tid));
  }

  // Calculate dynamic standings from completed matches in the division
  const standings = Array.from(teamIdsInDivision).map(teamId => {
    const team = mockTeams.find(t => t.id === teamId) || { name: 'Unknown Team', id: teamId };
    const teamMatches = divisionMatches.filter(m => m.status === 'completed' && (m.homeTeamId === teamId || m.awayTeamId === teamId));
    let wins = 0;
    let losses = 0;

    teamMatches.forEach(m => {
      const isHome = m.homeTeamId === teamId;
      const teamScore = isHome ? m.homeScore : m.awayScore;
      const oppScore = isHome ? m.awayScore : m.homeScore;
      if (teamScore > oppScore) {
        wins++;
      } else if (oppScore > teamScore) {
        losses++;
      }
    });

    const mp = teamMatches.length;
    const winRate = mp > 0 ? ((wins / mp) * 100).toFixed(1) : '0.0';

    return {
      id: teamId,
      name: team.name,
      mp,
      wins,
      losses,
      winRate
    };
  });

  // Sort by Wins desc, then Win Rate desc
  standings.sort((a, b) => b.wins - a.wins || parseFloat(b.winRate) - parseFloat(a.winRate));

  return (
    <>
      <Head>
        <title>{division.name} | Pickleball Planner</title>
      </Head>

      <div className="py-2">
        <div className="mb-4">
          <Link href="/league" className="btn btn-outline-secondary btn-sm" style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'var(--text-subtle)' }}>
            <FiArrowLeft className="me-1" /> Back to Leagues
          </Link>
        </div>

        <div className="d-flex flex-column mb-5">
          <h1 className="fw-bold m-0" style={{ color: 'var(--bs-primary)' }}>
            {division.name}
          </h1>
          {league && <span className="text-subtle mt-1">{league.name}</span>}
        </div>

        <Row className="g-4">
          {/* Left Column - Team Standings Leaderboard */}
          <Col md={7}>
            <Card className="glass-panel p-4 h-100">
              <div className="d-flex align-items-center gap-2 mb-4">
                <FiAward style={{ color: 'var(--bs-primary)', fontSize: '1.25rem' }} />
                <h5 className="section-label m-0">Team Standings</h5>
              </div>

              {standings.length === 0 ? (
                <p className="text-subtle">No teams in this division.</p>
              ) : (
                <div className="table-responsive">
                  <Table variant="dark" hover className="m-0 align-middle">
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(0, 229, 255, 0.2)' }}>
                        <th className="text-subtle font-label-md py-3" style={{ fontSize: '0.8rem' }}>RANK</th>
                        <th className="text-subtle font-label-md py-3" style={{ fontSize: '0.8rem' }}>TEAM</th>
                        <th className="text-subtle font-label-md py-3 text-center" style={{ fontSize: '0.8rem' }}>MP</th>
                        <th className="text-subtle font-label-md py-3 text-center" style={{ fontSize: '0.8rem' }}>W</th>
                        <th className="text-subtle font-label-md py-3 text-center" style={{ fontSize: '0.8rem' }}>L</th>
                        <th className="text-subtle font-label-md py-3 text-end" style={{ fontSize: '0.8rem' }}>WIN %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((team, index) => (
                        <tr key={team.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                          <td className="py-3">
                            <span
                              className="d-inline-flex align-items-center justify-content-center fw-bold rounded-circle"
                              style={{
                                width: '28px',
                                height: '28px',
                                fontSize: '0.85rem',
                                backgroundColor: index === 0 ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                                color: index === 0 ? 'var(--bs-primary)' : '#dce3f1',
                                border: index === 0 ? '1px solid rgba(0, 229, 255, 0.3)' : 'none'
                              }}
                            >
                              {index + 1}
                            </span>
                          </td>
                          <td className="py-3 fw-bold">
                            <Link href={`/team/${team.id}`} className="text-decoration-none" style={{ color: '#dce3f1' }}>
                              {team.name}
                            </Link>
                          </td>
                          <td className="py-3 text-center text-subtle">{team.mp}</td>
                          <td className="py-3 text-center text-success fw-bold">{team.wins}</td>
                          <td className="py-3 text-center text-danger fw-bold">{team.losses}</td>
                          <td className="py-3 text-end fw-bold" style={{ color: 'var(--bs-primary)' }}>
                            {team.winRate}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card>
          </Col>

          {/* Right Column - Division Schedule Table */}
          <Col md={5}>
            <Card className="glass-panel p-4 h-100">
              <div className="d-flex align-items-center gap-2 mb-4">
                <FiCalendar style={{ color: 'var(--bs-primary)', fontSize: '1.25rem' }} />
                <h5 className="section-label m-0">Division Schedule</h5>
              </div>

              {divisionMatches.length === 0 ? (
                <p className="text-subtle">No matches scheduled for this division.</p>
              ) : (
                <div className="table-responsive">
                  <Table variant="dark" hover className="m-0 align-middle">
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(0, 229, 255, 0.2)' }}>
                        <th className="text-subtle font-label-md py-3" style={{ fontSize: '0.8rem' }}>MATCH</th>
                        <th className="text-subtle font-label-md py-3" style={{ fontSize: '0.8rem' }}>DATE</th>
                        <th className="text-subtle font-label-md py-3 text-end" style={{ fontSize: '0.8rem' }}>SCORE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {divisionMatches.map(match => (
                        <tr key={match.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                          <td className="py-3 font-medium" style={{ color: '#dce3f1' }}>
                            <div className="d-flex flex-column">
                              <span>
                                {match.homeTeamName} <span className="text-subtle text-xs">vs</span> {match.awayTeamName}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 text-subtle" style={{ fontSize: '0.9rem' }}>
                            {match.date}
                          </td>
                          <td className="py-3 text-end fw-bold">
                            {match.status === 'completed' ? (
                              <Link href={`/scorecard/${match.id}`} className="text-decoration-none" style={{ color: 'var(--bs-primary)' }}>
                                {match.homeScore} - {match.awayScore}
                              </Link>
                            ) : (
                              <Link href={`/scorecard/new?matchId=${match.id}`} className="text-decoration-none text-faint" style={{ fontSize: '0.85rem' }}>
                                TBD
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
