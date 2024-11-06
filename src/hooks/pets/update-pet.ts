import { axiosInstance } from "@/libs/axios";
import { PetModelUpdateProps, PetModel } from "../../../@types/pets";


export async function UpdatePet(request: PetModelUpdateProps): Promise<PetModel> {
    try {
        // Supondo que estamos utilizando axios para realizar a requisição
        const response = await axiosInstance.put<PetModel>(
            `/pets/`,
            request
        );
        return response.data;  // Retorna a resposta tipada
    } catch (error: any) {
        console.error('Erro ao atualizar o pet', error.message || error);
        throw new Error(error.response?.data?.message || 'Erro inesperado ao atualizar o pet.');
    }
}