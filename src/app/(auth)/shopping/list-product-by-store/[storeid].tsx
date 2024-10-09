import { useFetchProductByCategoryId, useFetchProductById, useFetchProductByStoreId } from "@/libs/react-query/products-queries-and-mutations";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { View, Text, Button, ActivityIndicator, Image, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { QUERYKEYS } from "@/libs/react-query/query-is";
import { useGetStoreById } from "@/libs/react-query/store-queries-and-mutations";
import { ProductComponent } from "@/components/product-component";
import { Product } from "@/hooks/products/list-products-by-category";

export default function StoreDetail() {
    const { storeid } = useLocalSearchParams();
    const [isLoadingScreen, setIsLoadingScreen] = useState(true);

    // Garantir que seja sempre uma string
    const storeIdFetch = Array.isArray(storeid) ? storeid[0] : storeid;

    const router = useRouter();
    const queryClient = useQueryClient();

    const { data, isLoading: isLoadingProducts, error: errorProducts } = useFetchProductByStoreId(storeIdFetch ?? "", 1);
    const MINIMUM_LOADING_TIME = 500;
    const { data: storeData, isLoading: isLoadingStore, error: errorStore } = useGetStoreById(storeIdFetch ?? "")

    useFocusEffect(
        useCallback(() => {
            setIsLoadingScreen(true);

            return () => {
                queryClient.invalidateQueries({ queryKey: [ QUERYKEYS.getStoreById,QUERYKEYS.listProductsByStoreId] });
            };
        }, [])
    );

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | number;

        if (!isLoadingProducts || isLoadingStore) {
            timeoutId = setTimeout(() => {
                setIsLoadingScreen(false);
            }, MINIMUM_LOADING_TIME);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId as number);
            }
        };
    }, [isLoadingProducts]);

    if (isLoadingScreen) {
        return (
            <View className="flex-1 items-center justify-center flex">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    if (errorStore) {
        return (
            <View className="flex-1 flex items-center justify-center">
                <Text>Erro ao carregar o store: {errorStore.message}</Text>
                <Button title="Voltar" onPress={() => router.navigate("/(auth)/shopping")} />
            </View>
        );
    }
    if (errorProducts) {
        return (
            <View className="flex-1 flex items-center justify-center">
                <Text>Erro ao carregar o produto: {errorProducts.message}</Text>
                <Button title="Voltar" onPress={() => router.navigate("/(auth)/shopping")} />
            </View>
        );
    }


     function HandlerBackScreen() {
         router.replace("/(auth)/shopping/")
    }
    if (!data) {
        return (
            <View className="flex-1 flex items-center justify-center">
                <Text>Produto não encontrado.</Text>
                <Button title="Voltar" onPress={() => router.navigate("/(auth)/shopping")} />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingRight: 16, paddingLeft: 16 }}>
            <View className="w-full h-auto mt-6">

                <View className="px-4 flex flex-row gap-2">
                    <TouchableOpacity onPress={()=>HandlerBackScreen()}>
                        <View>
                            <Ionicons name="arrow-back" size={24} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text className="font-roboto font-bold text-2xl ml-6 mb-6">{storeData?.title}</Text>
                    </View>
                </View>
                <View className="px-4 mb-16">
                    <Image className="h-16 w-16 rounded-full" src={storeData?.imageUrl} alt="logo loja" />
                    <Text>{storeData?.description}</Text>
                </View>
                
                <FlatList
                    className="mb-24 px-4"
                    data={data.products}
                    horizontal={true} // Torna a lista horizontal
                    keyExtractor={(item: Product) => item.id}
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: 20, // Para garantir que todos os itens tenham espaço para aparecer
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
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}
