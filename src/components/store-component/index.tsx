import { View, Text, Image, TouchableOpacity } from "react-native";
import { HandlerListProductsByStore } from "../handler-list-product-by-store";
import { router } from "expo-router";

interface StoreComponentProps {
    id: string;
    imageUrl: string;
    title: string;
    description: string;
}

export function StoreComponent(store: StoreComponentProps) {
    function NavigationStoreScreen(storeId: string) {
        router.push(`/(auth)/shopping/list-product-by-store/${storeId}`);
    }

    // Debugging: Verifique se a ID da loja está correta
    console.log("Store ID:", store.id);

    return (
        <View className="w-full flex flex-col gap-6 h-fit mt-20 mb-96 bg-blue-theme rounded-lg p-6">
            <View>
            <Image
                source={{ uri: store.imageUrl }}
                style={{ width: 64, height: 64, borderRadius: 32 }}
            />
            </View>
            <View className="w-full h-min flex flex-row justify-between">
                <Text className="text-white font-bold text-lg">{store.title}</Text>
                <TouchableOpacity onPress={() => NavigationStoreScreen(store.id)}>
                    <View>
                        <Text className="text-white font-bold text-lg">Visite a loja</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View className="w-full h-min">
                <HandlerListProductsByStore store_id={store.id ?? ""} />
            </View>
        </View>
    );
}
