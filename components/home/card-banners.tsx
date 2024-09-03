import React, { useEffect, useState } from 'react';
import { Card, Button, Image, CardBody, CardHeader } from '@nextui-org/react';
import { fetchBanners, deleteBanner, Banner } from '@/hooks/bannerService';
import { MiniTrashIcon, EditProductIcon } from '../icons';

interface BannerListProps {
  onEdit: (banner: Banner) => void;
  onOpenModal: () => void;
}

const BannerList: React.FC<BannerListProps> = ({ onEdit, onOpenModal }) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const data = await fetchBanners();
        setBanners(data);
      } catch (err) {
        setError((err as Error).message || 'Error fetching banners');
      } finally {
        setLoading(false);
      }
    };

    loadBanners();
  }, []);

  const handleDelete = async (bannerId: string) => {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar el banner?');
    if (!confirmDelete) return;

    try {
      await deleteBanner(bannerId);
      setBanners(banners.filter(banner => banner._id !== bannerId));
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  if (loading) return <div>Cargando banners...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Card isBlurred className="p-0  border-1 border-[#0ea5e9]/30 bg-[#0c4a6e]/40">
      <CardHeader className="bg-transparent flex justify-between">
        <h2 className="text-xl font-semibold text-gray-600 dark:text-white">Banners</h2>
        {banners.length <= 4 && (
          <Button isIconOnly color='warning' className='text-lg' onClick={onOpenModal}>+</Button>
        )}
      </CardHeader>
      <CardBody className="flex gap-3">
        {banners.map((banner) => (
          <Card key={banner._id} className="w-full rounded-lg border-none bg-background/70 dark:bg-sky-950/30">
            <CardBody>
              <div className='flex flex-row justify-between gap-4'>
                <div className='flex flex-row gap-4 items-center'>
                  <img
                    src={banner.image}
                    alt="Banner Image"
                    className="w-60 h-16 rounded-xl object-cover"
                  />
                </div>
                <div className='flex flex-row gap-4 items-center'>
                  <Button
                    onClick={() => onEdit(banner)}
                    isIconOnly
                    color="success"
                    variant="flat"
                    className='p-0 min-w-6 w-6 h-6 rounded-md'
                  >
                    <EditProductIcon size={16} />
                  </Button>
                  <Button
                    onClick={() => handleDelete(banner._id)}
                    isIconOnly
                    color="danger"
                    variant="flat"
                    className='p-0 min-w-6 w-6 h-6 rounded-md'
                  >
                    <MiniTrashIcon size={18} />
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </CardBody>
    </Card>
  );
};

export default BannerList;
