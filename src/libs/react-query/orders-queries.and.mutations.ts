import { useQuery } from '@tanstack/react-query';
import { listOrdersByCustomer } from '@/hooks/orders/list-all-by-customer-id'; // Importe a função e interfaces corretas
import { QUERYKEYS } from './query-is';

export const useListOrdersByCustomer = (customer_id: string, page: number = 1, size: number = 10) => {
    return useQuery({
        queryKey: [QUERYKEYS.listOrdersByCustomer], // Chave única da query
        queryFn: () => listOrdersByCustomer(customer_id, page, size), // Função que realiza a requisição
        enabled: !!customer_id, // Habilita a query apenas se customer_id for válido
    });
};