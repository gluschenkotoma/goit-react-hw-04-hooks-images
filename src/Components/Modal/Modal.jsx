import { Component } from 'react';
import { createPortal } from 'react-dom';
import { StyledOverlay, StyledModal } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <StyledOverlay onClick={this.handleBackdropClick}>
        <StyledModal>{this.props.children}</StyledModal>
      </StyledOverlay>,
      modalRoot
    );
  }
}
