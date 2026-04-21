import { useQuery } from '@tanstack/react-query';
import { Category, getCategories } from '@/api/categories';

export const useCategories = () => {
  return useQuery<unknown, unknown, Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};