import { ListAllPetsByCustomerId } from "@/hooks/pets/list-all-by-customer-id";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERYKEYS } from "./query-is";
import { PetCreateRequest, PetModel } from "../../../@types/pets";
import { RegisterPet } from "@/hooks/pets/register-pet";

export const useListAllPetsByCustomerId = (customer_id: string) => {
    return useQuery({
        queryKey: [QUERYKEYS.listAllPetsByCustomerId], // Chave única da query
        queryFn: () => ListAllPetsByCustomerId(customer_id), // Função que realiza a requisição
        enabled: !!customer_id, // Habilita a query apenas se customer_id for válido
    });
};


export const useRegisterPet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: PetCreateRequest) =>
            RegisterPet(request), // Usa a função de registro que criamos anteriormente
        onSuccess: (data: PetModel) => {

            // Atualiza o cache ou invalida consultas, conforme necessário
            queryClient.invalidateQueries({ queryKey: [QUERYKEYS.listAllPetsByCustomerId] });
        },
        onError: (error: any) => {
            console.error("Erro ao registrar o pet:", error.message || error);
        },
    });
};
