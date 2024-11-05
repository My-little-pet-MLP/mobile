export interface Cupom{
    id: string;
    description: string;
    porcentagem: number;
    createdAt: string;
    ValidateAt: string;
    isValid: boolean;
    storeId: string;
    customerId: string;
}