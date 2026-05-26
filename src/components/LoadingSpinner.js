import { Spinner } from 'react-bootstrap';

export default function LoadingSpinner({ size = 'md', text = 'Loading...', fullScreen = false }) {
  const content = (
    <div className="d-flex flex-column align-items-center justify-content-center gap-2">
      <Spinner animation="border" size={size} role="status" variant="primary" />
      {text && <span className="text-muted">{text}</span>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        {content}
      </div>
    );
  }

  return content;
}
