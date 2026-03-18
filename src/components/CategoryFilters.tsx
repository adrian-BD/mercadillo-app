import { Coffee, Shirt, ShoppingBag, Apple, Utensils } from 'lucide-react';

interface CategoryFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'Todo', icon: ShoppingBag, color: 'bg-[#1E3A8A]' },
  { id: 'Gastronomía', name: 'Gastronomía', icon: Utensils, color: 'bg-[#E2725B]' },
  { id: 'Rastro y Antigüedades', name: 'Rastro', icon: ShoppingBag, color: 'bg-amber-600' },
  { id: 'Fruta y Verdura', name: 'Fruta', icon: Apple, color: 'bg-green-600' },
  { id: 'Moda y Outlet', name: 'Moda', icon: Shirt, color: 'bg-purple-600' },
  { id: 'Zona de Cafetería', name: 'Cafetería', icon: Coffee, color: 'bg-orange-600' },
];

export function CategoryFilters({ selectedCategory, onSelectCategory }: CategoryFiltersProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 px-6 scrollbar-hide">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.id;

        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all transform hover:scale-105 ${
              isSelected
                ? `${category.color} text-white shadow-lg`
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}
