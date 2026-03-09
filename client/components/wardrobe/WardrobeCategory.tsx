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
      className="group relative bg-[#0e0e11] border border-white/10 md:border-white/[0.04] rounded-3xl p-4 
                 hover:bg-[#121215] hover:border-primary/20 transition-all duration-500 cursor-pointer 
                 overflow-hidden hover:shadow-[0_0_40px_rgba(212,175,53,0.03)]"
    >  
      <div className="flex justify-between items-center mb-5 relative z-20">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-medium text-white/90 group-hover:text-white transition-colors duration-300">
            {category}
          </h2>
        </div>
        
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <Menu as="div" className="relative">
            {({ open }) => (
              <>
                <MenuButton 
                  onClick={(e) => e.stopPropagation()}
                  className={`
                    p-2 cursor-pointer rounded-xl transition-all duration-300
                    ${open 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-stone-500 hover:text-white hover:bg-white/5'}
                  `}
                >
                  <MoreVertical className="w-4 h-4" />
                </MenuButton>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-150"
                  enterFrom="transform opacity-0 scale-98"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-100"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-98"
                >
                  <MenuItems className="absolute right-0 mt-3 w-44 origin-top-right rounded-2xl bg-[#16161a] border border-white/[0.05] shadow-2xl focus:outline-none z-[100] overflow-hidden p-1">
                    <MenuItem>
                      {({ focus }) => (
                        <button
                          onClick={(e) => handleAction(e, 'Hide')}
                          className={`${focus ? 'bg-white/5 text-white' : 'text-stone-400'} ${menuItemStyles}`}
                        >
                          <EyeOff className={iconStyles} />
                          <span>Hide</span>
                        </button>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ focus }) => (
                        <button
                          onClick={(e) => handleAction(e, 'Edit')}
                          className={`${focus ? 'bg-white/5 text-white' : 'text-stone-400'} ${menuItemStyles}`}
                        >
                          <Pencil className={iconStyles} />
                          <span>Rename</span>
                        </button>
                      )}
                    </MenuItem>
                    <div className="h-px bg-white/5 my-1 mx-1" />
                    <MenuItem>
                      {({ focus }) => (
                        <button
                          onClick={(e) => handleAction(e, 'Delete')}
                          className={`${focus ? 'bg-red-500/10 text-red-500' : 'text-red-500/60'} ${menuItemStyles}`}
                        >
                          <Trash2 className={iconStyles} />
                          <span>Delete</span>
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </>
            )}
          </Menu>
          <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-primary transition-colors" />
        </div>
      </div>

      <div className="flex -space-x-5 items-center relative z-10">
        {previewItems.length > 0 ? (
          <>
            {previewItems.map((item, idx) => (
              <div 
                key={item.id} 
                className="relative w-24 h-32 rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 group-hover:translate-y-[-4px]"
                style={{ 
                  zIndex: 10 - idx,
                  boxShadow: '0 4px 20px -8px rgba(0,0,0,0.5)'
                }}
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
                  <div className="w-full h-full bg-[#18181b] flex items-center justify-center">
                    <Shirt className="w-5 h-5 text-stone-700" />
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="w-full h-32 rounded-2xl bg-white/[0.01] border border-white/[0.03] flex items-center justify-center">
            <Shirt className="w-6 h-6 text-stone-800" />
          </div>
        )}
        
        {count > 3 && (
          <div 
            className="relative w-24 h-32 rounded-2xl border border-white/5 bg-[#18181b] flex items-center justify-center transition-all duration-500 group-hover:translate-y-[-4px] group-hover:border-primary/20" 
            style={{ zIndex: 0 }}
          >
            <span className="text-xs font-semibold text-primary/80 group-hover:text-primary transition-colors">
              +{count - 3}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
