import { axiosInstance } from "@/libs/axios";
import { Cupom } from "../../../@types/cupom";

export async function GrantCouponToCustomer(customer_id: string) {
    try {
        const response = await axiosInstance.put<Cupom>(
            `/cupom/grant-coupon-to-customer/${customer_id}`
        );

        return response.data; // Retorna o cupom
    } catch (error: any) {
        console.error('Erro ao gerar conceder cupom', error.message || error);
        throw new Error(error.response?.data?.message || 'Erro inesperado ao conceder o cupom ao cliente.');
    }
}