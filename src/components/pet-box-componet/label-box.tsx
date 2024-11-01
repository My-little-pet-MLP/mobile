import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type LabelBoxProps = {
    openModal: () => void;
};

export const LabelBox: React.FC<LabelBoxProps> = ({ openModal }) => (
    <View className="flex flex-row justify-between">
        <Text className="font-roboto font-bold text-white text-2xl">Pets</Text>
        <TouchableOpacity onPress={openModal}>
            <View className="flex flex-row items-center bg-sky-800 p-2 rounded-lg">
                <Ionicons name="add" color="white" size={14} style={{ fontWeight: "700" }} />
                <Text className="font-bold text-white ml-2">Cadastre seu pet</Text>
            </View>
        </TouchableOpacity>
    </View>
);
