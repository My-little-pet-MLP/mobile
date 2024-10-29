import React, { useState, useRef } from "react";
import {
    View, Text, TextInput, Modal, Button, Image, Alert, TouchableOpacity
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { RegisterPetSchema } from "@/libs/schemas/register-pet-schema";
import { PetCreateRequest } from "../../../@types/pets";
import { useRegisterPet } from "@/libs/react-query/pets-queries-and-mutations";
import { useAuth } from "@clerk/clerk-expo";
import { uploadToSupabase } from "@/libs/supabase/upload-pet";

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

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleSelectImage = async (fromCamera = false) => {
        const permissionResult = fromCamera
            ? await ImagePicker.requestCameraPermissionsAsync()
            : await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.status !== 'granted') {
            Alert.alert("Permissão necessária", "Precisamos da permissão para acessar a câmera ou galeria.");
            return;
        }

        const result = fromCamera
            ? await ImagePicker.launchCameraAsync({ quality: 1, mediaTypes: ImagePicker.MediaTypeOptions.Images })
            : await ImagePicker.launchImageLibraryAsync({ quality: 1, mediaTypes: ImagePicker.MediaTypeOptions.Images });

        if (!result.canceled) {
            console.log("URI da imagem:", result.assets[0].uri);
            setSelectedImage(result.assets[0].uri);
        }
    };

    const handleSizeSelection = (size: "mini" | "pequeno" | "medio" | "grande" | "gigante") => {
        setValue("size", size);
        actionSheetRef.current?.hide();
    };

    const size = watch("size");

    async function uriToBlob(uri: string): Promise<Blob> {
        const response = await fetch(uri);
        if (!response.ok) {
            throw new Error(`Erro ao buscar imagem: ${response.statusText}`);
        }
        return await response.blob();
    }

    async function RegisterPetHandler(data: PetCreateRequest) {
        console.log("Tentando salvar o pet...");

        if (!userId) {
            console.error("ID não disponível");
            return;
        }

        if (!selectedImage) {
            Alert.alert("Erro", "Por favor, selecione uma imagem.");
            return;
        }

        try {
            const blob = await uriToBlob(selectedImage);
            const fileName = `${Date.now()}_pet_image.jpg`;

            const { publicUrl, error } = await uploadToSupabase(blob, "my-little-pet-pets", fileName);

            if (error) {
                throw error;
            }

            console.log("URL pública:", publicUrl);

            await registerPetFunction({
                ...data,
                customerId: userId,
                imageUrl: publicUrl || "",
            });

            if (isSuccess) {
                console.log("Pet salvo com sucesso!");
                reset();
                setSelectedImage(null);
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

                    <TouchableOpacity
                        className="border p-3 rounded-md mb-3"
                        onPress={() => actionSheetRef.current?.show()}
                    >
                        <Text>{size || "Selecione o tamanho"}</Text>
                    </TouchableOpacity>

                    <ActionSheet ref={actionSheetRef}>
                        {["mini", "pequeno", "medio", "grande", "gigante"].map((size) => (
                            <TouchableOpacity
                                key={size}
                                className="p-4 border-b"
                                onPress={() => handleSizeSelection(size as any)}
                            >
                                <Text>{size.charAt(0).toUpperCase() + size.slice(1)}</Text>
                            </TouchableOpacity>
                        ))}
                    </ActionSheet>

                    <View className="flex-row justify-between my-4">
                        <Button title="Galeria" onPress={() => handleSelectImage(false)} />
                        <Button title="Câmera" onPress={() => handleSelectImage(true)} />
                    </View>

                    {selectedImage && (
                        <Image
                            source={{ uri: selectedImage }}
                            className="w-full h-32 rounded-lg mb-3"
                            resizeMode="cover"
                        />
                    )}

                    <View className="flex-row justify-between">
                        <Button title="Fechar" onPress={onClose} color="red" />
                        <Button
                            title={isPending ? "Salvando..." : "Salvar"}
                            onPress={handleSubmit(RegisterPetHandler)}
                            color="#4CAF50"
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};
