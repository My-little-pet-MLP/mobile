import { axiosInstance } from "@/libs/axios";
import { ProductInOrderList } from "../../../@types/product-in-orders";


export async function ListAllProductInOrdersByOrderId(
    id: string
): Promise<ProductInOrderList[]> {
    try {
        // Faz a requisição e armazena a resposta
        const response = await axiosInstance.get<ProductInOrderList[]>(
            `/product-in-orders/listallbyorder/${id}`
        );
        // Retorna o array diretamente
        return response.data;
    } catch (error: any) {
        console.error('Erro capturado na requisição:', error);
        console.error('Mensagem de erro:', error.message);
        console.error('Dados do erro na resposta:', error.response?.data);

        // Lança um erro amigável
        throw new Error(
            error.response?.data?.message || 'Erro inesperado ao listar produtos do pedido'
        );
    }
}
