import React, { useState, useEffect, useRef } from 'react';
import {
    Input,
    Button,
    Textarea,
    Card,
    CardBody,
    CardHeader,
    Breadcrumbs,
    BreadcrumbItem,
    Switch,
    cn
} from '@nextui-org/react';
import { fetchCategories, getProductById, updateProduct } from '@/src/application/products/productServices';
import dynamic from 'next/dynamic';
import { handleChange, handleAddImageClick, handleFileChange, handleRemoveImage, FormData } from '@/src/presentation/forms/productFormHandlers';
import { CameraIcon, ChevronLeft, Save, Eye, Info } from "lucide-react";
import CategorySelector from "@/src/presentation/components/client/CategorySelect";
import LivePreview from "./LivePreview";
import { useRouter } from 'next/navigation';
import SortableImageList from './SortableImageList';
import { toast } from 'sonner';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Category {
    _id: string;
    title: string;
    icon_url: string;
    slug: string;
    __v: number;
    children?: Category[];
}

function ProductForm() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmittingEdit] = useState(false);
    const [detailproduct, setGetProductById] = useState<any>(null);
    const [productId, setProductId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    // Extended Form Data including new fields
    const [formData, setFormData] = useState<FormData & {
        visible: boolean;
        sku?: string;
        weight?: string;
        seoTitle?: string;
        seoDescription?: string;
    }>({
        name: '',
        description_corta: '',
        description_long: '',
        price: '',
        sale: '',
        category: [],
        stock: '',
        imageUrls: [],
        integrations: [],
        visible: true,
        sku: '',
        weight: '',
        seoTitle: '',
        seoDescription: ''
    });

    const [isFormValid, setIsFormValid] = useState(false);

    // Initial Data Fetching
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const id = localStorage.getItem('selectedCardId');
            if (id) {
                setProductId(id);
            } else {
                toast.error("No se encontró el ID del producto");
                router.push('/dashboard/products');
            }
        }
    }, [router]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error al cargar categorías:', error);
                toast.error("Error al cargar categorías");
            }
        };
        loadCategories();
    }, []);

    useEffect(() => {
        const loadProductById = async () => {
            if (!productId) return;
            try {
                // @ts-ignore - The service expects a string
                const data = await getProductById(productId);
                setGetProductById(data);
            } catch (error) {
                console.error('Error al cargar producto por ID:', error);
                toast.error("Error al cargar el producto");
            }
        };

        loadProductById();
    }, [productId]);

    useEffect(() => {
        if (detailproduct) {
            // Map categories: Ensure we match incoming product categories (which might have idcat or _id) to the full Category objects
            const matchedCategories = detailproduct.category?.map((prodCat: any) => {
                const catId = prodCat.idcat || prodCat._id;
                return categories.find(c => c._id === catId);
            }).filter(Boolean) || [];

            setFormData({
                name: detailproduct.title || '',
                description_corta: detailproduct.description_short || '',
                description_long: detailproduct.description_long || '',
                price: detailproduct.price?.regular || '',
                sale: detailproduct.price?.sale || '',
                category: matchedCategories.length > 0 ? matchedCategories : [],
                stock: detailproduct.stock || '',
                imageUrls: detailproduct.image_default || [],
                integrations: [],
                visible: detailproduct.is_available ?? true,
                sku: detailproduct.sku || '', // Assuming backend has SKU or we simulate
                weight: detailproduct.weight || '',
                seoTitle: detailproduct.seoTitle || '',
                seoDescription: detailproduct.seoDescription || ''
            });
        }
    }, [detailproduct, categories]);

    // Validation
    useEffect(() => {
        setIsFormValid(
            formData.name.trim() !== "" &&
            formData.category.length > 0 &&
            String(formData.price).trim() !== ""
        );
    }, [formData]);

    const handleUpdateProduct = async () => {
        if (!productId) return;
        setSubmittingEdit(true);
        try {
            await updateProduct(productId, formData as any);
            toast.success("Producto actualizado correctamente");
            router.push('/dashboard/products');
        } catch (error) {
            console.error(error);
            toast.error("Error al actualizar el producto");
        } finally {
            setSubmittingEdit(false);
        }
    };

    // Quill Toolbar
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
        ],
    };

    // Show skeleton while loading product data
    if (!detailproduct && productId) {
        return (
            <div className="w-full max-w-7xl mx-auto p-4 md:p-6 pb-20">
                {/* Header Skeleton */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div className="flex flex-col gap-3 flex-1">
                        <div className="h-4 w-48 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                        <div className="h-8 w-64 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                        <div className="h-4 w-96 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-24 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                        <div className="h-10 w-36 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column Skeleton */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Essential Info Card */}
                        <div className="shadow-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dark-card rounded-2xl">
                            <div className="px-8 py-6 border-b border-zinc-100 dark:border-zinc-800">
                                <div className="h-6 w-48 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                            </div>
                            <div className="p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <div className="h-4 w-32 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                        <div className="h-12 w-full rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-24 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                        <div className="h-12 w-full rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <div className="h-4 w-28 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                        <div className="h-48 w-full rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-24 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                        <div className="h-20 w-full rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Media Card */}
                        <div className="shadow-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dark-card rounded-2xl">
                            <div className="px-8 py-6 border-b border-zinc-100 dark:border-zinc-800">
                                <div className="h-6 w-48 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="h-32 w-full rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                <div className="h-64 w-full rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                <div className="space-y-2">
                                    <div className="h-4 w-32 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                    <div className="h-20 w-full rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                </div>
                            </div>
                        </div>

                        {/* Pricing Card */}
                        <div className="shadow-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dark-card rounded-2xl">
                            <div className="px-8 py-6 border-b border-zinc-100 dark:border-zinc-800">
                                <div className="h-6 w-48 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                            </div>
                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="h-4 w-24 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                            <div className="h-12 w-full rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* SEO Card */}
                        <div className="shadow-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dark-card rounded-2xl">
                            <div className="px-8 py-6 border-b border-zinc-100 dark:border-zinc-800">
                                <div className="h-6 w-48 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <div className="h-4 w-32 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                    <div className="h-12 w-full rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                </div>
                                <div className="space-y-2">
                                    <div className="h-4 w-32 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                    <div className="h-20 w-full rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column Skeleton */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="h-96 w-full rounded-2xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                        <div className="h-32 w-full rounded-2xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-6 pb-20">
            {/* Custom Styles for Quill Editor - Improved Readability */}
            <style jsx global>{`
                /* Toolbar Styling */
                .ql-toolbar.ql-snow {
                    background-color: #f4f4f5 !important; /* Zinc-100 */
                    border-color: #e4e4e7 !important; /* Zinc-200 */
                    border-top-left-radius: 0.75rem;
                    border-top-right-radius: 0.75rem;
                    padding: 12px !important;
                }
                .dark .ql-toolbar.ql-snow {
                    background-color: #27272a !important; /* Zinc-800 */
                    border-color: #3f3f46 !important; /* Zinc-700 */
                }
                
                /* Editor Container */
                .ql-container.ql-snow {
                    border-color: #e4e4e7 !important;
                    border-bottom-left-radius: 0.75rem;
                    border-bottom-right-radius: 0.75rem;
                    background-color: #ffffff !important;
                    font-size: 15px !important;
                    border-width: 1px !important;
                    border-style: solid !important;
                }
                .dark .ql-container.ql-snow {
                    border-color: #3f3f46 !important;
                    background-color: #18181b !important; /* Zinc-900 */
                }
                
                /* Editor Content Area */
                .ql-editor {
                    min-height: 300px;
                    color: #18181b !important; /* Zinc-900 */
                    padding: 16px !important;
                }
                .dark .ql-editor {
                    color: #fafafa !important; /* Zinc-50 */
                }
                
                /* Placeholder Text */
                .ql-editor.ql-blank::before {
                    color: #a1a1aa !important; /* Zinc-400 */
                    font-style: normal;
                }
                .dark .ql-editor.ql-blank::before {
                    color: #71717a !important; /* Zinc-500 */
                }
                
                /* Toolbar Icons Colors */
                .ql-snow .ql-stroke {
                    stroke: #3f3f46 !important; /* Zinc-700 */
                }
                .dark .ql-snow .ql-stroke {
                    stroke: #d4d4d8 !important; /* Zinc-300 */
                }
                .ql-snow .ql-fill, .ql-snow .ql-stroke.ql-fill {
                    fill: #3f3f46 !important; /* Zinc-700 */
                }
                .dark .ql-snow .ql-fill, .dark .ql-snow .ql-stroke.ql-fill {
                    fill: #d4d4d8 !important; /* Zinc-300 */
                }
                
                /* Picker (Dropdowns) */
                .ql-snow .ql-picker {
                    color: #3f3f46 !important; /* Zinc-700 */
                }
                .dark .ql-snow .ql-picker {
                    color: #d4d4d8 !important; /* Zinc-300 */
                }
                .ql-snow .ql-picker-options {
                    background-color: #ffffff !important;
                    border-color: #e4e4e7 !important;
                }
                .dark .ql-snow .ql-picker-options {
                    background-color: #27272a !important;
                    border-color: #3f3f46 !important;
                }
                
                /* Active/Hover states using Primary Color */
                .ql-snow .ql-active .ql-stroke, 
                .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke,
                .ql-snow .ql-picker-item:hover .ql-stroke,
                .ql-toolbar button:hover .ql-stroke {
                    stroke: #00A09D !important; /* Primary */
                }
                .ql-snow .ql-active .ql-fill,
                .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill,
                .ql-snow .ql-picker-item:hover .ql-fill,
                .ql-toolbar button:hover .ql-fill {
                    fill: #00A09D !important; /* Primary */
                }
                .ql-snow .ql-active,
                .ql-snow .ql-picker.ql-expanded .ql-picker-label,
                .ql-snow .ql-picker-item:hover,
                .ql-toolbar button:hover {
                    color: #00A09D !important; /* Primary */
                }
                
                /* Toolbar Button Hover Background */
                .ql-toolbar button:hover,
                .ql-toolbar button:focus,
                .ql-toolbar button.ql-active {
                    background-color: rgba(0, 160, 157, 0.1) !important;
                    border-radius: 4px;
                }
                
                /* Selected Text Formatting */
                .ql-editor strong {
                    font-weight: 700;
                }
                .ql-editor em {
                    font-style: italic;
                }
                .ql-editor u {
                    text-decoration: underline;
                }
            `}</style>

            {/* Header Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className="flex flex-col gap-1">
                    <Breadcrumbs size="sm" className="mb-1">
                        <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
                        <BreadcrumbItem href="/dashboard/products">Productos</BreadcrumbItem>
                        <BreadcrumbItem>Editar</BreadcrumbItem>
                    </Breadcrumbs>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            onClick={() => router.back()}
                            className="-ml-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                        >
                            <ChevronLeft size={24} />
                        </Button>
                        Editar Producto
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm ml-10">
                        Gestiona los detalles, precios y visibilidad de tu producto.
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button
                        variant="flat"
                        color="default"
                        onClick={() => router.back()}
                        className="flex-1 md:flex-none font-medium"
                    >
                        Cancelar
                    </Button>
                    <Button
                        color="primary"
                        startContent={!submitting && <Save size={18} />}
                        isLoading={submitting}
                        onClick={handleUpdateProduct}
                        isDisabled={!isFormValid}
                        className="flex-1 md:flex-none font-bold shadow-lg shadow-primary/20"
                    >
                        Guardar Cambios
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative items-start">
                {/* LEFT COLUMN - Main Inputs (8 cols) */}
                <div className="lg:col-span-8 space-y-8">

                    {/* SECTION 1: ESSENTIAL INFO */}
                    <Card className="shadow-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dark-card rounded-2xl">
                        <CardHeader className="px-8 py-6 border-b border-zinc-100 dark:border-zinc-800">
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Información Esencial</h2>
                        </CardHeader>
                        <CardBody className="p-8 gap-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                        Nombre del Producto <span className="text-danger">*</span>
                                    </label>
                                    <Input
                                        variant="bordered"
                                        placeholder="Ej: Camiseta de Algodón Premium"
                                        value={formData.name}
                                        onChange={(e) => handleChange(e, setFormData, formData)}
                                        name="name"
                                        size="lg"
                                        classNames={{
                                            inputWrapper: "shadow-sm border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 group-data-[focus=true]:border-primary"
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                        SKU (Referencia)
                                    </label>
                                    <Input
                                        variant="bordered"
                                        placeholder="Ej: CMP-001"
                                        value={formData.sku}
                                        onChange={(e) => handleChange(e, setFormData, formData)}
                                        name="sku"
                                        size="lg"
                                        classNames={{
                                            inputWrapper: "shadow-sm border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 group-data-[focus=true]:border-primary"
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
                                        Categorías <span className="text-danger">*</span>
                                    </label>
                                    <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-2 max-h-[220px] overflow-y-auto">
                                        <CategorySelector
                                            selectedCategories={formData.category}
                                            onChange={(selectedCategories) => setFormData({ ...formData, category: selectedCategories })}
                                            categories={categories}
                                        />
                                    </div>
                                    <p className="text-xs text-zinc-500 mt-2 ml-1">Selecciona una o más categorías para tu producto.</p>
                                </div>

                                <div className="flex flex-col justify-start pt-6">
                                    <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                                <Eye size={18} className="text-zinc-500" /> Visibilidad
                                            </span>
                                            <span className="text-xs text-zinc-500">¿Producto visible en tienda?</span>
                                        </div>
                                        <Switch
                                            isSelected={formData.visible}
                                            onValueChange={(isSelected) => setFormData({ ...formData, visible: isSelected })}
                                            color="primary"
                                            size="lg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* SECTION 2: MEDIA & DESCRIPTION */}
                    <Card className="shadow-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dark-card rounded-2xl">
                        <CardHeader className="px-8 py-6 border-b border-zinc-100 dark:border-zinc-800">
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Medios y Descripción</h2>
                        </CardHeader>
                        <CardBody className="p-8 gap-8">
                            {/* Media Gallery */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                        Imágenes del Producto
                                    </label>
                                    <Button
                                        size="sm"
                                        color="primary"
                                        variant="light"
                                        startContent={<CameraIcon size={16} />}
                                        onClick={() => handleAddImageClick(fileInputRef)}
                                        isDisabled={loading}
                                        className="font-medium"
                                    >
                                        Agregar Imagen
                                    </Button>
                                </div>

                                <div className="p-4 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 min-h-[120px] flex flex-col justify-center">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        ref={fileInputRef}
                                        onChange={(e) => handleFileChange(e, setSelectedFile, setLoading, setFormData, formData)}
                                    />

                                    {formData.imageUrls.length > 0 ? (
                                        <SortableImageList
                                            images={formData.imageUrls}
                                            onRemove={(index) => handleRemoveImage(index, setFormData, formData)}
                                            onReorder={(newOrder) => setFormData({ ...formData, imageUrls: newOrder })}
                                        />
                                    ) : (
                                        <div
                                            className="flex flex-col items-center justify-center py-6 text-zinc-400 cursor-pointer hover:text-primary transition-colors"
                                            onClick={() => handleAddImageClick(fileInputRef)}
                                        >
                                            <CameraIcon size={40} strokeWidth={1} className="mb-2" />
                                            <span className="text-sm font-medium">Click para subir imágenes</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Descriptions */}
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                    Descripción Detallada <span className="text-danger">*</span>
                                </label>
                                <div className="rounded-xl overflow-hidden">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.description_long}
                                        modules={modules}
                                        onChange={(value) => setFormData({ ...formData, description_long: value })}
                                        className="min-h-[300px] bg-white dark:bg-dark-card text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                    Descripción Corta (Resumen)
                                </label>
                                <Textarea
                                    name="description_corta"
                                    variant="bordered"
                                    value={formData.description_corta}
                                    onChange={(e) => handleChange(e, setFormData, formData)}
                                    placeholder="Resumen breve para listados..."
                                    minRows={2}
                                    classNames={{
                                        inputWrapper: "shadow-sm border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 group-data-[focus=true]:border-primary"
                                    }}
                                />
                            </div>
                        </CardBody>
                    </Card>

                    {/* SECTION 3: PRICING & INVENTORY */}
                    <Card className="shadow-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dark-card rounded-2xl">
                        <CardHeader className="px-8 py-6 border-b border-zinc-100 dark:border-zinc-800">
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Precios e Inventario</h2>
                        </CardHeader>
                        <CardBody className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                        Precio Normal <span className="text-danger">*</span>
                                    </label>
                                    <Input
                                        type="number"
                                        name="price"
                                        variant="bordered"
                                        placeholder="0.00"
                                        value={formData.price}
                                        onChange={(e) => handleChange(e, setFormData, formData)}
                                        startContent={<span className="text-zinc-500 font-medium">S/</span>}
                                        classNames={{
                                            inputWrapper: "shadow-sm border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 group-data-[focus=true]:border-primary"
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                        Precio Oferta
                                    </label>
                                    <Input
                                        type="number"
                                        name="sale"
                                        variant="bordered"
                                        placeholder="0.00"
                                        value={formData.sale}
                                        onChange={(e) => handleChange(e, setFormData, formData)}
                                        startContent={<span className="text-zinc-500 font-medium">S/</span>}
                                        classNames={{
                                            inputWrapper: "shadow-sm border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 group-data-[focus=true]:border-primary"
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                        Stock <span className="text-danger">*</span>
                                    </label>
                                    <Input
                                        type="number"
                                        name="stock"
                                        variant="bordered"
                                        placeholder="0"
                                        value={formData.stock}
                                        onChange={(e) => handleChange(e, setFormData, formData)}
                                        classNames={{
                                            inputWrapper: "shadow-sm border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 group-data-[focus=true]:border-primary"
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                        Peso (kg)
                                    </label>
                                    <Input
                                        type="number"
                                        name="weight"
                                        variant="bordered"
                                        placeholder="0.5"
                                        value={formData.weight}
                                        onChange={(e) => handleChange(e, setFormData, formData)}
                                        classNames={{
                                            inputWrapper: "shadow-sm border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 group-data-[focus=true]:border-primary"
                                        }}
                                    />
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* SECTION 4: SEO */}
                    <Card className="shadow-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dark-card rounded-2xl">
                        <CardHeader className="px-8 py-6 border-b border-zinc-100 dark:border-zinc-800">
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Optimización SEO</h2>
                        </CardHeader>
                        <CardBody className="p-8 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                    Título SEO (Meta Title)
                                </label>
                                <Input
                                    variant="bordered"
                                    placeholder="Título optimizado para buscadores"
                                    value={formData.seoTitle}
                                    onChange={(e) => handleChange(e, setFormData, formData)}
                                    name="seoTitle"
                                    classNames={{
                                        inputWrapper: "shadow-sm border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 group-data-[focus=true]:border-primary"
                                    }}
                                />
                                <p className="text-xs text-zinc-500 mt-1">Máximo 60 caracteres recomendado.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                    Meta Descripción
                                </label>
                                <Textarea
                                    name="seoDescription"
                                    variant="bordered"
                                    value={formData.seoDescription}
                                    onChange={(e) => handleChange(e, setFormData, formData)}
                                    placeholder="Descripción breve para resultados de búsqueda..."
                                    minRows={2}
                                    classNames={{
                                        inputWrapper: "shadow-sm border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 group-data-[focus=true]:border-primary"
                                    }}
                                />
                                <p className="text-xs text-zinc-500 mt-1">Máximo 160 caracteres recomendado.</p>
                            </div>
                        </CardBody>
                    </Card>

                </div>

                {/* RIGHT COLUMN - Sticky Sidebar (4 cols) */}
                <div className="lg:col-span-4 space-y-6 sticky top-6">
                    <LivePreview
                        name={formData.name}
                        description={formData.description_corta}
                        price={formData.price}
                        salePrice={formData.sale}
                        imageUrl={formData.imageUrls[0]}
                    />

                    <Card className="bg-primary/5 border border-primary/20 shadow-none">
                        <CardBody className="p-4 flex flex-row items-start gap-3">
                            <Info className="text-primary shrink-0 mt-0.5" size={20} />
                            <div className="text-sm text-zinc-600 dark:text-zinc-300">
                                <span className="font-bold text-zinc-900 dark:text-zinc-100 block mb-1">Tip de venta</span>
                                Asegúrate de incluir buenas imágenes y una descripción detallada para aumentar la conversión.
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default ProductForm;