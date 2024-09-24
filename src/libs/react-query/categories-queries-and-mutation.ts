import { ListCategories } from "@/hooks/categories/list-categories";
import { useQuery } from "@tanstack/react-query";
import { QUERYKEYS } from "./query-is";
import { getCategoryById } from "@/hooks/categories/get-category-by-id";

export const useListCategories = () =>{
    return useQuery({
        queryKey: [QUERYKEYS.listCategories],
        queryFn: () => ListCategories(),
    });
}

export const useFetchCategoryById = (id: string ) => {
    return useQuery({
        queryKey:[QUERYKEYS.getCategoryById] ,
        queryFn: () => getCategoryById(id),
        enabled: !!id, 
    });
}