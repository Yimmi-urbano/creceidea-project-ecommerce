// CategorySelector.tsx
import React, { useEffect, useState } from 'react';
import { Checkbox, Spinner } from '@nextui-org/react';
import { fetchCategories } from '@/src/application/products/productServices'; // Importar la función desde api.ts

interface Category {
  _id: string;
  title: string;
  slug: string;
  children?: Category[];
}

interface CategorySelectorProps {
  selectedCategories: { idcat: string, slug: string }[];
  onChange: (selectedCategories: { idcat: string, slug: string }[]) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategories, onChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryChange = (category: { _id: string; slug: string }, isChecked: boolean) => {
    let updatedCategories = [...selectedCategories];

    if (isChecked) {
      updatedCategories.push({ idcat: category._id, slug: category.slug });
    } else {
      updatedCategories = updatedCategories.filter(cat => cat.idcat !== category._id);
    }

    onChange(updatedCategories);
  };

  const renderCategories = (categories: Category[]) => {
    return categories.map(category => (
      <div key={category._id}>
        <Checkbox
          color="warning"
          isSelected={selectedCategories.some(cat => cat.idcat === category._id)}
          onChange={(e) => handleCategoryChange({ _id: category._id, slug: category.slug }, e.target.checked)}
        >
          {category.title}
        </Checkbox>
        {category.children && (
          <div style={{ paddingLeft: '20px' }}>
            {renderCategories(category.children)}
          </div>
        )}
      </div>
    ));
  };

  if (loading) {
    return <Spinner />;
  }

  return <div>{renderCategories(categories)}</div>;
};

export default CategorySelector;
