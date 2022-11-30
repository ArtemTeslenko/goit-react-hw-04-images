import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, Paper } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

function ShowModal({ onClose, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <Paper>{children}</Paper>
    </Overlay>,
    modalRoot
  );
}

export default ShowModal;

ShowModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
