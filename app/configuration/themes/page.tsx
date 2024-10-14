'use client';

import ThemesList from '@/components/Themes';
import { ConfigProvider } from '@/hooks/ConfigContext';
import { Card, CardBody } from '@nextui-org/react';


export default function PageTheme() {
  return (

    <Card shadow="none" className="p-0 h-full border-[#0ea5e9]/0 bg-[#0c4a6e]/0 ">
      <CardBody>
        <ConfigProvider >
         
            <ThemesList />
          
        </ConfigProvider>
      </CardBody>
    </Card>

  );
}