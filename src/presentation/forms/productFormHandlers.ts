// @ts-nocheck
import { ChangeEvent } from 'react';
import { toast } from 'sonner';
import { uploadProductImage } from '@/src/infrastructure/repositories/uploadRepository';
import { createProduct, updateProduct } from '@/src/application/products/productServices';
import { ProductFormData } from '@/src/domain/products/Product';

export type { ProductFormData as FormData };

export const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setFormData: React.Dispatch<React.SetStateAction<FormData>>,
    formData: FormData
) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

export const handleAddImageClick = (fileInputRef: React.RefObject<HTMLInputElement>) => {
    fileInputRef.current?.click();
};

export const handleFileChange = async (
    e: ChangeEvent<HTMLInputElement>,
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setFormData: React.Dispatch<React.SetStateAction<FormData>>,
    formData: FormData
) => {
    const file = e.target.files?.[0] || null;
    if (file) {
        setSelectedFile(file);
        setLoading(true);
        try {
            const imageUrl = await uploadProductImage(file);
            setFormData((prevData) => ({
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
    setFormData: React.Dispatch<React.SetStateAction<FormData>>,
    formData: FormData
) => {
    setFormData((prevData) => ({
        ...prevData,
        imageUrls: prevData.imageUrls.filter((_, i) => i !== index),
    }));
};

export const handleNext = (activeTab: string, setActiveTab: React.Dispatch<React.SetStateAction<string>>) => {
    if (parseInt(activeTab) < 3) {
        setActiveTab((prev) => (parseInt(prev) + 1).toString());
    }
};

export const handleBack = (activeTab: string, setActiveTab: React.Dispatch<React.SetStateAction<string>>) => {
    if (parseInt(activeTab) > 0) {
        setActiveTab((prev) => (parseInt(prev) - 1).toString());
    }
};

export const handleSubmit = async (
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    formData: FormData,
    setSuccessCreate: React.Dispatch<React.SetStateAction<boolean>>

) => {
    setSubmitting(true);
    const data = {
        id: "CASACA00032BC00000",
        title: formData.name,
        type_product: "basic",
        image_default: formData.imageUrls,
        category: formData.category,
        stock: formData.stock,
        is_available: true,
        price: {
            regular: formData.price,
            sale: formData.sale || 0,
            tag: "",
        },
        is_trash: {
            date: "",
            status: false,
        },
        default_variations: ["attr002", "attr005"],
        atributos: [
            {
                name_attr: "Talla",
                values: [
                    { Id: "attr001", valor: "S" },
                    { Id: "attr002", valor: "M" },
                    { Id: "attr003", valor: "L" },
                ],
            },
            {
                name_attr: "Color",
                values: [
                    { Id: "attr004", valor: "rojo" },
                    { Id: "attr005", valor: "verde" },
                    { Id: "attr006", valor: "amarillo" },
                ],
            },
        ],
        variations: [
            {
                chill_attr: ["attr001", "attr006"],
                price: { regular: 50, sale: 40, tag: "x 3 meses" },
            },
            {
                chill_attr: ["attr002", "attr005"],
                price: { regular: 100, sale: 80, tag: "x 6 meses" },
            },
            {
                chill_attr: ["attr003", "attr004"],
                price: { regular: 160, sale: 90, tag: "x 12 meses" },
            },
        ],
        description_long: formData.description_long,
        description_short: formData.description_corta,
    };

    try {
        await createProduct(data as any);
        toast.success('Producto enviado correctamente');
        setSuccessCreate(true)
    } catch (error) {
        toast.error('Error al enviar el producto');

    } finally {
        setSubmitting(false);
    }
};

export const handleSubmitUpdate = async (
    setSubmittingEdit: React.Dispatch<React.SetStateAction<boolean>>,
    formData: FormData,
    setSuccessCreate: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setSubmittingEdit(true);
    const data = {
        id: "CASACA00032BC00000",
        title: formData.name,
        type_product: "basic",
        image_default: formData.imageUrls,
        category: formData.category,
        stock: formData.stock,
        is_available: true,
        price: {
            regular: formData.price,
            sale: formData.sale || 0,
            tag: "",
        },
        is_trash: {
            date: "",
            status: false,
        },
        default_variations: ["attr002", "attr005"],
        atributos: [
            {
                name_attr: "Talla",
                values: [
                    { Id: "attr001", valor: "S" },
                    { Id: "attr002", valor: "M" },
                    { Id: "attr003", valor: "L" },
                ],
            },
            {
                name_attr: "Color",
                values: [
                    { Id: "attr004", valor: "rojo" },
                    { Id: "attr005", valor: "verde" },
                    { Id: "attr006", valor: "amarillo" },
                ],
            },
        ],
        variations: [
            {
                chill_attr: ["attr001", "attr006"],
                price: { regular: 50, sale: 40, tag: "x 3 meses" },
            },
            {
                chill_attr: ["attr002", "attr005"],
                price: { regular: 100, sale: 80, tag: "x 6 meses" },
            },
            {
                chill_attr: ["attr003", "attr004"],
                price: { regular: 160, sale: 90, tag: "x 12 meses" },
            },
        ],
        description_long: formData.description_long,
        description_short: formData.description_corta,
    };

    try {
        const success = await updateProduct('CASACA00032BC00000', data as any);
        if (success) {
            toast.success('Producto enviado correctamente');
            // Assuming router is available in the scope or passed as an argument
            // router.push("/dashboard/products");
        } else {
            toast.error('Error al enviar el producto');
        }
    } catch (error) {
        toast.error('Error al enviar el producto');
    } finally {
        setSubmittingEdit(false);
    }
};