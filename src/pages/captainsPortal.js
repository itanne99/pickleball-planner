import React, { useState } from 'react';
import Head from 'next/head';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { mockTeam, mockUser } from '@/data/mock';
import Card from '@/components/Card';
import Pill from '@/components/Pill';
import Avatar from '@/components/Avatar';
import DataTable from '@/components/DataTable';
import { useToast } from '@/components/ToastProvider';

export default function CaptainsPortal() {
  const { addToast } = useToast();
  const [users, setUsers] = useState([
    mockUser,
    ...mockTeam.members.filter(m => m.id !== mockUser.id).map(m => ({
      ...m,
      email: `${m.name.toLowerCase().replace(' ', '.')}@example.com`,
      role: 'player'
    }))
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: 'player' });

  const openEdit = (user) => {
    setEditingUser(user);
    setEditForm({ name: user.name, email: user.email || '', role: user.role || 'player' });
    setShowEditModal(true);
  };

  const openDelete = (user) => {
    setDeletingUser(user);
    setShowDeleteModal(true);
  };

  const handleEditSave = () => {
    setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...editForm } : u));
    setShowEditModal(false);
    setEditingUser(null);
  };

  const handleDelete = () => {
    setUsers(prev => prev.filter(u => u.id !== deletingUser.id));
    setShowDeleteModal(false);
    setDeletingUser(null);
  };

  const columns = [
    {
      header: 'User',
      render: (user) => (
        <div className="d-flex align-items-center">
          <div className="position-relative me-3">
            <Avatar name={user.name} size={40} />
            <span
              className="status-dot"
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: user.status === 'active' ? '#22C55E' : '#EF4444',
                border: '2px solid #12141C'
              }}
            />
          </div>
          <div>
            <div className="fw-bold" style={{ color: '#dce3f1' }}>{user.name}</div>
            <div className="small text-subtle">{user.email || 'N/A'}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Role',
      render: (user) => (
        <Pill variant={user.role === 'admin' ? 'secondary' : 'primary'}>
          {user.role || 'player'}
        </Pill>
      )
    },
    {
      header: 'Status',
      render: (user) => (
        <span className="text-subtle small">{user.status || 'active'}</span>
      )
    },
    {
      header: 'Actions',
      align: 'right',
      render: (user) => (
        <>
          <Button variant="primary" size="sm" className="me-2 fw-bold text-dark rounded-pill" onClick={() => openEdit(user)}>
            Edit
          </Button>
          <Button variant="outline-danger" size="sm" className="fw-bold rounded-pill" onClick={() => openDelete(user)}>
            Delete
          </Button>
        </>
      )
    }
  ];

  return (
    <>
      <Head>
        <title>Captains Portal | Pickleball Planner</title>
      </Head>
      <div className="py-2">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="fw-bold m-0" style={{ color: 'var(--bs-primary)' }}>
            Captains Portal
          </h1>
          <Button
            variant="outline-primary"
            className="rounded-pill px-4 fw-bold"
            style={{ borderColor: 'var(--bs-primary)', color: 'var(--bs-primary)' }}
            onClick={() => addToast('Add User feature is not active in prototype', 'warning')}
          >
            + Add New User
          </Button>
        </div>

        <DataTable columns={columns} data={users} />
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title style={{ color: '#dce3f1' }}>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#dce3f1' }}>Name</Form.Label>
              <Form.Control
                type="text"
                value={editForm.name}
                onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                style={{ backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)', color: '#dce3f1' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#dce3f1' }}>Email</Form.Label>
              <Form.Control
                type="email"
                value={editForm.email}
                onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
                style={{ backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)', color: '#dce3f1' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#dce3f1' }}>Role</Form.Label>
              <Form.Select
                value={editForm.role}
                onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))}
                style={{ backgroundColor: '#12141C', borderColor: 'rgba(0, 229, 255, 0.15)', color: '#dce3f1' }}
              >
                <option value="player">Player</option>
                <option value="admin">Admin</option>
                <option value="captain">Captain</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleEditSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title style={{ color: '#dce3f1' }}>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <p className="text-subtle">Are you sure you want to delete <strong style={{ color: '#dce3f1' }}>{deletingUser?.name}</strong>? This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
