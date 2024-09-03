"use client"
import React, { useState } from 'react';
import BannerList from '@/components/home/card-banners';
import BannerModal from '@/components/home/BannerModal';
import { Banner } from '@/hooks/bannerService';

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
