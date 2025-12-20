import {
	LayoutDashboard,
	ShoppingBag,
	ShoppingCart,
	Layers,
	CreditCard,
	Server,
	FileText,
	Globe,
	Plus,
	Edit,
	Settings,
	Palette,
	Image,
	Share2,
	type LucideIcon,
} from 'lucide-react';

export interface SearchableItem {
	id: string;
	title: string;
	description?: string;
	path: string;
	category: 'principal' | 'acciones' | 'configuracion' | 'cuenta';
	icon: LucideIcon;
	keywords?: string[]; // Para mejorar la búsqueda
}

export const searchableItems: SearchableItem[] = [
	// PRINCIPAL
	{
		id: 'dashboard',
		title: 'Tablero',
		description: 'Vista general del dashboard',
		path: '/dashboard',
		category: 'principal',
		icon: LayoutDashboard,
		keywords: ['inicio', 'home', 'dashboard', 'principal'],
	},
	{
		id: 'products',
		title: 'Productos',
		description: 'Gestiona tu catálogo de productos',
		path: '/dashboard/products',
		category: 'principal',
		icon: ShoppingBag,
		keywords: ['productos', 'catalogo', 'items', 'inventario'],
	},
	{
		id: 'orders',
		title: 'Pedidos',
		description: 'Administra los pedidos de clientes',
		path: '/dashboard/orders',
		category: 'principal',
		icon: ShoppingCart,
		keywords: ['pedidos', 'ordenes', 'ventas', 'compras'],
	},
	{
		id: 'categories',
		title: 'Categorías',
		description: 'Organiza tus productos por categorías',
		path: '/dashboard/categories',
		category: 'principal',
		icon: Layers,
		keywords: ['categorias', 'grupos', 'clasificacion'],
	},

	// ACCIONES RÁPIDAS
	{
		id: 'create-product',
		title: 'Crear Producto',
		description: 'Agrega un nuevo producto al catálogo',
		path: '/dashboard/products/create',
		category: 'acciones',
		icon: Plus,
		keywords: ['crear', 'nuevo', 'agregar', 'producto'],
	},
	{
		id: 'edit-product',
		title: 'Editar Producto',
		description: 'Modifica productos existentes',
		path: '/dashboard/products/edit',
		category: 'acciones',
		icon: Edit,
		keywords: ['editar', 'modificar', 'actualizar', 'producto'],
	},

	// CONFIGURACIÓN
	{
		id: 'payment-methods',
		title: 'Métodos de Pago',
		description: 'Configura las opciones de pago',
		path: '/configuration/payment-methods',
		category: 'configuracion',
		icon: CreditCard,
		keywords: ['pago', 'payment', 'tarjeta', 'metodos'],
	},
	{
		id: 'site-config',
		title: 'Configuración del Sitio',
		description: 'Ajustes generales del sitio web',
		path: '/configuration/site',
		category: 'configuracion',
		icon: Globe,
		keywords: ['sitio', 'web', 'configuracion', 'ajustes', 'settings'],
	},
	{
		id: 'catalog-config',
		title: 'Configuración de Catálogo',
		description: 'Personaliza la visualización del catálogo',
		path: '/configuration/catalog',
		category: 'configuracion',
		icon: Settings,
		keywords: ['catalogo', 'configuracion', 'productos'],
	},
	{
		id: 'themes',
		title: 'Temas',
		description: 'Personaliza la apariencia de tu tienda',
		path: '/configuration/themes',
		category: 'configuracion',
		icon: Palette,
		keywords: ['temas', 'colores', 'diseño', 'apariencia', 'theme'],
	},
	{
		id: 'home-banner',
		title: 'Banner de Inicio',
		description: 'Configura el banner principal',
		path: '/configuration/home',
		category: 'configuracion',
		icon: Image,
		keywords: ['banner', 'inicio', 'home', 'imagen', 'portada'],
	},
	{
		id: 'social-links',
		title: 'Redes Sociales',
		description: 'Gestiona tus enlaces de redes sociales',
		path: '/configuration/social',
		category: 'configuracion',
		icon: Share2,
		keywords: ['redes', 'sociales', 'social', 'links', 'enlaces'],
	},

	// MI CUENTA
	{
		id: 'services',
		title: 'Mis Servicios',
		description: 'Administra tus servicios contratados',
		path: '/dashboard/services',
		category: 'cuenta',
		icon: Server,
		keywords: ['servicios', 'planes', 'suscripcion'],
	},
	{
		id: 'billing',
		title: 'Mi Suscripción',
		description: 'Gestiona tu plan y facturación',
		path: '/dashboard/billing',
		category: 'cuenta',
		icon: FileText,
		keywords: ['suscripcion', 'facturacion', 'billing', 'plan', 'pago'],
	},
];

export const categoryLabels: Record<SearchableItem['category'], string> = {
	principal: 'Principal',
	acciones: 'Acciones Rápidas',
	configuracion: 'Configuración',
	cuenta: 'Mi Cuenta',
};
