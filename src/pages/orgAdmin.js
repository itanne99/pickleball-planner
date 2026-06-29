import Head from 'next/head';
import { useState, useCallback, useEffect } from 'react';
import { Row, Col, Card, Table, Button, Modal, Form, Tabs, Tab, Badge } from 'react-bootstrap';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { mockLeagues, mockDivisions, mockLocations, mockPlayers, mockTeams, mockUsers } from '@/data/mock';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import SectionHeader from '@/components/SectionHeader';
import StatusBadge from '@/components/StatusBadge';
import Avatar from '@/components/Avatar';
import ConfirmModal from '@/components/ConfirmModal';
import { useToast } from '@/components/ToastProvider';

const playerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(7, 'Phone must be at least 7 characters'),
  dupr: z.coerce.number().min(2, 'DUPR must be between 2.0-8.0').max(8, 'DUPR must be between 2.0-8.0'),
});

const teamSchema = z.object({
  name: z.string().min(2, 'Team name must be at least 2 characters'),
  locationId: z.string().min(1, 'Location is required'),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive']),
});

const locationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  courts: z.coerce.number().min(1, 'Must have at least 1 court'),
});

const leagueSchema = z.object({
  name: z.string().min(2, 'League name must be at least 2 characters'),
  seasonName: z.string().min(2, 'Season name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  teamIds: z.array(z.string()).optional(),
});

function FormField({ label, error, children }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label style={{ color: '#dce3f1' }}>{label}</Form.Label>
      {children}
      {error && <Form.Text className="text-danger">{error}</Form.Text>}
    </Form.Group>
  );
}

function getLeagueStatus(league) {
  const now = new Date();
  const start = new Date(league.startDate);
  const end = new Date(league.endDate);
  if (now < start) return 'upcoming';
  if (now > end) return 'completed';
  return 'active';
}

function TeamsTab() {
  const { addToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [teams, setTeams] = useState(mockTeams);
  const [locations, setLocations] = useState(mockLocations);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(teamSchema),
    defaultValues: { name: '', locationId: '', description: '', status: 'active' },
  });

  const openAdd = () => { setEditing(null); reset({ name: '', locationId: '', description: '', status: 'active' }); setShowModal(true); };
  const openEdit = (team) => { setEditing(team); reset({ name: team.name, locationId: team.locationId, description: team.description || '', status: team.status }); setShowModal(true); };

  const onSubmit = (data) => {
    if (editing) {
      setTeams(prev => prev.map(t => t.id === editing.id ? { ...t, ...data } : t));
      addToast(`Team "${data.name}" updated`, 'success');
    } else {
      const newTeam = { ...data, id: `t${Date.now()}`, captainId: '', playerIds: [], wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0, streak: '-', createdAt: new Date().toISOString().split('T', 1)[0], logo: null };
      setTeams(prev => [...prev, newTeam]);
      addToast(`Team "${data.name}" created`, 'success');
    }
    setShowModal(false);
  };

  const confirmDelete = () => {
    setTeams(prev => prev.filter(t => t.id !== deleteTarget?.id));
    addToast(`Team "${deleteTarget?.name}" deleted`, 'danger');
    setShowDelete(false);
    setDeleteTarget(null);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0" style={{ color: '#dce3f1' }}>Teams ({teams.length})</h5>
        <Button variant="primary" size="sm" onClick={openAdd}><FiPlus className="me-1" /> Add Team</Button>
      </div>
      <Table hover variant="dark" className="mb-0">
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(0, 229, 255, 0.15)' }}>
            <th style={{ color: '#dce3f1' }}>Team</th>
            <th style={{ color: '#dce3f1' }}>Location</th>
            <th style={{ color: '#dce3f1' }}>Players</th>
            <th style={{ color: '#dce3f1' }}>Record</th>
            <th style={{ color: '#dce3f1' }}>Status</th>
            <th className="text-end" style={{ color: '#dce3f1' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team => {
            const loc = locations.find(l => l.id === team.locationId);
            return (
              <tr key={team.id} style={{ borderBottom: '1px solid rgba(0, 229, 255, 0.08)' }}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <Avatar name={team.name} size="sm" />
                    <span className="fw-semibold" style={{ color: '#dce3f1' }}>{team.name}</span>
                  </div>
                </td>
                <td className="text-subtle">{loc?.name || 'Unassigned'}</td>
                <td className="text-subtle">{team.playerIds.length} players</td>
                <td className="text-subtle">{team.wins}-{team.losses}</td>
                <td><StatusBadge status={team.status} /></td>
                <td className="text-end">
                  <Button variant="outline-primary" size="sm" className="me-1" onClick={() => openEdit(team)}><FiEdit2 size={14} /></Button>
                  <Button variant="outline-danger" size="sm" onClick={() => { setDeleteTarget(team); setShowDelete(true); }}><FiTrash2 size={14} /></Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title style={{ color: '#dce3f1' }}>{editing ? 'Edit Team' : 'Add Team'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormField label="Team Name" error={errors.name?.message}>
              <Form.Control type="text" {...register('name')} isInvalid={!!errors.name}
                style={{ backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)', color: '#dce3f1' }}
              />
            </FormField>
            <FormField label="Location" error={errors.locationId?.message}>
              <Form.Select {...register('locationId')} isInvalid={!!errors.locationId}
                style={{ backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)', color: '#dce3f1' }}
              >
                <option value="">Select location</option>
                {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
              </Form.Select>
            </FormField>
            <FormField label="Description">
              <Form.Control as="textarea" rows={2} {...register('description')}
                style={{ backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)', color: '#dce3f1' }}
              />
            </FormField>
            <FormField label="Status">
              <Form.Select {...register('status')}
                style={{ backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)', color: '#dce3f1' }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </FormField>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="primary" type="submit">{editing ? 'Save Changes' : 'Create Team'}</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <ConfirmModal show={showDelete} onHide={() => setShowDelete(false)} onConfirm={confirmDelete} title="Delete Team" message={`Delete "${deleteTarget?.name}"? This cannot be undone.`} confirmText="Delete" />
    </>
  );
}

function PlayersTab() {
  const { addToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [players, setPlayers] = useState(mockPlayers);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(playerSchema),
    defaultValues: { name: '', email: '', phone: '', dupr: 3 },
  });

  const openAdd = () => { setEditing(null); reset({ name: '', email: '', phone: '', dupr: 3 }); setShowModal(true); };
  const openEdit = (player) => { setEditing(player); reset({ name: player.name, email: player.email, phone: player.phone, dupr: player.dupr }); setShowModal(true); };

  const onSubmit = (data) => {
    if (editing) {
      setPlayers(prev => prev.map(p => p.id === editing.id ? { ...p, ...data } : p));
      addToast(`Player "${data.name}" updated`, 'success');
    } else {
      const newPlayer = { ...data, id: `p${Date.now()}`, status: 'active', joinDate: new Date().toISOString().split('T', 1)[0], wins: 0, losses: 0, matchesPlayed: 0, winRate: 0, teamId: null, avatar: null };
      setPlayers(prev => [...prev, newPlayer]);
      addToast(`Player "${data.name}" created`, 'success');
    }
    setShowModal(false);
  };

  const confirmDelete = () => {
    setPlayers(prev => prev.filter(p => p.id !== deleteTarget?.id));
    addToast(`Player "${deleteTarget?.name}" deleted`, 'danger');
    setShowDelete(false);
    setDeleteTarget(null);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0" style={{ color: '#dce3f1' }}>Players ({players.length})</h5>
        <Button variant="primary" size="sm" onClick={openAdd}><FiPlus className="me-1" /> Add Player</Button>
      </div>
      <Table hover variant="dark" className="mb-0">
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(0, 229, 255, 0.15)' }}>
            <th style={{ color: '#dce3f1' }}>Player</th>
            <th style={{ color: '#dce3f1' }}>Email</th>
            <th style={{ color: '#dce3f1' }}>Phone</th>
            <th style={{ color: '#dce3f1' }}>DUPR</th>
            <th style={{ color: '#dce3f1' }}>Record</th>
            <th style={{ color: '#dce3f1' }}>Status</th>
            <th className="text-end" style={{ color: '#dce3f1' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.id} style={{ borderBottom: '1px solid rgba(0, 229, 255, 0.08)' }}>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <Avatar name={player.name} size="sm" />
                  <span className="fw-semibold" style={{ color: '#dce3f1' }}>{player.name}</span>
                </div>
              </td>
              <td className="text-subtle">{player.email}</td>
              <td className="text-subtle">{player.phone}</td>
              <td><Badge bg="primary">{player.dupr.toFixed(1)}</Badge></td>
              <td className="text-subtle">{player.wins}-{player.losses}</td>
              <td><StatusBadge status={player.status} /></td>
              <td className="text-end">
                <Button variant="outline-primary" size="sm" className="me-1" onClick={() => openEdit(player)}><FiEdit2 size={14} /></Button>
                <Button variant="outline-danger" size="sm" onClick={() => { setDeleteTarget(player); setShowDelete(true); }}><FiTrash2 size={14} /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title style={{ color: '#dce3f1' }}>{editing ? 'Edit Player' : 'Add Player'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormField label="Name" error={errors.name?.message}>
              <Form.Control type="text" {...register('name')} isInvalid={!!errors.name}
                style={{ backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)', color: '#dce3f1' }}
              />
            </FormField>
            <FormField label="Email" error={errors.email?.message}>
              <Form.Control type="email" {...register('email')} isInvalid={!!errors.email}
                style={{ backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)', color: '#dce3f1' }}
              />
            </FormField>
            <FormField label="Phone" error={errors.phone?.message}>
              <Form.Control type="tel" {...register('phone')} isInvalid={!!errors.phone}
                style={{ backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)', color: '#dce3f1' }}
              />
            </FormField>
            <FormField label="DUPR (2.0-8.0)" error={errors.dupr?.message}>
              <Form.Control type="number" step="0.1" {...register('dupr')} isInvalid={!!errors.dupr}
                style={{ backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)', color: '#dce3f1' }}
              />
            </FormField>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="primary" type="submit">{editing ? 'Save Changes' : 'Create Player'}</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <ConfirmModal show={showDelete} onHide={() => setShowDelete(false)} onConfirm={confirmDelete} title="Delete Player" message={`Delete "${deleteTarget?.name}"? This cannot be undone.`} confirmText="Delete" />
    </>
  );
}

function LocationsTab() {
  const { addToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [locations, setLocations] = useState(mockLocations);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(locationSchema),
    defaultValues: { name: '', address: '', courts: 4 },
  });

  const openAdd = () => { setEditing(null); reset({ name: '', address: '', courts: 4 }); setShowModal(true); };
  const openEdit = (loc) => { setEditing(loc); reset({ name: loc.name, address: loc.address, courts: loc.courts }); setShowModal(true); };

  const onSubmit = (data) => {
    if (editing) {
      setLocations(prev => prev.map(l => l.id === editing.id ? { ...l, ...data } : l));
      addToast(`Location "${data.name}" updated`, 'success');
    } else {
      const newLoc = { ...data, id: `loc${Date.now()}`, hours: '8:00 AM - 8:00 PM', amenities: ['Parking'], lat: 0, lng: 0, contact: '' };
      setLocations(prev => [...prev, newLoc]);
      addToast(`Location "${data.name}" created`, 'success');
    }
    setShowModal(false);
  };

  const confirmDelete = () => {
    setLocations(prev => prev.filter(l => l.id !== deleteTarget?.id));
    addToast(`Location "${deleteTarget?.name}" deleted`, 'danger');
    setShowDelete(false);
    setDeleteTarget(null);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0" style={{ color: '#dce3f1' }}>Locations ({locations.length})</h5>
        <Button variant="primary" size="sm" onClick={openAdd}><FiPlus className="me-1" /> Add Location</Button>
      </div>
      <Table hover variant="dark" className="mb-0">
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(0, 229, 255, 0.15)' }}>
            <th style={{ color: '#dce3f1' }}>Location</th>
            <th style={{ color: '#dce3f1' }}>Address</th>
            <th style={{ color: '#dce3f1' }}>Courts</th>
            <th style={{ color: '#dce3f1' }}>Hours</th>
            <th className="text-end" style={{ color: '#dce3f1' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(loc => (
            <tr key={loc.id} style={{ borderBottom: '1px solid rgba(0, 229, 255, 0.08)' }}>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <Avatar name={loc.name} size="sm" />
                  <span className="fw-semibold" style={{ color: '#dce3f1' }}>{loc.name}</span>
                </div>
              </td>
              <td className="text-subtle">{loc.address}</td>
              <td><Badge bg="info">{loc.courts}</Badge></td>
              <td className="text-subtle small">{loc.hours}</td>
              <td className="text-end">
                <Button variant="outline-primary" size="sm" className="me-1" onClick={() => openEdit(loc)}><FiEdit2 size={14} /></Button>
                <Button variant="outline-danger" size="sm" onClick={() => { setDeleteTarget(loc); setShowDelete(true); }}><FiTrash2 size={14} /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title style={{ color: '#dce3f1' }}>{editing ? 'Edit Location' : 'Add Location'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormField label="Location Name" error={errors.name?.message}>
              <Form.Control type="text" {...register('name')} isInvalid={!!errors.name}
                style={{ backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)', color: '#dce3f1' }}
              />
            </FormField>
            <FormField label="Address" error={errors.address?.message}>
              <Form.Control type="text" {...register('address')} isInvalid={!!errors.address}
                style={{ backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)', color: '#dce3f1' }}
              />
            </FormField>
            <FormField label="Number of Courts" error={errors.courts?.message}>
              <Form.Control type="number" min="1" {...register('courts')} isInvalid={!!errors.courts}
                style={{ backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)', color: '#dce3f1' }}
              />
            </FormField>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="primary" type="submit">{editing ? 'Save Changes' : 'Create Location'}</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <ConfirmModal show={showDelete} onHide={() => setShowDelete(false)} onConfirm={confirmDelete} title="Delete Location" message={`Delete "${deleteTarget?.name}"? This cannot be undone.`} confirmText="Delete" />
    </>
  );
}

function LeaguesTab() {
  const { addToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [leagues, setLeagues] = useState(mockLeagues);
  const [selectedTeamIds, setSelectedTeamIds] = useState([]);
  const [modalTab, setModalTab] = useState('details');

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(leagueSchema),
    defaultValues: { name: '', seasonName: '', startDate: '', endDate: '', teamIds: [] },
  });

  const openAdd = () => {
    setEditing(null);
    setModalTab('details');
    setSelectedTeamIds([]);
    reset({ name: '', seasonName: '', startDate: '', endDate: '' });
    setShowModal(true);
  };
  const openEdit = (league) => {
    setEditing(league);
    setModalTab('details');
    setSelectedTeamIds(league.teamIds || []);
    reset({ name: league.name, seasonName: league.seasonName, startDate: league.startDate, endDate: league.endDate });
    setShowModal(true);
  };

  const onSubmit = (data) => {
    if (editing) {
      setLeagues(prev => prev.map(l => l.id === editing.id ? { ...l, ...data, teamIds: selectedTeamIds } : l));
      addToast(`League "${data.name}" updated`, 'success');
    } else {
      const newLeague = { ...data, id: `l${Date.now()}`, divisionIds: [], organizationId: 'org1', teamIds: selectedTeamIds, description: '' };
      setLeagues(prev => [...prev, newLeague]);
      addToast(`League "${data.name}" created`, 'success');
    }
    setShowModal(false);
  };

  const confirmDelete = () => {
    setLeagues(prev => prev.filter(l => l.id !== deleteTarget?.id));
    addToast(`League "${deleteTarget?.name}" deleted`, 'danger');
    setShowDelete(false);
    setDeleteTarget(null);
  };

  const toggleTeam = (teamId) => {
    setSelectedTeamIds(prev =>
      prev.includes(teamId) ? prev.filter(id => id !== teamId) : [...prev, teamId]
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0" style={{ color: '#dce3f1' }}>Leagues ({leagues.length})</h5>
        <Button variant="primary" size="sm" onClick={openAdd}><FiPlus className="me-1" /> Add League</Button>
      </div>
      <Table hover variant="dark" className="mb-0">
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(0, 229, 255, 0.15)' }}>
            <th style={{ color: '#dce3f1' }}>League</th>
            <th style={{ color: '#dce3f1' }}>Season</th>
            <th style={{ color: '#dce3f1' }}>Duration</th>
            <th style={{ color: '#dce3f1' }}>Status</th>
            <th className="text-end" style={{ color: '#dce3f1' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leagues.map(league => {
            const status = getLeagueStatus(league);
            return (
              <tr key={league.id} style={{ borderBottom: '1px solid rgba(0, 229, 255, 0.08)' }}>
                <td className="fw-semibold" style={{ color: '#dce3f1' }}>{league.name}</td>
                <td><Badge bg="primary">{league.seasonName}</Badge></td>
                <td className="text-subtle small">{league.startDate} → {league.endDate}</td>
                <td><StatusBadge status={status} /></td>
                <td className="text-end">
                  <Button variant="outline-primary" size="sm" className="me-1" onClick={() => openEdit(league)}><FiEdit2 size={14} /></Button>
                  <Button variant="outline-danger" size="sm" onClick={() => { setDeleteTarget(league); setShowDelete(true); }}><FiTrash2 size={14} /></Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title style={{ color: '#dce3f1' }}>{editing ? 'Edit League' : 'Add League'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Tabs activeKey={modalTab} onSelect={setModalTab} className="mb-4" variant="pills">
            <Tab eventKey="details" title="Details">
              <div className="pt-3">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <FormField label="League Name" error={errors.name?.message}>
                    <Form.Control type="text" {...register('name')} isInvalid={!!errors.name}
                      style={{ backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)', color: '#dce3f1' }}
                    />
                  </FormField>
                  <FormField label="Season Name" error={errors.seasonName?.message}>
                    <Form.Control type="text" {...register('seasonName')} isInvalid={!!errors.seasonName}
                      style={{ backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)', color: '#dce3f1' }}
                    />
                  </FormField>
                  <Row>
                    <Col>
                      <FormField label="Start Date" error={errors.startDate?.message}>
                        <Form.Control type="date" {...register('startDate')} isInvalid={!!errors.startDate}
                          style={{ backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)', color: '#dce3f1' }}
                        />
                      </FormField>
                    </Col>
                    <Col>
                      <FormField label="End Date" error={errors.endDate?.message}>
                        <Form.Control type="date" {...register('endDate')} isInvalid={!!errors.endDate}
                          style={{ backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)', color: '#dce3f1' }}
                        />
                      </FormField>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Tab>
            <Tab eventKey="teams" title="Teams">
              <div className="pt-3">
                <p className="text-subtle small mb-3">Select teams participating in this league:</p>
                <Table hover variant="dark" size="sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(0, 229, 255, 0.15)' }}>
                      <th style={{ color: '#dce3f1' }}>Select</th>
                      <th style={{ color: '#dce3f1' }}>Team</th>
                      <th style={{ color: '#dce3f1' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTeams.filter(t => t.status === 'active').map(team => (
                      <tr key={team.id} style={{ borderBottom: '1px solid rgba(0, 229, 255, 0.08)', cursor: 'pointer' }} onClick={() => toggleTeam(team.id)}>
                        <td>
                          <Form.Check
                            type="checkbox"
                            checked={selectedTeamIds.includes(team.id)}
                            onChange={() => {}}
                            style={{ accentColor: '#00E5FF' }}
                          />
                        </td>
                        <td className="text-subtle">{team.name}</td>
                        <td><StatusBadge status={team.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>{editing ? 'Save Changes' : 'Create League'}</Button>
        </Modal.Footer>
      </Modal>

      <ConfirmModal show={showDelete} onHide={() => setShowDelete(false)} onConfirm={confirmDelete} title="Delete League" message={`Delete "${deleteTarget?.name}"? This cannot be undone.`} confirmText="Delete" />
    </>
  );
}

export default function OrgAdminPage() {
  return (
    <>
      <Head>
        <title>Org Admin | Pickleball Planner</title>
        <meta name="description" content="Organization administration - manage teams, players, locations, and leagues." />
      </Head>

      <SectionHeader title="Organization Admin" subtitle="Manage all organization entities" />

      <Tabs defaultActiveKey="teams" className="mb-4" variant="pills">
        <Tab eventKey="teams" title="Teams"><div className="pt-2"><TeamsTab /></div></Tab>
        <Tab eventKey="players" title="Players"><div className="pt-2"><PlayersTab /></div></Tab>
        <Tab eventKey="locations" title="Locations"><div className="pt-2"><LocationsTab /></div></Tab>
        <Tab eventKey="leagues" title="Leagues"><div className="pt-2"><LeaguesTab /></div></Tab>
      </Tabs>
    </>
  );
}
