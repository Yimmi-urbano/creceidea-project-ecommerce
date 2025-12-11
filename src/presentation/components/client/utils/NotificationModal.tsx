import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from '@nextui-org/react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  message?: string; 
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  payThemeName: string;
}

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; // Acción de confirmación
  message: string;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, isLoading, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className='backdrop-blur-sm border-1 border-[#0ea5e9]/20 bg-[#082f49]/80'>
      <ModalContent>
        <ModalBody>
          {isLoading ? (
            <Spinner size="lg" />
          ) : (
            <p>{message}</p>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, payThemeName }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className='backdrop-blur-sm border-1 border-[#0ea5e9]/20 bg-[#082f49]/80'>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{payThemeName}</ModalHeader>
        <ModalBody>
          <p>Este tema requiere pago previo. Por favor, realiza el pago a uno de los siguientes números de cuenta:</p>
          <p>Una vez realizado el pago, contáctanos para activar el tema.</p>
        </ModalBody>
        <ModalFooter className='p-0'>
          <Button onPress={onClose} color="danger" variant="light">
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className='backdrop-blur-sm border-1 border-[#0ea5e9]/20 bg-[#082f49]/80'>
      <ModalContent>
       
        <ModalBody>
        <ModalHeader>Confirmar eliminación</ModalHeader>
          <p>{message}</p>
          <ModalFooter className='p-0 flex gap-4'>
          <Button color="danger" onClick={onConfirm}>
            Eliminar
          </Button>
          <Button variant="light" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
        </ModalBody>
      
      </ModalContent>
    </Modal>
  );
};

export { NotificationModal, PaymentModal, ConfirmDeleteModal };
