import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clothesApi } from '@/api/clothes';

export const useAddClothing = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file: File) => clothesApi.create(file),
        onSuccess: () => {
            // Invalidate clothes list query when we add new item
            queryClient.invalidateQueries({ queryKey: ['clothes'] });
        },
    });
};
