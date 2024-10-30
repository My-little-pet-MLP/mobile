import React, { useState } from "react";
import { View, Text } from "react-native";
import { PetBox } from "./pet-box";
import { useListAllPetsByCustomerId } from "@/libs/react-query/pets-queries-and-mutations";
import { useUser } from "@clerk/clerk-expo";
import { SkeletonBoxPet } from "./skeleton-box-pet";
import { LabelBox } from "./label-box";
import { PetRegistrationModal } from "./PetRegistrationModal";


export function PetBoxComponent() {
    const { user } = useUser();
    const { data: listAllPets = [], isLoading: isLoadingPetsList, error: PetListError } =
        useListAllPetsByCustomerId(user?.id ?? "");
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    return (
        <>
            {isLoadingPetsList ? (
                <View className="bg-blue-theme rounded-2xl px-4 py-4 flex flex-col gap-6 min-h-64 mb-6 mt-12">
                    <Text className="font-roboto font-bold text-white text-2xl">Carregando Pets...</Text>
                    <View>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <SkeletonBoxPet key={index} />
                        ))}
                    </View>
                </View>
            ) : PetListError ? (
                <View>
                    <Text className="text-red-500">Erro ao carregar a lista de pets.</Text>
                </View>
            ) : listAllPets.length === 0 ? (
                <View className="bg-blue-theme rounded-2xl px-4 py-4 flex flex-col gap-6 min-h-64 mb-6 mt-12">
                    <LabelBox openModal={openModal} />
                    <View className="flex items-center justify-center flex-1">
                        <Text className="font-roboto font-bold text-white">
                            Você ainda não nos apresentou seu pet
                        </Text>
                    </View>
                </View>
            ) : (
                <View className="bg-blue-theme rounded-2xl px-4 py-4 flex flex-col gap-6 min-h-64 mb-6 mt-12">
                    <LabelBox openModal={openModal} />
                    <View>
                        {listAllPets.map((pet) => (
                            <PetBox
                                key={pet.id}
                                id={pet.id}
                                name={pet.name}
                                breed={pet.breed}
                                size={pet.size}
                                imageUrl={pet.imageUrl}
                                age={pet.age}
                            />
                        ))}
                    </View>
                </View>
            )}
            <PetRegistrationModal
                visible={modalVisible}
                onClose={closeModal}
            />
        </>
    );
}
