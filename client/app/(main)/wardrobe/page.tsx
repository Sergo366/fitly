'use client';

import { useState, useMemo } from 'react';
import { CATEGORY_TYPES } from '@fitly/shared';
import { useGetClothes } from '@/hooks/use-clothes';
import { Clothing } from '@/api/clothes';
import WardrobeCategory from '@/components/wardrobe/WardrobeCategory';
import ClothingCard from '@/components/wardrobe/ClothingCard';
import WardrobeSidebar from '@/components/wardrobe/WardrobeSidebar';
import { ChevronLeft, Shirt, Sparkles } from 'lucide-react';

export default function WardrobePage() {
  const { data: clothes, isLoading } = useGetClothes();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const groupedClothes = useMemo(() => {
    const groups: Record<string, Clothing[]> = {};

    // Initialize groups for all category types
    Object.values(CATEGORY_TYPES).forEach(cat => {
      groups[cat] = [];
    });

    if (!clothes) return groups;

    // Populate groups
    clothes.forEach((item: Clothing) => {
      const cat = (item.category as string) || CATEGORY_TYPES.Other;
      if (groups[cat]) {
        groups[cat].push(item);
      } else {
        // Fallback for unexpected categories
        const otherCat = CATEGORY_TYPES.Other as string;
        if (!groups[otherCat]) groups[otherCat] = [];
        groups[otherCat].push(item);
      }
    });

    return groups;
  }, [clothes]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="mt-4 text-stone-500 font-medium animate-pulse">Organizing your wardrobe...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-transparent">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(168,85,247,0.08)_0%,transparent_70%)] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(212,196,168,0.05)_0%,transparent_70%)] blur-[120px]" />
      </div>

      {/* Sidebar - Persistent on Desktop */}
      <div className="hidden md:block">
        <WardrobeSidebar 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Detailed view of a category */}
          {selectedCategory ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors mb-8 group"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </div>
                <span className="font-semibold tracking-tight cursor-pointer">Back to overview</span>
              </button>

              <div className="flex items-baseline justify-between mb-12">
                <div>
                  <h1 className="text-4xl font-bold text-white tracking-tight">{selectedCategory}</h1>
                  <p className="text-stone-500 mt-2 font-medium">
                    {(groupedClothes[selectedCategory] || []).length} items in your collection
                  </p>
                </div>
              </div>

              {(groupedClothes[selectedCategory] || []).length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {(groupedClothes[selectedCategory] || []).map(item => (
                    <ClothingCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 bg-white/[0.02] border border-dashed border-white/5 rounded-3xl">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                    <Shirt className="w-8 h-8 text-stone-600" />
                  </div>
                  <p className="text-stone-500 font-medium">No items in this category yet.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
              <header className="mb-12">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-stone-400 font-bold tracking-[0.4em] uppercase text-[9px]">Collection</span>
                </div>
                <h1 className="text-5xl font-extrabold text-white tracking-tight">Your Wardrobe</h1>
                <p className="text-stone-300 mt-4 text-lg max-w-2xl leading-relaxed font-medium">
                  Manage your personal style collection. Explore categories to see 
                  every detail and refine your seasonal looks.
                </p>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(groupedClothes).map(([category, items]) => (
                  <WardrobeCategory
                    key={category}
                    category={category}
                    items={items || []}
                    onOpen={setSelectedCategory}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}