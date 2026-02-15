import apiClient from '@/lib/api-client';

export interface Clothing {
    id: string;
    name?: string;
    type?: string;
    color?: string;
    size?: string;
    brand?: string;
    imageUrl?: string;
}

export const clothesApi = {
    create: async (file: File): Promise<Clothing> => {
        const formData = new FormData();
        formData.append('image', file);
      console.log('formData3', file);

      const response = await apiClient.post<Clothing>('/clothes', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('response.data1', response.data);
        return response.data;
    },

    findAll: async (): Promise<Clothing[]> => {
        const response = await apiClient.get<Clothing[]>('/clothes');
        return response.data;
    },
};
