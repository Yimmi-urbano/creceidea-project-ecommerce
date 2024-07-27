"use client"

import React from 'react';
import { PlusIcon, EditProductIcon, ShareIcon, EyeFilledIcon, MiniTrashIcon } from '../../../components/icons';


interface Category {
  title: string;
  detail: string;
  imageUrl: string;
  productCount: number;
}

const categories: Category[] = [
  {
    title: "Electrónica",
    detail: "Última tecnología en dispositivos electrónicos.",
    imageUrl: "https://via.placeholder.com/100",
    productCount: 120,
  },
  {
    title: "Hogar",
    detail: "Productos para mejorar y decorar tu hogar.",
    imageUrl: "https://via.placeholder.com/100",
    productCount: 85,
  },
  {
    title: "Ropa",
    detail: "Moda y tendencias para toda la familia.",
    imageUrl: "https://via.placeholder.com/100",
    productCount: 200,
  },
];

const CategoryCard: React.FC<Category> = ({ title, detail, imageUrl, productCount }) => (
  <div className="flex items-center justify-between p-4 bg-blue-[#F6F7F999]/60 dark:bg-sky-950/90 shadow-md rounded-lg mb-4">
    <div className="flex items-center">
      <img src={imageUrl} alt={title} className="w-16 h-16 rounded-md mr-4" />
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600">{detail}</p>
        <p className="text-gray-400">{productCount} productos</p>
      </div>
    </div>
    <div className="flex space-x-2">
      <button className="p-2 bg-white border stroke-black rounded-md hover:bg-gray-300">
        <EditProductIcon />
      </button>
      
      <button className="p-2 bg-blue-200 rounded-md hover:bg-blue-300">
        <EyeFilledIcon />
      </button>

      <button className="p-2 bg-[#C1DCEA] stroke-black rounded-md hover:bg-gray-300">
        <ShareIcon />
      </button>
      
      <button className="p-2 bg-red-200 rounded-md hover:bg-red-300">
        <MiniTrashIcon />
      </button>
    </div>
  </div>
);

const PageCategories: React.FC = () => (
  <div className="p-8 min-h-screen">
    <div className="mb-6">
      <button className="flex items-center w-full p-2 bg-white  dark:bg-sky-950/30 rounded-lg shadow-sm hover:bg-gray-50">
        <PlusIcon className="mr-2"/> 
        <span className="text-[#25556D] dark:text-white font-semibold  ml-6">Agregar nueva categoría</span>
      </button>
    </div>
    <div className="mb-6">
      <input
        type="text"
        placeholder="Buscar categoría"
        className="p-2 w-full border border-gray-300 rounded-md"
      />
    </div>
    {categories.map((category, index) => (
      <CategoryCard key={index} {...category} />
    ))}
  </div>
);

export default PageCategories;
