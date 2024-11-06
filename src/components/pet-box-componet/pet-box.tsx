import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { EditPetModal } from "./edit-pet-modal";

export interface Props {
    id: string;
    name: string;
    breed: string;
    size: "mini" | "pequeno" | "medio" | "grande" | "gigante";
    imageUrl: string;
    age: number;
}

export function PetBox(pet: Props) {
    const [isModalVisible, setModalVisible] = useState(false);

    // Funções para abrir e fechar o modal
    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    return (
        <View key={pet.id} style={{ position: "relative" }} className="flex flex-row gap-6 bg-white p-6 rounded-lg mb-6">
            {/* Imagem do pet */}
            <Image source={{ uri: pet.imageUrl }} className="w-24 h-24 rounded-lg" />

            {/* Ícone Editar no canto superior direito */}
            <TouchableOpacity
                onPress={openModal}
                style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    padding: 10, // Aumenta a área de toque
                    backgroundColor: "#4A90E2",
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 40, // Define uma largura mínima para garantir que a área de toque seja consistente
                    minHeight: 40 // Define uma altura mínima
                }}
            >
                <Ionicons name="create-outline" size={20} color="#fff" />
            </TouchableOpacity>

            {/* Informações do pet */}
            <View className="flex-1 ml-4">
                <Text className="text-lg">Nome: {pet.name}</Text>
                <Text className="text-lg">Raça: {pet.breed}</Text>
                <Text className="text-lg">Porte: {pet.size}</Text>
                <Text className="text-lg font-roboto">
                    Idade: <Text className="text-base">{pet.age}</Text>
                </Text>
            </View>

            {/* Modal para edição */}
            <EditPetModal pet={pet} visible={isModalVisible} onClose={closeModal} />
        </View>
    );
}
