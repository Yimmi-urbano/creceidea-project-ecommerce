'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@nextui-org/react';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const router = useRouter();

	useEffect(() => {
		// Log the error to console
		console.error('Application Error:', error);

		// Check if it's a context error (session expired)
		if (error.message?.includes('useContext') || error.message?.includes('Context')) {
			// Clear potentially corrupted data
			if (typeof window !== 'undefined') {
				const domain = localStorage.getItem('domainSelect');
				// If no domain, redirect to login
				if (!domain) {
					setTimeout(() => {
						router.push('/login');
					}, 2000);
				}
			}
		}
	}, [error, router]);

	const isContextError =
		error.message?.includes('useContext') || error.message?.includes('Context');
	const isSessionError =
		isContextError && typeof window !== 'undefined' && !localStorage.getItem('domainSelect');

	return (
		<div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-dark-bg p-4">
			<div className="max-w-md w-full">
				<div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8">
					{/* Icon */}
					<div className="flex justify-center mb-6">
						<div className="p-4 rounded-full bg-red-100 dark:bg-red-900/20">
							<AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-400" />
						</div>
					</div>

					{/* Title */}
					<h1 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-2">
						{isSessionError ? 'Sesión Expirada' : 'Algo salió mal'}
					</h1>

					{/* Description */}
					<p className="text-center text-zinc-600 dark:text-zinc-400 mb-6">
						{isSessionError
							? 'Tu sesión ha expirado. Serás redirigido al inicio de sesión en breve.'
							: 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.'}
					</p>

					{/* Error Details (only in development) */}
					{process.env.NODE_ENV === 'development' && (
						<div className="mb-6 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
							<p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 break-all">
								{error.message}
							</p>
						</div>
					)}

					{/* Actions */}
					<div className="flex flex-col gap-3">
						{!isSessionError && (
							<Button
								color="primary"
								size="lg"
								className="w-full font-semibold"
								startContent={<RefreshCcw size={18} />}
								onPress={() => reset()}
							>
								Intentar Nuevamente
							</Button>
						)}

						<Button
							variant={isSessionError ? 'solid' : 'bordered'}
							color={isSessionError ? 'primary' : 'default'}
							size="lg"
							className="w-full font-semibold"
							startContent={<Home size={18} />}
							onPress={() => router.push(isSessionError ? '/login' : '/dashboard')}
						>
							{isSessionError ? 'Ir al Login' : 'Volver al Inicio'}
						</Button>
					</div>
				</div>

				{/* Additional Help */}
				<p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-6">
					Si el problema persiste, contacta al soporte técnico
				</p>
			</div>
		</div>
	);
}
