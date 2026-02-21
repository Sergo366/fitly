import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clothesApi, SaveClothingData } from '@/api/clothes';

export const useAddClothing = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file: File) => clothesApi.create(file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clothes'] });
        },
    });
};
export const useSaveClothing = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: SaveClothingData) => clothesApi.save(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clothes'] });
        },
    });
};
