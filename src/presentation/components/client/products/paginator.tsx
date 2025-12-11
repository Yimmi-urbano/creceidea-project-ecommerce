// Paginator.tsx
import React from "react";
import { Pagination } from "@nextui-org/react";
import { useProductContext } from '@/src/presentation/contexts';

const Paginator: React.FC = () => {
  const { page, totalPages, setPage } = useProductContext();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Pagination
      total={totalPages}
      initialPage={page}
      onChange={(page) => handlePageChange(page)}
      showControls
      isCompact
      color="primary"
      variant="light"
      size="sm"
      className="m-auto"
      
    />
  );
};

export default Paginator;
