import React from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { useListProductInOrderByOrder } from "@/libs/react-query/product-in-orders-queries.and-mutations";
import { useGetStoreById } from "@/libs/react-query/store-queries-and-mutations";
import { ProductInCarBox } from './product-in-car-box';

export function StoreInfo({ storeId, orderId }: { storeId: string, orderId: string }) {
    const { data: products, isLoading: isLoadingProducts, error } = useListProductInOrderByOrder(orderId);
    const { data: store, isLoading: isLoadingStore } = useGetStoreById(storeId);

    if (isLoadingStore || isLoadingProducts) return <ActivityIndicator size="small" />;

    if (error) return <Text>Erro ao carregar os dados: {error.message}</Text>;

    if (!store || products?.length === 0) return <Text>Loja não encontrada ou sem produtos.</Text>;

    return (
        <View style={{ padding: 16, backgroundColor: "#E0F7FA", borderRadius: 8, marginBottom: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                <Image source={{ uri: store.imageUrl }} style={{ width: 64, height: 64, borderRadius: 32 }} />
                <Text style={{ marginLeft: 16, fontSize: 18, fontWeight: "bold", color: "#00796B" }}>{store.title}</Text>
            </View>
            <ScrollView>
                {products!.map((product) => (
                    <ProductInCarBox key={product.id} product={product} />
                ))}
            </ScrollView>
        </View>
    );
}
