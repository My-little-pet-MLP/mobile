import { axiosInstance } from "@/libs/axios";
import { PetModel } from "../../../@types/pets";

// Ajuste da interface para refletir a resposta correta
export type ListAllPetsByCustomerIdResponse = PetModel[];

export async function ListAllPetsByCustomerId(
    customer_id: string
): Promise<ListAllPetsByCustomerIdResponse> {
    try {
        // Faz a requisição e armazena a resposta
        const response = await axiosInstance.get<ListAllPetsByCustomerIdResponse>(
            `/pets/list-all-by-customer-id/${customer_id}`
        );
        return response.data;
    } catch (error: any) {
        console.error('Erro capturado na requisição:', error);

        // Verificação se o erro possui uma resposta HTTP
        if (error.response) {
            console.error('Erro na resposta da API:', error.response.data);
            throw new Error(
                error.response.data?.message || 'Erro inesperado ao listar os pets'
            );
        }

        // Verificação se o erro é relacionado a rede ou conexão
        if (error.request) {
            console.error('Erro de conexão ou rede:', error.request);
            throw new Error('Erro de conexão. Verifique sua internet.');
        }

        // Tratamento para outros tipos de erros
        console.error('Erro inesperado:', error.message);
        throw new Error('Erro inesperado. Tente novamente mais tarde.');
    }
}
