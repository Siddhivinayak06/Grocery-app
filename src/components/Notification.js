import React, { useEffect } from 'react';

const Notification = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;
  
  const getIcon = () => {
    if (type === 'success') return 'bi-check-circle-fill';
    if (type === 'info') return 'bi-info-circle-fill';
    if (type === 'warning') return 'bi-exclamation-triangle-fill';
    return 'bi-info-circle-fill';
  };

  return (
    <div className={`notification notification-${type} ${isVisible ? 'show' : ''}`}>
      <div className="notification-content">
        <i className={`bi ${getIcon()}`}></i>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default Notification; 