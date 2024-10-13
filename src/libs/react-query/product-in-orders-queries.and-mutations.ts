import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RegisterProductInOrderRequest, RegisterProductInOrderResponse, registerProductInOrder } from '@/hooks/product-in-orders/register-product-in-order'; // Importe a função e interfaces corretas

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
