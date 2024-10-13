import { useQuery } from "@tanstack/react-query";
import { QUERYKEYS } from "./query-is";
import { listProductsByStoreId } from "@/hooks/products/list-products-by-store";
import { listProductsByCategoryId, Product, ProductsData, } from "@/hooks/products/list-products-by-category";
import { getProductById } from "@/hooks/products/get-product-by-id";
import { ListProductsByRandomCategory, ProductsByRandomCategoryResponse } from "@/hooks/products/list-product-by-random-category";


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
    return useQuery<Product>({
        queryKey: [QUERYKEYS.getProductById],
        queryFn: () => getProductById(id),
        enabled: !!id,
    });
}

export const useFetchProductByRandomCategory = (page: number, size: number) => {
    return useQuery<ProductsByRandomCategoryResponse>({
        queryKey: [QUERYKEYS.listProductsByCategoryId],
        queryFn: () => ListProductsByRandomCategory(page, size),
    });
}