import '@/styles/globals.css';
import clsx from 'clsx';
import { Metadata, Viewport } from 'next';
import { Toaster } from 'sonner';

import { fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import { Providers } from '@/src/presentation/providers/Providers';

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: '/creceidea.svg',
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html suppressHydrationWarning lang="es">
			<body className={clsx('font-sans antialiased', fontSans.variable)}>
				<Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
					<div className="h-full lg:h-[99vh]">
						{children}
						<Toaster richColors position="bottom-right" />
					</div>
				</Providers>
			</body>
		</html>
	);
}
