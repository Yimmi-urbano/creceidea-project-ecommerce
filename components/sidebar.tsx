'use client';
import React from 'react';
import useResizableSidebar from '@/hooks/useResizableSidebar';
import Options from './options';
import { Logo } from './icons';

const Sidebar: React.FC = () => {
  const { sidebarRef, resizeHandleRef } = useResizableSidebar();

  return (
    <div id="sidebar" ref={sidebarRef} className="resizable bg-gray-800 text-white p-4 relative">
     
      <Logo className='logo-sidebar mb-10 mt-5 ml-[-9px]' />
     
   
   <Options/>
      <div id="resize-handle" ref={resizeHandleRef} className="resize-handle bg-gray-700 hover:bg-gray-600 text-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h8M8 6h8m-8 12h8" />
        </svg>
      </div>
    </div>
  );
};

export default Sidebar;
