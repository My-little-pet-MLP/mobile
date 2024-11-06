import React, { useRef } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePetSchema, UpdatePetType } from "@/libs/schemas/register-pet-schema";
import { useDeletePet, useUpdatePet } from "@/libs/react-query/pets-queries-and-mutations";
import { SizeSelection } from "./size-selection";
import { Props } from "./pet-box";

interface EditPetModalProps {
    pet: Props;
    visible: boolean;
    onClose: () => void;
}

export const EditPetModal: React.FC<EditPetModalProps> = ({ pet, visible, onClose }) => {
    const actionSheetRef = useRef(null);
    const { mutateAsync: deletePet } = useDeletePet();
    const { mutateAsync: updatePet } = useUpdatePet();

    const { control, handleSubmit, setValue, formState: { errors } } = useForm<UpdatePetType>({
        resolver: zodResolver(UpdatePetSchema),
        defaultValues: pet
    });

    const defaultImageUrl = "https://jfwzshiyyvxklcuuzueu.supabase.co/storage/v1/object/public/my-little-pet-pets/pet-default-image.png";

    // Função de confirmação e exclusão
    const handleDelete = () => {
        Alert.alert(
            "Confirmar Exclusão",
            "Você tem certeza que deseja excluir este pet?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        await deletePet(pet.id);
                        onClose();
                    }
                }
            ]
        );
    };

    // Função para atualizar os dados do pet
    const onSubmit = async (data: UpdatePetType) => {
        await updatePet({
            ...data,
            imageUrl: defaultImageUrl,
            id: pet.id
        });
        onClose();
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
            <View className="flex-1 justify-center items-center bg-black/50 p-4">
                <View className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
                    <Text className="text-xl font-bold text-center mb-4">Editar Pet</Text>

                    {/* Campo de Nome */}
                    <Text className="font-bold">Nome do Pet:</Text>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <TextInput placeholder="Nome do Pet" className="border p-3 rounded-md mb-3" onChangeText={onChange} value={value} />
                        )}
                    />
                    {errors.name && <Text className="text-red-500">Nome é obrigatório</Text>}

                    {/* Campo de Raça */}
                    <Text className="font-bold">Raça:</Text>
                    <Controller
                        control={control}
                        name="breed"
                        render={({ field: { onChange, value } }) => (
                            <TextInput placeholder="Raça" className="border p-3 rounded-md mb-3" onChangeText={onChange} value={value} />
                        )}
                    />
                    {errors.breed && <Text className="text-red-500">Raça é obrigatória</Text>}

                    {/* Campo de Idade */}
                    <Text className="font-bold">Idade:</Text>
                    <Controller
                        control={control}
                        name="age"
                        render={({ field: { onChange, value } }) => (
                            <TextInput placeholder="Idade" keyboardType="numeric" className="border p-3 rounded-md mb-3" onChangeText={(text) => onChange(Number(text))} value={value ? value.toString() : ""} />
                        )}
                    />
                    {errors.age && <Text className="text-red-500">Idade é obrigatória</Text>}

                    {/* Seleção de Porte */}
                    <Text className="font-bold">Porte:</Text>
                    <SizeSelection selectedSize={pet.size} onSelectSize={(size) => setValue("size", size)} />

                    {/* Botões de Ação */}
                    <View className="flex-row justify-between mt-4">
                        <TouchableOpacity onPress={onClose} style={{ backgroundColor: "#FF4C4C", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8, alignItems: "center" }}>
                            <Text style={{ color: "#fff", fontWeight: "bold" }}>Fechar</Text>
                        </TouchableOpacity>

                        <View className="flex-row space-x-2 gap-4">
                            <TouchableOpacity onPress={handleDelete} style={{ backgroundColor: "#FF4C4C", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8, alignItems: "center" }}>
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>Excluir</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={{ backgroundColor: "#4CAF50", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8, alignItems: "center" }}>
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};