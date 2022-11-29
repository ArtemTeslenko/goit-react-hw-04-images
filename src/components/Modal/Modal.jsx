import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Overlay, Paper } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class ShowModal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <Paper>{this.props.children}</Paper>
      </Overlay>,
      modalRoot
    );
  }
}

export default ShowModal;

ShowModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
