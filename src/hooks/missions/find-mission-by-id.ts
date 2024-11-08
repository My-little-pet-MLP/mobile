import { axiosInstance } from "@/libs/axios";
import { Mission } from "../../../@types/mission";

export async function findMissionById(id: string) {
    try {
        const response = await axiosInstance.get<Mission>(
            `/missions/${id}`
        );

        return response.data; // Retorna a lista de missões
    } catch (error: any) {
        console.error('Erro ao buscar a missão', error.message || error);
        throw new Error(error.response?.data?.message || 'Erro inesperado ao buscar a missão.');
    }
}