export interface PetCreateRequest {
    name: string;
    age: number;
    breed: string;
    size: "mini" | "pequeno" | "medio" | "grande" | "gigante";
    imageUrl: string;
    customerId: string;
};

export interface PetModel{
    id: string;
    name: string;
    breed: string;
    age: number;
    imageUrl: string;
    size: "mini" | "pequeno" | "medio" | "grande" | "gigante";
    customerId: string;
    isActive: boolean;
}
