import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from '@nextui-org/react';

// Interfaz para el modal de notificación
interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  message?: string; // Mensaje opcional para notificación de éxito
}

// Interfaz para el modal de pago
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  payThemeName: string; // Nombre del tema de pago
}

// Modal de notificación general (Spinner y mensaje de éxito/error)
const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, isLoading, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className='backdrop-blur-sm border-1 border-[#0ea5e9]/20 bg-[#082f49]/80'>
      <ModalContent>
        <ModalHeader className='text-center w-full'>{isLoading ? 'Cargando...' : 'Proceso exitoso'}</ModalHeader>
        <ModalBody>
          {isLoading ? (
            <Spinner size="lg" />
          ) : (
            <p>{message}</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onPress={onClose} color="warning" disabled={isLoading}>
            {isLoading ? 'Espere...' : 'Cerrar'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// Modal de información de pago
const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, payThemeName }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className='backdrop-blur-sm border-1 border-[#0ea5e9]/20 bg-[#082f49]/80'>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Tema de Pago: {payThemeName}</ModalHeader>
        <ModalBody>
          <p>Este tema requiere pago previo. Por favor, realiza el pago a uno de los siguientes números de cuenta:</p>
          <ul>
            <li>Cuenta Banco A: 123-456789</li>
            <li>Cuenta Banco B: 987-654321</li>
          </ul>
          <p>Una vez realizado el pago, contáctanos para activar el tema.</p>
        </ModalBody>
        <ModalFooter>
          <Button onPress={onClose} color="danger" variant="light">
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { NotificationModal, PaymentModal };
