export interface Mission {
    id: string;
    descricao: string;
    concluido: false;
    createdAt: string;
    customerId: string;
    timer: number | null;
    imageUrl: string | null;
}