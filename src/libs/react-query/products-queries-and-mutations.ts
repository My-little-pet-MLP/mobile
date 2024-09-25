import { useQuery } from "@tanstack/react-query";
import { QUERYKEYS } from "./query-is";
import { listProductsByStoreId } from "@/hooks/products/list-products-by-store";
import { listProductsByCategoryId, Product, ProductsData,  } from "@/hooks/products/list-products-by-category";
import { getProductById } from "@/hooks/products/get-product-by-id";


export const useFetchProductByStoreId = (storeId: string ) => {
    return useQuery({
        queryKey:[QUERYKEYS.listProductsByStoreId] ,
        queryFn: () => listProductsByStoreId(storeId),
        enabled: !!storeId, 
    });
}
export const useFetchProductByCategoryId = (categoryId: string,page:number ) => {
    return useQuery<ProductsData>({
        queryKey:[QUERYKEYS.listProductsByCategoryId] ,
        queryFn: () => listProductsByCategoryId(categoryId,page),
        enabled: !!categoryId, 
    });
}
export const useFetchProductById = (id: string ) => {
    return useQuery<Product>({
        queryKey:[QUERYKEYS.getProductById] ,
        queryFn: () => getProductById(id),
        enabled: !!id, 
    });
}