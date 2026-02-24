'use client';

import Image from 'next/image';
import { Shirt } from 'lucide-react';
import { Clothing } from '@/api/clothes';

interface ClothingCardProps {
  item: Clothing;
  className?: string;
}

export default function ClothingCard({ item, className = '' }: ClothingCardProps) {
  return (
    <div className={`group relative bg-[#1A1A1E] border border-white/[0.05] rounded-2xl overflow-hidden hover:bg-[#232329] transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] active:scale-[0.98] ${className}`}>
      {/* Soft Glass highlight line */}
      <div className="absolute inset-x-0 top-0 h-[0.5px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="aspect-[3/4] relative overflow-hidden">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title || 'Clothing item'}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-[#16161a] flex items-center justify-center">
            <Shirt className="w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
          </div>
        )}
      </div>
      
      <div className="p-4 border-white/5">
        <h3 className="text-sm font-semibold text-white truncate group-hover:text-primary transition-colors">
          {item.userTitle || item.title || 'Untitled'}
        </h3>
        <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-widest font-bold">
          {item.type || 'Other'}
        </p>
      </div>
    </div>
  );
}
