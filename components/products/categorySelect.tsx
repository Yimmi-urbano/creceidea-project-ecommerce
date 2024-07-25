import React, { useState, useEffect } from 'react';
import { useProductContext } from '@/hooks/contextProduct';
import { getProducts } from '@/hooks/fetchProducts';
import { Select, SelectItem } from '@nextui-org/react';

const CategoryFilter: React.FC = () => {
  const { setFilteredProducts, setPage, page } = useProductContext();
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await getProducts(page, "", category);
        setFilteredProducts(response.products);
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    };

    if (category !== "") {
      fetchFilteredProducts();
    } else {
      const fetchAllProducts = async () => {
        try {
          const response = await getProducts(page);
          setFilteredProducts(response.products);
        } catch (error) {
          console.error("Error fetching all products:", error);
        }
      };
      fetchAllProducts();
    }
  }, [category, page, setFilteredProducts]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setPage(1); 
  };

  return (
    
      <Select
        value={category}
        onChange={handleCategoryChange}
        variant="flat"
        color='default'
        className="w-full"
      >
        <SelectItem value="" key={''}>Seleccionar Categoría</SelectItem>
        <SelectItem value="planes" key={'planes'}>Planes</SelectItem>
        <SelectItem value="platos-criollos" key={'platos-criollos'}>Plato Criollo</SelectItem>
        <SelectItem value="bebidas" key={'bebidas'}>Bebidas</SelectItem>
      </Select>
    
  );
};

export default CategoryFilter;
