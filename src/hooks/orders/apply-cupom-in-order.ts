import { axiosInstance } from "@/libs/axios";
import { Order } from "../../../@types/orders";


export async function ApplyCupomInOrder(cupom_id: string, order_id: string) {
    try {
        // Faz uma requisição PUT para aplicar o cupom a um pedido específico
        const response = await axiosInstance.put<Order>(
            `/orders/apply-cupom-in-order`,  // Ajuste a URL conforme a rota correta
            {
                cupom_id,
                order_id
            }
        );
        return response.data;  // Retorna a resposta tipada como Order
    } catch (error: any) {
        console.error('Erro ao aplicar cupom no pedido:', error.message || error);
        throw new Error(error.response?.data?.message || 'Erro inesperado ao aplicar o cupom.');
    }
}