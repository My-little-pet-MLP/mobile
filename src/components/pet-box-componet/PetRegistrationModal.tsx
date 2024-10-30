import React, { useState, useRef } from "react";
import {
    View, Text, TextInput, Modal, Button, Alert, TouchableOpacity
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { RegisterPetSchema } from "@/libs/schemas/register-pet-schema";
import { PetCreateRequest } from "../../../@types/pets";
import { useRegisterPet } from "@/libs/react-query/pets-queries-and-mutations";
import { useAuth } from "@clerk/clerk-expo";

type PetRegistrationModalProps = {
    visible: boolean;
    onClose: () => void;
};

export const PetRegistrationModal: React.FC<PetRegistrationModalProps> = ({
    visible,
    onClose,
}) => {
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const { userId } = useAuth();
    const { mutateAsync: registerPetFunction, isSuccess, isPending } = useRegisterPet();
    const { control, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm<PetCreateRequest>({
        resolver: zodResolver(RegisterPetSchema),
    });

    const handleSizeSelection = (size: "mini" | "pequeno" | "medio" | "grande" | "gigante") => {
        setValue("size", size);
        actionSheetRef.current?.hide();
    };

    const size = watch("size");

    async function RegisterPetHandler(data: PetCreateRequest) {
        console.log("Tentando salvar o pet...");

        if (!userId) {
            console.error("ID não disponível");
            return;
        }

        try {
            const defaultImageUrl = "https://jfwzshiyyvxklcuuzueu.supabase.co/storage/v1/object/public/my-little-pet-pets/pet-default-image.png"; // URL de imagem padrão

            await registerPetFunction({
                ...data,
                customerId: userId,
                imageUrl: defaultImageUrl,
            });

            if (isSuccess) {
                console.log("Pet salvo com sucesso!");
                reset();
                onClose();
            }
        } catch (error) {
            console.error("Erro ao salvar pet:", error);
            Alert.alert("Erro", "Não foi possível salvar o pet.");
        }
    }

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View className="flex-1 justify-center items-center bg-black/50 p-4">
                <View className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
                    <Text className="text-xl font-bold text-center mb-4">Cadastrar Novo Pet</Text>

                    <Text className="font-bold text-orage-theme text-base mt-2">Qual o nome dele?</Text>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder="Nome do Pet"
                                className="border p-3 rounded-md mb-3"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.name && <Text className="text-red-500">Nome é obrigatório</Text>}

                    <Text className="font-bold text-orage-theme text-base mt-2">Qual a raça dele mesmo?</Text>
                    <Controller
                        control={control}
                        name="breed"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder="Raça"
                                className="border p-3 rounded-md mb-3"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.breed && <Text className="text-red-500">Raça é obrigatória</Text>}

                    <Text className="font-bold text-orage-theme text-base mt-2">Quantos anos ele tem?</Text>
                    <Controller
                        control={control}
                        name="age"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder="Idade"
                                keyboardType="numeric"
                                className="border p-3 rounded-md mb-3"
                                onChangeText={(text) => onChange(Number(text))}
                                value={value ? value.toString() : ""}
                            />
                        )}
                    />
                    {errors.age && <Text className="text-red-500">Idade é obrigatória</Text>}

                    <Text className="font-bold text-orage-theme text-base mt-2">Nos diga o porte do seu amigo</Text>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: '#000',
                            padding: 8,
                            borderRadius: 8,
                            marginBottom: 12,
                        }}
                        onPress={() => actionSheetRef.current?.show()}
                    >
                        <Text className="text-base font-bold font-roboto text-black text-center">
                            {size || "Selecione o tamanho"}
                        </Text>
                    </TouchableOpacity>

                    <ActionSheet ref={actionSheetRef} containerStyle={{ paddingBottom: 48 }}>
                        {["mini", "pequeno", "medio", "grande", "gigante"].map((size) => (
                            <TouchableOpacity
                                key={size}
                                className="p-4 border-b w-full flex items-center justify-center"
                                onPress={() => handleSizeSelection(size as any)}
                            >
                                <Text className="text-center text-xl font-bold">
                                    {size.charAt(0).toUpperCase() + size.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ActionSheet>

                    <View className="flex-row justify-end">
                        <Button title="Fechar" onPress={onClose} color="red" />
                        <Button
                            title={isPending ? "Salvando..." : "Salvar"}
                            disabled={isPending}
                            onPress={handleSubmit(RegisterPetHandler)}
                            color="#4CAF50"
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};
