import Head from 'next/head';
import { useState } from 'react';
import { Row, Col, Card, Form, Button, Tabs, Tab, ListGroup, InputGroup } from 'react-bootstrap';
import { FiUser, FiBell, FiSettings, FiMail, FiPhone, FiSave } from 'react-icons/fi';
import { mockUser, mockNotifications } from '@/data/mock';
import SectionHeader from '@/components/SectionHeader';
import StatCard from '@/components/StatCard';
import Avatar from '@/components/Avatar';
import { useToast } from '@/components/ToastProvider';

export default function ProfilePage() {
  const { addToast } = useToast();
  const [profile, setProfile] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone,
  });
  const [preferences, setPreferences] = useState(mockUser.preferences);

  const handleSaveProfile = () => {
    addToast('Profile updated successfully', 'success');
  };

  const handleSavePreferences = () => {
    addToast('Preferences updated successfully', 'success');
  };

  return (
    <>
      <Head>
        <title>Profile | Pickleball Planner</title>
        <meta name="description" content="Manage your profile and preferences." />
      </Head>

      <SectionHeader title="My Profile" subtitle="Manage your account settings" />

      <Row className="g-3 mb-4">
        <Col xs={6} md={3}>
          <StatCard title="DUPR" value={mockUser.dupr.toFixed(1)} />
        </Col>
        <Col xs={6} md={3}>
          <StatCard title="Role" value={mockUser.role} />
        </Col>
        <Col xs={6} md={3}>
          <StatCard title="Member Since" value={new Date(mockUser.joinDate).getFullYear()} />
        </Col>
        <Col xs={6} md={3}>
          <StatCard title="Status" value={mockUser.status} />
        </Col>
      </Row>

      <Row className="g-3">
        <Col lg={4}>
          <Card className="glass-panel border-0">
            <Card.Body className="text-center">
              <Avatar name={mockUser.name} size="lg" className="mb-3" />
              <h4 className="mb-1">{mockUser.name}</h4>
              <p className="text-muted mb-0">{mockUser.email}</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Tabs defaultActiveKey="profile" className="mb-4" variant="pills">
            <Tab eventKey="profile" title={<><FiUser className="me-1" /> Profile</>}>
              <Card className="glass-panel border-0">
                <Card.Body>
                  <Form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={profile.name}
                        onChange={e => setProfile({...profile, name: e.target.value})}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <InputGroup>
                        <InputGroup.Text><FiMail size={14} /></InputGroup.Text>
                        <Form.Control
                          type="email"
                          value={profile.email}
                          onChange={e => setProfile({...profile, email: e.target.value})}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <InputGroup>
                        <InputGroup.Text><FiPhone size={14} /></InputGroup.Text>
                        <Form.Control
                          type="tel"
                          value={profile.phone}
                          onChange={e => setProfile({...profile, phone: e.target.value})}
                        />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                      <Button variant="primary" type="submit"><FiSave className="me-1" /> Save Changes</Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="notifications" title={<><FiBell className="me-1" /> Notifications</>}>
              <Card className="glass-panel border-0">
                <Card.Body>
                  <h6 className="mb-3">Notification Preferences</h6>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="bg-transparent border-bottom border-secondary d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-semibold">Email Notifications</div>
                        <small className="text-muted">Receive match reminders and updates via email</small>
                      </div>
                      <Form.Check type="switch" checked={preferences.emailNotifications} onChange={e => setPreferences({...preferences, emailNotifications: e.target.checked})} />
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-transparent border-bottom border-secondary d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-semibold">SMS Notifications</div>
                        <small className="text-muted">Receive text messages for urgent updates</small>
                      </div>
                      <Form.Check type="switch" checked={preferences.smsNotifications} onChange={e => setPreferences({...preferences, smsNotifications: e.target.checked})} />
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-transparent d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-semibold">In-App Notifications</div>
                        <small className="text-muted">Show notification bell alerts</small>
                      </div>
                      <Form.Check type="switch" defaultChecked disabled />
                    </ListGroup.Item>
                  </ListGroup>
                  <div className="d-flex justify-content-end mt-3">
                    <Button variant="primary" onClick={handleSavePreferences}><FiSave className="me-1" /> Save Preferences</Button>
                  </div>
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="settings" title={<><FiSettings className="me-1" /> Settings</>}>
              <Card className="glass-panel border-0">
                <Card.Body>
                  <h6 className="mb-3">Account Settings</h6>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="bg-transparent border-bottom border-secondary">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="fw-semibold">Change Password</div>
                          <small className="text-muted">Update your account password</small>
                        </div>
                        <Button variant="outline-primary" size="sm">Change</Button>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-transparent border-bottom border-secondary">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="fw-semibold">Theme</div>
                          <small className="text-muted">Currently using dark theme</small>
                        </div>
                        <Form.Select size="sm" style={{ width: 'auto' }} value={preferences.theme}>
                          <option value="dark">Dark</option>
                          <option value="light">Light</option>
                        </Form.Select>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-transparent">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="fw-semibold text-danger">Delete Account</div>
                          <small className="text-muted">Permanently delete your account and all data</small>
                        </div>
                        <Button variant="outline-danger" size="sm">Delete</Button>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}
