import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RegisterProductInOrderRequest, RegisterProductInOrderResponse, registerProductInOrder } from '@/hooks/product-in-orders/register-product-in-order'; // Importe a função e interfaces corretas
import { QUERYKEYS } from './query-is';
import { ListAllProductInOrdersByOrderId } from '@/hooks/product-in-orders/list-all-product-in-orders-by-order-id';

export const useRegisterProductInOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: RegisterProductInOrderRequest) =>
            registerProductInOrder(request), // Usa a função de registro que criamos anteriormente
        onSuccess: (data: RegisterProductInOrderResponse) => {
            console.log("Produto registrado com sucesso!", data);
            // Atualiza o cache ou invalida consultas, conforme necessário
            queryClient.invalidateQueries({ queryKey: [] });
        },
        onError: (error: any) => {
            console.error("Erro ao registrar produto no pedido:", error.message || error);
        },
    });
};

export const useListProductInOrderByOrder = (orderId: string) => {
    return useQuery({
        queryKey: [QUERYKEYS.listAllProductInOrdersByOrderId, orderId],
        queryFn: () => ListAllProductInOrdersByOrderId(orderId),
        enabled: !!orderId,
    });
};