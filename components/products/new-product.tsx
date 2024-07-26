"use client"
import React, { useState, useEffect } from 'react';
import { Input, Button, Tabs, Tab, Spinner, SelectItem, Select, Textarea, Card, CardHeader, CardBody, Image, CardFooter } from '@nextui-org/react';
import { fetchCategories } from '@/hooks/fetchProducts';
import { handleChange, handleAddImageClick, handleFileChange, handleRemoveImage, handleNext, handleBack, handleSubmit, FormData } from '@/hooks/formHandlers';

function ProductForm() {
    const [activeTab, setActiveTab] = useState('0');
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        imageUrls: [],
    });

    const [categories, setCategories] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error al cargar categorías:', error);
            }
        };
        loadCategories();
    }, []);
    const handleTabChange = (key: any) => setActiveTab(key);
    return (
        <div>
            <Tabs
                selectedKey={activeTab}
                defaultSelectedKey="0"
                onSelectionChange={handleTabChange}
                aria-label="Formulario de Producto"
                className='w-full'
            >
                <Tab key="0" title="Información Básica">
                    <div style={{ padding: '16px' }} className='flex flex-wrap gap-3'>
                        <Input
                            label="Nombre del Producto"
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleChange(e, setFormData, formData)}
                            
                        />
                        <Textarea
                            label="Descripción"
                            name="description"
                            value={formData.description}
                            onChange={(e) => handleChange(e, setFormData, formData)}
                            
                        />
                    </div>
                </Tab>
                <Tab key="1" title="Detalles del Producto">
                    <div style={{ padding: '16px' }} className='flex flex-wrap gap-3'>
                        <Input
                            label="Precio"
                            name="price"
                            value={formData.price}
                            onChange={(e) => handleChange(e, setFormData, formData)}
                            
                            type="number"
                        />
                        <Select
                            name="category"
                            value={formData.category}
                            onChange={(e) => handleChange(e, setFormData, formData)}
                            label="Categoría"
                            placeholder="Seleccionar"
                        >

                            {categories.map((category) => (
                                <SelectItem key={category} >
                                    {category}
                                </SelectItem>
                            ))}
                        </Select>
                        <Input
                            label="Stock"
                            name="stock"
                            value={formData.stock}
                            onChange={(e) => handleChange(e, setFormData, formData)}
                            
                            type="number"
                        />
                    </div>
                </Tab>
                <Tab key="2" title="Imágenes">
                    <div style={{ padding: '16px' }} className='flex flex-wrap gap-3'>
                        <Button onClick={() => handleAddImageClick(fileInputRef)}>
                            Agregar Imagen
                        </Button>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={(e) => handleFileChange(e, setSelectedFile, setLoading, setFormData, formData)}
                        />
                        {loading && (
                            <div style={{ textAlign: 'center', marginTop: '16px' }}>
                                <Spinner />
                            </div>
                        )}
                        <div style={{ marginTop: '16px' }} className='flex flex-wrap gap-3'>
                            {formData.imageUrls.map((url, index) => (
                                <div key={index} style={{ display: 'inline-block', position: 'relative' }}>
                                    <img
                                        src={url}
                                        alt={`Imagen ${index + 1}`}
                                        style={{ width: '100px', height: '100px', margin: '5px' }}
                                    />
                                    <Button
                                        size="sm"
                                        color="danger"
                                        onClick={() => handleRemoveImage(index, setFormData, formData)}
                                        style={{
                                            position: 'absolute',
                                            top: '0',
                                            right: '0',
                                            padding: '2px',
                                            fontSize: '12px',
                                        }}
                                    >
                                        X
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </Tab>
                <Tab key="3" title="Finalizar">
                    <div style={{ padding: '16px' }} className='w-[100%] md:w-[350px] '>
                        <Card isBlurred className="py-4 bg-background/50 dark:bg-sky-950/30">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">


                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-xl w-full"
                                    src={formData.imageUrls[0]}
                                    
                                />
                            </CardBody>
                            <CardFooter  className="pb-0 pt-2 px-4 flex-col items-start">
                                <h4 className="font-bold text-large">{formData.name}</h4>
                                <p className="text-tiny uppercase font-bold">S/ {formData.price}</p>
                                <small className="text-default-500">{formData.category}</small>
                                <p className="text-tiny">{formData.description}</p>
                            </CardFooter>
                        </Card>
                        {/**<h5>Revisa los detalles del producto antes de enviar:</h5>
                         <pre>{JSON.stringify(formData, null, 2)}</pre>*/}
                        <Button onClick={() => handleSubmit(setSubmitting, formData)} disabled={submitting}>
                            {submitting ? 'Enviando...' : 'Enviar'}
                        </Button>
                    </div>
                </Tab>
            </Tabs>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
                <Button onClick={() => handleBack(activeTab, setActiveTab)} disabled={parseInt(activeTab) === 0}>
                    Atrás
                </Button>
                <Button onClick={() => handleNext(activeTab, setActiveTab)} disabled={parseInt(activeTab) === 3}>
                    {parseInt(activeTab) === 3 ? 'Finalizar' : 'Siguiente'}
                </Button>
            </div>
        </div>
    );
}

export default ProductForm;
