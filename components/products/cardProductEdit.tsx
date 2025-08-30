import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Card,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Image,
  Spinner,
  Input,
  Tooltip,
} from "@nextui-org/react";
import { MiniEyeIcon, MiniTrashIcon } from "../icons";
import { useProductContext } from "@/hooks/contextProduct";
import withPermission from "../withPermission";
import { deleteProduct } from "@/hooks/fetchProducts";
import { useRouter } from "next/navigation";

async function updateOrderApi(id_product: string, order: number, order_type: string) {
  const domain = localStorage.getItem("domainSelect") ?? '';
  const domainPrimary = domain;
  await fetch("http://localhost:4600/api/products/sorter_custom/update-order-single", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", 'domain': domainPrimary, },
    body: JSON.stringify({ id_product, order, order_type }),
  });
}

302188495

const SortableItem = ({
  item,
  isOrdering,
  handlePress,
  openModal,
  updateOrderDirect,
  bumpOrder,
  pageStart,
  pageEnd,
  minOrder = 1,
  maxOrder,
}: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const disableUp = item.order <= minOrder;
  const disableDown = maxOrder ? item.order >= maxOrder : false;

  return (
    <div ref={setNodeRef} style={style} {...(isOrdering ? { ...attributes, ...listeners } : {})}>
      <Card
        isBlurred
        shadow="none"
        className={`w-full rounded-lg flex flex-row border-1 border-[#0ea5e9]/30 ${isOrdering ? "cursor-grab" : ""} bg-[#0891b2]`}
      >
        <div
          className="flex items-center gap-4 p-2 flex-grow"
          onClick={() => !isOrdering && handlePress(item._id)}
        >
          {isOrdering && (
            <div className="flex items-center gap-2">
              <svg
                {...listeners}   // 🔥 solo aquí
                {...attributes}  // 🔥 solo aquí
                className="drag-handle cursor-grab touch-none"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="12" r="1"></circle>
                <circle cx="9" cy="5" r="1"></circle>
                <circle cx="9" cy="19" r="1"></circle>
                <circle cx="15" cy="12" r="1"></circle>
                <circle cx="15" cy="5" r="1"></circle>
                <circle cx="15" cy="19" r="1"></circle>
              </svg>

              <div className="flex items-center gap-1">
                <Tooltip content="Subir una posición">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    onPress={(e) => {
                      (e as any).target?.dispatchEvent(new Event("stop"))
                      bumpOrder(item._id, -1, { pageStart, pageEnd }, 'prev');
                    }}
                    isDisabled={disableUp}
                    className="min-w-6 w-6 h-6"
                  >
                    ↑
                  </Button>
                </Tooltip>

                <Input
                  type="tel"
                  size="sm"
                  className="w-7 text-[13px] hidden"
                  value={String(item.order)}
                  min={1}
                  max={maxOrder}
                  onChange={(e) => {
                    (e as any).target?.dispatchEvent(new Event("stop"))
                    const v = Number(e.target.value);
                    if (Number.isNaN(v)) return;
                    updateOrderDirect(item._id, v, { pageStart, pageEnd });
                  }}
                />

                <Tooltip content="Bajar una posición">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    onPress={(e) => {
                      (e as any).target?.dispatchEvent(new Event("stop"))
                      bumpOrder(item._id, +1, { pageStart, pageEnd }, 'next');
                    }}
                    isDisabled={disableDown}
                    className="min-w-6 w-6 h-6"
                  >
                    ↓
                  </Button>
                </Tooltip>
              </div>
            </div>
          )}
          <Image
            src={item.image_default?.[0]}
            alt={item.title}
            className="w-10 h-10 border-1 border-[#0ea5e9]/30 rounded-md object-cover"
          />
          <div>
            <h3 className="font-bold text-left mb-1 text-xs">{item.title}</h3>
            <div className="flex items-baseline gap-2">
              {item.price.sale > 0 && item.price.sale !== item.price.regular ? (
                <>
                  <p className="text-xs line-through text-red-500 dark:text-red-300">
                    S/ {item.price.regular.toFixed(2)}
                  </p>
                  <p className="text-xs font-bold text-green-600 dark:text-green-300">
                    S/ {item.price.sale.toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-xs font-bold text-green-600 dark:text-green-300">
                  S/ {item.price.regular.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Acciones */}
        {!isOrdering && (
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 pr-3">
            <Button
              isIconOnly
              color="success"
              variant="flat"
              onPress={() => handlePress(item._id)}
              className="p-0 min-w-6 w-6 h-6 rounded-md"
              aria-label="Ver Detalles"
            >
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
        )}
      </Card>
    </div>
  );
};

const CardProducts: React.FC = () => {
  const { products, fetchProducts, page, limit, totalProducts, isOrdering, orderedProducts, setOrderedProducts } = useProductContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      fetchProducts();
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (products && products.length > 0) {
      const sorted = [...products].sort((a, b) => a.order - b.order);
      setOrderedProducts(sorted);
    }
  }, [products, page]);

  const pageStart = (page - 1) * limit + 1;
  const pageEnd = pageStart + orderedProducts.length - 1;

  const normalizeOrder = (items: any[]) =>
    items.map((p, i) => ({ ...p, order: pageStart + i }));

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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setOrderedProducts((items: any) => {
        const oldIndex = items.findIndex((i: any) => i._id === active.id);
        const newIndex = items.findIndex((i: any) => i._id === over.id);
        return normalizeOrder(arrayMove(items, oldIndex, newIndex));
      });
    }
  };

  const updateOrderDirect = async (
    id: string,
    newOrder: number,
    { pageStart, pageEnd }: { pageStart: number; pageEnd: number },
    order_type: string
  ) => {

    if (!Number.isFinite(newOrder) || newOrder < 1) return;
    const item = orderedProducts.find((i: any) => i._id === id);
    if (!item || newOrder === item.order) return;

    if (newOrder < pageStart || newOrder > pageEnd) {
      try {
        await updateOrderApi(id, newOrder, order_type);
         fetchProducts();
      } finally {
         fetchProducts(); 
      }
      return;
    }

    setOrderedProducts((items: any) => {
      const currentIndex = items.findIndex((i: any) => i._id === id);
      const targetIndex = newOrder - pageStart;
      return normalizeOrder(arrayMove(items, currentIndex, targetIndex));
    });
  };

  const bumpOrder = async (
    id: string,
    delta: 1 | -1,
    { pageStart, pageEnd }: { pageStart: number; pageEnd: number },
    order_type: string
  ) => {
    const item = orderedProducts.find((i: any) => i._id === id);
    if (!item) return;
    const newOrder = item.order + delta;
    if (newOrder < 1) return;
    if (newOrder < pageStart || newOrder > pageEnd) {
      try {
        await updateOrderApi(id, newOrder, order_type);
        await fetchProducts();
      } finally {
        await fetchProducts();
      }
      return;
    }

    setOrderedProducts((items: any) => {
      const currentIndex = items.findIndex((i: any) => i._id === id);
      const targetIndex = newOrder - pageStart;
      return normalizeOrder(arrayMove(items, currentIndex, targetIndex));
    });
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner size="lg" />
        </div>
      ) : orderedProducts.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}

        >
          <SortableContext
            items={orderedProducts.map((p: any) => p._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-3">
              {orderedProducts.map((item: any) => (
                <SortableItem
                  key={item._id}
                  item={item}
                  isOrdering={isOrdering}
                  handlePress={handlePress}
                  openModal={openModal}
                  updateOrderDirect={updateOrderDirect}
                  bumpOrder={bumpOrder}
                  pageStart={pageStart}
                  pageEnd={pageEnd}
                  minOrder={1}
                  maxOrder={totalProducts}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="flex flex-col justify-center items-center h-40">
          <Image className="w-16 h-16" src="/espera.gif" />
          <p className="text-lg font-normal text-gray-100 text-center">
            Aún no has agregado productos a tu tienda. <br />
            ¡Empieza a agregar productos y expande tu catálogo!
          </p>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent>
          <ModalHeader>Confirmar Eliminación</ModalHeader>
          <ModalBody>
            <p>¿Estás seguro de que deseas eliminar este producto?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onPress={handleDelete}>
              Eliminar
            </Button>
            <Button onPress={closeModal}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default withPermission(CardProducts, "inventario");
