"use client"
import React, { useState } from 'react';
import BannerList from '@/src/presentation/components/client/home/CardBanners';
import BannerModal from '@/src/presentation/components/client/home/BannerModal';
import { Banner } from '@/src/domain/banners/Banner';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState<Banner | undefined>();

  const openModal = (banner?: Banner) => {
    setCurrentBanner(banner);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBanner(undefined);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Banners del Home</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Gestiona los banners promocionales que se muestran en la página principal
          </p>
        </div>
      </div>

      {/* Banner List */}
      <BannerList onEdit={openModal} onOpenModal={() => openModal()} />

      {/* Banner Modal */}
      <BannerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        banner={currentBanner}
      />
    </div>
  );
}
