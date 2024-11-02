import { generateMissionsForCustomer } from "@/hooks/missions/list-all-day-missions";
import { QUERYKEYS } from "./query-is";
import { useQuery } from "@tanstack/react-query";

export const useListMissions = (customer_id: string) => {
    return useQuery({
        queryKey: [QUERYKEYS.listMissions], // Chave única da query
        queryFn: () => generateMissionsForCustomer(customer_id), // Função que realiza a requisição
        enabled: !!customer_id, // Habilita a query apenas se customer_id for válido
    });
};