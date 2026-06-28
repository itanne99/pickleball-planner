import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Card, Button, ProgressBar, Form, Row, Col } from 'react-bootstrap';
import { FiCheck, FiChevronRight, FiChevronLeft, FiAward, FiUsers, FiCalendar, FiTarget } from 'react-icons/fi';
import { mockUser } from '@/data/mock';

const steps = [
  { id: 'welcome', title: 'Welcome', icon: <FiAward /> },
  { id: 'profile', title: 'Profile', icon: <FiUsers /> },
  { id: 'preferences', title: 'Preferences', icon: <FiTarget /> },
  { id: 'complete', title: 'Complete', icon: <FiCheck /> },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    playStyle: 'aggressive',
    position: 'both',
    availability: ['weekends'],
    skillLevel: 'intermediate',
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/playerDashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    router.push('/playerDashboard');
  };

  return (
    <>
      <Head>
        <title>Welcome to Pickleball Planner</title>
        <meta name="description" content="Set up your account and get started." />
      </Head>

      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <Card className="glass-panel border-0" style={{ maxWidth: '600px', width: '100%' }}>
          <Card.Body className="p-4">
            <div className="text-center mb-4">
              <h2 className="text-primary fw-bold mb-1">Pickleball Planner</h2>
              <p className="text-muted">Welcome, {mockUser.name}!</p>
            </div>

            <ProgressBar now={progress} className="mb-4" variant="primary" style={{ height: '8px' }} />

            <div className="d-flex justify-content-between mb-4">
              {steps.map((step, idx) => (
                <div key={step.id} className={`text-center ${idx <= currentStep ? 'text-primary' : 'text-muted'}`}>
                  <div className={`fs-4 mb-1 ${idx <= currentStep ? '' : 'opacity-50'}`}>{step.icon}</div>
                  <small>{step.title}</small>
                </div>
              ))}
            </div>

            {currentStep === 0 && (
              <div className="text-center py-3">
                <h4 className="mb-3">Let's Get You Set Up</h4>
                <p className="text-muted mb-4">
                  We'll walk you through a quick setup to personalize your experience.
                  This will only take a minute!
                </p>
                <Row className="g-3 mb-4">
                  <Col xs={6}>
                    <Card className="bg-dark bg-opacity-50 border-secondary p-3">
                      <FiCalendar className="fs-3 text-primary mb-2" />
                      <div className="small fw-semibold">Schedule Matches</div>
                    </Card>
                  </Col>
                  <Col xs={6}>
                    <Card className="bg-dark bg-opacity-50 border-secondary p-3">
                      <FiUsers className="fs-3 text-primary mb-2" />
                      <div className="small fw-semibold">Join Teams</div>
                    </Card>
                  </Col>
                  <Col xs={6}>
                    <Card className="bg-dark bg-opacity-50 border-secondary p-3">
                      <FiTarget className="fs-3 text-primary mb-2" />
                      <div className="small fw-semibold">Track DUPR</div>
                    </Card>
                  </Col>
                  <Col xs={6}>
                    <Card className="bg-dark bg-opacity-50 border-secondary p-3">
                      <FiAward className="fs-3 text-primary mb-2" />
                      <div className="small fw-semibold">Compete</div>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}

            {currentStep === 1 && (
              <div className="py-3">
                <h5 className="mb-3">Tell Us About Your Play Style</h5>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Primary Position</Form.Label>
                    <div className="d-flex gap-2">
                      {['forehand', 'backhand', 'both'].map(pos => (
                        <Button
                          key={pos}
                          variant={formData.position === pos ? 'primary' : 'outline-secondary'}
                          onClick={() => setFormData({...formData, position: pos})}
                          className="flex-grow-1 text-capitalize"
                        >
                          {pos}
                        </Button>
                      ))}
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Play Style</Form.Label>
                    <div className="d-flex gap-2">
                      {['aggressive', 'defensive', 'balanced'].map(style => (
                        <Button
                          key={style}
                          variant={formData.playStyle === style ? 'primary' : 'outline-secondary'}
                          onClick={() => setFormData({...formData, playStyle: style})}
                          className="flex-grow-1 text-capitalize"
                        >
                          {style}
                        </Button>
                      ))}
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Skill Level</Form.Label>
                    <Form.Select value={formData.skillLevel} onChange={e => setFormData({...formData, skillLevel: e.target.value})}>
                      <option value="beginner">Beginner (2.0-3.0)</option>
                      <option value="intermediate">Intermediate (3.0-4.0)</option>
                      <option value="advanced">Advanced (4.0-5.0)</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              </div>
            )}

            {currentStep === 2 && (
              <div className="py-3">
                <h5 className="mb-3">Availability & Notifications</h5>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>When are you typically available?</Form.Label>
                    <div className="d-flex flex-wrap gap-2">
                      {['weekdays', 'weekends', 'evenings', 'mornings'].map(day => (
                        <Button
                          key={day}
                          variant={formData.availability.includes(day) ? 'primary' : 'outline-secondary'}
                          onClick={() => {
                            const avail = formData.availability.includes(day)
                              ? formData.availability.filter(d => d !== day)
                              : [...formData.availability, day];
                            setFormData({...formData, availability: avail});
                          }}
                          className="text-capitalize"
                        >
                          {formData.availability.includes(day) && '✓ '}{day}
                        </Button>
                      ))}
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Notification Preferences</Form.Label>
                    <Form.Check type="switch" label="Email notifications for match reminders" defaultChecked className="mb-2" />
                    <Form.Check type="switch" label="SMS notifications for schedule changes" className="mb-2" />
                    <Form.Check type="switch" label="Weekly league summary email" />
                  </Form.Group>
                </Form>
              </div>
            )}

            {currentStep === 3 && (
              <div className="text-center py-3">
                <div className="fs-1 text-success mb-3">
                  <FiCheck />
                </div>
                <h4 className="mb-3">You're All Set!</h4>
                <p className="text-muted mb-4">
                  Your profile is configured. Head to your dashboard to see upcoming matches,
                  join teams, and start tracking your progress.
                </p>
                <div className="d-flex gap-2 justify-content-center">
                  <Link href="/playerDashboard" className="btn btn-primary">
                    Go to Dashboard
                  </Link>
                  <Link href="/players" className="btn btn-outline-primary">
                    Browse Players
                  </Link>
                </div>
              </div>
            )}

            {currentStep < 3 && (
              <div className="d-flex justify-content-between mt-4">
                <Button variant="outline-secondary" onClick={handleBack} disabled={currentStep === 0}>
                  <FiChevronLeft className="me-1" /> Back
                </Button>
                <div className="d-flex gap-2">
                  <Button variant="link" className="text-muted" onClick={handleSkip}>Skip</Button>
                  <Button variant="primary" onClick={handleNext}>
                    {currentStep === steps.length - 2 ? 'Finish' : 'Continue'} <FiChevronRight className="ms-1" />
                  </Button>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
