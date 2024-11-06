import { z } from "zod";

export const RegisterPetSchema = z.object({
    name: z.string().min(1, "o pet deve ter um nome"),
    breed: z.string().min(1, "a raça é obrigatoria"),
    age: z.number().int().min(0, "o pet deve ter nascido né").max(30, "idade maxima é 30 anos"),
    size: z.enum(["mini", "pequeno", "medio", "grande", "gigante"])
});

export interface UpdatePetPropsForm {
    id: string;
    name: string;
    breed: string;
    size: "mini" | "pequeno" | "medio" | "grande" | "gigante";
    imageUrl: string;
    age: number;
}
export const UpdatePetSchema = z.object({
    name: z.string().min(1, "o pet deve ter um nome"),
    breed: z.string().min(1, "a raça é obrigatoria"),
    age: z.number().int().min(0, "o pet deve ter nascido né").max(30, "idade maxima é 30 anos"),
    size: z.enum(["mini", "pequeno", "medio", "grande", "gigante"])
});

export type UpdatePetType = z.infer<typeof UpdatePetSchema>;