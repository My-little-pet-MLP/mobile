import { axiosInstance } from "@/libs/axios";
import { Mission } from "../../../@types/mission";

export async function generateMissionsForCustomer(customer_id: string): Promise<Mission[]> {
    try {
        const response = await axiosInstance.get<Mission[]>(
            `/missions/generate-missions-in-date/${customer_id}`
        );

        return response.data; // Retorna a lista de missões
    } catch (error: any) {
        console.error('Erro ao gerar missões para o cliente', error.message || error);
        throw new Error(error.response?.data?.message || 'Erro inesperado ao gerar missões para o cliente.');
    }
}