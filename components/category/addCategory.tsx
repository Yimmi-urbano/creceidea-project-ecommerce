import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Spacer, useDisclosure, Select, SelectItem, Link } from '@nextui-org/react';
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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='backdrop-blur-md border-1 border-[#0ea5e9]/20 bg-[#082f49]/40'>
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
                  classNames={
                    {
                        label: "text-black/50 dark:text-white/90",
                        innerWrapper: "bg-transparent",
                        input: [
                            "bg-transparent",
                            "text-black/90 dark:text-white/90",
                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                        ],
                        inputWrapper: [
                            
                            "bg-cyan-500/50",
                            "dark:bg-cyan-600/10",
                            "backdrop-blur-xl",
                            "backdrop-saturate-200",
                            "hover:bg-default-200/70",
                            "dark:hover:bg-default/70",
                            "group-data-[focus=true]:bg-default-200/50",
                            "dark:group-data-[focus=true]:bg-default/60",
                            "!cursor-text",
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
                    trigger: ["bg-[#082f49]/90"],
                    popoverContent: ["backdrop-blur-md bg-[#082f49]/80"]
    
                  }}
                >
                  {allCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </Select>
                {selectedParent && <Button color='danger' variant='flat' onClick={clearSelection}>Limpiar selección</Button>}
                <Spacer y={1} />
                {message && <div>{message}</div>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="warning" onPress={handleAddNewCategory}>
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
