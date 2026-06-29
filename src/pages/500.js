import Head from 'next/head';
import Link from 'next/link';
import { Button, Container } from 'react-bootstrap';

export default function Custom500() {
  return (
    <>
      <Head>
        <title>500 - Server Error | Pickleball Planner</title>
        <meta name="description" content="Something went wrong on our end." />
      </Head>
      <Container className="text-center py-5">
        <div style={{ minHeight: '60vh' }} className="d-flex flex-column align-items-center justify-content-center">
          <h1 className="display-1 fw-bold text-danger mb-3">500</h1>
          <h2 className="mb-3">Server Error</h2>
          <p className="text-muted mb-4 lead">
            Something went wrong on our end. We're working to fix it. Please try again later.
          </p>
          <div className="d-flex gap-3">
            <Button as={Link} href="/" variant="primary" size="lg">
              Go Home
            </Button>
            <Button onClick={() => location.reload()} variant="outline-primary" size="lg">
              Refresh Page
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
