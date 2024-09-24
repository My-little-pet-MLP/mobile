import { axiosInstance } from "@/libs/axios";

export async function getCategoryById(id: string) {
    try {
      if (!id) {
        throw new Error('ID é obrigatório para buscar a categoria');
      }
  
      const response = await axiosInstance.get(`/category/${id}`);
  
  
      if (response.status !== 200 || !response.data) {
        throw new Error('Falha ao buscar a categoria');
      }
  
      return response.data;
    } catch (error: any) {
  
      console.error('Erro ao buscar a categoria:', error.message || error);
      throw new Error(error.response?.data?.message || 'Erro inesperado ao buscar a categoria.');
    }
  }