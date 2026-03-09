'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetClothes } from '@/hooks/use-clothes';
import ClothingCard from '@/components/wardrobe/ClothingCard';
import WardrobeSidebar from '@/components/wardrobe/WardrobeSidebar';
import { ChevronLeft, Shirt } from 'lucide-react';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const category = decodeURIComponent(params.category as string);
  const { data: clothes, isLoading } = useGetClothes();

  const categoryItems = useMemo(() => {
    if (!clothes) return [];
    return clothes.filter(item => 
      !item.isHidden && 
      (item.category === category)
    );
  }, [clothes, category]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="mt-4 text-stone-500 font-medium animate-pulse">Loading {category}...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-transparent">
      {/* Ambient backgrounds */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(168,85,247,0.08)_0%,transparent_70%)] blur-[120px]" />
      </div>

      <div className="hidden md:block">
        <WardrobeSidebar 
          selectedCategory={category} 
          onSelectCategory={(cat) => router.push(cat ? `/wardrobe/${cat}` : '/wardrobe')} 
        />
      </div>

      <div className="flex-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <button
              onClick={() => router.push('/wardrobe')}
              className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors mb-8 group"
            >
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </div>
              <span className="font-semibold tracking-tight cursor-pointer">Back to overview</span>
            </button>

            <div className="flex items-baseline justify-between mb-12">
              <div>
                <h1 className="text-4xl font-bold text-white tracking-tight">{category}</h1>
                <p className="text-stone-500 mt-2 font-medium">
                  {categoryItems.length} items in your collection
                </p>
              </div>
            </div>

            {categoryItems.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {categoryItems.map(item => (
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
        </div>
      </div>
    </div>
  );
}
