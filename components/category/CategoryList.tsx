import React, { useState, useEffect } from 'react';
import { Card, Button, CardFooter, CardBody, Modal, Input, Spacer, ModalHeader, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react';
import { MiniTrashIcon, EditProductIcon  } from '../icons';
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
    }
  }, [selectedCategory]);

  const handleEditCategory = () => {
    if (selectedCategory) {
      setModalOpen(true);
    }
  };

  const handleSaveCategory = async () => {
    if (selectedCategory) {
      await handleUpdateCategory(selectedCategory._id, title, selectedParent);
      setModalOpen(false);
    }
  };

  const renderCategory = (category: Category) => (
    <div key={category._id} style={{ marginBottom: '20px' }}>
      <Card className="w-full rounded-lg justify-between  flex flex-row border-1 border-[#0ea5e9]/30 bg-[#0c4a6e]/40">
        <CardBody>
          <h4>{category.title}</h4>
        </CardBody>
        <CardFooter className='justify-end gap-4'>
          <Button isIconOnly
           color="success"
           variant="flat"
           className="p-0 min-w-6 w-6 h-6 rounded-md"
          onPress={() => { setSelectedCategory(category); handleEditCategory(); }}>
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
        <div style={{ marginLeft: '20px', marginTop: '20px'}}>
          {category.children.map(child => renderCategory(child))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      {categories.map(category => renderCategory(category))}

      {modalOpen && (
        <Modal isOpen={modalOpen} onOpenChange={(open) => setModalOpen(open)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Editar Categoría - {title}</ModalHeader>
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
                  <Button color="primary" onPress={handleSaveCategory}>
                    Guardar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default CategoryList;
