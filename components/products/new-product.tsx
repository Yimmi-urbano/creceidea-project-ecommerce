import React, { useState, useEffect } from 'react';
import { Input, Button, Tabs, Tab, Spinner, SelectItem, Select, Textarea, Card, CardHeader, CardBody, Image, CardFooter } from '@nextui-org/react';
import { fetchCategories } from '@/hooks/fetchProducts';
import { handleChange, handleAddImageClick, handleFileChange, handleRemoveImage, handleNext, handleBack, handleSubmit, FormData } from '@/hooks/formHandlers';
import { CameraIcon, MiniTrashIcon } from '../icons';

interface Category {
    _id: string;
    title: string;
    icon_url: string;
    slug: string;
    __v: number;
}

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

    const [categories, setCategories] = useState<Category[]>([]);
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
                className='w-full p-3'
                color='warning'
            >
                <Tab key="0" title="Información Básica" >
                    <div style={{ padding: '16px' }} className='flex flex-wrap gap-3'>

                        <Input
                            label="Nombre del Producto"
                            name="name"
                            classNames={
                                {
                                    label: "text-black/50 dark:text-white/90",
                                    innerWrapper: "bg-transparent",
                                    input: [
                                        "bg-transparent",
                                        "text-black/90 dark:text-white/90",
                                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                    ],
                                    inputWrapper: [
                                        "shadow-xl",
                                        "bg-cyan-500/50",
                                        "dark:bg-cyan-600/10",
                                        "backdrop-blur-xl",
                                        "backdrop-saturate-200",
                                        "hover:bg-default-200/70",
                                        "dark:hover:bg-default/70",
                                        "group-data-[focus=true]:bg-default-200/50",
                                        "dark:group-data-[focus=true]:bg-default/60",
                                        "!cursor-text",
                                      ],
                                }
                            }
                            value={formData.name}
                            onChange={(e) => handleChange(e, setFormData, formData)}

                        />
                        <Select
                            name="category"
                            value={formData.category}
                            classNames={{
                              
                                helperWrapper:  "max-h-[400px] bg-cyan-600/10",
                              }}
                            onChange={(e) => handleChange(e, setFormData, formData)}
                            label="Categoría"
                            placeholder="Seleccionar"
                        >

                            {categories.map((category) => (
                                <SelectItem key={category.slug} value={category.slug} >
                                    {category.title}
                                </SelectItem>
                            ))}
                        </Select>
                        <Textarea
                            label="Descripción"
                            name="description"
                            classNames={
                                {
                                    label: "text-black/50 dark:text-white/90",
                                    innerWrapper: "bg-transparent",
                                    input: [
                                        "bg-transparent",
                                        "text-black/90 dark:text-white/90",
                                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                    ],
                                    inputWrapper: [
                                        "shadow-xl",
                                        "bg-cyan-500/50",
                                        "dark:bg-cyan-600/10",
                                        "backdrop-blur-xl",
                                        "backdrop-saturate-200",
                                        "hover:bg-default-200/70",
                                        "dark:hover:bg-default/70",
                                        "group-data-[focus=true]:bg-default-200/50",
                                        "dark:group-data-[focus=true]:bg-default/60",
                                        "!cursor-text",
                                      ],
                                }
                            }
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
                            classNames={
                                {
                                    label: "text-black/50 dark:text-white/90",
                                    innerWrapper: "bg-transparent",
                                    input: [
                                        "bg-transparent",
                                        "text-black/90 dark:text-white/90",
                                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                    ],
                                    inputWrapper: [
                                        "shadow-xl",
                                        "bg-cyan-500/50",
                                        "dark:bg-cyan-600/10",
                                        "backdrop-blur-xl",
                                        "backdrop-saturate-200",
                                        "hover:bg-default-200/70",
                                        "dark:hover:bg-default/70",
                                        "group-data-[focus=true]:bg-default-200/50",
                                        "dark:group-data-[focus=true]:bg-default/60",
                                        "!cursor-text",
                                      ],
                                }
                            }
                            placeholder="0.00"
                            onChange={(e) => handleChange(e, setFormData, formData)}
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">S/</span>
                                </div>
                            }
                            type="number"
                        />


                        <Input
                            label="Stock"
                            name="stock"
                            classNames={
                                {
                                    label: "text-black/50 dark:text-white/90",
                                    innerWrapper: "bg-transparent",
                                    input: [
                                        "bg-transparent",
                                        "text-black/90 dark:text-white/90",
                                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                    ],
                                    inputWrapper: [
                                        "shadow-xl",
                                        "bg-cyan-500/50",
                                        "dark:bg-cyan-600/10",
                                        "backdrop-blur-xl",
                                        "backdrop-saturate-200",
                                        "hover:bg-default-200/70",
                                        "dark:hover:bg-default/70",
                                        "group-data-[focus=true]:bg-default-200/50",
                                        "dark:group-data-[focus=true]:bg-default/60",
                                        "!cursor-text",
                                      ],
                                }
                            }
                            value={formData.stock}
                            onChange={(e) => handleChange(e, setFormData, formData)}
                            type="number"
                        />
                    </div>
                </Tab>
                <Tab key="2" title="Imágenes">
                    <div style={{ padding: '16px' }} className='flex flex-wrap gap-3'>

                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={(e) => handleFileChange(e, setSelectedFile, setLoading, setFormData, formData)}
                        />

                        <div style={{ marginTop: '16px' }} className='grid grid-cols-3 gap-4'>

                            {formData.imageUrls.map((url, index) => (
                                <div key={index} style={{ display: 'inline-block', position: 'relative' }}>
                                    <Image
                                        src={url}
                                        alt={`Imagen ${index + 1}`}
                                        className='object-cover h-[80px] w-full'
                                        isBlurred

                                    />
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        color="default"
                                        className='p-1 w-[1rem] h-[1.5rem] z-10'
                                        onClick={() => handleRemoveImage(index, setFormData, formData)}
                                        style={{
                                            position: 'absolute',
                                            top: '0',
                                            right: '0',


                                        }}
                                    >
                                        <MiniTrashIcon size={16} />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                isIconOnly

                                color='success'
                                variant='flat'
                                className='h-[80px] w-full min-w-20'
                                onClick={() => handleAddImageClick(fileInputRef)}
                            >
                                {!loading && <CameraIcon />}
                                {loading && (

                                    <Spinner size="lg" color="success" />

                                )}
                            </Button>
                        </div>
                    </div>
                </Tab>
                <Tab key="3" title="Finalizar">
                    <div style={{ padding: '16px' }} className='w-[82%] md:w-[300px] m-auto'>
                        <Card isBlurred className=" bg-background/50 dark:bg-sky-950/30 ">

                            <CardBody className="overflow-visible">
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-xl w-full"
                                    src={formData.imageUrls[0]}

                                />
                            </CardBody>
                            <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
                                <h4 className="font-bold text-large">{formData.name}</h4>
                                <p className="text-tiny uppercase font-bold">S/ {formData.price}</p>
                                <small className="text-default-500">{formData.category}</small>
                                <p className="text-tiny">{formData.description}</p>
                            </CardFooter>
                        </Card>
                    </div>
                </Tab>
            </Tabs>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
                <Button  onClick={() => handleBack(activeTab, setActiveTab)} disabled={parseInt(activeTab) === 0}>
                    Atrás
                </Button>
                {parseInt(activeTab) !== 3 && (
                    <Button
                        color="primary"
                        
                        onClick={() => handleNext(activeTab, setActiveTab)}
                        disabled={parseInt(activeTab) === 3}
                    >
                        {parseInt(activeTab) === 3 ? 'Finalizar' : 'Siguiente'}
                    </Button>
                )}

                {parseInt(activeTab) === 3 && (
                    <Button
                        
                        color='success'
                        onClick={() => handleSubmit(setSubmitting, formData)}
                        disabled={submitting}
                    >
                        {submitting ? 'Publicando...' : 'Publicar'}
                    </Button>

                )}
            </div>

        </div>
    );
}

export default ProductForm;
