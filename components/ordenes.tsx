import React, { useState } from 'react';
import { EyeIcon, DeliveryIcon, PaymentIcon } from './icons';
import withPermission from "./withPermission";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Modal, ModalHeader, ModalBody, Dropdown, Button, DropdownItem, DropdownMenu, ModalFooter, useDisclosure, DropdownTrigger, ModalContent, Link } from "@nextui-org/react";
import { useFetchOrders } from '@/hooks/useIsOrders';
import { updateOrderStatus, updatePaymentStatus } from '@/hooks/fetchOrders';

const getStatusClass = (status: string): "success" | "warning" | "danger" | undefined => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'pending':
      return 'warning';
    case 'decline':
      return 'danger';
    default:
      return undefined;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Completado';
    case 'pending':
      return 'Pendiente';
    case 'decline':
      return 'Cancelado';
    default:
      return undefined;
  }
};

const paymentStatusMap: Record<string, string> = {
  pending: 'Pendiente',
  completed: 'Completado',
  decline: 'Declinado',
};

const paymentMethodMap: Record<string, string> = {
  credit_card: 'Tarjeta de Crédito',
  Yape: 'Yape',
  Plin: 'Plin',
  transfer: 'Transferencia',
};

const orderStatusMap: Record<string, string> = {
  pending: 'Pendiente',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
};


const Ordenes: React.FC = () => {
  const { orders, loading, error, updateOrdersInState } = useFetchOrders();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string>("pending");
  const [paymentMethod, setPaymentMethod] = useState<string>("credit_card");
  const [orderStatus, setOrderStatus] = useState<string>("pending");

  const { isOpen: isPaymentModalOpen, onOpen: openPaymentModal, onClose: closePaymentModal } = useDisclosure();
  const { isOpen: isOrderModalOpen, onOpen: openOrderModal, onClose: closeOrderModal } = useDisclosure();

  if (loading) {
    return <p>Cargando órdenes...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleSavePaymentStatus = async () => {
    if (orderId) {
      try {
        await updatePaymentStatus(orderId, paymentStatus, paymentMethod);
        closePaymentModal();
        updateOrdersInState();
      } catch (error) {
        console.error("Error al actualizar el estado de pago:", error);
      }
    }
  };

  const handleSaveOrderStatus = async () => {
    if (orderId) {
      try {
        await updateOrderStatus(orderId, orderStatus);
        closeOrderModal();
        updateOrdersInState();
      } catch (error) {
        console.error("Error al actualizar el estado de la orden:", error);
      }
    }
  };

  return (
    <div>
      <div className="sticky top-0 z-20">
        <div className="overflow-x-auto">
          <Table className="min-w-full leading-normal backdrop-blur-md " fullWidth isStriped  isHeaderSticky isCompact  classNames={{ wrapper: "bg-[rgb(4, 29, 46)]/90 border-1 border-[#0ea5e9]/30" }}>
            <TableHeader>
              <TableColumn className='bg-[#E0EDF499] text-[#25556D] dark:bg-sky-950/40 dark:text-white w-[100px]'>N° de orden</TableColumn>
              <TableColumn className='bg-[#E0EDF499] text-[#25556D] dark:bg-sky-950/40 dark:text-white' width="300">Cliente</TableColumn>
              <TableColumn className='bg-[#E0EDF499] text-[#25556D] dark:bg-sky-950/40 dark:text-white'>Fecha de compra</TableColumn>
              <TableColumn className='bg-[#E0EDF499] text-[#25556D] dark:bg-sky-950/40 dark:text-white'>Fecha de pago</TableColumn>
              <TableColumn className='bg-[#E0EDF499] text-[#25556D] dark:bg-sky-950/40 dark:text-white'>Estado</TableColumn>
              <TableColumn className='bg-[#E0EDF499] text-[#25556D] dark:bg-sky-950/40 dark:text-white'>Precio Total</TableColumn>
              <TableColumn className='bg-[#E0EDF499] text-[#25556D] dark:bg-sky-950/40 dark:text-white'>-</TableColumn>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id} >
                  <TableCell width="100">{order.orderNumber}</TableCell>
                  <TableCell>{order.clientInfo['name']}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                  <TableCell>
                    <Chip color={getStatusClass(order.paymentStatus['typeStatus'])} size="sm" variant="flat">
                      {getStatusLabel(order.paymentStatus['typeStatus'])}
                    </Chip>
                  </TableCell>
                  <TableCell>{order.currency === "PEN" ? "S/" : "$"} {order.total.toFixed(2)}</TableCell>
                  <TableCell className='flex gap-2'>
                    <Button isIconOnly color='success' variant='flat' size="sm" className='p-0' onPress={() => { setOrderId(order._id); openOrderModal(); }}>
                      <DeliveryIcon className="hover:text-black fill-white" />
                    </Button>
                    <Button isIconOnly color='secondary' variant='flat' size="sm" onPress={() => { setOrderId(order._id); openPaymentModal(); }}>
                      <PaymentIcon className="hover:text-black fill-white" />
                    </Button>
                    <Button
                      isIconOnly
                      color="primary"
                      variant="flat"
                      size="sm"
                      as={Link}
                      href={`/dashboard/orders/details/${order.orderNumber}`}
                    >

                      <EyeIcon className="hover:text-black fill-white" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>


      {/* Modal para editar estado de pago */}
      <Modal isOpen={isPaymentModalOpen} onClose={closePaymentModal}>
        <ModalContent>
          <ModalHeader>Editar Estado de Pago</ModalHeader>
          <ModalBody>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">
                  {paymentStatus ? paymentStatusMap[paymentStatus] : 'Seleccionar Estado de Pago'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Seleccionar Estado de Pago"
                onAction={(key) => setPaymentStatus(key as string)}
              >
                <DropdownItem key="pending">Pendiente</DropdownItem>
                <DropdownItem key="completed">Completado</DropdownItem>
                <DropdownItem key="decline">Declinado</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">
                  {paymentMethod ? paymentMethodMap[paymentMethod] : 'Seleccionar Método de Pago'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Seleccionar Método de Pago"
                onAction={(key) => setPaymentMethod(key as string)}
              >
                <DropdownItem key="credit_card">Tarjeta de Crédito</DropdownItem>
                <DropdownItem key="Yape">Yape</DropdownItem>
                <DropdownItem key="Plin">Plin</DropdownItem>
                <DropdownItem key="transfer">Transferencia</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </ModalBody>
          <ModalFooter>
            <Button onPress={handleSavePaymentStatus}>Guardar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal para editar estado de la orden */}
      <Modal isOpen={isOrderModalOpen} onClose={closeOrderModal}>
        <ModalContent>
          <ModalHeader>Editar Estado de Orden</ModalHeader>
          <ModalBody>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">
                  {orderStatus ? orderStatusMap[orderStatus] : 'Seleccionar Estado de Orden'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Seleccionar Estado de Orden"
                onAction={(key) => setOrderStatus(key as string)}
              >
                <DropdownItem key="pending">Pendiente</DropdownItem>
                <DropdownItem key="shipped">Enviado</DropdownItem>
                <DropdownItem key="delivered">Entregado</DropdownItem>
                <DropdownItem key="cancelled">Cancelado</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </ModalBody>
          <ModalFooter>
            <Button onPress={handleSaveOrderStatus}>Guardar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>



    </div>
  );
};

export default withPermission(Ordenes, 'ordenes');
