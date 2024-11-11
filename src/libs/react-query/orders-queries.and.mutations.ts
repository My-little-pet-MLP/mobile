import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { listOrdersByCustomer } from '@/hooks/orders/list-all-by-customer-id'; // Importe a função e interfaces corretas
import { QUERYKEYS } from './query-is';
import { Order } from '../../../@types/orders';
import { getOrderById } from '@/hooks/orders/get-order-by-id';
import { ApplyCupomInOrder } from '@/hooks/orders/apply-cupom-in-order';
import { ConfirmOrder } from '@/hooks/orders/confirm-order';

export const useListOrdersByCustomer = (customer_id: string, page: number = 1, size: number = 10) => {
  return useQuery({
    queryKey: [QUERYKEYS.listOrdersByCustomer], // Chave única da query
    queryFn: () => listOrdersByCustomer(customer_id, page, size), // Função que realiza a requisição
    enabled: !!customer_id, // Habilita a query apenas se customer_id for válido
  });
};


export const useFetchOrderById = (id: string) => {
  return useQuery<Order>({
    queryKey: [QUERYKEYS.getOrderById, id], // Inclui o ID na chave para evitar conflitos de cache
    queryFn: () => getOrderById(id),
    enabled: !!id, // Habilita a query apenas se o ID for válido
  });
};

export const useApplyCupomInOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cupom_id, order_id }: { cupom_id: string; order_id: string }) =>
      ApplyCupomInOrder(cupom_id, order_id), // Usa a função de aplicação do cupom
    onSuccess: () => {
      // Invalida o cache para atualizar as consultas
      queryClient.invalidateQueries({ queryKey: [QUERYKEYS.getOrderById] });
      queryClient.invalidateQueries({ queryKey: [QUERYKEYS.listOrdersByCustomer] });
      queryClient.invalidateQueries({ queryKey: [QUERYKEYS.listAllProductInOrdersByOrderId] });
      queryClient.invalidateQueries({ queryKey: [QUERYKEYS.listProductsByCategoryId] });
      queryClient.invalidateQueries({ queryKey: [QUERYKEYS.listProductByRandomCategory] });
    },
    onError: (error: any) => {
      console.error("Erro ao aplicar cupom no pedido:", error.message || error);
    },
  });
};

export const useConfirmOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (order_id: string) =>
      ConfirmOrder(order_id), // Chama a função de confirmação do pedido
    onSuccess: () => {
      // Invalida o cache para atualizar as consultas relevantes
      queryClient.invalidateQueries({ queryKey: [QUERYKEYS.getOrderById] });
      queryClient.invalidateQueries({ queryKey: [QUERYKEYS.listOrdersByCustomer] });
      queryClient.invalidateQueries({ queryKey: [QUERYKEYS.listAllProductInOrdersByOrderId] });
      queryClient.invalidateQueries({ queryKey: [QUERYKEYS.listProductsByCategoryId] });
      queryClient.invalidateQueries({ queryKey: [QUERYKEYS.listProductByRandomCategory] });
    },
    onError: (error: any) => {
      console.error("Erro ao confirmar o pedido:", error.message || error);
    },
  });
};