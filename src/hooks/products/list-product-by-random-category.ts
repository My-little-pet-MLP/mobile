import { axiosInstance } from "@/libs/axios";
import { Category } from "../../../@types/category";
import { Product } from "./list-products-by-category";

export interface ProductsByRandomCategoryResponse {
    category: Category;
    products: Product[];
    totalPages: number;
    currentPage: number;
  }
  
  export async function ListProductsByRandomCategory(
    page = 1,
    size = 10
  ): Promise<ProductsByRandomCategoryResponse> {
    try {
      // Faz a requisição passando os parâmetros de paginação
      const response = await axiosInstance.get<ProductsByRandomCategoryResponse>(`/product/listallbyrandomcategory`, {
        params: {
          page, // página atual
          size, // tamanho da página
        },
      });
  
      // Retorna os dados já convertidos e tipados
      return response.data;
    } catch (error: any) {
      console.error('Erro ao listar os produtos de uma categoria aleatória', error.message || error);
      throw new Error(error.response?.data?.message || 'Erro inesperado ao listar as categorias.');
    }
  }