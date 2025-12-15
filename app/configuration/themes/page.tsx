'use client';

import ThemesList from '@/src/presentation/components/client/Themes';
import { ConfigProvider } from '@/src/presentation/contexts';
import { Card, CardBody } from '@nextui-org/react';


export default function PageTheme() {
  return (

    <Card shadow="none" className="p-0 h-full border-sky-200/0 bg-sky-600/0 ">
      <CardBody>
        <ConfigProvider >

          <ThemesList />

        </ConfigProvider>
      </CardBody>
    </Card>

  );
}