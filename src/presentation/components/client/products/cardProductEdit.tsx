import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import {
	SortableContext,
	arrayMove,
	useSortable,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
	Button,
	Image,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Spinner,
	Tooltip,
} from '@nextui-org/react';

import { deleteProduct } from '@/src/application/products/productServices';
import { API_ENDPOINTS, buildUrl } from '@/src/infrastructure/http/apiConfig';
import withPermission from '@/src/presentation/components/client/withPermission';
import { MiniEyeIcon, MiniTrashIcon } from '@/src/presentation/components/shared/Icons';
import { useProductContext } from '@/src/presentation/contexts';

async function updateOrderApi(
	id_product: string,
	order: number,
	order_type: string
): Promise<void> {
	const domain = typeof window !== 'undefined' ? (localStorage.getItem('domainSelect') ?? '') : '';
	const domainPrimary = domain;
	await fetch(buildUrl(API_ENDPOINTS.PRODUCTS, '/sorter_custom/update-order-single'), {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json', domain: domainPrimary },
		body: JSON.stringify({ id_product, order, order_type }),
	});
}

interface SortableItemProps {
	item: any;
	isOrdering: boolean;
	handlePress: (id: string) => void;
	openModal: (id: string) => void;
	updateOrderDirect: (
		id: string,
		newOrder: number,
		range: { pageStart: number; pageEnd: number },
		order_type: string
	) => Promise<void>;
	bumpOrder: (
		id: string,
		delta: 1 | -1,
		range: { pageStart: number; pageEnd: number },
		order_type: string
	) => Promise<void>;
	pageStart: number;
	pageEnd: number;
	minOrder?: number;
	maxOrder?: number;
}

const SortableItem: React.FC<SortableItemProps> = ({
	item,
	isOrdering,
	handlePress,
	openModal,
	bumpOrder,
	pageStart,
	pageEnd,
	minOrder = 1,
	maxOrder,
}) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: item._id,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const disableUp = item.order <= minOrder;
	const disableDown = maxOrder !== undefined ? item.order >= maxOrder : false;

	return (
		<div ref={setNodeRef} style={style} {...(isOrdering ? { ...attributes, ...listeners } : {})}>
			<div
				className={`w-full rounded-xl flex flex-row border transition-all ${isOrdering ? 'cursor-grab hover:border-primary' : ''} bg-white dark:bg-dark-card border-zinc-200 dark:border-zinc-800 hover:shadow-md`}
			>
				<div
					className="flex items-center gap-4 p-2 flex-grow"
					onClick={() => {
						if (isOrdering === false) {
							handlePress(item._id);
						}
					}}
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
								<circle cx="9" cy="12" r="1" />
								<circle cx="9" cy="5" r="1" />
								<circle cx="9" cy="19" r="1" />
								<circle cx="15" cy="12" r="1" />
								<circle cx="15" cy="5" r="1" />
								<circle cx="15" cy="19" r="1" />
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
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<polyline points="18 15 12 9 6 15" />
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
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<polyline points="6 9 12 15 18 9" />
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
							<h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 mb-1 truncate">
								{String(item.title)}
							</h3>
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
	const {
		products,
		fetchProducts,
		page,
		limit,
		totalProducts,
		isOrdering,
		orderedProducts,
		setOrderedProducts,
	} = useProductContext();
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const loadProducts = (): void => {
			setIsLoading(true);
			void fetchProducts();
			setIsLoading(false);
		};
		loadProducts();
	}, [fetchProducts]);

	useEffect(() => {
		if (products && products.length > 0) {
			const sorted = [...products].sort((a: any, b: any) => a.order - b.order);
			setOrderedProducts(sorted);
		}
	}, [products, page]);

	const pageStart = (page - 1) * limit + 1;
	const pageEnd = pageStart + orderedProducts.length - 1;

	const normalizeOrder = (items: any[]): any[] =>
		items.map((p, i) => ({ ...p, order: pageStart + i }));

	const handlePress = (id: string): void => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('selectedCardId', id);
		}
		router.push('/dashboard/products/edit');
	};

	const openModal = (productId: string): void => {
		setSelectedProductId(productId);
		setIsModalOpen(true);
	};

	const closeModal = (): void => {
		setIsModalOpen(false);
		setSelectedProductId(null);
	};

	const handleDelete = async (): Promise<void> => {
		if (selectedProductId !== null) {
			await deleteProduct(selectedProductId);
			void fetchProducts();
			closeModal();
		}
	};

	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

	const handleDragEnd = (event: any): void => {
		const { active, over } = event;
		if (over !== null && active.id !== over.id) {
			const oldIndex = orderedProducts.findIndex((i: any) => i._id === active.id);
			const newIndex = orderedProducts.findIndex((i: any) => i._id === over.id);
			setOrderedProducts(normalizeOrder(arrayMove(orderedProducts, oldIndex, newIndex)));
		}
	};

	const updateOrderDirect = async (
		id: string,
		newOrder: number,
		range: { pageStart: number; pageEnd: number },
		order_type: string
	): Promise<void> => {
		const { pageStart: ps, pageEnd: pe } = range;
		if (!Number.isFinite(newOrder) || newOrder < 1) {
			return;
		}
		const item = orderedProducts.find((i: any) => i._id === id);
		if (item === undefined || newOrder === (item as any).order) {
			return;
		}

		if (newOrder < ps || newOrder > pe) {
			try {
				await updateOrderApi(id, newOrder, order_type);
				void fetchProducts();
			} finally {
				void fetchProducts();
			}
			return;
		}

		const currentIndex = orderedProducts.findIndex((i: any) => i._id === id);
		const targetIndex = newOrder - ps;
		setOrderedProducts(normalizeOrder(arrayMove(orderedProducts, currentIndex, targetIndex)));
	};

	const bumpOrder = async (
		id: string,
		delta: 1 | -1,
		range: { pageStart: number; pageEnd: number },
		order_type: string
	): Promise<void> => {
		const { pageStart: ps, pageEnd: pe } = range;
		const item = orderedProducts.find((i: any) => i._id === id);
		if (item === undefined) {
			return;
		}
		const newOrder = (item as any).order + delta;
		if (newOrder < 1) {
			return;
		}
		if (newOrder < ps || newOrder > pe) {
			try {
				await updateOrderApi(id, newOrder, order_type);
				await fetchProducts();
			} finally {
				await fetchProducts();
			}
			return;
		}

		const currentIndex = orderedProducts.findIndex((i: any) => i._id === id);
		const targetIndex = newOrder - ps;
		setOrderedProducts(normalizeOrder(arrayMove(orderedProducts, currentIndex, targetIndex)));
	};

	return (
		<>
			{isLoading ? (
				<div className="flex justify-center items-center h-40">
					<Spinner size="lg" />
				</div>
			) : orderedProducts.length > 0 ? (
				<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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

export default withPermission(CardProducts, 'inventario');
