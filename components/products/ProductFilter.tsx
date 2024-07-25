"use client";

import React, { useState, useEffect } from 'react';
import { useProductContext } from '@/hooks/contextProduct';
import { Input, Button } from '@nextui-org/react';
import { getProducts } from '@/hooks/fetchProducts';

const ProductFilter: React.FC = () => {
  const { setFilteredProducts, setPage, page } = useProductContext();
  const [title, setTitle] = useState('');
  const [searchApplied, setSearchApplied] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(page, searchApplied ? title : '');
        setFilteredProducts(response.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (searchApplied || title === '') {
      fetchProducts();
    }
  }, [title, page, searchApplied, setFilteredProducts]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSearchClick = async () => {
    if (title.trim() === '') {
      // If the input is empty, fetch all products
      clearFilters();
    } else {
      // Perform the search
      setSearchApplied(true);
      setPage(1);
    }
  };

  const clearFilters = async () => {
    setTitle('');
    setSearchApplied(false);
    setPage(1);
    try {
      const response = await getProducts(1);
      setFilteredProducts(response.products);
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };

  useEffect(() => {
    // Reset searchApplied if the title becomes empty
    if (title.trim() === '') {
      setSearchApplied(false);
    }
  }, [title]);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <Input
        placeholder="Filtrar por título"
        value={title}
        onChange={handleTitleChange}
        className="w-full md:w-2/3"
      />
      <Button
        onClick={handleSearchClick}
        className="w-full md:w-1/3"
      >
        {searchApplied && title ? 'Limpiar Filtros' : 'Buscar'}
      </Button>
    </div>
  );
};

export default ProductFilter;
