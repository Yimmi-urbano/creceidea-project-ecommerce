import React from 'react';
import { EyeIcon } from './icons'; // Asegúrate de que este ícono está correctamente definido
import withPermission from "./withPermission";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";

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

const getStatusClass = (status: string): "success" | "warning" | "danger" | undefined => {
  switch (status) {
    case 'Aprobado':
      return 'success';
    case 'Pendiente':
      return 'warning';
    case 'Rechazado':
      return 'danger';
    default:
      return undefined;
  }
};

const Ordenes: React.FC = () => {
  return (
    <div>
      <div className="sticky top-0 z-20">
        <div className="p-4">
          <h2 className="text-xl font-bold">Ordenes</h2>
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-full leading-normal" isStriped removeWrapper>
            <TableHeader>
              <TableColumn>N° de orden</TableColumn>
              <TableColumn>Cliente</TableColumn>
              <TableColumn>Fecha de compra</TableColumn>
              <TableColumn>Fecha de pago</TableColumn>
              <TableColumn>Estado</TableColumn>
              <TableColumn>Precio Total</TableColumn>
              <TableColumn>-</TableColumn>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.client}</TableCell>
                  <TableCell>{order.purchaseDate}</TableCell>
                  <TableCell>{order.paymentDate}</TableCell>
                  <TableCell>
                    <Chip color={getStatusClass(order.status)} size="sm" variant="flat">
                      {order.status}
                    </Chip>
                  </TableCell>
                  <TableCell>{order.totalPrice}</TableCell>
                  <TableCell>
                    <button>
                      <EyeIcon className="hover:text-gray-900" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default withPermission(Ordenes, 'ordenes');
