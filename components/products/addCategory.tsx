// components/AddCategory.tsx

import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Spacer,
  useDisclosure,
} from '@nextui-org/react';
import { addCategory } from '@/hooks/fetchProducts';

const AddCategory = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleAddCategory = async () => {
    try {
      await addCategory(title);
      setMessage('Categoría agregada con éxito');
    } catch (error) {
      setMessage('Error al agregar la categoría');
      console.error(error);
    }
  };

  return (
    <div>
      <Button onPress={onOpen}>Agregar Categoría</Button>
      <Modal className="bg-background/70 dark:bg-sky-950/80" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Agregar Categoría</ModalHeader>
              <ModalBody>
                <Input
                  
                  isClearable
                  fullWidth
                  
                  size="lg"
                  placeholder="Título"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Spacer y={1} />
                {message && <div>{message}</div>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={handleAddCategory}>
                  Agregar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddCategory;
