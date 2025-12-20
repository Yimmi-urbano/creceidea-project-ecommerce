'use client';

import React, { Suspense, lazy } from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Skeleton } from '@nextui-org/react';
import { ArrowLeft } from 'lucide-react';

const loadPaymentForm = (nameId: string) => {
	switch (nameId) {
		case 'yape_qr':
			return lazy(
				() => import('@/src/presentation/components/dashboard/payments/forms/yape-qr/YapeQRForm')
			);
		case 'izipay_ya':
			return lazy(
				() => import('@/src/presentation/components/dashboard/payments/forms/izipay-ya/IziPayForm')
			);
		case 'coordina_whatsapp':
			return lazy(
				() =>
					import(
						'@/src/presentation/components/dashboard/payments/forms/whatsapp/CoordinaWhatsAppForm'
					)
			);
		default:
			return lazy(
				() => import('@/src/presentation/components/dashboard/payments/forms/DefaultPaymentForm')
			);
	}
};

const titleModule = (nameId: string) => {
	switch (nameId) {
		case 'yape_qr':
			return 'Yape con QR';
		case 'izipay_ya':
			return 'Acepta pagos con Izipay';
		case 'coordina_whatsapp':
			return 'Coordina con WhatsApp';
		default:
			return 'title_module';
	}
};

// Skeleton loader component
const PaymentFormSkeleton = () => (
	<div className="space-y-6">
		{/* Card principal */}
		<div className="bg-white dark:bg-dark-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-6">
			{/* Skeleton para campos de formulario */}
			{[1, 2, 3, 4].map((i) => (
				<div key={i} className="space-y-2">
					<Skeleton className="h-4 w-32 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
					<Skeleton className="h-11 w-full rounded-lg bg-zinc-200 dark:bg-zinc-800" />
				</div>
			))}

			{/* Skeleton para área de imagen/QR */}
			<div className="space-y-2">
				<Skeleton className="h-4 w-40 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
				<div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-8 flex flex-col items-center justify-center">
					<Skeleton className="w-32 h-32 rounded-xl bg-zinc-200 dark:bg-zinc-800 mb-4" />
					<Skeleton className="h-4 w-48 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
				</div>
			</div>

			{/* Skeleton para botones */}
			<div className="flex gap-3 pt-4">
				<Skeleton className="h-11 w-32 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
				<Skeleton className="h-11 w-32 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
			</div>
		</div>
	</div>
);

const ConfigPaymentMethod: React.FC = () => {
	const params = useParams();
	const nameId = params?.id as string;

	const PaymentForm = loadPaymentForm(nameId);

	return (
		<div className="space-y-6 animate-in fade-in duration-500">
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
				<div className="flex items-center gap-4">
					<Link
						href="/configuration/payment-methods"
						className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
					>
						<ArrowLeft size={20} className="text-zinc-600 dark:text-zinc-400" />
					</Link>
					<div>
						<h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
							Configuración de {titleModule(nameId)}
						</h1>
						<p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
							Administra los detalles de integración
						</p>
					</div>
				</div>
			</div>

			<Suspense fallback={<PaymentFormSkeleton />}>
				<PaymentForm nameId={nameId} />
			</Suspense>
		</div>
	);
};

export default ConfigPaymentMethod;
