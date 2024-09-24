import { axiosInstance } from "@/libs/axios";



export async function listProductsByCategoryId(
    category_id: string,
    page: number = 1,
    size: number = 8
) {
    try {
        if (!category_id) {
            throw new Error('ID da categoria é obrigatório para listar os produtos.');
        }

        const response = await axiosInstance.get(
            `/product/listbycategory?category_id=${category_id}&page=${page}&size=${size}`
        );

        if (response.status !== 200 || !response.data) {
            throw new Error('Falha ao listar os produtos.');
        }

        return response.data;
    } catch (error: any) {
        console.log('Erro ao listar produtos:', error.message || error);
        throw new Error(error.response?.data?.message || 'Erro inesperado ao listar produtos.');
    }
}
