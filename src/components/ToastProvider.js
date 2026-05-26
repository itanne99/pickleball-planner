'use client';

import { useState, createContext, useContext } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { FiCheck, FiX, FiAlertTriangle, FiInfo } from 'react-icons/fi';

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, variant = 'info', duration = 4000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, variant, duration }]);
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const icons = {
    success: <FiCheck className="text-success" />,
    danger: <FiX className="text-danger" />,
    warning: <FiAlertTriangle className="text-warning" />,
    info: <FiInfo className="text-info" />,
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            bg={toast.variant === 'success' ? 'success' : toast.variant === 'danger' ? 'danger' : toast.variant === 'warning' ? 'warning' : 'dark'}
            onClose={() => removeToast(toast.id)}
            delay={toast.duration}
            autohide
            className="mb-2"
          >
            <Toast.Header>
              {icons[toast.variant]}
              <strong className="me-auto ms-2 text-capitalize">{toast.variant}</strong>
            </Toast.Header>
            <Toast.Body>{toast.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
}
