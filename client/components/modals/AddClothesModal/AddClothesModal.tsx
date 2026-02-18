'use client';

import React, { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { X, Check } from 'lucide-react';
import { SerperImageResult } from '@/api/clothes';
import Image from 'next/image';

interface AddClothesModalProps {
    isOpen: boolean;
    onClose: () => void;
    searchResults: SerperImageResult[];
    ticker?: string;
}

export function AddClothesModal({ isOpen, onClose, searchResults, ticker }: AddClothesModalProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleConfirm = () => {
        if (selectedImage) {
            console.log('Selected image for wardrobe:', selectedImage);
            console.log('Ticker:', ticker);
            onClose();
        }
    };

    const handleSelectImage = (image: string) => {
        setSelectedImage(image);
    };

    return (
        <Transition show={isOpen} as={React.Fragment}>
            <Dialog as="div" className="relative z-[100]" onClose={onClose}>
                <TransitionChild
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95 translate-y-4"
                            enterTo="opacity-100 scale-100 translate-y-0"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100 translate-y-0"
                            leaveTo="opacity-0 scale-95 translate-y-4"
                        >
                            <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-3xl bg-zinc-950 border border-zinc-800 p-8 text-left align-middle shadow-2xl transition-all">
                                <div className="flex items-center justify-between mb-6">
                                    <DialogTitle as="h3" className="text-2xl font-light text-white">
                                        Select the best photo
                                    </DialogTitle>
                                    <button
                                        onClick={onClose}
                                        className="p-2 rounded-full hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {ticker && (
                                    <div className="mb-6 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 w-fit">
                                        <p className="text-xs text-violet-300 uppercase tracking-widest font-medium mb-1">Detected Ticker</p>
                                        <p className="text-lg font-mono text-white">{ticker}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {searchResults?.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSelectImage(img.imageUrl)}
                                            className={`
                                                relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 group
                                                ${selectedImage === img.imageUrl 
                                                    ? 'border-primary ring-4 ring-primary/20 scale-[0.98]' 
                                                    : 'border-zinc-800 hover:border-zinc-700'}
                                            `}
                                        >
                                            <Image
                                                src={img.thumbnailUrl}
                                                alt={img.title}
                                                fill
                                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            {selectedImage === img.imageUrl && (
                                                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-[2px]">
                                                    <div className="w-10 h-10 rounded-full bg-primary text-background flex items-center justify-center shadow-lg transform animate-in zoom-in duration-300">
                                                        <Check className="w-6 h-6 stroke-[3]" />
                                                    </div>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-8 flex justify-end gap-3">
                                    <button
                                        onClick={onClose}
                                        className="px-6 py-3 rounded-xl font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirm}
                                        disabled={!selectedImage}
                                        className={`
                                            px-8 py-3 rounded-xl font-semibold transition-all duration-300
                                            ${!selectedImage 
                                                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                                                : 'bg-primary text-background hover:bg-primary-hover shadow-lg shadow-primary/20 active:scale-95'}
                                        `}
                                    >
                                        Confirm selection
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}