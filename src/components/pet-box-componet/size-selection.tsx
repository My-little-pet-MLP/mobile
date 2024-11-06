import React from "react";
import { Text, TouchableOpacity } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

type PetSize = "mini" | "pequeno" | "medio" | "grande" | "gigante";

interface SizeSelectionProps {
    selectedSize: PetSize;
    onSelectSize: (size: PetSize) => void;
}

export const SizeSelection: React.FC<SizeSelectionProps> = ({ selectedSize, onSelectSize }) => {
    const actionSheetRef = React.useRef<ActionSheetRef>(null);

    return (
        <>
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
                <Text className="text-base font-bold">
                    {selectedSize || "Selecione o porte"}
                </Text>
            </TouchableOpacity>

            <ActionSheet ref={actionSheetRef}>
                {["mini", "pequeno", "medio", "grande", "gigante"].map((size) => (
                    <TouchableOpacity
                        key={size}
                        className="p-4 border-b w-full flex items-center justify-center"
                        onPress={() => {
                            onSelectSize(size as PetSize); // Fazemos uma asserção para PetSize aqui
                            actionSheetRef.current?.hide();
                        }}
                    >
                        <Text className="text-center text-xl font-bold">
                            {size.charAt(0).toUpperCase() + size.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ActionSheet>
        </>
    );
};
