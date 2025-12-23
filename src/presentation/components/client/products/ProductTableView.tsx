'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
	Button,
	Image,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react';
import { Edit3, Trash2 } from 'lucide-react';

import { deleteProduct } from '@/src/application/products/productServices';
import { Badge } from '@/src/presentation/components/shared/Badge';
import { IconButton } from '@/src/presentation/components/shared/IconButton';
import { useProductContext } from '@/src/presentation/contexts';

interface ProductTableViewProps {
	searchTerm?: string;
}

export const ProductTableView: React.FC<ProductTableViewProps> = ({ searchTerm = '' }) => {
	const { products, isLoading, fetchProducts } = useProductContext();
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);

	const filteredProducts =
		products?.filter((p) => p.title?.toLowerCase().includes(searchTerm.toLowerCase())) || [];

	const handleEdit = (id: string) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('selectedCardId', id);
		}
		router.push('/dashboard/products/edit');
	};

	const openDeleteModal = (productId: string) => {
		setSelectedProductId(productId);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedProductId(null);
	};

	const handleDelete = async () => {
		if (selectedProductId) {
			setIsDeleting(true);
			try {
				await deleteProduct(selectedProductId);
				await fetchProducts();
				closeModal();
			} catch (error) {
				console.error('Error al eliminar producto:', error);
			} finally {
				setIsDeleting(false);
			}
		}
	};

	if (isLoading) {
		return (
			<table className="w-full text-left text-sm">
				<thead className="text-xs uppercase font-semibold bg-zinc-50 dark:bg-dark-bg text-zinc-500 dark:text-zinc-400">
					<tr>
						<th className="px-6 py-4">Producto</th>
						<th className="px-6 py-4">Estado</th>
						<th className="px-6 py-4">Precio</th>
						<th className="px-6 py-4">Inventario</th>
						<th className="px-6 py-4 text-right">Acciones</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
					{[1, 2, 3, 4, 5, 6].map((i) => (
						<tr key={i} className="animate-pulse">
							<td className="px-6 py-4 flex items-center gap-4">
								<div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
								<div className="h-5 w-48 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
							</td>
							<td className="px-6 py-4">
								<div className="h-5 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800" />
							</td>
							<td className="px-6 py-4">
								<div className="h-5 w-20 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
							</td>
							<td className="px-6 py-4">
								<div className="h-5 w-20 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
							</td>
							<td className="px-6 py-4 text-right">
								<div className="flex items-center justify-end gap-2">
									<div className="h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
									<div className="h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}

	if (filteredProducts.length === 0) {
		return (
			<div className="flex flex-col justify-center items-center h-64">
				<Image className="w-16 h-16" src="/espera.gif" alt="No products" />
				<p className="text-lg font-normal text-gray-500 dark:text-gray-400 text-center mt-4">
					{searchTerm
						? 'No se encontraron productos'
						: 'Aún no has agregado productos a tu tienda.'}
					<br />
					{!searchTerm && '¡Empieza a agregar productos y expande tu catálogo!'}
				</p>
			</div>
		);
	}

	return (
		<>
			<table className="w-full text-left text-sm">
				<thead className="text-xs uppercase font-semibold bg-zinc-50 dark:bg-dark-bg text-zinc-500 dark:text-zinc-400">
					<tr>
						<th className="px-6 py-4">Producto</th>
						<th className="px-6 py-4">Estado</th>
						<th className="px-6 py-4">Precio</th>
						<th className="px-6 py-4">Inventario</th>
						<th className="px-6 py-4 text-right">Acciones</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
					{filteredProducts.map((product: any) => (
						<tr
							key={product._id}
							className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
						>
							<td className="px-6 py-4 flex items-center gap-4">
								<img
									src={product.image_default?.[0] || '/placeholder-product.png'}
									className="w-10 h-10 rounded-lg object-cover"
									alt={product.title}
								/>
								<span className="font-medium text-zinc-900 dark:text-zinc-200">
									{product.title}
								</span>
							</td>
							<td className="px-6 py-4">
								<Badge status={product.is_available || 'draft'} />
							</td>
							<td className="px-6 py-4 font-medium">
								{product.price?.sale > 0 && product.price.sale !== product.price.regular ? (
									<div className="flex items-center gap-2">
										<span className="text-xs line-through text-zinc-400 dark:text-zinc-500">
											S/ {product.price.regular.toFixed(2)}
										</span>
										<span className="text-sm font-bold text-primary">
											S/ {product.price.sale.toFixed(2)}
										</span>
									</div>
								) : (
									<span className="text-sm font-medium">
										S/ {product.price?.regular?.toFixed(2) || '0.00'}
									</span>
								)}
							</td>
							<td className="px-6 py-4 font-medium">
								<span className="text-sm font-medium">{product?.stock || 0}</span>
							</td>
							<td className="px-6 py-4 text-right">
								<div className="flex items-center justify-end gap-2">
									<IconButton icon={Edit3} onClick={() => handleEdit(product._id)} />
									<IconButton
										icon={Trash2}
										variant="danger"
										onClick={() => openDeleteModal(product._id)}
									/>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* Delete Confirmation Modal */}
			<Modal isOpen={isModalOpen} onClose={closeModal} size="sm">
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1">Confirmar Eliminación</ModalHeader>
					<ModalBody>
						<p>¿Estás seguro de que deseas eliminar este producto?</p>
						<p className="text-sm text-zinc-500">Esta acción no se puede deshacer.</p>
					</ModalBody>
					<ModalFooter>
						<Button variant="light" onPress={closeModal} isDisabled={isDeleting}>
							Cancelar
						</Button>
						<Button color="danger" onPress={handleDelete} isLoading={isDeleting}>
							{isDeleting ? 'Eliminando...' : 'Eliminar'}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
