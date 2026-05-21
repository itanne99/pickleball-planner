import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer style={{ padding: '40px 0', borderTop: '1px solid #1F222C' }}>
      <Container className="d-flex justify-content-between align-items-center flex-wrap gap-3">
        <span className="fw-bold" style={{ color: 'var(--bs-primary)' }}>Pickleball Planner</span>
        <span style={{ color: 'var(--bs-body-color)', opacity: 0.6 }}>&copy; {new Date().getFullYear()} Pickleball Planner. All rights reserved.</span>
      </Container>
    </footer>
  );
}
