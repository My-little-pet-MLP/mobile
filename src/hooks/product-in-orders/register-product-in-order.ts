import { axiosInstance } from "@/libs/axios";

// Interface para o corpo da requisição ao registrar um produto em um pedido
export interface RegisterProductInOrderRequest {
    customer_id: string;  // ID do cliente
    product_id: string;   // ID do produto
    quantity: number;     // Quantidade do produto
  }
  
  // Interface para a resposta após o registro do produto no pedido
  export interface RegisterProductInOrderResponse {
    id: string;           // ID do item registrado no pedido
    productId: string;    // ID do produto
    quantity: number;     // Quantidade do produto
    orderId: string;      // ID do pedido
    created_at: string;   // Data de criação do registro
    updated_at: string;   // Data da última atualização do registro
  }
  
  // Função para registrar o produto em um pedido específico
  export async function registerProductInOrder(
    request: RegisterProductInOrderRequest
  ): Promise<RegisterProductInOrderResponse> {
    try {
      // Supondo que estamos utilizando axios para realizar a requisição
      const response = await axiosInstance.post<RegisterProductInOrderResponse>(
        `/order/registerProduct`,
        request
      );
      return response.data;  // Retorna a resposta tipada
    } catch (error: any) {
      console.error('Erro ao registrar o produto no pedido', error.message || error);
      throw new Error(error.response?.data?.message || 'Erro inesperado ao registrar o produto no pedido.');
    }
  }