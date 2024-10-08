import { useFetchProductById } from "@/libs/react-query/products-queries-and-mutations";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { View, Text, Button, ActivityIndicator, Image, TouchableOpacity, ScrollView } from "react-native";
import Fontisto from '@expo/vector-icons/Fontisto';
import { useCallback, useEffect, useState } from "react";
import { Query, useQueryClient } from "@tanstack/react-query";
import { QUERYKEYS } from "@/libs/react-query/query-is";
import { useFetchCategoryById } from "@/libs/react-query/categories-queries-and-mutation";
import { useGetStoreById } from "@/libs/react-query/store-queries-and-mutations";

export default function ProductDetail() {
  const { productId } = useLocalSearchParams();
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);

  // Garantir que seja sempre uma string
  const productIdFetch = Array.isArray(productId) ? productId[0] : productId;

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading: isLoadingProducts, error: errorProducts } = useFetchProductById(productIdFetch ?? "");
  const { data: categoryData, isLoading: isLoadingCategory, error: erroCategory } = useFetchCategoryById(data?.categoryId ?? "");
  const MINIMUM_LOADING_TIME = 500;
  const { data: storeData, isLoading: isLoadingStore, error: errorStore } = useGetStoreById(data?.storeId ?? "")
  useFocusEffect(
    useCallback(() => {
      setIsLoadingScreen(true);

      return () => {
        queryClient.invalidateQueries({ queryKey: [QUERYKEYS.getProductById, QUERYKEYS.getCategoryById, QUERYKEYS.getStoreById] });
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

  function NavigationCategoryList(categoryId: string) {
    router.push(`/shopping/list-product-by-category/${categoryId}`);
  }

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

  if (erroCategory) {
    return (
      <View className="flex-1 flex items-center justify-center">
        <Text>Erro ao carregar o dados: {erroCategory.message}</Text>
        <Button title="Voltar" onPress={() => router.navigate("/(auth)/shopping")} />
      </View>
    );
  }

  if (!data || !categoryData) {
    return (
      <View className="flex-1 flex items-center justify-center">
        <Text>Produto não encontrado.</Text>
        <Button title="Voltar" onPress={() => router.navigate("/(auth)/shopping")} />
      </View>
    );
  }

  return (
    <View className="flex-1 p-6 ">
      <ScrollView className="flex-1 p-6items-center flex-col gap-4">

        <Text className="w-full text-start text-gray-700">
          -
          <TouchableOpacity onPress={() => NavigationCategoryList(categoryData.id)}>
            {/* Encapsulando a string dentro de um componente <Text> */}
            <Text>{categoryData.title}</Text>
          </TouchableOpacity>
          -
          <TouchableOpacity>
            {/* Encapsulando a string dentro de um componente <Text> */}
            <Text>{data.slug}</Text>
          </TouchableOpacity>
        </Text>
        <Image
          source={{ uri: data.imageUrl }}
          className="h-[380px] w-[380px] rounded-xl"
        />
        <View className="w-full h-fit flex flex-col gap-6">
          <Text className="font-bold text-2xl">{data.title}</Text>
          <View className="bg-blue-theme rounded-lg min-h-48 p-4">
            <Text className="font-bold text-2xl text-white text-start">Descrição</Text>
            <Text className="font-normal text-xl text-white text-start">{data.description}</Text>
          </View>
        </View>

        <View className="w-full h-96  flex flex-col gap-6 mt-20 mb-64 bg-blue-theme rounded-lg p-6">
          <Image src={storeData?.imageUrl} alt="logo-loja" className="w-16 h-16 rounded-full" />
          <View className="w-full h-full flex flex-row justify-between">
            <Text className="text-white font-bold text-lg">{storeData?.title}</Text>

            <TouchableOpacity>
              <View><Text className="text-white font-bold text-lg">Visite a loja</Text></View>
            </TouchableOpacity>
          </View>


        </View>
      </ScrollView>
      <View className="bg-white w-full flex flex-row justify-between absolute bottom-0 rounded-3xl h-20 mb-24 mx-6">
        <View className="w-1/2 flex items-center justify-center">
          <Text className="text-orange-theme font-bold text-2xl">
            R$ {(data.priceInCents / 100).toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#ffb800", height: "100%", borderRadius: 20, width: "50%", justifyContent: "center" }}>
          <Fontisto name="shopping-basket-add" size={24} color="white" />
          <Text className="text-2xl text-white font-bold">Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
