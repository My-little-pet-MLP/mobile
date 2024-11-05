import { View, Text, Image, TouchableOpacity } from "react-native";

interface ProductInCarBoxProps {
    id: string;
    image: string;
    name: string;
    quantity: number;
    price: number; // preço unitário em centavos
    onIncreaseQuantity: (id: string) => void;
    onDecreaseQuantity: (id: string) => void;
}

export function ProductInCarBox({
    id,
    image,
    name,
    quantity,
    price,
    onIncreaseQuantity,
    onDecreaseQuantity,
}: ProductInCarBoxProps) {
    const totalPrice = price * quantity;

    return (
        <View key={id} className="mt-2 flex flex-row gap-2">
            <Image source={{ uri: image }} className="h-24 w-24 rounded" />
            <View className="flex flex-col text-base">
                <Text className="text-white">{name}</Text>
                <Text className="text-white">
                    Preço unitário: R$ {(price / 100).toFixed(2)}
                </Text>
                <Text className="text-white">
                    Preço total: R$ {(totalPrice / 100).toFixed(2)}
                </Text>
                <View className="flex flex-row mt-2 items-center">
                    <Text className="pr-4 text-white">
                    Quantidade:  
                    </Text>
                    <TouchableOpacity
                        onPress={() => onDecreaseQuantity(id)}
                        className="bg-gray-300 p-2 rounded"
                    >
                        <Text>-</Text>
                    </TouchableOpacity>
                    <Text className="mx-2 text-white">{quantity}</Text>
                    <TouchableOpacity
                        onPress={() => onIncreaseQuantity(id)}
                        className="bg-gray-300 p-2 rounded"
                    >
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
