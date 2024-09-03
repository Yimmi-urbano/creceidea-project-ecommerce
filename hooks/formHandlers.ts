import { ChangeEvent } from 'react';
import { uploadImage, updateProduct,postProduct } from '@/hooks/fetchProducts';


export interface FormData {
    name: string;
    description: string;
    price: string;
    sale: string;
    category: { idcat: string, slug: string }[];
    stock: string;
    imageUrls: string[];
    integrations:[]
}

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
            const imageUrl = await uploadImage(file);
            setFormData((prevData) => ({
                ...prevData,
                imageUrls: [...prevData.imageUrls, imageUrl],
            }));
        } catch (error) {
            console.error('Error al subir la imagen:', error);
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
    formData: FormData
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
            sale: formData.sale||0,
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
        description_long: "descripcion larga",
        description_short: formData.description,
    };

    try {
        await postProduct(data);
        console.log(formData.integrations)
        alert('Producto enviado correctamente');
    } catch (error) {
        alert('Error al enviar el producto');
        console.log(formData.integrations)
    } finally {
        setSubmitting(false);
    }
};

export const handleSubmitUpdate = async (
    setSubmittingEdit: React.Dispatch<React.SetStateAction<boolean>>,
    formData: FormData
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
            sale: formData.sale||0,
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
        description_long: "descripcion larga",
        description_short: formData.description,
    };

    try {
        await updateProduct(data);
        alert('Producto enviado correctamente');
    } catch (error) {
        alert('Error al enviar el producto');
    } finally {
        setSubmittingEdit(false);
    }
};