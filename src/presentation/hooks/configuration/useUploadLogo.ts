import { ChangeEvent, useRef, useState } from 'react';

import { toast } from 'sonner';

import { uploadLogo } from '@/src/infrastructure/repositories/uploadRepository';

export const useUploadLogo = (): {
	handleFileChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
	handleAddImageClick: () => void;
	loading: boolean;
	imageUrl: string | null;
	fileInputRef: React.RefObject<HTMLInputElement>;
} => {
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleAddImageClick = (): void => {
		fileInputRef.current?.click();
	};

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
		const file = event.target.files?.[0];
		if (file === undefined) {
			return;
		}

		try {
			setLoading(true);
			const url = await uploadLogo(file);
			setImageUrl(url);
			toast.success('Logo subido correctamente');
		} catch (error) {
			console.error('Error uploading logo:', error);
			toast.error('Error al subir el logo');
		} finally {
			setLoading(false);
		}
	};

	return {
		handleFileChange,
		handleAddImageClick,
		loading,
		imageUrl,
		fileInputRef,
	};
};
