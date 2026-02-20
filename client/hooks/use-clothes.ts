import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clothesApi } from '@/api/clothes';

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
      //todo: add fix type
        mutationFn: (data: any) => clothesApi.save(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clothes'] });
        },
    });
};
