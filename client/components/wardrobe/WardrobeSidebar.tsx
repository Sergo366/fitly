'use client';

import React from 'react';
import { 
  Shirt, 
  Layers, 
  Sparkles, 
  Cloud, 
  Footprints, 
  Watch, 
  PersonStanding, 
  MoreHorizontal,
  LayoutGrid,
  Heart,
  EyeOff,
  DollarSign,
} from 'lucide-react';
import { CATEGORY_TYPES } from '@fitly/shared';

interface WardrobeSidebarProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  [CATEGORY_TYPES.Tops]: Shirt,
  [CATEGORY_TYPES.Bottoms]: Layers,
  [CATEGORY_TYPES.Dresses]: Sparkles,
  [CATEGORY_TYPES.Outerwear]: Cloud,
  [CATEGORY_TYPES.Footwear]: Footprints,
  [CATEGORY_TYPES.Accessories]: Watch,
  [CATEGORY_TYPES.FullBody]: PersonStanding,
  [CATEGORY_TYPES.Other]: MoreHorizontal,
};

const SPECIAL_SECTIONS = [
  {
    slug: 'favorites',
    label: 'Favorites',
    Icon: Heart,
    activeClass: 'bg-primary/10 text-primary border-primary/20 shadow-[0_0_20px_rgba(168,85,247,0.1)]',
    iconActiveClass: 'text-primary fill-primary',
  },
  {
    slug: 'hidden',
    label: 'Hidden',
    Icon: EyeOff,
    activeClass: 'bg-white/10 text-white border-white/10',
    iconActiveClass: 'text-white',
  },
  {
    slug: 'for-sale',
    label: 'For Sale',
    Icon: DollarSign,
    activeClass: 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]',
    iconActiveClass: 'text-green-400',
  },
];

export default function WardrobeSidebar({ selectedCategory, onSelectCategory }: WardrobeSidebarProps) {
  const categories = Object.values(CATEGORY_TYPES);

  return (
    <aside className="w-54 flex flex-col gap-2 p-4 bg-white/[0.02] border-r border-white/5 h-[calc(100vh-80px)] sticky top-20 overflow-y-auto custom-scrollbar">
      <div className="mb-4">
        <h2 className="text-xs font-bold text-stone-500 uppercase tracking-widest px-4 mb-4">Categories</h2>
        
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
            selectedCategory === null 
              ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_20px_rgba(168,85,247,0.1)]' 
              : 'text-stone-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <LayoutGrid className={`w-5 h-5 ${selectedCategory === null ? 'text-primary' : 'text-stone-500 group-hover:text-stone-300'}`} />
          <span className="font-semibold tracking-tight">All Items</span>
        </button>
      </div>

      <div className="flex flex-col gap-1">
        {categories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat] || MoreHorizontal;
          const isActive = selectedCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`w-full flex items-center cursor-pointer gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_20px_rgba(168,85,247,0.1)]' 
                  : 'text-stone-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-stone-500 group-hover:text-stone-300'}`} />
              <span className="font-semibold tracking-tight">{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Special Sections */}
      <div className="mt-6">
        <h2 className="text-xs font-bold text-stone-500 uppercase tracking-widest px-4 mb-3">Collections</h2>
        <div className="flex flex-col gap-1">
          {SPECIAL_SECTIONS.map(({ slug, label, Icon, activeClass, iconActiveClass }) => {
            const isActive = selectedCategory === slug;
            return (
              <button
                key={slug}
                onClick={() => onSelectCategory(slug)}
                className={`w-full flex items-center cursor-pointer gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group border ${
                  isActive
                    ? activeClass
                    : 'text-stone-400 hover:text-white hover:bg-white/5 border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? iconActiveClass : 'text-stone-500 group-hover:text-stone-300'}`} />
                <span className="font-semibold tracking-tight">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
