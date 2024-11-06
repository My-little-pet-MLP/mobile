import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RegisterProductInOrderRequest, RegisterProductInOrderResponse, registerProductInOrder } from '@/hooks/product-in-orders/register-product-in-order'; // Importe a função e interfaces corretas
import { QUERYKEYS } from './query-is';
import { ListAllProductInOrdersByOrderId } from '@/hooks/product-in-orders/list-all-product-in-orders-by-order-id';
import { updateProductInOrder, UpdateProductProps, UpdateProductPropsResponse } from '@/hooks/product-in-orders/put-product-in-order';

export const useRegisterProductInOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: RegisterProductInOrderRequest) =>
            registerProductInOrder(request), // Usa a função de registro que criamos anteriormente
        onSuccess: (data: RegisterProductInOrderResponse) => {

            // Atualiza o cache ou invalida consultas, conforme necessário
            queryClient.invalidateQueries({ queryKey: [QUERYKEYS.listOrdersByCustomer] });
            queryClient.invalidateQueries({ queryKey: [QUERYKEYS.listAllProductInOrdersByOrderId] });
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

export const useUpdateProductInOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: UpdateProductProps) =>
            updateProductInOrder(request), 
        onSuccess: (data: UpdateProductPropsResponse) => {
            // Atualiza o cache ou invalida consultas, conforme necessário
            queryClient.invalidateQueries({ queryKey: [QUERYKEYS.listOrdersByCustomer] });
            queryClient.invalidateQueries({ queryKey: [QUERYKEYS.listAllProductInOrdersByOrderId] });
        },
        onError: (error: any) => {
            console.error("Erro ao update produto no pedido:", error.message || error);
        },
    });
};