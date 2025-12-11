import { format, subDays } from 'date-fns';
import { es } from 'date-fns/locale';

// Generate sales data for the last 30 days
export const generateSalesData = () => {
    const data = [];
    for (let i = 29; i >= 0; i--) {
        const date = subDays(new Date(), i);
        const baseValue = 1000 + Math.random() * 2000;
        const weekendMultiplier = date.getDay() === 0 || date.getDay() === 6 ? 1.3 : 1;

        data.push({
            date: format(date, 'dd/MM', { locale: es }),
            sales: Math.round(baseValue * weekendMultiplier),
            orders: Math.round((baseValue * weekendMultiplier) / 50)
        });
    }
    return data;
};

// Generate top products data
export const generateTopProductsData = () => {
    const products = [
        'Inka Kola 1.5L',
        'Arroz Costeño 5kg',
        'Aceite Primor 1L',
        'Azúcar Rubia 1kg',
        'Leche Gloria 1L'
    ];

    return products.map(name => ({
        name,
        sales: Math.round(50 + Math.random() * 150)
    })).sort((a, b) => b.sales - a.sales);
};

// Generate orders distribution data
export const generateOrdersData = () => {
    return [
        { name: 'Completados', value: Math.round(60 + Math.random() * 40), color: '#10b981' },
        { name: 'Pendientes', value: Math.round(20 + Math.random() * 30), color: '#f59e0b' },
        { name: 'En Proceso', value: Math.round(10 + Math.random() * 20), color: '#3b82f6' },
        { name: 'Cancelados', value: Math.round(5 + Math.random() * 10), color: '#ef4444' }
    ];
};

// Generate category sales data
export const generateCategorySalesData = () => {
    const categories = ['Bebidas', 'Abarrotes', 'Lácteos', 'Snacks', 'Limpieza'];

    return categories.map(category => ({
        category,
        sales: Math.round(500 + Math.random() * 2000)
    }));
};

// Generate recent orders
export const generateRecentOrders = () => {
    const customers = ['Juan Pérez', 'María García', 'Carlos López', 'Ana Martínez', 'Luis Torres'];
    const products = ['Inka Kola 1.5L', 'Arroz Costeño 5kg', 'Aceite Primor 1L', 'Combo Familiar', 'Leche Gloria 1L'];
    const statuses: Array<'pending' | 'completed' | 'cancelled'> = ['pending', 'completed', 'cancelled'];

    return Array.from({ length: 5 }, (_, i) => ({
        id: `ORD${String(1000 + i).padStart(4, '0')}`,
        customer: customers[i],
        product: products[i],
        amount: 10 + Math.random() * 90,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        date: format(subDays(new Date(), i), 'dd MMM', { locale: es })
    }));
};

// Calculate KPI metrics
export const calculateKPIs = () => {
    const salesData = generateSalesData();
    const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
    const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);

    // Previous month simulation
    const previousMonthSales = totalSales * (0.85 + Math.random() * 0.2);
    const salesChange = ((totalSales - previousMonthSales) / previousMonthSales) * 100;

    return {
        totalSales,
        salesChange: Math.round(salesChange * 10) / 10,
        totalOrders,
        ordersChange: Math.round((5 + Math.random() * 15) * 10) / 10,
        activeProducts: 156,
        conversionRate: Math.round((2 + Math.random() * 3) * 10) / 10,
        averageTicket: Math.round(totalSales / totalOrders),
        newCustomers: Math.round(20 + Math.random() * 30)
    };
};
