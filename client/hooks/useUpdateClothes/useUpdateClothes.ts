import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clothesApi } from '@/api/clothes';

export const useUpdateClothes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clothesApi.updateClothes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clothes'] });
    },
  });
};