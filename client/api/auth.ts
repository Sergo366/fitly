import apiClient from '@/lib/api-client';

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface AuthCredentials {
  email: string;
  password?: string;
}

export const authApi = {
  signin: async (data: AuthCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/signin', data);
    return response.data;
  },
  
  signup: async (data: AuthCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/signup', data);
    return response.data;
  },
};
