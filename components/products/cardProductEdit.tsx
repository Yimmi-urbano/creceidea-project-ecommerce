import React, { useState } from 'react';
import { Card, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { MiniEyeIcon, MiniTrashIcon } from '../icons';
import { useProductContext } from '@/hooks/contextProduct';
import withPermission from "../withPermission";
import { deleteProduct } from '@/hooks/fetchProducts';
import { useRouter } from "next/navigation";

const CardProducts: React.FC = () => {
  const { products, fetchProducts } = useProductContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const router = useRouter();

  const handlePress = (id: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCardId", id);
    }
    router.push("/dashboard/products/edit");
  };

  const openModal = (productId: string) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const handleDelete = async () => {
    if (selectedProductId) {
      await deleteProduct(selectedProductId);
      fetchProducts();
      closeModal();
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {products.map((item) => (
          <Card key={item._id} isBlurred isPressable onPress={() => handlePress(item._id)} shadow='none' className="w-full rounded-lg flex flex-row border-1 border-[#0ea5e9]/30 bg-[#0891b2]">
            <div className="flex items-center gap-4 p-2 flex-grow">
              <img src={item.image_default[0]} alt={item.title} className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <h3 className="font-bold text-sm">{item.title}</h3>
                <div className="flex items-baseline gap-2">
                  {item.price.sale > 0 && item.price.sale !== item.price.regular ? (
                    <>
                      <p className="text-sm line-through text-red-500 dark:text-red-300">
                        S/ {item.price.regular.toFixed(2)}
                      </p>
                      <p className="text-sm font-bold text-green-600 dark:text-green-300">
                        S/ {item.price.sale.toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm font-bold text-green-600 dark:text-green-300">
                      S/ {item.price.regular.toFixed(2)}
                    </p>
                  )}
                </div>

              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-3 pr-3">
              <Button isIconOnly color="success" variant="flat" className="p-0 min-w-6 w-6 h-6 rounded-md" aria-label="Ver Detalles">
                <MiniEyeIcon size={18} />
              </Button>
              <Button
                isIconOnly
                color="danger"
                variant="flat"
                className="p-0 min-w-6 w-6 h-6 rounded-md"
                aria-label="Eliminar"
                onPress={() => openModal(item._id)}
              >
                <MiniTrashIcon size={18} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent>
          <ModalHeader>
            Confirmar Eliminación
          </ModalHeader>
          <ModalBody>
            <p>¿Estás seguro de que deseas eliminar este producto?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onPress={handleDelete}>
              Eliminar
            </Button>
            <Button onPress={closeModal}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default withPermission(CardProducts, 'inventario');
