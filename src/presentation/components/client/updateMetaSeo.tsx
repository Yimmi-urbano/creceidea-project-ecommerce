import React, { useEffect, useState } from 'react';

import { Button, Input, Textarea } from '@nextui-org/react';

import { updateSeoMetadata } from '@/src/application/configuration/configurationServices';
import { SeoMetadata } from '@/src/domain/configuration/SeoMetadata';
import { useConfig } from '@/src/presentation/contexts';

const UpdateMetadata: React.FC = () => {
	const { config } = useConfig();
	const [formData, setFormData] = useState<SeoMetadata>({
		title: '',
		slogan: '',
		meta_keyword: '',
		meta_description: '',
	});

	const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	// Estado para controlar el modal
	const [modalMessage, setModalMessage] = useState('');
	const [isModalLoading, setIsModalLoading] = useState(false);

	useEffect(() => {
		if (config) {
			setFormData({
				title: config.title || '',
				slogan: config.slogan || '',
				meta_keyword: config.meta_keyword || '',
				meta_description: config.meta_description || '',
			});
		}
	}, [config]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: keyof SeoMetadata
	): void => {
		setFormData((prev) => ({
			...prev,
			[field]: e.target.value,
		}));
	};

	const handleUpdateMetadata = async (): Promise<void> => {
		setLoading(true);
		setSuccessMessage('');
		setErrorMessage('');

		try {
			setIsModalLoading(true); // Comienza la carga
			await updateSeoMetadata(formData);
			setModalMessage('SEO actualizado correctamente!'); // Actualiza el mensaje con el resultado
			setIsModalLoading(false); // Finaliza la carga
		} catch (error) {
			setErrorMessage('Error al actualizar.');
			setModalMessage('Error al actualizar SEO.');
			setIsModalLoading(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<Input
				label="Título"
				variant="bordered"
				placeholder="Ej: Mi Tienda Online"
				labelPlacement="outside"
				value={formData.title}
				onChange={(e) => handleChange(e, 'title')}
				classNames={{
					inputWrapper: 'bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700',
					input: 'text-zinc-900 dark:text-zinc-100',
				}}
			/>

			<Input
				label="Slogan"
				variant="bordered"
				placeholder="Ej: Calidad al mejor precio"
				labelPlacement="outside"
				value={formData.slogan}
				onChange={(e) => handleChange(e, 'slogan')}
				classNames={{
					inputWrapper: 'bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700',
					input: 'text-zinc-900 dark:text-zinc-100',
				}}
			/>

			<Textarea
				label="Descripción SEO"
				variant="bordered"
				placeholder="Descripción larga para buscadores..."
				labelPlacement="outside"
				value={formData.meta_description}
				onChange={(e) => handleChange(e, 'meta_description')}
				classNames={{
					inputWrapper: 'bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700',
					input: 'text-zinc-900 dark:text-zinc-100',
				}}
			/>

			<Textarea
				label="Palabras Clave (Meta Keywords)"
				variant="bordered"
				placeholder="tienda, ropa, mujer, moda..."
				labelPlacement="outside"
				value={formData.meta_keyword}
				onChange={(e) => handleChange(e, 'meta_keyword')}
				classNames={{
					inputWrapper: 'bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700',
					input: 'text-zinc-900 dark:text-zinc-100',
				}}
			/>

			<Button
				color="primary"
				className="w-full font-medium mt-2"
				onClick={handleUpdateMetadata}
				isLoading={loading || isModalLoading}
			>
				Guardar SEO
			</Button>

			{(successMessage !== '' || modalMessage !== '') && (
				<p className="text-sm text-success mt-2">
					{successMessage !== '' ? successMessage : modalMessage}
				</p>
			)}

			{errorMessage !== '' && <p className="text-sm text-danger mt-2">{errorMessage}</p>}
		</div>
	);
};

export default UpdateMetadata;
