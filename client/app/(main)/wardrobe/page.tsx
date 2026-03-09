'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORY_TYPES } from '@fitly/shared';
import { useGetClothes } from '@/hooks/use-clothes';
import { Clothing } from '@/api/clothes';
import WardrobeCategory from '@/components/wardrobe/WardrobeCategory';
import WardrobeSidebar from '@/components/wardrobe/WardrobeSidebar';
import { Sparkles, Eye, EyeOff, Plus } from 'lucide-react';

export default function WardrobePage() {
  const router = useRouter();
  const { data: clothes, isLoading } = useGetClothes();
  const [showHidden, setShowHidden] = useState(false);

  const filteredClothes = useMemo(() => {
    if (!clothes) return [];
    if (showHidden) return clothes;
    return clothes.filter(item => !item.isHidden);
  }, [clothes, showHidden]);

  const groupedClothes = useMemo(() => {
    const groups: Record<string, Clothing[]> = {};

    Object.values(CATEGORY_TYPES).forEach(cat => {
      groups[cat] = [];
    });

    filteredClothes.forEach((item: Clothing) => {
      const cat = (item.category as string) || CATEGORY_TYPES.Other;
      if (groups[cat]) {
        groups[cat].push(item);
      } else {
        const otherCat = CATEGORY_TYPES.Other as string;
        if (!groups[otherCat]) groups[otherCat] = [];
        groups[otherCat].push(item);
      }
    });

    return groups;
  }, [filteredClothes]);

  const handleAddNewCategory = () => {
    console.log('Add new category clicked');
  };

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
          selectedCategory={null} 
          onSelectCategory={(cat) => cat && router.push(`/wardrobe/${cat}`)} 
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-stone-400 font-bold tracking-[0.4em] uppercase text-[9px]">Collection</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h1 className="text-5xl font-extrabold text-white tracking-tight">Your Wardrobe</h1>
                  <p className="text-stone-300 mt-4 text-lg max-w-2xl leading-relaxed font-medium">
                    Manage your personal style collection. Explore categories to see 
                    every detail and refine your seasonal looks.
                  </p>
                </div>
                
                <button
                  onClick={() => setShowHidden(!showHidden)}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs transition-all border cursor-pointer
                    ${showHidden 
                      ? 'bg-primary/20 border-primary/30 text-primary shadow-[0_0_20px_rgba(168,85,247,0.15)]' 
                      : 'bg-white/5 border-white/10 text-stone-400 hover:bg-white/10 hover:text-white'}
                  `}
                >
                  {showHidden ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Showing Hidden Items</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Show Hidden Items</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleAddNewCategory}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs transition-all border bg-white/5 border-white/10 text-stone-400 hover:text-white cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add new category</span>
                </button>
              </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(groupedClothes).map(([category, items]) => (
                <WardrobeCategory
                  key={category}
                  category={category}
                  items={items || []}
                  onOpen={(cat) => router.push(`/wardrobe/${cat}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}