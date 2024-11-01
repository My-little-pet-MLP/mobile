import { axiosInstance } from "@/libs/axios";


export interface ProductProps {
    id: string;
    title: string;
    imageUrl: string;
    priceInCents: number;
    stock: number;
}
export interface Product {
    id: string;
    title: string;
    slug: string;
    imageUrl: string;
    description: string;
    priceInCents: number;
    stock: number;
    categoryId: string;
    storeId: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface ProductsData {
    products: Product[];
    totalPages: number;
    currentPage: number;
}
export async function listProductsByCategoryId(category_id: string,page: number,size: number = 8) {
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
        throw new Error(error.response?.data?.message || 'Erro inesperado ao listar produtos.');
    }
}

