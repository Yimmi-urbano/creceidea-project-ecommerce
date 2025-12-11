"use client"
import React, { useState } from 'react';
import BannerList from '@/src/presentation/components/client/home/card-banners';
import BannerModal from '@/src/presentation/components/client/home/BannerModal';
import { Banner } from '@/src/presentation/hooks';

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
    <div>
      <BannerList onEdit={openModal} onOpenModal={() => openModal()} />
      <BannerModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        banner={currentBanner}  
      />
    </div>
  );
}
