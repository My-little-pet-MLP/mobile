import { axiosInstance } from "@/libs/axios";
import { Cupom } from "../../../@types/cupom";

export async function listCouponByCustomerId(customer_id: string, store_id: string) {
    try {
        const response = await axiosInstance.get<Cupom[]>(
            `/cupom/list-all-by-customer/`,
            {
                params: { customer_id, store_id } // Ambos como query params
            }
        );

        return response.data; // Retorna os cupons
    } catch (error: any) {
        console.error('Erro ao buscar os cupons do cliente', error.message || error);
        throw new Error(error.response?.data?.message || 'Erro inesperado ao buscar os cupons do cliente.');
    }
}
