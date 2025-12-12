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
import { MiniEyeIcon, MiniTrashIcon } from "@/src/presentation/components/shared/Icons";
import { useProductContext } from "@/src/presentation/contexts";
import withPermission from "@/src/presentation/components/client/WithPermission";
import { deleteProduct } from "@/src/application/products/productServices";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS, buildUrl } from "@/src/infrastructure/http/apiConfig";

async function updateOrderApi(id_product: string, order: number, order_type: string) {
  const domain = localStorage.getItem("domainSelect") ?? '';
  const domainPrimary = domain;
  await fetch(buildUrl(API_ENDPOINTS.PRODUCTS, '/sorter_custom/update-order-single'), {
    method: "PATCH",
    headers: { "Content-Type": "application/json", 'domain': domainPrimary, },
    body: JSON.stringify({ id_product, order, order_type }),
  });
}

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
      <div
        className={`w-full rounded-xl flex flex-row border transition-all ${isOrdering ? "cursor-grab hover:border-primary" : ""} bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800 hover:shadow-md`}
      >
        <div
          className="flex items-center gap-4 p-2 flex-grow"
          onClick={() => !isOrdering && handlePress(item._id)}
        >
          {isOrdering && (
            <div className="flex items-center gap-2 mr-2">
              {/* Drag Handle */}
              <svg
                {...listeners}
                {...attributes}
                className="drag-handle cursor-grab touch-none text-zinc-400 hover:text-primary transition-colors"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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

              {/* Order Controls */}
              <div className="flex flex-col gap-0.5">
                <Tooltip content="Subir">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      bumpOrder(item._id, -1, { pageStart, pageEnd }, 'prev');
                    }}
                    disabled={disableUp}
                    className="w-6 h-5 rounded flex items-center justify-center text-xs transition-all bg-transparent hover:bg-primary/10 text-zinc-600 dark:text-zinc-400 hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                  </button>
                </Tooltip>

                <Tooltip content="Bajar">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      bumpOrder(item._id, +1, { pageStart, pageEnd }, 'next');
                    }}
                    disabled={disableDown}
                    className="w-6 h-5 rounded flex items-center justify-center text-xs transition-all bg-transparent hover:bg-primary/10 text-zinc-600 dark:text-zinc-400 hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </Tooltip>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3 flex-1">
            <img
              src={item.image_default?.[0]}
              alt={item.title}
              className="w-14 h-14 rounded-xl object-cover border border-zinc-200 dark:border-zinc-700 shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 mb-1 truncate">{item.title}</h3>
              <div className="flex items-baseline gap-2">
                {item.price.sale > 0 && item.price.sale !== item.price.regular ? (
                  <>
                    <p className="text-xs line-through text-zinc-400 dark:text-zinc-500">
                      S/ {item.price.regular.toFixed(2)}
                    </p>
                    <p className="text-sm font-bold text-primary">
                      S/ {item.price.sale.toFixed(2)}
                    </p>
                  </>
                ) : (
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">
                    S/ {item.price.regular.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        {!isOrdering && (
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 pr-4">
            <button
              onClick={() => handlePress(item._id)}
              className="p-2 rounded-lg text-zinc-400 hover:text-primary hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Ver Detalles"
            >
              <MiniEyeIcon size={18} />
            </button>
            <button
              onClick={() => openModal(item._id)}
              className="p-2 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
              aria-label="Eliminar"
            >
              <MiniTrashIcon size={18} />
            </button>
          </div>
        )}
      </div>
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
      const sorted = [...products].sort((a: any, b: any) => a.order - b.order);
      setOrderedProducts(sorted);
    }
  }, [products, page]);

  const pageStart = (page - 1) * limit + 1;
  const pageEnd = pageStart + orderedProducts.length - 1;

  const normalizeOrder = (items: any[]) =>
    items.map((p, i) => ({ ...p, order: pageStart + i })) as any[];

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
