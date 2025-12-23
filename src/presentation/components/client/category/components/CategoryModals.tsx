import React from 'react';

import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
} from '@nextui-org/react';
import { AlertTriangle, Edit3, Plus } from 'lucide-react';

interface CategoryModalsProps {
	// Edit Modal
	isEditModalOpen: boolean;
	setIsEditModalOpen: (value: boolean) => void;
	selectedCategoryTitle: string;
	setSelectedCategoryTitle: (value: string) => void;
	selectedParentId: string | null;
	setSelectedParentId: (value: string | null) => void;
	allCategories: { id: string; title: string }[];
	handleSaveEdit: () => void;

	// Delete Modal
	isDeleteModalOpen: boolean;
	setIsDeleteModalOpen: (value: boolean) => void;
	handleConfirmDelete: () => void;

	// Subcategory Modal
	isSubcategoryModalOpen: boolean;
	setIsSubcategoryModalOpen: (value: boolean) => void;
	newSubcategoryTitle: string;
	setNewSubcategoryTitle: (value: string) => void;
	handleSaveSubcategory: () => void;

	// Loading state
	isLoading: boolean;
}

export const CategoryModals: React.FC<CategoryModalsProps> = ({
	isEditModalOpen,
	setIsEditModalOpen,
	selectedCategoryTitle,
	setSelectedCategoryTitle,
	selectedParentId,
	setSelectedParentId,
	allCategories,
	handleSaveEdit,
	isDeleteModalOpen,
	setIsDeleteModalOpen,
	handleConfirmDelete,
	isSubcategoryModalOpen,
	setIsSubcategoryModalOpen,
	newSubcategoryTitle,
	setNewSubcategoryTitle,
	handleSaveSubcategory,
	isLoading,
}) => {
	return (
		<>
			{/* Modal de Edición */}
			<Modal
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				className="bg-white dark:bg-dark-card border border-zinc-200 dark:border-zinc-800"
				classNames={{
					backdrop: 'bg-black/60 backdrop-blur-sm',
					base: 'rounded-2xl shadow-2xl',
					header: 'border-b border-zinc-200 dark:border-zinc-800',
					body: 'py-6',
					footer: 'border-t border-zinc-200 dark:border-zinc-800',
				}}
			>
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1 text-zinc-900 dark:text-zinc-100">
						<div className="flex items-center gap-2">
							<Edit3 size={20} className="text-primary" />
							Editar Categoría
						</div>
					</ModalHeader>
					<ModalBody>
						<Input
							label="Nombre de la categoría"
							placeholder="Ej: Bebidas, Postres, etc."
							value={selectedCategoryTitle}
							onChange={(e) => setSelectedCategoryTitle(e.target.value)}
							classNames={{
								label: 'text-zinc-700 dark:text-zinc-300',
								input: [
									'bg-transparent',
									'text-zinc-900 dark:text-zinc-100',
									'placeholder:text-zinc-400 dark:placeholder:text-zinc-500',
								],
								inputWrapper: [
									'bg-white dark:bg-dark-card',
									'border',
									'border-zinc-200 dark:border-zinc-800',
									'hover:border-zinc-300 dark:hover:border-zinc-700',
									'group-data-[focus=true]:border-primary',
									'rounded-lg',
								],
							}}
						/>
						<Select
							label="Categoría padre (opcional)"
							placeholder="Selecciona una categoría padre"
							selectedKeys={selectedParentId ? [selectedParentId] : []}
							onChange={(e) => setSelectedParentId(e.target.value || null)}
							classNames={{
								trigger: [
									'bg-white dark:bg-dark-card',
									'border border-zinc-200 dark:border-zinc-800',
									'hover:border-zinc-300 dark:hover:border-zinc-700',
									'data-[focus=true]:border-primary',
									'rounded-lg',
								],
								label: 'text-zinc-700 dark:text-zinc-300',
								value: 'text-zinc-900 dark:text-zinc-100',
							}}
						>
							{allCategories.map((cat) => (
								<SelectItem key={cat.id} value={cat.id}>
									{cat.title}
								</SelectItem>
							))}
						</Select>
					</ModalBody>
					<ModalFooter>
						<Button
							variant="light"
							onPress={() => setIsEditModalOpen(false)}
							className="text-zinc-600 dark:text-zinc-400"
							isDisabled={isLoading}
						>
							Cancelar
						</Button>
						<Button
							onPress={handleSaveEdit}
							className="bg-primary hover:bg-primary-hover text-white"
							isLoading={isLoading}
						>
							Guardar Cambios
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			{/* Modal de Eliminación */}
			<Modal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				size="sm"
				className="bg-white dark:bg-dark-card border border-zinc-200 dark:border-zinc-800"
				classNames={{
					backdrop: 'bg-black/60 backdrop-blur-sm',
					base: 'rounded-2xl shadow-2xl',
					header: 'border-b border-zinc-200 dark:border-zinc-800',
					body: 'py-6',
					footer: 'border-t border-zinc-200 dark:border-zinc-800',
				}}
			>
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1">
						<div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
							<AlertTriangle size={20} />
							Confirmar Eliminación
						</div>
					</ModalHeader>
					<ModalBody>
						<p className="text-zinc-700 dark:text-zinc-300">
							¿Estás seguro de que deseas eliminar esta categoría?
						</p>
						<p className="text-sm text-zinc-500 dark:text-zinc-400">
							Esta acción no se puede deshacer. Si la categoría tiene subcategorías, también serán
							eliminadas.
						</p>
					</ModalBody>
					<ModalFooter>
						<Button
							variant="light"
							onPress={() => setIsDeleteModalOpen(false)}
							className="text-zinc-600 dark:text-zinc-400"
							isDisabled={isLoading}
						>
							Cancelar
						</Button>
						<Button
							color="danger"
							onPress={handleConfirmDelete}
							isLoading={isLoading}
							className="bg-rose-600 hover:bg-rose-700 text-white"
						>
							Eliminar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			{/* Modal de Nueva Subcategoría */}
			<Modal
				isOpen={isSubcategoryModalOpen}
				onClose={() => setIsSubcategoryModalOpen(false)}
				className="bg-white dark:bg-dark-card border border-zinc-200 dark:border-zinc-800"
				classNames={{
					backdrop: 'bg-black/60 backdrop-blur-sm',
					base: 'rounded-2xl shadow-2xl',
					header: 'border-b border-zinc-200 dark:border-zinc-800',
					body: 'py-6',
					footer: 'border-t border-zinc-200 dark:border-zinc-800',
				}}
			>
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1 text-zinc-900 dark:text-zinc-100">
						<div className="flex items-center gap-2">
							<Plus size={20} className="text-primary" />
							Nueva Subcategoría
						</div>
					</ModalHeader>
					<ModalBody>
						<Input
							label="Nombre de la subcategoría"
							placeholder="Ej: Dulces, Salados, etc."
							value={newSubcategoryTitle}
							onChange={(e) => setNewSubcategoryTitle(e.target.value)}
							classNames={{
								label: 'text-zinc-700 dark:text-zinc-300',
								input: [
									'bg-transparent',
									'text-zinc-900 dark:text-zinc-100',
									'placeholder:text-zinc-400 dark:placeholder:text-zinc-500',
								],
								inputWrapper: [
									'bg-white dark:bg-dark-card',
									'border',
									'border-zinc-200 dark:border-zinc-800',
									'hover:border-zinc-300 dark:hover:border-zinc-700',
									'group-data-[focus=true]:border-primary',
									'rounded-lg',
								],
							}}
						/>
						<p className="text-xs text-zinc-500 dark:text-zinc-400">
							Esta subcategoría se agregará dentro de la categoría seleccionada.
						</p>
					</ModalBody>
					<ModalFooter>
						<Button
							variant="light"
							onPress={() => setIsSubcategoryModalOpen(false)}
							className="text-zinc-600 dark:text-zinc-400"
							isDisabled={isLoading}
						>
							Cancelar
						</Button>
						<Button
							onPress={handleSaveSubcategory}
							className="bg-primary hover:bg-primary-hover text-white"
							isLoading={isLoading}
							isDisabled={!newSubcategoryTitle.trim()}
						>
							Agregar Subcategoría
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
