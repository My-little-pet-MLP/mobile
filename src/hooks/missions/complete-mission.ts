import { axiosInstance } from "@/libs/axios";
import { Mission } from "../../../@types/mission";

export async function completeMission(id: string): Promise<Mission | null> {
    try {
        if (!id) {
            throw new Error('ID é obrigatório para completar a missão');
        }

        const response = await axiosInstance.put(`/missions/complete/${id}`);


        if (response.status !== 200 || !response.data) {
            throw new Error('Falha ao completar a missão');
        }

        return response.data;
    } catch (error: any) {

        console.error('Erro ao completar a missão:', error.message || error);
        throw new Error(error.response?.data?.message || 'Erro inesperado ao completar a missão.');
    }
}