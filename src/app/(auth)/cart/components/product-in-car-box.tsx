import { View, Text, Image } from "react-native";

interface ProductInCarBoxProps {
    id: string;
    image: string;
    name: string;
    quantity: number;
    price: number;
}
export function ProductInCarBox({ id, image, name, quantity, price }: ProductInCarBoxProps) {
    return (
        <View key={id} className="mt-2 flex flex-row gap-2">
            <Image src={image} className="h-24 w-24 rounded" />
            <View className="flex flex-col text-base">
                <Text className="text-white">{name}</Text>
                <Text className="text-white">Quantidade: {quantity}</Text>
                <Text className="text-white">
                    R$ {(price / 100).toFixed(2)}
                </Text>
            </View>
        </View>
    )
}