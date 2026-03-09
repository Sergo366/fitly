'use client';

import React, { Fragment } from 'react';
import { Clothing } from '@/api/clothes';
import Image from 'next/image';
import { ChevronRight, Shirt, MoreVertical, EyeOff, Pencil, Trash2 } from 'lucide-react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';

interface WardrobeCategoryProps {
  category: string;
  items: Clothing[];
  onOpen: (category: string) => void;
}

export default function WardrobeCategory({ category, items, onOpen }: WardrobeCategoryProps) {
  const previewItems = items.slice(0, 3);
  const count = items.length;

  const handleAction = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    console.log(`${action} category:`, category);
  };

  const menuItemStyles = "flex w-full items-center gap-3 rounded-xl cursor-pointer px-4 py-2.5 text-[13px] font-semibold transition-all";
  const iconStyles = "w-4 h-4";

  return (
    <div 
      onClick={() => onOpen(category)}
      className="group relative bg-[#1A1A1E] border border-white/[0.05] rounded-3xl p-6 hover:bg-[#232329] transition-all duration-500 cursor-pointer overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] active:scale-[0.98]"
    >  
      <div className="flex justify-between items-start mb-4 relative z-20">
        <div>
          <div className="flex flex-col items-start w-fit">
            <h2 className="text-xl font-bold text-white tracking-tight leading-none group-hover:text-primary transition-colors">{category}</h2>
          </div>
          <div className="w-full h-[2px] bg-gradient-to-r from-primary to-transparent rounded-full mt-1" />
          <p className="text-sm text-stone-400 mt-3 font-medium">
            {count} {count === 1 ? 'item' : 'items'}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Menu as="div" className="relative">
            {({ open }) => (
              <>
                <MenuButton 
                  onClick={(e) => e.stopPropagation()}
                  className={`
                    p-2 cursor-pointer rounded-full transition-all duration-300 backdrop-blur-md shadow-lg
                    ${open 
                      ? 'bg-primary text-black scale-110 shadow-primary/30' 
                      : 'bg-black/40 text-white/70 hover:text-white border border-white/5 hover:bg-primary/50'}
                  `}
                >
                  <MoreVertical className="w-4 h-4" />
                </MenuButton>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-150"
                  enterFrom="transform opacity-0 scale-95 -translate-y-2"
                  enterTo="transform opacity-100 scale-100 translate-y-0"
                  leave="transition ease-in duration-100"
                  leaveFrom="transform opacity-100 scale-100 translate-y-0"
                  leaveTo="transform opacity-0 scale-95 -translate-y-2"
                >
                  <MenuItems className="absolute right-0 mt-3 w-48 origin-top-right rounded-2xl bg-[#1A1A1E]/95 backdrop-blur-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] focus:outline-none z-[100] overflow-hidden">
                    <div className="p-1.5 space-y-0.5">
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            onClick={(e) => handleAction(e, 'Hide')}
                            className={`${focus ? 'bg-primary/10 text-primary' : 'text-stone-300'} ${menuItemStyles}`}
                          >
                            <EyeOff className={iconStyles} />
                            <span>Hide Category</span>
                          </button>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            onClick={(e) => handleAction(e, 'Edit')}
                            className={`${focus ? 'bg-primary/10 text-primary' : 'text-stone-300'} ${menuItemStyles}`}
                          >
                            <Pencil className={iconStyles} />
                            <span>Edit Name</span>
                          </button>
                        )}
                      </MenuItem>
                      <div className="border-t border-white/5 my-1" />
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            onClick={(e) => handleAction(e, 'Delete')}
                            className={`${focus ? 'bg-red-500/20 text-red-500' : 'text-red-500/80'} ${menuItemStyles}`}
                          >
                            <Trash2 className={iconStyles} />
                            <span>Delete</span>
                          </button>
                        )}
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Transition>
              </>
            )}
          </Menu>

          <div className="text-stone-400 group-hover:text-primary transition-all duration-300">
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </div>
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
