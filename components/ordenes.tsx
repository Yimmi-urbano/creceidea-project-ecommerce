import React from 'react';
import { EyeIcon } from './icons'; // Asegúrate de que este ícono está correctamente definido
import withPermission from "./withPermission";

interface Order {
  id: string;
  client: string;
  purchaseDate: string;
  paymentDate: string;
  status: string;
  totalPrice: string;
}

const orders: Order[] = [
  { id: '#048', client: 'Juan García', purchaseDate: '27/07/2024', paymentDate: 'Jul, 27 2024 18:26', status: 'Aprobado', totalPrice: 'S/ 1,299' },
  { id: '#032', client: 'Carlos González', purchaseDate: '27/07/2024', paymentDate: 'Jul, 27 2024 15:34', status: 'Aprobado', totalPrice: 'S/ 100' },
  { id: '#813', client: 'Carmen Tello', purchaseDate: '26/07/2024', paymentDate: 'Jul, 27 2024 15:26', status: 'Pendiente', totalPrice: 'S/ 500' },
  { id: '#140', client: 'José Paredes', purchaseDate: '01/06/2024', paymentDate: 'Jun, 04 2024 13:26', status: 'Rechazado', totalPrice: 'S/ 1,299' },
  { id: '#140', client: 'Rosa Huamán', purchaseDate: '05/06/2024', paymentDate: 'Jun, 05 2024 10:46', status: 'Rechazado', totalPrice: 'S/ 100' },
  { id: '#140', client: 'Rosa Huamán', purchaseDate: '05/06/2024', paymentDate: 'Jun, 05 2024 10:46', status: 'Rechazado', totalPrice: 'S/ 100' },
  { id: '#140', client: 'Rosa Huamán', purchaseDate: '05/06/2024', paymentDate: 'Jun, 05 2024 10:46', status: 'Rechazado', totalPrice: 'S/ 100' },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Aprobado':
      return 'bg-green-100 text-green-600';
    case 'Pendiente':
      return 'bg-blue-100 text-blue-600';
    case 'Rechazado':
      return 'bg-red-100 text-red-600';
    default:
      return '';
  }
};

const Ordenes: React.FC = () => {
  return (
    <div >
    <div className="sticky top-0 z-20">
      <div className="p-4 border-b border-blue-200">
        <h2 className="text-xl font-bold">Ordenes</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead className="sticky top-0 bg-sky-100 text-sky-900 z-10">
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                N° de orden
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Fecha de compra
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Fecha de pago
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Estado
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Precio Total
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{order.id}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{order.client}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{order.purchaseDate}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{order.paymentDate}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200  text-sm">
                  <span className={`relative rounded-full inline-block px-3 py-1 font-semibold leading-tight ${getStatusClass(order.status)}`}>
                    <span aria-hidden className="absolute inset-0 opacity-50 rounded-full"></span>
                    <span className="relative">{order.status}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{order.totalPrice}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <button>
                    <EyeIcon className="text-gray-600 hover:text-gray-900" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default withPermission(Ordenes, 'ordenes'); 
