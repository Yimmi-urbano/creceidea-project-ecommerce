import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  Edit3, 
  Trash2, 
  Utensils, 
  Coffee, 
  Search,
  MoreVertical,
  FolderOpen
} from 'lucide-react';

// Datos iniciales proporcionados
const INITIAL_DATA = [
    {
        "title": "Platos Marino",
        "icon_url": "https://example.com/icons/placeholder.png",
        "slug": "platos-marino",
        "parent": null,
        "productCount": 12,
        "_id": "68915322b4f8fcddc6aee54c",
        "children": []
    },
    {
        "title": "Platos de la Selva",
        "icon_url": "https://example.com/icons/placeholder.png",
        "slug": "platos-de-la-selva",
        "parent": null,
        "productCount": 8,
        "_id": "66fc66eb50d594d1d64ea230",
        "children": []
    },
    {
        "title": "Bebida",
        "icon_url": "https://example.com/icons/placeholder.png",
        "slug": "bebida",
        "parent": null,
        "productCount": 24,
        "_id": "68915540e04770474bae30b9",
        "children": []
    },
    {
        "_id": "66d69c53f8af8b751e689bfc",
        "title": "Entradas",
        "icon_url": "https://example.com/icons/placeholder.png",
        "parent": null,
        "productCount": 5,
        "slug": "entradas",
        "__v": 0,
        "children": []
    },
    {
        "_id": "66e06482f2c356eff94a70dc",
        "title": "Menú del día",
        "icon_url": "https://example.com/icons/placeholder.png",
        "parent": null,
        "productCount": 3,
        "slug": "menu-del-dia",
        "__v": 0,
        "children": []
    },
    {
        "title": "Sopas",
        "icon_url": "https://example.com/icons/placeholder.png",
        "slug": "sopas",
        "parent": null,
        "productCount": 4,
        "_id": "67abb3ce028e14dbcdc00b0b",
        "children": []
    },
    {
        "title": "Postres",
        "icon_url": "https://example.com/icons/placeholder.png",
        "slug": "postres",
        "parent": null,
        "productCount": 0,
        "_id": "673392fa0ba91f0fcab47df3",
        "children": [
            {
                "title": "Dulces",
                "icon_url": "https://example.com/icons/placeholder.png",
                "slug": "dulces",
                "parent": "673392fa0ba91f0fcab47df3",
                "productCount": 10,
                "_id": "6733932c0ba91f0fcab47e0d",
                "children": []
            },
            {
                "title": "Salados",
                "icon_url": "https://example.com/icons/placeholder.png",
                "slug": "salados",
                "parent": "673392fa0ba91f0fcab47df3",
                "productCount": 5,
                "_id": "673393470ba91f0fcab47e29",
                "children": []
            }
        ]
    }
];

// Componente para visualizar Icono o Fallback
const CategoryIcon = ({ url, alt }) => {
  const [error, setError] = useState(false);

  if (error || !url || url.includes('placeholder')) {
    return (
      <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
        <Utensils size={18} />
      </div>
    );
  }

  return (
    <img 
      src={url} 
      alt={alt} 
      onError={() => setError(true)}
      className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
    />
  );
};

// Componente de Fila de Subcategoría (Simple, sin expansión)
const SubCategoryRow = ({ item }) => {
  return (
    <div className="group flex items-center justify-between p-3 ml-8 mb-2 bg-slate-50 border border-slate-100 hover:border-orange-200 rounded-lg transition-all duration-200">
      <div className="flex items-center gap-3">
        {/* Línea conectora visual tipo árbol */}
        <div className="w-4 h-px bg-slate-300 -ml-4"></div>
        
        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
          <Coffee size={14} className="text-slate-500" />
        </div>
        <div>
          <h4 className="font-medium text-slate-700 text-sm">{item.title}</h4>
          <span className="text-xs text-slate-400">{item.productCount} productos</span>
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Editar">
          <Edit3 size={14} />
        </button>
        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Eliminar">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

// Componente Principal de Fila (Categoría Padre)
const CategoryRow = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="mb-3 select-none">
      {/* Tarjeta Principal */}
      <div 
        className={`
          relative flex items-center justify-between p-4 bg-white border rounded-xl cursor-pointer transition-all duration-200 shadow-sm
          ${isOpen ? 'border-orange-400 ring-1 ring-orange-100 shadow-md' : 'border-slate-200 hover:border-orange-300'}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          {/* Icono + Título */}
          <CategoryIcon url={item.icon_url} alt={item.title} />
          
          <div className="flex flex-col">
            <h3 className={`font-semibold text-base ${isOpen ? 'text-orange-700' : 'text-slate-800'}`}>
              {item.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span className="bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                /{item.slug}
              </span>
              {item.productCount > 0 && (
                <span>• {item.productCount} productos</span>
              )}
            </div>
          </div>
        </div>

        {/* Acciones derecha */}
        <div className="flex items-center gap-3">
          {hasChildren && (
            <div className={`
              flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors
              ${isOpen ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}
            `}>
              <span>{item.children.length} subcat.</span>
            </div>
          )}

          {/* Separador vertical */}
          <div className="h-8 w-px bg-slate-100 mx-1 hidden sm:block"></div>

          {/* Botones de acción (detienen propagación para no cerrar acordeón) */}
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors hidden sm:block">
               <Edit3 size={18} />
            </button>
            
            {/* Botón expandir/contraer principal */}
            <div className={`
              p-2 rounded-lg transition-transform duration-300 text-slate-400
              ${isOpen ? 'rotate-180 text-orange-500' : ''}
            `}>
              <ChevronDown size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Área de Hijos (Acordeón) */}
      <div 
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="pl-6 border-l-2 border-slate-200 ml-6 py-2 space-y-1">
            {/* Header de subsección */}
            <div className="flex items-center justify-between mb-3 px-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-4 flex items-center gap-2">
                    <FolderOpen size={12}/> Subcategorías de {item.title}
                </span>
                <button className="text-xs font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-md hover:bg-orange-100 transition-colors">
                    <Plus size={12} /> Nueva Subcategoría
                </button>
            </div>

            {hasChildren ? (
                item.children.map(child => (
                <SubCategoryRow key={child._id} item={child} />
                ))
            ) : (
                <div className="ml-8 p-4 text-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50/50">
                    <p className="text-sm text-slate-500 mb-2">No hay subcategorías aún.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [categories, setCategories] = useState(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtro simple para búsqueda
  const filteredCategories = categories.filter(cat => 
    cat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header de la Página */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Categorías del Menú</h1>
            <p className="text-slate-500 mt-1">Organiza cómo verán tus clientes la carta digital.</p>
          </div>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-orange-600/20 flex items-center gap-2 transition-transform active:scale-95">
            <Plus size={20} />
            <span>Crear Categoría</span>
          </button>
        </div>

        {/* Barra de Búsqueda y Filtros */}
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm mb-6 flex items-center gap-2">
            <div className="pl-3 text-slate-400">
                <Search size={20} />
            </div>
            <input 
                type="text" 
                placeholder="Buscar categoría..." 
                className="flex-1 py-2 px-2 outline-none text-slate-700 placeholder:text-slate-400 bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            <span className="text-xs font-medium text-slate-500 px-3">
                {filteredCategories.length} Resultados
            </span>
        </div>

        {/* Lista de Categorías */}
        <div className="space-y-1">
          {filteredCategories.map((category) => (
            <CategoryRow key={category._id} item={category} />
          ))}

          {filteredCategories.length === 0 && (
             <div className="text-center py-12">
                <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <Search size={24} />
                </div>
                <h3 className="text-lg font-medium text-slate-700">No encontramos nada</h3>
                <p className="text-slate-500">Intenta con otro término de búsqueda.</p>
             </div>
          )}
        </div>

      </div>
    </div>
  );
}