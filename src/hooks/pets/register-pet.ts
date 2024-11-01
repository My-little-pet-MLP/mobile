import { axiosInstance } from "@/libs/axios";
import { PetCreateRequest, PetModel } from "../../../@types/pets";

export async function RegisterPet(request: PetCreateRequest): Promise<PetModel> {
    try {
        // Supondo que estamos utilizando axios para realizar a requisição
        const response = await axiosInstance.post<PetModel>(
            `/pets/`,
            request
        );
        return response.data;  // Retorna a resposta tipada
    } catch (error: any) {
        console.error('Erro ao registrar o pet', error.message || error);
        throw new Error(error.response?.data?.message || 'Erro inesperado ao registrar o pet.');
    }
}