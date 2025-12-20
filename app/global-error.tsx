'use client';

import { useEffect } from 'react';

import * as Sentry from '@sentry/nextjs';

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		Sentry.captureException(error);
	}, [error]);

	return (
		<html lang="es">
			<body>
				<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-zinc-50 dark:bg-dark-bg text-center">
					<h2 className="text-2xl font-bold mb-4">¡Algo salió muy mal!</h2>
					<p className="mb-8 text-zinc-600 dark:text-zinc-400">
						Ha ocurrido un error crítico en el sistema.
					</p>
					<button
						onClick={() => reset()}
						className="px-6 py-2 bg-primary text-white rounded-xl font-bold"
					>
						Intentar de nuevo
					</button>
				</div>
			</body>
		</html>
	);
}
