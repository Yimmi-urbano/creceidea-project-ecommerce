import { format, subDays, startOfMonth, startOfYear, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';

type PeriodType = '30days' | '7days' | 'month' | 'year';

// Helper function to get date range based on period
const getDateRange = (period: PeriodType = '30days') => {
	const now = new Date();
	let startDate: Date;
	let days: number;

	switch (period) {
		case '7days':
			days = 7;
			startDate = subDays(now, 6);
			break;
		case 'month':
			startDate = startOfMonth(now);
			days = differenceInDays(now, startDate) + 1;
			break;
		case 'year':
			startDate = startOfYear(now);
			days = differenceInDays(now, startDate) + 1;
			break;
		case '30days':
		default:
			days = 30;
			startDate = subDays(now, 29);
			break;
	}

	return { startDate, days };
};

// Generate sales data based on period
export const generateSalesData = (period: PeriodType = '30days') => {
	const { days } = getDateRange(period);
	const data = [];

	for (let i = days - 1; i >= 0; i--) {
		const date = subDays(new Date(), i);
		const baseValue = 1000 + Math.random() * 2000;
		const weekendMultiplier = date.getDay() === 0 || date.getDay() === 6 ? 1.3 : 1;

		// Adjust format based on period
		let dateFormat = 'dd/MM';
		if (period === 'year') {
			dateFormat = 'MMM';
		}

		data.push({
			date: format(date, dateFormat, { locale: es }),
			sales: Math.round(baseValue * weekendMultiplier),
			orders: Math.round((baseValue * weekendMultiplier) / 50),
		});
	}

	// For year view, aggregate by month
	if (period === 'year') {
		const monthlyData: { [key: string]: { sales: number; orders: number } } = {};

		data.forEach((item) => {
			if (!monthlyData[item.date]) {
				monthlyData[item.date] = { sales: 0, orders: 0 };
			}
			monthlyData[item.date].sales += item.sales;
			monthlyData[item.date].orders += item.orders;
		});

		return Object.entries(monthlyData).map(([date, values]) => ({
			date,
			sales: values.sales,
			orders: values.orders,
		}));
	}

	return data;
};

// Generate top products data based on period
export const generateTopProductsData = (period: PeriodType = '30days') => {
	const products = [
		'Inka Kola 1.5L',
		'Arroz Costeño 5kg',
		'Aceite Primor 1L',
		'Azúcar Rubia 1kg',
		'Leche Gloria 1L',
	];

	// Adjust sales based on period
	const multiplier =
		period === 'year' ? 12 : period === 'month' ? 1 : period === '7days' ? 0.25 : 1;

	return products
		.map((name) => ({
			name,
			sales: Math.round((50 + Math.random() * 150) * multiplier),
		}))
		.sort((a, b) => b.sales - a.sales);
};

// Generate orders distribution data
export const generateOrdersData = (period: PeriodType = '30days') => {
	// Adjust values based on period
	const multiplier =
		period === 'year' ? 12 : period === 'month' ? 1 : period === '7days' ? 0.25 : 1;

	return [
		{
			name: 'Completados',
			value: Math.round((60 + Math.random() * 40) * multiplier),
			color: '#10b981',
		},
		{
			name: 'Pendientes',
			value: Math.round((20 + Math.random() * 30) * multiplier),
			color: '#f59e0b',
		},
		{
			name: 'En Proceso',
			value: Math.round((10 + Math.random() * 20) * multiplier),
			color: '#3b82f6',
		},
		{
			name: 'Cancelados',
			value: Math.round((5 + Math.random() * 10) * multiplier),
			color: '#ef4444',
		},
	];
};

// Generate category sales data
export const generateCategorySalesData = (period: PeriodType = '30days') => {
	const categories = ['Bebidas', 'Abarrotes', 'Lácteos', 'Snacks', 'Limpieza'];

	// Adjust sales based on period
	const multiplier =
		period === 'year' ? 12 : period === 'month' ? 1 : period === '7days' ? 0.25 : 1;

	return categories.map((category) => ({
		category,
		sales: Math.round((500 + Math.random() * 2000) * multiplier),
	}));
};

// Generate recent orders
export const generateRecentOrders = (period: PeriodType = '30days') => {
	const customers = ['Juan Pérez', 'María García', 'Carlos López', 'Ana Martínez', 'Luis Torres'];
	const products = [
		'Inka Kola 1.5L',
		'Arroz Costeño 5kg',
		'Aceite Primor 1L',
		'Combo Familiar',
		'Leche Gloria 1L',
	];
	const statuses: Array<'pending' | 'completed' | 'cancelled'> = [
		'pending',
		'completed',
		'cancelled',
	];

	return Array.from({ length: 5 }, (_, i) => ({
		id: `ORD${String(1000 + i).padStart(4, '0')}`,
		customer: customers[i],
		product: products[i],
		amount: 10 + Math.random() * 90,
		status: statuses[Math.floor(Math.random() * statuses.length)],
		date: format(subDays(new Date(), i), 'dd MMM', { locale: es }),
	}));
};

// Calculate KPI metrics
export const calculateKPIs = (period: PeriodType = '30days') => {
	const salesData = generateSalesData(period);
	const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
	const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);

	// Previous period simulation
	const previousPeriodSales = totalSales * (0.85 + Math.random() * 0.2);
	const salesChange = ((totalSales - previousPeriodSales) / previousPeriodSales) * 100;

	return {
		totalSales,
		salesChange: Math.round(salesChange * 10) / 10,
		totalOrders,
		ordersChange: Math.round((5 + Math.random() * 15) * 10) / 10,
		activeProducts: 156,
		conversionRate: Math.round((2 + Math.random() * 3) * 10) / 10,
		averageTicket: Math.round(totalSales / totalOrders),
		newCustomers: Math.round(20 + Math.random() * 30),
	};
};
