import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserCategory } from '@/api/categories';
import { useToast } from '@/hooks/useToast';

export const useUpdateCategories = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserCategory,
    onSuccess: () => {
      toast.success('Categories updated!');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    }
  });
};