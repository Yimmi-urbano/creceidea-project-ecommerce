'use client';

import SocialLinksManager from '@/src/presentation/components/client/SocialLinksManager';
import { Card, CardBody } from '@nextui-org/react';


export default function PageSocialLink() {
  return (

    <Card shadow="none" className="p-0 h-full  border-sky-200/0 bg-sky-600/0 ">
      <CardBody>
        <SocialLinksManager />
      </CardBody>
    </Card>

  );
}