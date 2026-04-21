import apiClient from '@/lib/api-client';

export type Category = {
  id: number;
  name: string;
  iconName: string;
  isHidden: boolean;
  categoryTypes: { id: string; name: string }[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const getCategories = async () => {
  try {
    const response = await apiClient.get<Category[]>('/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}