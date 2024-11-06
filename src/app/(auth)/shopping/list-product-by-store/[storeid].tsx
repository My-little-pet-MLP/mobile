import { useInfiniteFetchProductByStoreId } from "@/libs/react-query/products-queries-and-mutations";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, Button, ActivityIndicator, Image, TouchableOpacity, SafeAreaView, FlatList } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { InfiniteData } from "@tanstack/react-query";
import { useGetStoreById } from "@/libs/react-query/store-queries-and-mutations";
import { ProductComponent } from "@/components/product-component";
import { Product, ProductsData } from "@/hooks/products/list-products-by-category";

export default function StoreDetail() {
    const { storeid } = useLocalSearchParams();
    const storeIdFetch = Array.isArray(storeid) ? storeid[0] : storeid;

    const router = useRouter();
    const {
        data,
        isLoading: isLoadingProducts,
        error: errorProducts,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteFetchProductByStoreId(storeIdFetch ?? "");

    const { data: storeData, isLoading: isLoadingStore, error: errorStore } = useGetStoreById(storeIdFetch ?? "");
    const productsData = data as InfiniteData<ProductsData> | undefined;
    const products = productsData?.pages.flatMap((page: ProductsData) => page.products) ?? [];

    function HandlerBackScreen() {
        router.replace("/(auth)/shopping/");
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingRight: 16, paddingLeft: 16 }}>
            {isLoadingProducts || isLoadingStore ? (
                <View style={{ width: "100%", marginTop: 24 }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : errorStore ? (
                <View className="flex-1 flex items-center justify-center">
                    <Text>Erro ao carregar o store: {errorStore.message}</Text>
                    <Button title="Voltar" onPress={() => router.navigate("/(auth)/shopping")} />
                </View>
            ) : errorProducts ? (
                <View className="flex-1 flex items-center justify-center">
                    <Text>Erro ao carregar o produto: {errorProducts.message}</Text>
                    <Button title="Voltar" onPress={() => router.navigate("/(auth)/shopping")} />
                </View>
            ) : (
                <View className="w-full h-auto mt-6 mb-24">
                    <View className="px-4 flex flex-row gap-2">
                        <TouchableOpacity onPress={HandlerBackScreen}>
                            <Ionicons name="arrow-back" size={24} />
                        </TouchableOpacity>
                        <Text className="font-roboto font-bold text-2xl ml-6 mb-6">{storeData?.title}</Text>
                    </View>
                    <View className="px-4 mb-16">
                        <Image className="h-16 w-16 rounded-full" source={{ uri: storeData?.imageUrl }} alt="logo loja" />
                        <Text>{storeData?.description}</Text>
                    </View>

                    <FlatList
                        style={{ marginBottom: 96 }}
                        data={products}
                        numColumns={2}
                        keyExtractor={(item: Product) => item.id}
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        renderItem={({ item }) => (
                            <ProductComponent
                                id={item.id}
                                price={item.priceInCents}
                                title={item.title}
                                image_url={item.imageUrl}
                            />
                        )}
                        ListEmptyComponent={() => (
                            <Text className="text-gray-500">Nenhum produto encontrado.</Text>
                        )}
                        onEndReached={() => {
                            if (hasNextPage && !isFetchingNextPage) {
                                fetchNextPage();
                            }
                        }}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={
                            isFetchingNextPage ? (
                                <ActivityIndicator size="large" color="#0000ff" />
                            ) : !hasNextPage ? (
                                <Text style={{ color: "gray", marginVertical: 16 }}>
                                    Não há mais produtos nesta loja.
                                </Text>
                            ) : null
                        }
                    />
                </View>
            )}
        </SafeAreaView>
    );
}
