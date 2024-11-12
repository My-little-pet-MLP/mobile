import { axiosInstance } from "@/libs/axios";
import { ProductInOrderList } from "../../../@types/product-in-orders";


export async function ListAllProductInOrdersByOrderId(
    id: string
): Promise<ProductInOrderList[]> {
        // Faz a requisição e armazena a resposta
        const response = await axiosInstance.get<ProductInOrderList[]>(
            `/product-in-orders/listallbyorder/${id}`
        );
        // Retorna o array diretamente
        return response.data;
}
