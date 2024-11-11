import { axiosInstance } from "@/libs/axios";
import { Order } from "../../../@types/orders";

export async function ConfirmOrder(id: string) {
    try {
        // Faz uma requisição PUT para confirmar o pedido com o ID fornecido
        const response = await axiosInstance.put<Order>(
            `/orders/confirmorder/${id}`  // Ajuste a URL para incluir o ID do pedido no caminho
        );
        return response.data;  // Retorna a resposta tipada como Order
    } catch (error: any) {
        console.error('Erro ao confirmar o pedido:', error.message || error);

        // Trata mensagens de erro específicas
        const message = error.response?.data?.message || 'Erro inesperado ao confirmar o pedido.';
        if (error.response?.status === 400) {
            throw new Error("Estoque insuficiente");
        } else if (error.response?.status === 404) {
            throw new Error("Pedido ou produto não encontrado");
        } else if (error.response?.status === 500) {
            throw new Error("Erro interno do servidor");
        } else {
            throw new Error(message);
        }
    }
}
