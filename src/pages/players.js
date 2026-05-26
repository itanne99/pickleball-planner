import Head from 'next/head';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Row, Col, Card, Button, Form, Dropdown } from 'react-bootstrap';
import { FiFilter, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { mockPlayers } from '@/data/mock';
import SearchBar from '@/components/SearchBar';
import Paginator from '@/components/Paginator';
import StatusBadge from '@/components/StatusBadge';
import SectionHeader from '@/components/SectionHeader';
import Avatar from '@/components/Avatar';

const ITEMS_PER_PAGE = 8;

export default function PlayersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...mockPlayers];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q));
    }

    if (statusFilter !== 'all') {
      result = result.filter(p => p.status === statusFilter);
    }

    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'winRate') {
        const totalA = (a.wins || 0) + (a.losses || 0);
        const totalB = (b.wins || 0) + (b.losses || 0);
        aVal = totalA > 0 ? ((a.wins || 0) / totalA) * 100 : 0;
        bVal = totalB > 0 ? ((b.wins || 0) / totalB) * 100 : 0;
      }
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [search, statusFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <FiArrowUp className="ms-1 opacity-50" size={12} />;
    return sortDir === 'asc' ? <FiArrowUp className="ms-1" size={12} /> : <FiArrowDown className="ms-1" size={12} />;
  };

  const getWinRate = (player) => {
    const total = (player.wins || 0) + (player.losses || 0);
    return total > 0 ? Math.round(((player.wins || 0) / total) * 100) : 0;
  };

  return (
    <>
      <Head>
        <title>Players | Pickleball Planner</title>
        <meta name="description" content="Browse and search all players in the organization." />
      </Head>

      <SectionHeader
        title="Players"
        subtitle={`${filtered.length} player${filtered.length !== 1 ? 's' : ''} found`}
      />

      <Card className="glass-panel border-0 mb-4">
        <Card.Body>
          <Row className="g-3 mb-3 align-items-center">
            <Col md={6}>
              <SearchBar value={search} onChange={setSearch} placeholder="Search players by name or email..." onClear={() => setSearch('')} />
            </Col>
            <Col md={3}>
              <Form.Select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                aria-label="Filter by status"
                className="form-select-lg"
                style={{ backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)', color: '#dce3f1' }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Col>
            <Col md={3} className="d-flex align-items-center gap-2">
              <FiFilter className="text-subtle" />
              <span className="text-subtle small">Sort:</span>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" size="sm" id="sort-dropdown" style={{ backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)', color: '#dce3f1' }}>
                  {sortField === 'name' ? 'Name' : sortField === 'dupr' ? 'DUPR' : sortField === 'winRate' ? 'Win Rate' : 'Join Date'}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)' }}>
                  <Dropdown.Item onClick={() => handleSort('name')} style={{ color: '#dce3f1' }}>Name</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort('dupr')} style={{ color: '#dce3f1' }}>DUPR</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort('winRate')} style={{ color: '#dce3f1' }}>Win Rate</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort('joinDate')} style={{ color: '#dce3f1' }}>Join Date</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          <Row xs={1} md={2} lg={3} xl={4} className="g-3">
            {paginated.map(player => (
              <Col key={player.id}>
                <Link href={`/player/${player.id}`} passHref legacyBehavior>
                  <Card className="glass-panel border-0 h-100 card-interactive" style={{ cursor: 'pointer' }}>
                    <Card.Body>
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <Avatar name={player.name} size="md" />
                        <div>
                          <Card.Title className="mb-0">
                            <span className="text-decoration-none" style={{ color: '#dce3f1' }}>
                              {player.name}
                            </span>
                          </Card.Title>
                          <StatusBadge status={player.status} />
                        </div>
                      </div>
                      <div className="d-flex justify-content-between small">
                        <div>
                          <div className="text-subtle">DUPR</div>
                          <div className="fw-bold">{player.dupr.toFixed(1)}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-subtle">Record</div>
                          <div className="fw-bold">{player.wins}-{player.losses}</div>
                        </div>
                        <div className="text-end">
                          <div className="text-subtle">Win %</div>
                          <div className="fw-bold">{getWinRate(player)}%</div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>

          {paginated.length === 0 && (
            <div className="text-center text-subtle py-5">
              No players match your search criteria.
            </div>
          )}
        </Card.Body>
      </Card>

      <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  );
}
