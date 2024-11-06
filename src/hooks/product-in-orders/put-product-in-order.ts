import { axiosInstance } from "@/libs/axios";

export interface UpdateProductProps{
    id:string
    quantity:number
}
export interface UpdateProductPropsResponse{
    id:string;
    quantity:number;
    updated_at:string;
}
export async function  updateProductInOrder(request:UpdateProductProps) {
    try {
        // Supondo que estamos utilizando axios para realizar a requisição
        console.log(request)
        const response = await axiosInstance.put<UpdateProductPropsResponse>(
          `/product-in-orders/`,
          {
            quantity:request.quantity,
            id:request.id
          }
        );
        console.log(response.data)
        return response.data;  // Retorna a resposta tipada
        
      } catch (error: any) {
        console.error('Erro ao atualizar o produto no pedido', error.message || error);
        throw new Error(error.response?.data?.message || 'Erro inesperado ao atualizar o produto no pedido.');
      }
}