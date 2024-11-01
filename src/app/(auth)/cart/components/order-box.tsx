import { useListProductInOrderByOrder } from "@/libs/react-query/product-in-orders-queries.and-mutations";
import { useGetStoreById } from "@/libs/react-query/store-queries-and-mutations";
import { ActivityIndicator, View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { ProductInCarBox } from "./product-in-car-box";


export function StoreInfo({ storeId, orderId, fullPrice }: { storeId: string; orderId: string; fullPrice: number }) {
    const { data: products = [], isLoading: isLoadingProducts, error } =
        useListProductInOrderByOrder(orderId);
    const { data: store, isLoading: isLoadingStore } = useGetStoreById(storeId);

    if (error) {
        console.error(error);
    }

    if (isLoadingStore || isLoadingProducts) {
        return <ActivityIndicator size="small" />;
    }

    if (!store || products.length === 0) {
        return (
            <View>
                <Text className="text-lg">Loja não encontrada ou nenhum produto disponível</Text>
                {error && <Text>{error.message}</Text>}
            </View>
        );
    }

    return (
        <View className="bg-blue-theme rounded-lg p-6">
            <View className="flex-row items-center gap-4">
                <Image
                    source={{ uri: store.imageUrl }}
                    className="h-16 w-16 rounded-full"
                    alt="logo-store"
                />
                <Text className="text-white text-lg font-bold">{store.title}</Text>
            </View>

            <ScrollView className="mt-4">
                {products.map((product) => (
                    <ProductInCarBox id={product.id} image={product.image} name={product.name} price={product.price} quantity={product.quantity} key={product.id} />
                ))}
            </ScrollView>
            <View className="flex flex-row justify-between items-center">
                <View className="p-3">
                    <Text className="text-white font-bold text-base">Valor Total: R$ {(fullPrice / 100).toFixed(2)}</Text>
                </View>
                <TouchableOpacity>
                    <View className="bg-green-500 rounded-lg p-3">
                        <Text className="text-white font-bold text-lg">Finalizar pedido</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}