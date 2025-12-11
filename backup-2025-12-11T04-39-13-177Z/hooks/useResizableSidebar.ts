import { useEffect, useRef } from 'react';

const useResizableSidebar = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return; 

    const sidebar = sidebarRef.current;
    const resizeHandle = resizeHandleRef.current;

    if (!sidebar || !resizeHandle) return;

    let isResizing = false;

    const handleMouseDown = (e: MouseEvent) => {
      isResizing = true;
      document.addEventListener('mousemove', resizeSidebar);
      document.addEventListener('mouseup', stopResizing);
    };

    const resizeSidebar = (e: MouseEvent) => {
      if (isResizing) {
        const newWidth = e.clientX - sidebar.getBoundingClientRect().left;
        sidebar.style.width = `${newWidth}px`;
      }
    };

    const stopResizing = () => {
      isResizing = false;
      document.removeEventListener('mousemove', resizeSidebar);
      document.removeEventListener('mouseup', stopResizing);
    };

    resizeHandle.addEventListener('mousedown', handleMouseDown);

    return () => {
      resizeHandle.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', resizeSidebar);
      document.removeEventListener('mouseup', stopResizing);
    };
  }, []);

  return { sidebarRef, resizeHandleRef };
};

export default useResizableSidebar;
