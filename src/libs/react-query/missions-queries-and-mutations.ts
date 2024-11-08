import { generateMissionsForCustomer } from "@/hooks/missions/list-all-day-missions";
import { QUERYKEYS } from "./query-is";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { completeMission } from "@/hooks/missions/complete-mission";
import { Alert } from "react-native";
import { findMissionById } from "@/hooks/missions/find-mission-by-id";

export const useListMissions = (customer_id: string) => {
    return useQuery({
        queryKey: [QUERYKEYS.listMissions], // Chave única da query
        queryFn: () => generateMissionsForCustomer(customer_id), // Função que realiza a requisição
        enabled: !!customer_id, // Habilita a query apenas se customer_id for válido
    });
};

export const useCompleteMission = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            completeMission(id), // Usa a função de registro que criamos anteriormente
        onSuccess: () => {
            // Atualiza o cache ou invalida consultas, conforme necessário
            Alert.alert("Missão concluída", "A missão foi concluída com sucesso!");
            queryClient.invalidateQueries({ queryKey: [QUERYKEYS.listMissions] });
        },
        onError: (error: any) => {
            Alert.alert("Erro ao Completar a missão", "A missão não foi completada!");
            console.error("Erro ao atualizar a missão:", error.message || error);
        },
    });
};

export const useFindByIdMission = (id: string) => {
    return useQuery({
        queryKey: [QUERYKEYS.findMissionById], // Chave única da query
        queryFn: () => findMissionById(id), // Função que realiza a requisição
        enabled: !!id, // Habilita a query apenas se customer_id for válido
    });
};