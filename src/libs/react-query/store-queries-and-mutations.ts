import { useQuery } from "@tanstack/react-query";
import { QUERYKEYS } from "./query-is";
import { getStoreById } from "@/libs/stores/get-store-by-id";

export interface Store {
    id: string;
    imageUrl: string;
    title: string;
    description: string;
    cnpj: string;
    userId: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
export const useGetStoreById = (id: string) => {
    return useQuery<Store>({
      queryKey: [QUERYKEYS.getStoreById],
      queryFn: () => getStoreById(id!),
      enabled: !!id,
    });
  }