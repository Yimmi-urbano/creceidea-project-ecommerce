'use client';

import SocialLinksManager from '@/components/SocialLinksManager';
import { Card, CardBody } from '@nextui-org/react';


export default function PageSocialLink() {
  return (

    <Card isBlurred className="p-0  border-1 border-[#0ea5e9]/30 bg-[#0c4a6e]/40">
      <CardBody>
      <SocialLinksManager />
      </CardBody>
    </Card>

  );
}