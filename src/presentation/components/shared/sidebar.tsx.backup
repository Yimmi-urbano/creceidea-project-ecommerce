
import React from 'react';
import useResizableSidebar from '@/hooks/useResizableSidebar';
import Options from './options';
import { Logo } from './icons';
import { Card } from '@nextui-org/react';

const Sidebar: React.FC = () => {
  const { sidebarRef, resizeHandleRef } = useResizableSidebar();

  return (
    <Card isBlurred id="sidebar" ref={sidebarRef} className="resizable border-1 border-[#0ea5e9]/30 bg-[#0c4a6e] dark:text-white p-4 relative flex flex-col items-center">
      <div className="flex justify-center items-center w-full mt-1 mb-10">
        <Logo className='logo-sidebar' />
      </div>
      <Options />
      <div id="resize-handle" ref={resizeHandleRef} className="resize-handle text-gray-200 mt-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h8M8 6h8m-8 12h8" />
        </svg>
      </div>
    </Card>
  );
};

export default Sidebar;
