import { Modal, Button } from 'react-bootstrap';

export default function ConfirmModal({ show, onHide, onConfirm, title, message, confirmText = 'Confirm', variant = 'danger' }) {
  return (
    <Modal show={show} onHide={onHide} centered aria-labelledby="confirm-modal-title">
      <Modal.Header closeButton>
        <Modal.Title id="confirm-modal-title">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant={variant} onClick={onConfirm}>{confirmText}</Button>
      </Modal.Footer>
    </Modal>
  );
}
