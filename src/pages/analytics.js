import Head from 'next/head';
import Link from 'next/link';
import { Row, Col, Card, Table } from 'react-bootstrap';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { FiTrendingUp, FiUsers, FiAward, FiCalendar } from 'react-icons/fi';
import { mockAnalyticsData, mockAdminKpis, mockPlayers } from '@/data/mock';
import SectionHeader from '@/components/SectionHeader';
import StatCard from '@/components/StatCard';

const COLORS = ['#00E5FF', '#FF4081', '#7C4DFF', '#FFD740', '#69F0AE'];

const defaultDuprDistribution = [
  { range: '2.0-3.0', count: 5 },
  { range: '3.0-4.0', count: 12 },
  { range: '4.0-5.0', count: 8 },
  { range: '5.0-6.0', count: 3 },
  { range: '6.0+', count: 1 },
];

const defaultMatchesPerMonth = [
  { month: 'Jan', matches: 12 },
  { month: 'Feb', matches: 18 },
  { month: 'Mar', matches: 25 },
  { month: 'Apr', matches: 30 },
  { month: 'May', matches: 22 },
  { month: 'Jun', matches: 35 },
];

const defaultParticipationByDay = [
  { day: 'Mon', players: 8 },
  { day: 'Tue', players: 12 },
  { day: 'Wed', players: 15 },
  { day: 'Thu', players: 10 },
  { day: 'Fri', players: 18 },
  { day: 'Sat', players: 25 },
  { day: 'Sun', players: 20 },
];

const defaultTopPlayers = mockPlayers
  .map(p => ({
    playerId: p.id,
    name: p.name,
    dupr: p.dupr,
    wins: p.wins || 0,
    losses: p.losses || 0,
    winRate: ((p.wins || 0) + (p.losses || 0)) > 0 ? Math.round(((p.wins || 0) / ((p.wins || 0) + (p.losses || 0))) * 100) : 0,
  }))
  .sort((a, b) => b.dupr - a.dupr)
  .slice(0, 5);

export default function AnalyticsPage() {
  const matchesPerMonth = mockAnalyticsData?.matchesPerMonth || defaultMatchesPerMonth;
  const duprDistribution = mockAnalyticsData?.duprDistribution || defaultDuprDistribution;
  const topPlayers = mockAnalyticsData?.topPlayers || defaultTopPlayers;
  const participationByDay = mockAnalyticsData?.participationByDay || defaultParticipationByDay;

  return (
    <>
      <Head>
        <title>Analytics | Pickleball Planner</title>
        <meta name="description" content="View league analytics and statistics." />
      </Head>

      <SectionHeader title="Analytics & Statistics" subtitle="League-wide performance and participation data" />

      <Row className="g-3 mb-4">
        <Col xs={6} lg={3}>
          <StatCard title="Total Players" value={mockPlayers.length} icon={<FiUsers />} trend="+8 this month" />
        </Col>
        <Col xs={6} lg={3}>
          <StatCard title="Active Leagues" value={mockAdminKpis?.activeLeagues || 2} icon={<FiAward />} />
        </Col>
        <Col xs={6} lg={3}>
          <StatCard title="Matches This Month" value={mockAdminKpis?.matchesThisMonth || 35} icon={<FiCalendar />} trend="+12 vs last month" />
        </Col>
        <Col xs={6} lg={3}>
          <StatCard title="Court Utilization" value={`${mockAdminKpis?.courtUtilization || 78}%`} icon={<FiTrendingUp />} trend="+5% vs last month" />
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        <Col lg={8}>
          <Card className="glass-panel border-0">
            <Card.Header className="bg-transparent border-bottom border-secondary">
              <Card.Title className="mb-0" style={{ color: '#dce3f1' }}>Matches Per Month</Card.Title>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={matchesPerMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="matches" fill="#00E5FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="glass-panel border-0">
            <Card.Header className="bg-transparent border-bottom border-secondary">
              <Card.Title className="mb-0" style={{ color: '#dce3f1' }}>DUPR Distribution</Card.Title>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={duprDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ range, percent }) => `${range}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {duprDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        <Col lg={6}>
          <Card className="glass-panel border-0">
            <Card.Header className="bg-transparent border-bottom border-secondary">
              <Card.Title className="mb-0" style={{ color: '#dce3f1' }}>Participation by Day</Card.Title>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={participationByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="day" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="players" stroke="#FF4081" strokeWidth={2} dot={{ fill: '#FF4081' }} />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="glass-panel border-0">
            <Card.Header className="bg-transparent border-bottom border-secondary">
              <Card.Title className="mb-0" style={{ color: '#dce3f1' }}>Top Players Leaderboard</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <Table striped hover variant="dark" className="mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Player</th>
                    <th>DUPR</th>
                    <th>Record</th>
                    <th>Win %</th>
                  </tr>
                </thead>
                <tbody>
                  {topPlayers.map((p, idx) => (
                    <tr key={p.playerId} className="align-middle">
                      <td>
                        {idx === 0 ? (
                          <span className="badge rounded-circle bg-warning text-dark d-inline-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px', fontSize: '0.75rem', fontWeight: 'bold' }}>1</span>
                        ) : idx === 1 ? (
                          <span className="badge rounded-circle bg-secondary text-white d-inline-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px', fontSize: '0.75rem', fontWeight: 'bold' }}>2</span>
                        ) : idx === 2 ? (
                          <span className="badge rounded-circle bg-danger text-white d-inline-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px', fontSize: '0.75rem', fontWeight: 'bold' }}>3</span>
                        ) : (
                          <span className="ps-2">{idx + 1}</span>
                        )}
                      </td>
                      <td>
                        <Link href={`/player/${p.playerId}`} className="text-decoration-none" style={{ color: '#dce3f1' }}>
                          {p.name}
                        </Link>
                      </td>
                      <td><span className="fw-bold" style={{ color: '#00E5FF' }}>{p.dupr.toFixed(1)}</span></td>
                      <td>{p.wins}-{p.losses}</td>
                      <td>{p.winRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
