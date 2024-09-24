import { useQuery } from "@tanstack/react-query";
import { QUERYKEYS } from "./query-is";
import { listProductsByStoreId } from "@/hooks/products/list-products-by-store";
import { listProductsByCategoryId, ListProductsByCategoryResponse } from "@/hooks/products/list-products-by-category";
import { getProductById } from "@/hooks/products/get-product-by-id";


export const useFetchProductByStoreId = (storeId: string ) => {
    return useQuery({
        queryKey:[QUERYKEYS.listProductsByStoreId] ,
        queryFn: () => listProductsByStoreId(storeId),
        enabled: !!storeId, 
    });
}
export const useFetchProductByCategoryId = (categoryId: string ) => {
    return useQuery<ListProductsByCategoryResponse>({
        queryKey:[QUERYKEYS.listProductsByCategoryId] ,
        queryFn: () => listProductsByCategoryId(categoryId),
        enabled: !!categoryId, 
    });
}
export const useFetchProductById = (id: string ) => {
    return useQuery({
        queryKey:[QUERYKEYS.getProductById] ,
        queryFn: () => getProductById(id),
        enabled: !!id, 
    });
}