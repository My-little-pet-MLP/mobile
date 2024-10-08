import { axiosInstance } from "@/libs/axios";

export async function getProductById(id: string) {
    try {
      if (!id) {
        throw new Error('ID é obrigatório para buscar o produto');
      }
  
      const response = await axiosInstance.get(`/product/${id}`);
  
  
      if (response.status !== 200 || !response.data) {
        throw new Error('Falha ao buscar o produto');
      }
  
      return response.data;
    } catch (error: any) {
  
      console.error('Erro ao buscar o produto:', error.message || error);
      throw new Error(error.response?.data?.message || 'Erro inesperado ao buscar produto.');
    }
  }