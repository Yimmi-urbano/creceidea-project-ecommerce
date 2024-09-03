import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Spacer, useDisclosure } from '@nextui-org/react';
import { useCategoryContext } from '@/components/category/CategoryContext';

const AddCategory: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedParent, setSelectedParent] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { allCategories, handleAddCategory } = useCategoryContext();

  const handleAddNewCategory = async () => {
    try {
      await handleAddCategory(title, selectedParent);
      setMessage('Categoría agregada con éxito');
      setTitle('');
      setSelectedParent(null);
      onOpenChange();
    } catch (error) {
      setMessage('Error al agregar la categoría');
      console.error(error);
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>Agregar Categoría</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Spacer y={1} />
                <select
                  value={selectedParent || ''}
                  onChange={(e) => setSelectedParent(e.target.value || null)}
                  style={{ width: '100%', padding: '8px', fontSize: '16px' }}
                >
                  <option value="">Ninguna</option>
                  {allCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <Spacer y={1} />
                {message && <div>{message}</div>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={handleAddNewCategory}>
                  Agregar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCategory;
