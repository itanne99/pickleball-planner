import Head from 'next/head';
import Link from 'next/link';
import { Button, Container } from 'react-bootstrap';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Pickleball Planner</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Head>
      <Container className="text-center py-5">
        <div style={{ minHeight: '60vh' }} className="d-flex flex-column align-items-center justify-content-center">
          <h1 className="display-1 fw-bold text-primary mb-3">404</h1>
          <h2 className="mb-3">Page Not Found</h2>
          <p className="text-muted mb-4 lead">
            The court you're looking for doesn't exist. Let's get you back to the game.
          </p>
          <div className="d-flex gap-3">
            <Button as={Link} href="/" variant="primary" size="lg">
              Go Home
            </Button>
            <Button as={Link} href="/playerDashboard" variant="outline-primary" size="lg">
              Dashboard
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
