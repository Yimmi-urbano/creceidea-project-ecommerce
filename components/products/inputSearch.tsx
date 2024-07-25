// ProductFilter.tsx
import React, { useState, useEffect } from 'react';
import { useProductContext } from '@/hooks/contextProduct';
import { getProducts } from '@/hooks/fetchProducts';
import { Input } from '@nextui-org/react';
import { SearchIcon } from '../icons';

const ProductFilter: React.FC = () => {
  const { setFilteredProducts, setPage, page } = useProductContext();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await getProducts(page, filter);
        setFilteredProducts(response.products);
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    };

    fetchFilteredProducts(); // Llamada general a fetchFilteredProducts

  }, [filter, page, setFilteredProducts]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setPage(1); // Resetear a la primera página cuando se cambie el filtro
  };

  return (
    
      <Input
      isClearable
        
        placeholder="Filtrar por título"
        variant="flat"
        color='default'
        value={filter}
        onChange={handleFilterChange}
        classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
        startContent={
            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
      />
   
  );
};

export default ProductFilter;
