import { axiosInstance } from "@/libs/axios";
import { Order } from "../../../@types/orders";

export interface ListOrdersByCustomerResponse {
    orders: Order[];
    totalPages: number;
    currentPage: number;
  }
  
  // Função para listar pedidos de um cliente específico pelo ID do cliente
  export async function listOrdersByCustomer(
    customer_id: string,
    page: number = 1,
    size: number = 10
  ): Promise<ListOrdersByCustomerResponse> {
    try {
      const response = await axiosInstance.get<ListOrdersByCustomerResponse>(
        `/orders/listAllByCustomerId`, 
        {
          params: {
            customer_id, // ID do cliente
            page,        // Página para paginação
            size         // Tamanho da página
          }
        }
      );
      
      return response.data; // Retorna a resposta tipada
    } catch (error: any) {
      console.error('Erro ao listar os pedidos do cliente', error.message || error);
      throw new Error(error.response?.data?.message || 'Erro inesperado ao listar os pedidos.');
    }
  }