import { QueryFunctionContext, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { QUERYKEYS } from "./query-is";
import { listProductsByStoreId } from "@/hooks/products/list-products-by-store";
import { listProductsByCategoryId, Product, ProductsData, } from "@/hooks/products/list-products-by-category";
import { getProductById } from "@/hooks/products/get-product-by-id";
import { ListProductsByRandomCategory, ProductsByRandomCategoryResponse } from "@/hooks/products/list-product-by-random-category";
interface Category {
  id: string;
  title: string;
  slug: string;
}

export interface Store {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  cnpj: string;
  userId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductComplete {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  description: string;
  priceInCents: number;
  stock: number;
  category: Category;
  store: Store;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export const useFetchProductByStoreId = (storeId: string, page: number) => {
  return useQuery<ProductsData>({
    queryKey: [QUERYKEYS.listProductsByStoreId, storeId, page],
    queryFn: () => listProductsByStoreId(storeId, page),
    enabled: !!storeId,
  });
};

export const useFetchProductByCategoryId = (categoryId: string, page: number) => {
  return useQuery<ProductsData>({
    queryKey: [QUERYKEYS.listProductsByCategoryId],
    queryFn: () => listProductsByCategoryId(categoryId, page),
    enabled: !!categoryId,
  });
}

export const useFetchProductById = (id: string) => {
  return useQuery<ProductComplete>({
    queryKey: [QUERYKEYS.getProductById, id], // Inclui o ID na chave para evitar conflitos de cache
    queryFn: () => getProductById(id),
    enabled: !!id, // Habilita a query apenas se o ID for válido
  });
};

export const useInfiniteFetchProductByStoreId = (storeId: string) => {
  return useInfiniteQuery<ProductsData, Error, ProductsData, [string, string], number>({
    queryKey: [QUERYKEYS.listProductsByStoreId, storeId],
    queryFn: ({ pageParam = 1 }: QueryFunctionContext<[string, string], number>) =>
      listProductsByStoreId(storeId, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      } else {
        return undefined;
      }
    },
    initialPageParam: 1,
    enabled: !!storeId,
  });
};

export const useInfiniteFetchProductByCategoryId = (categoryId: string) => {
  return useInfiniteQuery<ProductsData, Error, ProductsData, [string, string], number>({
    queryKey: [QUERYKEYS.listProductsByCategoryId, categoryId],
    queryFn: ({ pageParam = 1 }: QueryFunctionContext<[string, string], number>) =>
      listProductsByCategoryId(categoryId, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      } else {
        return undefined;
      }
    },
    initialPageParam: 1,
    enabled: !!categoryId,
  });
};

export const useFetchProductByRandomCategory = (page: number, size: number, randomKey: number) => {
  return useQuery<ProductsByRandomCategoryResponse>({
    queryKey: [QUERYKEYS.listProductsByCategoryId, randomKey], // Inclui randomKey na queryKey
    queryFn: () => ListProductsByRandomCategory(page, size),
  });
}
