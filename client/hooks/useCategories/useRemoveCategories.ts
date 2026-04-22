import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeUserCategory } from '@/api/categories';
import { useToast } from '@/hooks/useToast';

export const useRemoveCategories = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: removeUserCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category removed successfully');
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : 'Failed to remove category');
    },
  });
};