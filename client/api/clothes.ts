import apiClient from '@/lib/api-client';

export interface SerperImageResult {
    title: string;
    imageUrl: string;
    imageWidth: number;
    imageHeight: number;
    thumbnailUrl: string;
    thumbnailWidth: number;
    thumbnailHeight: number;
    source: string;
    domain: string;
    link: string;
    googleUrl: string;
    position: number;
}

export interface Clothing {
    id: string;
    name?: string;
    title?: string;
    type?: string;
    category?: string;
    seasons?: string[];
    color?: string;
    size?: string;
    brand?: string;
    imageUrl?: string;
    ticker?: string;
    searchResults?: SerperImageResult[];
}

export const clothesApi = {
    create: async (file: File): Promise<Clothing> => {
      const formData = new FormData();
      formData.append('image', file);

      const response = await apiClient.post<Clothing>('/clothes/get-clothes-from-image', formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
        return response.data;
    },

    findAll: async (): Promise<Clothing[]> => {
        const response = await apiClient.get<Clothing[]>('/clothes');
        return response.data;
    },

    save: async (data: any): Promise<Clothing> => {
        const response = await apiClient.post<Clothing>('/clothes/save-clothes', data);
        return response.data;
    },
};
