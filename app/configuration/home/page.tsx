'use client';
import { useState } from 'react';

import { Banner } from '@/src/domain/banners/Banner';
import BannerModal from '@/src/presentation/components/client/home/BannerModal';
import BannerList from '@/src/presentation/components/client/home/CardBanners';

export default function Home() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentBanner, setCurrentBanner] = useState<Banner | undefined>();
	const [refreshKey, setRefreshKey] = useState(0);

	const openModal = (banner?: Banner) => {
		setCurrentBanner(banner);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setCurrentBanner(undefined);
		// Trigger refresh by changing key
		setRefreshKey((prev) => prev + 1);
	};

	return (
		<div className="space-y-6 animate-in fade-in duration-500">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="min-w-0">
					<h1 className="text-xl md:text-2xl font-bold tracking-tight mb-1 truncate">
						Banners del Home
					</h1>
					<p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
						Gestiona los banners promocionales que se muestran en la página principal
					</p>
				</div>
			</div>

			{/* Banner List */}
			<BannerList key={refreshKey} onEdit={openModal} onOpenModal={() => openModal()} />

			{/* Banner Modal */}
			<BannerModal isOpen={isModalOpen} onClose={closeModal} banner={currentBanner} />
		</div>
	);
}
