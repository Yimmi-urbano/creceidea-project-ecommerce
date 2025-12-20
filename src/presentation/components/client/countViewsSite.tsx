import React, { useEffect, useState } from 'react';

import { CircularProgress, Card, CardBody, CardFooter, Chip } from '@nextui-org/react';

import { WorldIcon } from '@/src/presentation/components/shared/Icons';

interface ApiResponse {
	views: number;
	limit_views: number;
}

// Simulación de una llamada API
const fetchApiData = (): Promise<ApiResponse> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ views: 1000, limit_views: 2800 });
		}, 500); // Simula una latencia de 500ms
	});
};

export default function CardProgressViews() {
	const [data, setData] = useState<ApiResponse>({ views: 0, limit_views: 0 });

	useEffect(() => {
		fetchApiData().then((response) => {
			setData(response);
		});
	}, []);

	const { views, limit_views } = data;
	const value = (views / limit_views) * 100;

	return (
		<Card
			isBlurred
			className="border-1 border-sky-100 bg-sky-50/60 dark:bg-sky-950/30 dark:border-sky-400 max-w-[610px]"
		>
			<CardBody className="justify-center items-center p-0 flex flex-col">
				<div className="flex items-center gap-2">
					<WorldIcon className="w-2 h-2 text-blue-500" />
					<span className="font-bold text-sky-500 text-xs dark:text-sky-100">
						{limit_views} vistas por mes
					</span>
				</div>
				<CircularProgress
					size="lg"
					classNames={{
						svg: 'md:w-28 md:h-28 drop-shadow-md',
						value: 'md:text-2xl font-semibold text-white',
					}}
					value={value || 0}
					strokeWidth={3}
					color="success"
					showValueLabel
				/>
			</CardBody>
			<CardFooter className="justify-center items-center pt-0">
				<Chip size="sm" variant="bordered" className="border-1 border-sky-100 text-sky-100">
					{limit_views} Visitas
				</Chip>
			</CardFooter>
		</Card>
	);
}
