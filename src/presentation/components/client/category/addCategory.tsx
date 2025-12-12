import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Spacer, useDisclosure, Select, SelectItem, Link } from '@nextui-org/react';
import { useCategoryContext } from '@/src/presentation/components/client/category/CategoryContext';

const AddCategory: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedParent, setSelectedParent] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { allCategories, handleAddCategory } = useCategoryContext();

  const handleAddNewCategory = async () => {
    try {
      await handleAddCategory(title, selectedParent);
      setTitle('');
      setSelectedParent(null);
      onOpenChange();
    } catch (error) {
      setMessage('Error al agregar la categoría');
      console.error(error);
    }
  };

  const clearSelection = () => {
    setSelectedParent(null);
  };


  return (
    <>

      <Button isIconOnly color='warning' className='text-lg' onPress={onOpen}>+</Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className='bg-white dark:bg-dark-card border border-zinc-200 dark:border-zinc-800'
        classNames={{
          backdrop: "bg-black/60 backdrop-blur-sm",
          base: "rounded-2xl shadow-2xl",
          header: "border-b border-zinc-200 dark:border-zinc-800",
          body: "py-6",
          footer: "border-t border-zinc-200 dark:border-zinc-800"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-zinc-900 dark:text-zinc-100">
                Agregar Categoría
              </ModalHeader>
              <ModalBody>
                <Input
                  isClearable
                  fullWidth
                  size="lg"
                  placeholder="Título"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  classNames={
                    {
                      label: "text-zinc-700 dark:text-zinc-300",
                      innerWrapper: "bg-transparent",
                      input: [
                        "bg-transparent",
                        "text-zinc-900 dark:text-zinc-100",
                        "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
                      ],
                      inputWrapper: [
                        "bg-white dark:bg-dark-card",
                        "border",
                        "border-zinc-200 dark:border-zinc-800",
                        "hover:border-zinc-300 dark:hover:border-zinc-700",
                        "group-data-[focus=true]:border-primary",
                        "!cursor-text",
                        "rounded-lg",
                      ],
                    }
                  }
                />
                <Spacer y={1} />

                <Select
                  label="Seleccionar categoría"
                  selectedKeys={[selectedParent || '']}
                  onChange={(e) => setSelectedParent(e.target.value || null)}
                  description="Deje en blanco si es una categoría PRINCIPAL."
                  classNames={{
                    trigger: [
                      "bg-white dark:bg-dark-card",
                      "border border-zinc-200 dark:border-zinc-800",
                      "hover:border-zinc-300 dark:hover:border-zinc-700",
                      "data-[focus=true]:border-primary",
                      "rounded-lg"
                    ],
                    popoverContent: [
                      "bg-white dark:bg-dark-card",
                      "border border-zinc-200 dark:border-zinc-800",
                      "rounded-lg"
                    ],
                    label: "text-zinc-700 dark:text-zinc-300",
                    value: "text-zinc-900 dark:text-zinc-100"
                  }}
                >
                  {allCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </Select>
                {selectedParent && (
                  <Button
                    color='danger'
                    variant='flat'
                    onClick={clearSelection}
                    className="mt-2"
                  >
                    Limpiar selección
                  </Button>
                )}
                <Spacer y={1} />
                {message && <div className="text-sm text-amber-600 dark:text-amber-500">{message}</div>}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Cerrar
                </Button>
                <Button
                  onPress={handleAddNewCategory}
                  className="bg-primary hover:bg-primary-hover text-white font-medium"
                >
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
