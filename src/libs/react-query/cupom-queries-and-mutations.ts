import { GrantCouponToCustomer } from "@/hooks/cupons/grant-coupon-to-customer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { QUERYKEYS } from "./query-is";

export const useGrantCupom = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (customer_id:string) =>
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
