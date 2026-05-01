import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Pill from '../../components/Pill';
import { mockSchedule } from '../../data/mock';

export default function TeamSchedule() {
  return (
    <Layout>
      <Container>
        <h2 className="mb-4" style={{ color: 'var(--inverse-surface)' }}>Upcoming Schedule</h2>
        <Row>
          {mockSchedule.map((match) => (
            <Col md={6} lg={4} key={match.id} className="mb-4">
              <Card className="p-3 h-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0" style={{ color: 'var(--bs-primary)' }}>Vs {match.opponent}</h5>
                  <Pill variant="secondary">Match</Pill>
                </div>
                <div style={{ color: 'var(--outline)' }}>
                  <p className="mb-1"><strong>Date:</strong> {match.date}</p>
                  <p className="mb-1"><strong>Time:</strong> {match.time}</p>
                  <p className="mb-0"><strong>Location:</strong> {match.location}</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
}
