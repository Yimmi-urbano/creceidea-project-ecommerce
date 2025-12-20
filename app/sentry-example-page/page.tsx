'use client';

import { Button } from '@nextui-org/react';

export default function SentryExamplePage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-zinc-50 dark:bg-dark-bg">
			<div className="max-w-md w-full bg-white dark:bg-dark-card p-8 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 text-center">
				<h1 className="text-2xl font-bold mb-4 dark:text-white">Página de Prueba Sentry</h1>
				<p className="text-zinc-600 dark:text-zinc-400 mb-8">
					Haz clic en el botón de abajo para forzar un error y verificar que Sentry está capturando
					eventos correctamente.
				</p>

				<Button
					color="danger"
					variant="shadow"
					className="font-bold h-12 px-8"
					onPress={() => {
						throw new Error(`Sentry Test Error: ${new Date().toISOString()}`);
					}}
				>
					Disparar Error de Prueba
				</Button>
			</div>
		</div>
	);
}
