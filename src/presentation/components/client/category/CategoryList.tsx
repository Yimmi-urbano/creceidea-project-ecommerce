import React, { useState, useEffect } from 'react';
import { Card, Button, CardFooter, CardBody, Modal, Input, Spacer, ModalHeader, ModalBody, ModalContent, ModalFooter, Select, SelectItem } from '@nextui-org/react';
import { MiniTrashIcon, EditProductIcon } from "@/src/presentation/components/shared/Icons";
import { useCategoryContext } from './CategoryContext';

interface Category {
  _id: string;
  title: string;
  icon_url: string;
  parent: string | null;
  productCount: number;
  slug: string;
  children: Category[];
}

const CategoryList: React.FC = () => {
  const { categories, allCategories, message, handleUpdateCategory, handleDeleteCategory } = useCategoryContext();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedParent, setSelectedParent] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCategory) {
      setTitle(selectedCategory.title);
      setSelectedParent(selectedCategory.parent || null);
      setModalOpen(true);
    }
  }, [selectedCategory]);

  const handleSaveCategory = async () => {
    if (selectedCategory) {
      await handleUpdateCategory(selectedCategory._id, title, selectedParent);
      setModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const clearSelection = () => {
    setSelectedParent(null);
  };

  const renderCategory = (category: Category) => (
    <div key={category._id} style={{ marginBottom: '10px' }}>
      <Card isBlurred className="w-full rounded-lg justify-between flex flex-row border-1 border-[#0ea5e9]/30 bg-[#0891b2]">
        <CardBody>
          <h4>{category.title}</h4>
        </CardBody>
        <CardFooter className='justify-end gap-4'>
          <Button
            isIconOnly
            color="success"
            variant="flat"
            className="p-0 min-w-6 w-6 h-6 rounded-md"
            onPress={() => setSelectedCategory(category)}
          >
            <EditProductIcon size={16} />
          </Button>
          <Button
            isIconOnly
            color="danger"
            variant="flat"
            className="p-0 min-w-6 w-6 h-6 rounded-md"
            aria-label="Eliminar"
            onPress={() => handleDeleteCategory(category._id)}
          >
            <MiniTrashIcon size={18} />
          </Button>
        </CardFooter>
      </Card>
      {category.children.length > 0 && (
        <div style={{ marginLeft: '25px', marginTop: '10px' }}>
          {category.children.map(child => renderCategory(child))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      {categories.map(category => renderCategory(category))}

      <Modal isOpen={modalOpen} onOpenChange={setModalOpen} className='backdrop-blur-md border-1 border-[#0ea5e9]/20 bg-[#082f49]/40'>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Editar Categoría - {title}</ModalHeader>
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
            <Button color="danger" variant="light" onPress={handleCloseModal}>
              Cerrar
            </Button>
            <Button color="warning" onPress={handleSaveCategory}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CategoryList;
