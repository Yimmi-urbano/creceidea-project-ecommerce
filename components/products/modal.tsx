// components/ApiModal.tsx
import React from 'react';
import { Modal, Button, Spinner, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';

interface ApiModalProps {
  open: boolean;
  onClose: () => void;
  status: 'loading' | 'success' | 'error';
  message: string;
}

const ApiModal: React.FC<ApiModalProps> = ({ open, onClose, status, message }) => {
  return (
    <Modal closeButton isOpen={open} onClose={onClose}>
      <ModalHeader>
        <h3>{status === 'success' ? 'Éxito' : 'Error'}</h3>
      </ModalHeader>
      <ModalBody>
        {status === 'loading' ? (
          <Spinner />
        ) : (
          <h3>{message}</h3>
        )}
      </ModalBody>
      <ModalFooter>
        <Button   color="danger" onClick={onClose}>
          Cerrar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ApiModal;
