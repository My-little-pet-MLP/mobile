import React, { useState, useRef } from "react";
import { 
    View, Text, TextInput, Modal, Button, Image, Alert, TouchableOpacity 
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import ActionSheet from "react-native-actions-sheet";
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
    const actionSheetRef = useRef<ActionSheet>(null); // Ref para o ActionSheet
    const { userId } = useAuth();
    const { mutateAsync: registerPetFunction, isSuccess, isPending } = useRegisterPet();
    const { control, handleSubmit, formState: { errors }, reset } = useForm<PetCreateRequest>({
        resolver: zodResolver(RegisterPetSchema),
    });

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [petSize, setPetSize] = useState<string | null>(null); // Estado para o tamanho do pet

    const handleSelectImage = async (fromCamera = false) => {
        const permissionResult = fromCamera
            ? await ImagePicker.requestCameraPermissionsAsync()
            : await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.status !== 'granted') {
            Alert.alert("Permissão necessária", "Precisamos da permissão para acessar a câmera ou galeria.");
            return;
        }

        const result = fromCamera
            ? await ImagePicker.launchCameraAsync({ quality: 0.5, mediaTypes: ImagePicker.MediaTypeOptions.Images })
            : await ImagePicker.launchImageLibraryAsync({ quality: 0.5, mediaTypes: ImagePicker.MediaTypeOptions.Images });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    async function RegisterPetHandler(data: PetCreateRequest) {
        if (!userId) {
            console.error("ID não disponível");
            return;
        }

        if (!selectedImage) {
            Alert.alert("Erro", "Por favor, selecione uma imagem.");
            return;
        }

        if (!petSize) {
            Alert.alert("Erro", "Por favor, selecione o tamanho do pet.");
            return;
        }

        await registerPetFunction({
            ...data,
            customerId: userId,
            imageUrl: selectedImage,
            size: petSize,
        });

        if (isSuccess) {
            reset();
            setSelectedImage(null);
            setPetSize(null);
            onClose();
        }
    }

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View className="flex-1 justify-center items-center bg-black/50 p-4">
                <View className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
                    <Text className="text-xl font-bold text-center mb-4">Cadastrar Novo Pet</Text>

                    {/* Nome do Pet */}
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

                    {/* Raça do Pet */}
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

                    {/* Idade do Pet */}
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

                    {/* Seleção de Tamanho */}
                    <TouchableOpacity
                        className="border p-3 rounded-md mb-3"
                        onPress={() => actionSheetRef.current?.show()}
                    >
                        <Text>{petSize || "Selecione o tamanho"}</Text>
                    </TouchableOpacity>

                    <ActionSheet ref={actionSheetRef}>
                        {["Mini", "Pequeno", "Médio", "Grande", "Gigante"].map((size) => (
                            <TouchableOpacity
                                key={size}
                                className="p-4 border-b"
                                onPress={() => {
                                    setPetSize(size.toLowerCase());
                                    actionSheetRef.current?.hide();
                                }}
                            >
                                <Text>{size}</Text>
                            </TouchableOpacity>
                        ))}
                    </ActionSheet>

                    {/* Seleção de Imagem */}
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

                    {/* Botões de Ação */}
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
