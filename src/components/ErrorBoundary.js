import { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="glass-panel border-0">
          <Card.Body className="text-center py-5">
            <h2 className="text-danger mb-3">Something went wrong</h2>
            <p className="text-muted mb-4">{this.state.error?.message || 'An unexpected error occurred.'}</p>
            <Button variant="primary" onClick={() => this.setState({ hasError: false, error: null })}>
              Try Again
            </Button>
          </Card.Body>
        </Card>
      );
    }

    return this.props.children;
  }
}
