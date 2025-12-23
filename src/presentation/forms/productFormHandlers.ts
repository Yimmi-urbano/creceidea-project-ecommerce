// Tipos temporalmente relajados - TODO: agregar tipos correctos
import { ChangeEvent } from 'react';

import { toast } from 'sonner';

import { createProduct, updateProduct } from '@/src/application/products/productServices';
import { Product, ProductFormData } from '@/src/domain/products/Product';
import { uploadProductImage } from '@/src/infrastructure/repositories/uploadRepository';

export type { ProductFormData };

export const handleChange = (
	e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>,
	formData: ProductFormData
): void => {
	const { name, value } = e.target;
	setFormData({
		...formData,
		[name]: value,
	});
};

export const handleAddImageClick = (fileInputRef: React.RefObject<HTMLInputElement>): void => {
	fileInputRef.current?.click();
};

export const handleFileChange = async (
	e: ChangeEvent<HTMLInputElement>,
	setSelectedFile: (file: File | null) => void,
	setLoading: (loading: boolean) => void,
	setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>,
	_formData: ProductFormData
): Promise<void> => {
	const file = e.target.files?.[0] || null;
	if (file !== null) {
		setSelectedFile(file);
		setLoading(true);
		try {
			const imageUrl = await uploadProductImage(file);
			setFormData((prevData: ProductFormData) => ({
				...prevData,
				imageUrls: [...prevData.imageUrls, imageUrl],
			}));
		} catch (error) {
			console.error('Error al subir la imagen:', error);
			toast.error('Error al subir la imagen');
		} finally {
			setLoading(false);
			setSelectedFile(null);
		}
	}
};

export const handleRemoveImage = (
	index: number,
	setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>,
	_formData: ProductFormData
): void => {
	setFormData((prevData: ProductFormData) => ({
		...prevData,
		imageUrls: prevData.imageUrls.filter((_, i: number) => i !== index),
	}));
};

export const handleNext = (
	activeTab: string,
	setActiveTab: React.Dispatch<React.SetStateAction<string>>
): void => {
	if (parseInt(activeTab) < 3) {
		setActiveTab((prev) => (parseInt(prev) + 1).toString());
	}
};

export const handleBack = (
	activeTab: string,
	setActiveTab: React.Dispatch<React.SetStateAction<string>>
): void => {
	if (parseInt(activeTab) > 0) {
		setActiveTab((prev) => (parseInt(prev) - 1).toString());
	}
};

export const mapFormDataToProduct = (formData: ProductFormData): Partial<Product> => {
	const mappedCategories = Array.isArray(formData.category)
		? formData.category.map((cat: any) => ({
				idcat: cat._id || cat.idcat || '',
				slug: cat.slug || '',
			}))
		: [];

	return {
		title: formData.name,
		type_product: 'basic',
		image_default: formData.imageUrls,
		category: mappedCategories,
		stock: formData.stock,
		is_available: formData.visible,
		price: {
			regular: Number(formData.price),
			sale: Number(formData.sale !== undefined && formData.sale !== '' ? formData.sale : 0),
			tag: '',
		},
		is_trash: {
			date: '',
			status: false,
		},
		description_long: formData.description_long,
		description_short: formData.description_corta,
	};
};

export const handleSubmit = async (
	setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
	formData: ProductFormData,
	setSuccessCreate: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
	setSubmitting(true);
	const data = mapFormDataToProduct(formData);

	try {
		await createProduct(data);
		toast.success('Producto enviado correctamente');
		setSuccessCreate(true);
	} catch (error) {
		toast.error('Error al enviar el producto');
	} finally {
		setSubmitting(false);
	}
};

export const handleSubmitUpdate = async (
	setSubmittingEdit: React.Dispatch<React.SetStateAction<boolean>>,
	formData: ProductFormData,
	productId: string
): Promise<void> => {
	setSubmittingEdit(true);
	const data = mapFormDataToProduct(formData);

	try {
		const success = await updateProduct(productId, data);
		if (success !== null) {
			toast.success('Producto actualizado correctamente');
		} else {
			toast.error('Error al actualizar el producto');
		}
	} catch (error) {
		toast.error('Error al actualizar el producto');
	} finally {
		setSubmittingEdit(false);
	}
};
