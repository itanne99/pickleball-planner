import React from 'react';
import Head from 'next/head';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { mockTeam, mockUser } from '@/data/mock';
import Card from '@/components/Card';
import Pill from '@/components/Pill';
import Avatar from '@/components/Avatar';

export default function AdminPanel() {
  const allUsers = [
    mockUser,
    ...mockTeam.members.filter(m => m.id !== mockUser.id).map(m => ({
      ...m,
      email: `${m.name.toLowerCase().replace(' ', '.')}@example.com`,
      role: 'player'
    }))
  ];

  return (
    <>
      <Head>
        <title>Admin Panel | Pickleball Planner</title>
      </Head>
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="fw-bold m-0" style={{ color: 'var(--bs-primary)' }}>
            Admin Panel
          </h1>
          <Button variant="outline-primary" className="rounded-pill px-4 fw-bold" style={{ borderColor: 'var(--bs-primary)', color: 'var(--bs-primary)' }}>
            + Add New User
          </Button>
        </div>

        <Card className="glass-panel overflow-hidden">
          <div className="table-responsive">
            <Table variant="dark" className="m-0 align-middle" hover style={{ backgroundColor: 'transparent' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1F222C' }}>
                  <th className="py-3 px-4 border-0 text-muted">USER</th>
                  <th className="py-3 px-4 border-0 text-muted">ROLE</th>
                  <th className="py-3 px-4 border-0 text-muted text-end">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #1F222C' }}>
                    <td className="py-3 px-4 border-0">
                      <div className="d-flex align-items-center">
                        <Avatar initials={user.name.charAt(0)} size={40} className="me-3" />
                        <div>
                          <div className="fw-bold text-white">{user.name}</div>
                          <div className="small text-muted">{user.email || 'N/A'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 border-0">
                      <Pill variant={user.role === 'admin' ? 'secondary' : 'primary'}>
                        {user.role || 'player'}
                      </Pill>
                    </td>
                    <td className="py-3 px-4 border-0 text-end">
                      <Button variant="primary" size="sm" className="me-2 fw-bold text-dark rounded-pill">
                        Edit
                      </Button>
                      <Button variant="outline-danger" size="sm" className="fw-bold rounded-pill">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </Container>
    </>
  );
}
