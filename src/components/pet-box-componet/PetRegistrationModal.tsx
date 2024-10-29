import React, { useState, useRef } from "react";
import {
    View, Text, TextInput, Modal, Button, Image, Alert, TouchableOpacity
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
// Remover a importação do ImageManipulator
// import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
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

    const handleSelectImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.status !== 'granted') {
            Alert.alert("Permissão necessária", "Precisamos da permissão para acessar a galeria.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, // Habilitar a edição
            aspect: [1, 1], // Definir o aspecto para quadrado
        });

        if (!result.canceled) {
            console.log("URI da imagem selecionada:", result.assets[0].uri);
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
            const fileName = `${Date.now()}_pet_image.jpg`;

            // Salvar a imagem localmente
            const fileUri = `${FileSystem.documentDirectory}${fileName}`;

            await FileSystem.copyAsync({
                from: selectedImage,
                to: fileUri,
            });

            console.log("Imagem salva localmente em:", fileUri);

            // Ler o arquivo como um blob
            const blob = await uriToBlob(fileUri);

            // Verificar informações do arquivo salvo
            const fileInfo = await FileSystem.getInfoAsync(fileUri);
            console.log("Informações do arquivo salvo:", fileInfo);

            // Prosseguir com o upload para o Supabase
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
                            flexDirection: 'row',       // flex-row
                            alignItems: 'center',       // items-center
                            borderWidth: 1,             // border
                            borderColor: '#000',     // Match the background color or set to your preference
                            padding: 8,                // p-4 (16 pixels)
                            borderRadius: 8,            // rounded-md
                            marginBottom: 12,           // mb-3 (12 pixels)
                        }}
                        onPress={() => actionSheetRef.current?.show()}
                    >
                        <Text className="text-base font-bold font-roboto text-black text-center">
                            {size || "Selecione o tamanho"}
                        </Text>
                    </TouchableOpacity>

                    <ActionSheet
                        ref={actionSheetRef}
                        containerStyle={{
                            justifyContent: 'flex-start',
                            paddingBottom: 48, // Adjust this value as needed
                        }}
                    >
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
                    <Text className="font-bold text-orage-theme text-base mt-2">Voce tem uma foto dele/dela?</Text>
                    <View className="flex-row justify-center my-4">
                        <Button title="Selecionar Imagem" onPress={handleSelectImage} />
                    </View>

                    {selectedImage && (
                        <View className="w-full h-24 flex items-start justify-center">
                            <Image
                                source={{ uri: selectedImage }}
                                className="h-24 w-24 rounded-lg mb-3"
                                resizeMode="cover"
                            />
                        </View>
                    )}

                    <View className="flex-row justify-end">
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
