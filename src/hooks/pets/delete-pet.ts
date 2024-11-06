import { axiosInstance } from "@/libs/axios";


export async function DeletePet(id: string) {
    try {
        await axiosInstance.delete(`/pets/${id}`,);
    } catch (error: any) {
        console.error('Erro ao deletar o pet', error.message || error);
        throw new Error(error.response?.data?.message || 'Erro inesperado ao deletar o pet.');
    }
}