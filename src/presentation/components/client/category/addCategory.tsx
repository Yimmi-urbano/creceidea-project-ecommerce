import React, { useState } from 'react';

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
	useDisclosure,
} from '@nextui-org/react';
import { Plus } from 'lucide-react';

import { useCategoryContext } from '@/src/presentation/components/client/category/CategoryContext';

const AddCategory: React.FC = () => {
	const [title, setTitle] = useState('');
	const [selectedParent, setSelectedParent] = useState<string | null>(null);
	const [message, setMessage] = useState<string>('');
	const [isLoading, setIsLoading] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { allCategories, handleAddCategory } = useCategoryContext();

	const handleAddNewCategory = async () => {
		if (!title.trim()) {
			return;
		}

		setIsLoading(true);
		try {
			await handleAddCategory(title, selectedParent);
			setTitle('');
			setSelectedParent(null);
			setMessage('');
			onOpenChange();
		} catch (error) {
			setMessage('Error al agregar la categoría');
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleClose = () => {
		setTitle('');
		setSelectedParent(null);
		setMessage('');
		onOpenChange();
	};

	return (
		<>
			<Button
				onPress={onOpen}
				className="bg-primary hover:bg-primary-hover text-white font-medium shadow-lg shadow-primary/25 transition-all flex items-center gap-2"
				startContent={<Plus size={18} />}
			>
				Nueva Categoría
			</Button>

			<Modal
				isOpen={isOpen}
				onClose={handleClose}
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
							Agregar Categoría
						</div>
					</ModalHeader>
					<ModalBody>
						<Input
							label="Nombre de la categoría"
							placeholder="Ej: Bebidas, Postres, etc."
							value={title}
							onChange={(e) => setTitle(e.target.value)}
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
							selectedKeys={selectedParent ? [selectedParent] : []}
							onChange={(e) => setSelectedParent(e.target.value || null)}
							description="Deje en blanco si es una categoría PRINCIPAL."
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
								description: 'text-xs text-zinc-500 dark:text-zinc-400',
							}}
						>
							{allCategories.map((category) => (
								<SelectItem key={category.id} value={category.id}>
									{category.title}
								</SelectItem>
							))}
						</Select>

						{message && (
							<div className="text-sm text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 p-3 rounded-lg">
								{message}
							</div>
						)}
					</ModalBody>
					<ModalFooter>
						<Button
							variant="light"
							onPress={handleClose}
							className="text-zinc-600 dark:text-zinc-400"
							isDisabled={isLoading}
						>
							Cancelar
						</Button>
						<Button
							onPress={handleAddNewCategory}
							className="bg-primary hover:bg-primary-hover text-white"
							isLoading={isLoading}
							isDisabled={!title.trim()}
						>
							Agregar Categoría
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AddCategory;
