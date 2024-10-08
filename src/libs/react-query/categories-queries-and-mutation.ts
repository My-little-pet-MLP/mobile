import { ListCategories } from "@/hooks/categories/list-categories";
import { useQuery } from "@tanstack/react-query";
import { QUERYKEYS } from "./query-is";
import { getCategoryById } from "@/hooks/categories/get-category-by-id";
interface CategoryData{
    id:string;
    title:string;
    slug:string;
}
export const useListCategories = () =>{
    return useQuery<CategoryData[]>({
        queryKey: [QUERYKEYS.listCategories],
        queryFn: () => ListCategories(),
    });
}

export const useFetchCategoryById = (id: string ) => {
    return useQuery<CategoryData>({
        queryKey:[QUERYKEYS.getCategoryById] ,
        queryFn: () => getCategoryById(id),
        enabled: !!id, 
    });
}