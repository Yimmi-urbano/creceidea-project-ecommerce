import React, { useState } from "react";
import { Checkbox, Button, cn } from "@nextui-org/react";
import { ChevronRight, ChevronDown } from "lucide-react";

interface Category {
  _id: string;
  title: string;
  icon_url: string;
  slug: string;
  __v: number;
  children?: Category[];
}

interface CategorySelectorProps {
  selectedCategories: Category[];
  onChange: (selected: Category[]) => void;
  categories?: Category[];
}

const CategoryItem = ({
  category,
  selectedCategories,
  onToggle,
  depth = 0
}: {
  category: Category,
  selectedCategories: Category[],
  onToggle: (cat: Category) => void,
  depth?: number
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isSelected = selectedCategories.some(c => c._id === category._id);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex items-center justify-between p-2 rounded-lg transition-colors",
          "hover:bg-zinc-100 dark:hover:bg-zinc-800",
          isSelected && "bg-primary/5 dark:bg-primary/10"
        )}
        style={{ paddingLeft: `${depth * 1.5 + 0.5}rem` }}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <Checkbox
            isSelected={isSelected}
            onValueChange={() => onToggle(category)}
            color="primary"
            classNames={{
              label: "text-sm text-zinc-700 dark:text-zinc-300",
              wrapper: "before:border-zinc-400 dark:before:border-zinc-600"
            }}
          >
            {category.title}
          </Checkbox>
        </div>
        {hasChildren && (
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </Button>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div className="ml-2 border-l border-zinc-200 dark:border-zinc-700">
          {category.children!.map(child => (
            <CategoryItem
              key={child._id}
              category={child}
              selectedCategories={selectedCategories}
              onToggle={onToggle}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function CategorySelector({ selectedCategories, onChange, categories: propCategories }: CategorySelectorProps) {

  const handleToggle = (category: Category) => {
    const isSelected = selectedCategories.some(c => c._id === category._id);
    let newSelected: Category[];
    if (isSelected) {
      newSelected = selectedCategories.filter(c => c._id !== category._id);
    } else {
      newSelected = [...selectedCategories, category];
    }
    onChange(newSelected);
  };

  if (!propCategories || propCategories.length === 0) {
    return <div className="p-4 text-center text-zinc-500 text-sm">Cargando categorías...</div>;
  }

  return (
    <div className="flex flex-col gap-1 w-full max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
      {propCategories.map(category => (
        <CategoryItem
          key={category._id}
          category={category}
          selectedCategories={selectedCategories}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}
