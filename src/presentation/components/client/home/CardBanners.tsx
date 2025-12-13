import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { getBanners, deleteBanner } from '@/src/application/banners/bannerServices';
import { Banner } from '@/src/domain/banners/Banner';
import { Trash2, Edit3, Plus, ImageIcon } from 'lucide-react';
import { ConfirmDeleteModal } from '@/src/presentation/components/client/utils/NotificationModal';

interface BannerListProps {
  onEdit: (banner: Banner) => void;
  onOpenModal: () => void;
}

const BannerList: React.FC<BannerListProps> = ({ onEdit, onOpenModal }) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bannerToDelete, setBannerToDelete] = useState<Banner | null>(null);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const data = await getBanners();
        setBanners(data);
      } catch (err) {
        setError((err as Error).message || 'Error fetching banners');
      } finally {
        setLoading(false);
      }
    };

    loadBanners();
  }, []);

  const confirmDelete = (banner: Banner) => {
    setBannerToDelete(banner);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!bannerToDelete) return;

    try {
      await deleteBanner(bannerToDelete._id);
      setBanners(banners.filter(banner => banner._id !== bannerToDelete._id));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {/* Add button skeleton */}
        <div className="flex justify-end">
          <div className="h-10 w-36 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
        </div>

        {/* Banner items skeleton */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="group relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 transition-all"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  {/* Image skeleton */}
                  <div className="w-48 h-20 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                  {/* Text skeleton */}
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-32 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                    <div className="h-3 w-48 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                  </div>
                </div>
                {/* Action buttons skeleton */}
                <div className="flex gap-2">
                  <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                  <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 rounded-xl border-2 border-dashed border-rose-200 dark:border-rose-900/30 bg-rose-50 dark:bg-rose-900/10">
        <div className="p-3 rounded-full bg-rose-100 dark:bg-rose-900/30 mb-3">
          <ImageIcon className="w-6 h-6 text-rose-600 dark:text-rose-400" />
        </div>
        <p className="text-sm font-medium text-rose-900 dark:text-rose-100 mb-1">Error al cargar banners</p>
        <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Add Banner Button */}
        {banners.length < 5 && (
          <div className="flex justify-end">
            <Button
              color="primary"
              startContent={<Plus size={18} />}
              onClick={onOpenModal}
              className="font-medium shadow-lg shadow-primary/20"
            >
              Agregar Banner
            </Button>
          </div>
        )}

        {/* Banner List */}
        {banners.length > 0 ? (
          <div className="space-y-3">
            {banners.map((banner, index) => (
              <div
                key={banner._id}
                className="group relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 transition-all duration-300 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700"
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Banner Preview */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Order Badge */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400">
                        {index + 1}
                      </span>
                    </div>

                    {/* Banner Image */}
                    <div className="relative flex-shrink-0 w-48 h-20 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                      <img
                        src={banner.image}
                        alt={`Banner ${index + 1} `}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Banner Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                        Banner {index + 1}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                        {banner.text || 'Sin texto configurado'}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => onEdit(banner)}
                      className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-primary transition-colors"
                      title="Editar banner"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => confirmDelete(banner)}
                      className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                      title="Eliminar banner"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 px-4 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30">
            <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
              <ImageIcon className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
              No hay banners configurados
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 text-center max-w-md">
              Agrega banners promocionales para destacar productos, ofertas o contenido importante en tu página principal.
            </p>
            <Button
              color="primary"
              startContent={<Plus size={18} />}
              onClick={onOpenModal}
              className="font-medium shadow-lg shadow-primary/20"
            >
              Agregar Primer Banner
            </Button>
          </div>
        )}

        {/* Info Banner Limit */}
        {banners.length >= 5 && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30">
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-amber-500" />
            <p className="text-sm text-amber-900 dark:text-amber-100">
              Has alcanzado el límite máximo de 5 banners. Elimina uno para agregar otro.
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        message={`¿Estás seguro de eliminar este banner ? `}
      />
    </>
  );
};

export default BannerList;
