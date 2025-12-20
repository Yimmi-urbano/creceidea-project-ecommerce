import React, { useState } from 'react';

import { Folder } from 'lucide-react';

interface CategoryIconProps {
	url?: string;
	alt: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ url, alt }) => {
	const [error, setError] = useState(false);

	if (error || !url || url.includes('placeholder')) {
		return (
			<div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
				<Folder size={18} />
			</div>
		);
	}

	return (
		<img
			src={url}
			alt={alt}
			onError={() => setError(true)}
			className="w-10 h-10 rounded-lg object-cover border border-zinc-200 dark:border-zinc-700 shrink-0"
		/>
	);
};
