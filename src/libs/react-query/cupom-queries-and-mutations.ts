import { GrantCouponToCustomer } from "@/hooks/cupons/grant-coupon-to-customer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { QUERYKEYS } from "./query-is";
import { listCouponByCustomerId } from "@/hooks/cupons/list-coupon-by-customer-id";

export const useGrantCupom = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (customer_id: string) =>
            GrantCouponToCustomer(customer_id), // Usa a função de registro que criamos anteriormente
        onSuccess: () => {
            // Atualiza o cache ou invalida consultas, conforme necessário
            Alert.alert("Você ganhou um cupom", "Verifique a sua lista de cupons");
            queryClient.invalidateQueries({ queryKey: [QUERYKEYS.listcuponsbycustomer] });
        },
        onError: (error: any) => {
            Alert.alert("Erro ao conceder o cupom", "O cupom não foi concedido!");
            console.error("Erro ao conceder o cupom:", error.message || error);
        },
    });
};

export const useListCouponByCustomerId = (customer_id: string,store_id:string) => {
    return useQuery({
        queryKey: [QUERYKEYS.listcuponsbycustomer], // Chave única da query
        queryFn: () => listCouponByCustomerId(customer_id,store_id), // Função que realiza a requisição
        enabled: !!customer_id, // Habilita a query apenas se customer_id for válido
    });
};
