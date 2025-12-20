'use client';
import React from 'react';

import { useRouter } from 'next/navigation';

export default function Index() {
	const _router = useRouter();
	router.push('/login');

	return <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10" />;
}
