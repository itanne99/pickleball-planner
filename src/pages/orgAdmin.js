import React, { useState } from 'react';
import Head from 'next/head';
import { Container, Row, Col, Button, Table, Modal, Form, Tabs, Tab } from 'react-bootstrap';
import { mockLeagues, mockDivisions, mockLocations, mockPlayers, mockTeams } from '@/data/mock';
import { useAuthGuard } from '@/utils/auth';
import Card from '@/components/Card';
import Pill from '@/components/Pill';
import Avatar from '@/components/Avatar';

function CrudTable({ title, headers, rows, renderActions, onAdd }) {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold m-0" style={{ color: 'var(--bs-primary)' }}>{title}</h3>
        <Button
          variant="outline-primary"
          className="rounded-pill px-4 fw-bold"
          style={{ borderColor: 'var(--bs-primary)', color: 'var(--bs-primary)' }}
          onClick={onAdd}
        >
          + Add New
        </Button>
      </div>
      <Card className="glass-panel overflow-hidden">
        <div className="table-responsive">
          <Table variant="dark" className="m-0 align-middle" hover style={{ backgroundColor: 'transparent' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1F222C' }}>
                {headers.map(h => (
                  <th key={h} className="py-3 px-4 border-0">{h.toUpperCase()}</th>
                ))}
                <th className="py-3 px-4 border-0 text-end">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #1F222C' }}>
                  {renderActions(row)}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

function TeamsTab() {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', locationId: '', playerIds: [], status: 'active' });

  const openAdd = () => { setEditing(null); setForm({ name: '', locationId: '', playerIds: [], status: 'active' }); setShowModal(true); };
  const openEdit = (team) => { setEditing(team); setForm({ ...team }); setShowModal(true); };

  return (
    <>
      <CrudTable
        title="Teams"
        headers={['Team', 'Location', 'Players', 'Status']}
        rows={mockTeams}
        renderActions={(team) => {
          const loc = mockLocations.find(l => l.id === team.locationId);
          const teamPlayers = mockPlayers.filter(p => team.playerIds.includes(p.id));
          return (
            <>
              <td className="py-3 px-4 border-0">
                <div className="d-flex align-items-center">
                  <Avatar initials={team.name.charAt(0)} size={40} className="me-3" />
                  <div className="fw-bold text-white">{team.name}</div>
                </div>
              </td>
              <td className="py-3 px-4 border-0" style={{ color: 'var(--outline)' }}>{loc?.name || 'Unassigned'}</td>
              <td className="py-3 px-4 border-0">
                <div className="d-flex gap-1 flex-wrap">
                  {teamPlayers.slice(0, 3).map(p => (
                    <Pill key={p.id} variant="primary" className="py-1 px-2" style={{ fontSize: '0.7rem' }}>{p.name.split(' ')[0]}</Pill>
                  ))}
                  {teamPlayers.length > 3 && <Pill variant="secondary" className="py-1 px-2" style={{ fontSize: '0.7rem' }}>+{teamPlayers.length - 3}</Pill>}
                </div>
              </td>
              <td className="py-3 px-4 border-0">
                <Pill variant={team.status === 'active' ? 'primary' : 'secondary'}>{team.status}</Pill>
              </td>
              <td className="py-3 px-4 border-0 text-end">
                <Button variant="primary" size="sm" className="me-2 fw-bold text-dark rounded-pill" onClick={() => openEdit(team)}>Edit</Button>
                <Button variant="outline-danger" size="sm" className="fw-bold rounded-pill">Delete</Button>
              </td>
            </>
          );
        }}
        onAdd={openAdd}
      />
      <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="bg-dark border-secondary">
        <Modal.Header closeButton className="border-secondary">
          <Modal.Title className="text-white">{editing ? 'Edit Team' : 'Add Team'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Team Name</Form.Label>
              <Form.Control
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="bg-dark text-white border-secondary"
                placeholder="Enter team name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Location</Form.Label>
              <Form.Select
                value={form.locationId}
                onChange={e => setForm({ ...form, locationId: e.target.value })}
                className="bg-dark text-white border-secondary"
              >
                <option value="">Select location</option>
                {mockLocations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Players</Form.Label>
              <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                {mockPlayers.map(p => (
                  <Form.Check
                    key={p.id}
                    type="checkbox"
                    label={p.name}
                    checked={form.playerIds.includes(p.id)}
                    onChange={e => {
                      const ids = e.target.checked
                        ? [...form.playerIds, p.id]
                        : form.playerIds.filter(id => id !== p.id);
                      setForm({ ...form, playerIds: ids });
                    }}
                    className="text-white"
                  />
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Status</Form.Label>
              <Form.Select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="bg-dark text-white border-secondary">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-secondary">
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" className="fw-bold text-dark" onClick={() => setShowModal(false)}>
            {editing ? 'Save Changes' : 'Create Team'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function PlayersTab() {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', dupr: '', teamIds: [] });

  const openAdd = () => { setEditing(null); setForm({ name: '', email: '', phone: '', dupr: '', teamIds: [] }); setShowModal(true); };
  const openEdit = (player) => { setEditing(player); setForm({ ...player, teamIds: [] }); setShowModal(true); };

  return (
    <>
      <CrudTable
        title="Players"
        headers={['Player', 'Email', 'Phone', 'DUPR', 'Teams']}
        rows={mockPlayers}
        renderActions={(player) => {
          const playerTeams = mockTeams.filter(t => t.playerIds.includes(player.id));
          return (
            <>
              <td className="py-3 px-4 border-0">
                <div className="d-flex align-items-center">
                  <Avatar initials={player.name.charAt(0)} size={40} className="me-3" />
                  <div className="fw-bold text-white">{player.name}</div>
                </div>
              </td>
              <td className="py-3 px-4 border-0" style={{ color: 'var(--outline)' }}>{player.email}</td>
              <td className="py-3 px-4 border-0" style={{ color: 'var(--outline)' }}>{player.phone}</td>
              <td className="py-3 px-4 border-0">
                <Pill variant="primary">{player.dupr}</Pill>
              </td>
              <td className="py-3 px-4 border-0">
                <div className="d-flex gap-1 flex-wrap">
                  {playerTeams.map(t => (
                    <Pill key={t.id} variant="secondary" className="py-1 px-2" style={{ fontSize: '0.7rem' }}>{t.name}</Pill>
                  ))}
                </div>
              </td>
              <td className="py-3 px-4 border-0 text-end">
                <Button variant="primary" size="sm" className="me-2 fw-bold text-dark rounded-pill" onClick={() => openEdit(player)}>Edit</Button>
                <Button variant="outline-danger" size="sm" className="fw-bold rounded-pill">Delete</Button>
              </td>
            </>
          );
        }}
        onAdd={openAdd}
      />
      <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="bg-dark border-secondary">
        <Modal.Header closeButton className="border-secondary">
          <Modal.Title className="text-white">{editing ? 'Edit Player' : 'Add Player'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Name</Form.Label>
              <Form.Control
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="bg-dark text-white border-secondary"
                placeholder="Full name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Email</Form.Label>
              <Form.Control
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="bg-dark text-white border-secondary"
                placeholder="email@example.com"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Phone</Form.Label>
              <Form.Control
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="bg-dark text-white border-secondary"
                placeholder="555-0100"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">DUPR Rating</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                min="2.0"
                max="8.0"
                value={form.dupr}
                onChange={e => setForm({ ...form, dupr: e.target.value })}
                className="bg-dark text-white border-secondary"
                placeholder="4.0"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-secondary">
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" className="fw-bold text-dark" onClick={() => setShowModal(false)}>
            {editing ? 'Save Changes' : 'Create Player'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function LocationsTab() {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', address: '', courts: '' });

  const openAdd = () => { setEditing(null); setForm({ name: '', address: '', courts: '' }); setShowModal(true); };
  const openEdit = (loc) => { setEditing(loc); setForm({ ...loc }); setShowModal(true); };

  return (
    <>
      <CrudTable
        title="Locations"
        headers={['Location', 'Address', 'Courts']}
        rows={mockLocations}
        renderActions={(loc) => (
          <>
            <td className="py-3 px-4 border-0">
              <div className="d-flex align-items-center">
                <Avatar initials={loc.name.charAt(0)} size={40} className="me-3" />
                <div className="fw-bold text-white">{loc.name}</div>
              </div>
            </td>
            <td className="py-3 px-4 border-0" style={{ color: 'var(--outline)' }}>{loc.address}</td>
            <td className="py-3 px-4 border-0">
              <Pill variant="primary">{loc.courts} courts</Pill>
            </td>
            <td className="py-3 px-4 border-0 text-end">
              <Button variant="primary" size="sm" className="me-2 fw-bold text-dark rounded-pill" onClick={() => openEdit(loc)}>Edit</Button>
              <Button variant="outline-danger" size="sm" className="fw-bold rounded-pill">Delete</Button>
            </td>
          </>
        )}
        onAdd={openAdd}
      />
      <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="bg-dark border-secondary">
        <Modal.Header closeButton className="border-secondary">
          <Modal.Title className="text-white">{editing ? 'Edit Location' : 'Add Location'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Location Name</Form.Label>
              <Form.Control
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="bg-dark text-white border-secondary"
                placeholder="e.g. Sunrise Courts"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Address</Form.Label>
              <Form.Control
                type="text"
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
                className="bg-dark text-white border-secondary"
                placeholder="123 Main St, City ST"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Number of Courts</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={form.courts}
                onChange={e => setForm({ ...form, courts: e.target.value })}
                className="bg-dark text-white border-secondary"
                placeholder="6"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-secondary">
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" className="fw-bold text-dark" onClick={() => setShowModal(false)}>
            {editing ? 'Save Changes' : 'Create Location'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function LeaguesTab() {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', seasonName: '', startDate: '', endDate: '', divisionIds: [] });

  const openAdd = () => { setEditing(null); setForm({ name: '', seasonName: '', startDate: '', endDate: '', divisionIds: [] }); setShowModal(true); };
  const openEdit = (league) => { setEditing(league); setForm({ ...league }); setShowModal(true); };

  return (
    <>
      <CrudTable
        title="Leagues"
        headers={['League', 'Season', 'Duration', 'Divisions']}
        rows={mockLeagues}
        renderActions={(league) => {
          const divisions = mockDivisions.filter(d => league.divisionIds.includes(d.id));
          return (
            <>
              <td className="py-3 px-4 border-0">
                <div className="fw-bold text-white">{league.name}</div>
              </td>
              <td className="py-3 px-4 border-0">
                <Pill variant="primary">{league.seasonName}</Pill>
              </td>
              <td className="py-3 px-4 border-0" style={{ color: 'var(--outline)', fontSize: '0.85rem' }}>
                {league.startDate} → {league.endDate}
              </td>
              <td className="py-3 px-4 border-0">
                <div className="d-flex gap-1 flex-wrap">
                  {divisions.map(d => (
                    <Pill key={d.id} variant="secondary" className="py-1 px-2" style={{ fontSize: '0.7rem' }}>{d.name}</Pill>
                  ))}
                </div>
              </td>
              <td className="py-3 px-4 border-0 text-end">
                <Button variant="primary" size="sm" className="me-2 fw-bold text-dark rounded-pill" onClick={() => openEdit(league)}>Edit</Button>
                <Button variant="outline-danger" size="sm" className="fw-bold rounded-pill">Delete</Button>
              </td>
            </>
          );
        }}
        onAdd={openAdd}
      />
      <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="bg-dark border-secondary">
        <Modal.Header closeButton className="border-secondary">
          <Modal.Title className="text-white">{editing ? 'Edit League' : 'Add League'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">League Name</Form.Label>
              <Form.Control
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="bg-dark text-white border-secondary"
                placeholder="e.g. Summer Championship"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Season Name</Form.Label>
              <Form.Control
                type="text"
                value={form.seasonName}
                onChange={e => setForm({ ...form, seasonName: e.target.value })}
                className="bg-dark text-white border-secondary"
                placeholder="e.g. Summer 2026"
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={form.startDate}
                    onChange={e => setForm({ ...form, startDate: e.target.value })}
                    className="bg-dark text-white border-secondary"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">End Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={form.endDate}
                    onChange={e => setForm({ ...form, endDate: e.target.value })}
                    className="bg-dark text-white border-secondary"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-secondary">
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" className="fw-bold text-dark" onClick={() => setShowModal(false)}>
            {editing ? 'Save Changes' : 'Create League'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default function OrgAdminPage() {
  const isAuthorized = useAuthGuard('admin');

  if (!isAuthorized) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Org Admin | Pickleball Planner</title>
      </Head>
      <Container className="py-5">
        <h1 className="fw-bold mb-5" style={{ color: 'var(--bs-primary)' }}>
          Organization Admin
        </h1>

        <Tabs
          defaultActiveKey="teams"
          id="org-admin-tabs"
          className="mb-4"
          fill
        >
          <Tab eventKey="teams" title="Teams">
            <div className="pt-4"><TeamsTab /></div>
          </Tab>
          <Tab eventKey="players" title="Players">
            <div className="pt-4"><PlayersTab /></div>
          </Tab>
          <Tab eventKey="locations" title="Locations">
            <div className="pt-4"><LocationsTab /></div>
          </Tab>
          <Tab eventKey="leagues" title="Leagues">
            <div className="pt-4"><LeaguesTab /></div>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}
