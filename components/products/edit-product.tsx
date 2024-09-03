import React, { useState, useEffect } from 'react';
import { Input, Button, Tabs, Tab, Spinner, SelectItem, Select, Textarea, Card, CardHeader, CardBody, Image, CardFooter, Chip, ScrollShadow } from '@nextui-org/react';
import { fetchCategories, getProductById } from '@/hooks/fetchProducts';
import { handleChange, handleAddImageClick, handleFileChange, handleRemoveImage, handleNext, handleBack, handleSubmit, FormData, handleSubmitUpdate } from '@/hooks/formHandlers';
import { CameraIcon, MiniTrashIcon, GalleryIcon, ProductIconSvg, ProductInfoIconSvg, ProductCheckIconSvg } from '../icons';
import CategorySelector from "@/components/CategorySelect";

interface Category {
    _id: string;
    title: string;
    icon_url: string;
    slug: string;
    __v: number;
}

function ProductForm() {
    const [activeTab, setActiveTab] = useState('0');
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmittingEdit] = useState(false);
    const [detailproduct, setGetProductById] = useState<any>(null);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        price: '',
        sale:'',
        category: [],
        stock: '',
        imageUrls: [],
        integrations: []
    });



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

    useEffect(() => {
        const loadProductById = async () => {
            try {
                const data = await getProductById();
                setGetProductById(data);
            } catch (error) {
                console.error('Error al cargar producto por ID:', error);
            }
        };



        loadProductById();


    }, []);

    useEffect(() => {
        if (detailproduct) {
            setFormData({
                name: detailproduct.title || '',
                description: detailproduct.description_short || '',
                price: detailproduct.price['regular'] || '',
                sale:detailproduct.price['sale'] || '',
                category: detailproduct.category || '',
                stock: detailproduct.stock || '',
                imageUrls: detailproduct.image_default || '',
                integrations: []
            });
        }
    }, [detailproduct]);


    const handleTabChange = (key: any) => setActiveTab(key);
    return (

        <Card isBlurred className="md:h-[85vh] min-h-[383px] border-1 border-[#0ea5e9]/30 bg-[#0c4a6e]/40 w-[100%]">
            <CardBody>
                <Tabs
                    selectedKey={activeTab}
                    fullWidth
                    defaultSelectedKey="0"
                    onSelectionChange={handleTabChange}
                    aria-label="Formulario de Producto"
                    className='w-full p-3 '
                    color='warning'
                    variant="light"
                >
                    <Tab key="0"

                        title={
                            <div className="flex items-center space-x-2">
                                <ProductIconSvg />
                                <span className='hidden md:block'>Información Básica</span>
                            </div>
                        } >


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
                                 <Card className='w-full bg-[#0c4a6e]/40'>
                            <CardHeader className="flex gap-3">Selecciona categorias</CardHeader>
                            
                            <CardBody>
                            <ScrollShadow className="w-full h-[170px]">
                                <CategorySelector
                                    selectedCategories={formData.category}
                                    onChange={(selectedCategories) => setFormData({ ...formData, category: selectedCategories })}
                                />
                            </ScrollShadow>
                            </CardBody>
                            </Card>
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
                    <Tab key="1"

                        title={
                            <div className="flex items-center space-x-2">
                                <ProductInfoIconSvg />
                                <span className='hidden md:block'>Detalles del Producto</span>
                            </div>
                        } >



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
                                label="Precio Oferta"
                                name="sale"
                                value={formData.sale}
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
                    <Tab key="2" title={
                        <div className="flex items-center space-x-2">
                            <GalleryIcon />
                            <span className='hidden md:block'>Imágenes</span>

                        </div>
                    } >
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

                                            className='object-cover border-1 border-[#0ea5e9]/30 h-[70px] md:h-[200px] md:w-[200px] w-full'
                                            isBlurred

                                        />
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            color="danger"
                                            className='p-1 w-[1rem] h-[1.5rem] z-10 '
                                            onClick={() => handleRemoveImage(index, setFormData, formData)}
                                            style={{
                                                position: 'absolute',
                                                top: '6px',
                                                right: '6px',


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
                                    className='h-[80px] w-full min-w-20 md:h-[200px] md:w-[200px]'
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
                    <Tab key="3"
                        title={
                            <div className="flex items-center space-x-2">
                                <ProductCheckIconSvg />
                                <span className='hidden md:block'>Finalizar</span>
                            </div>
                        } >

                        <Card className="bg-gray-50 w-[250px] m-auto md:w-[300px]  pb-5">

                            <CardBody className="">
                                <Image
                                    alt="Card background"
                                    className="object-cover md:h-[200px] md:w-[300px] rounded-xl w-full "
                                    src={formData.imageUrls[0]}

                                />
                                <h4 className="font-bold text-large text-slate-800">{formData.name}</h4>
                                <p className=" text-rose-700 uppercase font-bold text-slate-800">S/ {formData.price}</p>
                                <small className="text-default-500 text-sky-700">
                                    {formData.category.map(cat => (
                                        <div key={cat.idcat}>{cat.slug}</div>
                                    ))}
                                </small>


                                <p className="text-tiny text-slate-800" >{formData.description}</p>
                            </CardBody>

                        </Card>

                    </Tab>
                </Tabs>
            </CardBody>


            <CardFooter className='justify-between'>
                <Button variant='flat' color='danger' onClick={() => handleBack(activeTab, setActiveTab)} disabled={parseInt(activeTab) === 0}>
                    Atrás
                </Button>
                {parseInt(activeTab) !== 3 && (
                    <Button
                        color="warning"

                        onClick={() => handleNext(activeTab, setActiveTab)}
                        disabled={parseInt(activeTab) === 3}
                    >
                        {parseInt(activeTab) === 3 ? 'Finalizar' : 'Siguiente'}
                    </Button>
                )}

                {parseInt(activeTab) === 3 && (
                    <Button

                        color='success'
                        onClick={() => handleSubmitUpdate(setSubmittingEdit, formData)}
                        disabled={submitting}
                    >
                        {submitting ? 'Actualizando...' : 'Actualizar Producto'}
                    </Button>

                )}
            </CardFooter>
        </Card>
    );
}

export default ProductForm;