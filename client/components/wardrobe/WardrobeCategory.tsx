'use client';

import { Clothing } from '@/api/clothes';
import Image from 'next/image';
import { ChevronRight, Shirt } from 'lucide-react';

interface WardrobeCategoryProps {
  category: string;
  items: Clothing[];
  onOpen: (category: string) => void;
}

export default function WardrobeCategory({ category, items, onOpen }: WardrobeCategoryProps) {
  const previewItems = items.slice(0, 3);
  const count = items.length;

  return (
    <div 
      onClick={() => onOpen(category)}
      className="group relative bg-[#1A1A1E] border border-white/[0.05] rounded-3xl p-6 hover:bg-[#232329] transition-all duration-500 cursor-pointer overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] active:scale-[0.98]"
    >  
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <div className="flex flex-col items-start w-fit">
            <h2 className="text-xl font-bold text-white tracking-tight leading-none group-hover:text-primary transition-colors">{category}</h2>
          </div>
          <div className="w-full h-[2px] bg-gradient-to-r from-primary to-transparent rounded-full mt-1" />
          <p className="text-sm text-stone-400 mt-3 font-medium">
            {count} {count === 1 ? 'item' : 'items'}
          </p>
        </div>
        <div className="text-stone-400 group-hover:text-primary transition-all duration-300">
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>

      <div className="flex -space-x-4 relative z-10">
        {previewItems.length > 0 ? (
          <>
            {previewItems.map((item, idx) => (
              <div 
                key={item.id} 
                className="relative w-24 h-32 rounded-2xl border border-white/[0.1] overflow-hidden shadow-2xl transition-transform duration-300 group-hover:translate-y-[-4px]"
                style={{ zIndex: 3 - idx }}
              >
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title || 'Preview'}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                ) : (
                  <div className="w-full h-full bg-[#16161a] flex items-center justify-center">
                    <Shirt className="w-6 h-6 text-primary/20" />
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="w-full h-32 rounded-2xl bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-all duration-500 relative overflow-hidden border border-white/[0.04]">
            <Shirt className="w-10 h-10 text-stone-500 group-hover:text-primary/20 transition-colors duration-500" />
          </div>
        )}
        
        {count > 3 && (
          <div className="relative w-24 h-32 rounded-2xl border border-white/[0.1] bg-[#1a1a1e] flex items-center justify-center shadow-xl" style={{ zIndex: 0 }}>
            <span className="text-sm font-bold text-stone-400">+{count - 3}</span>
          </div>
        )}
      </div>
    </div>
  );
}
