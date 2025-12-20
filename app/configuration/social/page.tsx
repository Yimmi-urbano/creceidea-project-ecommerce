'use client';

import { Card, CardBody } from '@nextui-org/react';

import SocialLinksManager from '@/src/presentation/components/client/SocialLinksManager';

export default function PageSocialLink() {
	return (
		<Card shadow="none" className="p-0 h-full  border-sky-200/0 bg-sky-600/0 ">
			<CardBody>
				<SocialLinksManager />
			</CardBody>
		</Card>
	);
}
