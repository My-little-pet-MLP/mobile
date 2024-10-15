import { useFetchProductById } from "@/libs/react-query/products-queries-and-mutations";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, Button, ActivityIndicator, Image, TouchableOpacity, ScrollView } from "react-native";
import Fontisto from '@expo/vector-icons/Fontisto';
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { QUERYKEYS } from "@/libs/react-query/query-is";
import { useFetchCategoryById } from "@/libs/react-query/categories-queries-and-mutation";
import { useGetStoreById } from "@/libs/react-query/store-queries-and-mutations";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetail() {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);
  const router = useRouter();
  const queryClient = useQueryClient();


  const { data, isLoading: isLoadingProducts, error: errorProducts } = useFetchProductById(productId ?? "");

  const { data: categoryData, isLoading: isLoadingCategory, error: errorCategory } = useFetchCategoryById(data?.categoryId ?? "");

  const { data: storeData, isLoading: isLoadingStore, error: errorStore } = useGetStoreById(data?.storeId ?? "");

  function NavigationCategoryList(categoryId: string) {
    router.push(`/shopping/list-product-by-category/${categoryId}`);
  }
  function NavigationStoreScreen(storeId: string) {
    router.push(`/(auth)/shopping/list-product-by-store/${storeId}`);
  }
  return (
    <>
      {isLoadingCategory || isLoadingProducts || isLoadingStore ? (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </SafeAreaView>
      ) : (
        <View className="flex-1">
          <ScrollView className="flex-1 p-6 flex-col gap-4">
            <Text className="w-full text-start text-gray-700">
              -
              <TouchableOpacity onPress={() => NavigationCategoryList(categoryData?.id ?? "")}>
                <Text>{categoryData?.title}</Text>
              </TouchableOpacity>
              -
              <TouchableOpacity>
                <Text>{data?.slug}</Text>
              </TouchableOpacity>
            </Text >
            <Image
              source={{ uri: data?.imageUrl }}
              className="h-[380px] w-[380px] rounded-xl"
            />
            <View className="w-full h-fit flex flex-col gap-6">
              <Text className="font-bold text-2xl">{data?.title}</Text>
              <View className="bg-blue-theme rounded-lg min-h-48 p-4">
                <Text className="font-bold text-2xl text-white text-start">Descrição</Text>
                <Text className="font-normal text-xl text-white text-start">{data?.description}</Text>
              </View>
            </View>

            <View className="w-full h-96 flex flex-col gap-6 mt-20 mb-64 bg-blue-theme rounded-lg p-6">
              <Image source={{ uri: storeData?.imageUrl }} style={{ width: 64, height: 64, borderRadius: 32 }} />
              <View className="w-full h-full flex flex-row justify-between">
                <Text className="text-white font-bold text-lg">{storeData?.title}</Text>
                <TouchableOpacity onPress={() => NavigationStoreScreen(storeData?.id ?? "")}>
                  <View><Text className="text-white font-bold text-lg">Visite a loja</Text></View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView >

          <View className="bg-white w-full flex flex-row justify-between absolute bottom-0 rounded-3xl h-28">
            <View className="w-1/2 flex items-center justify-center">
              {data?.priceInCents ?
                <Text className="text-orange-theme font-bold text-2xl">

                  R$ {(data?.priceInCents / 100).toFixed(2)}
                </Text> : <Text>0</Text>}
            </View>
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                backgroundColor: "#ffb800",
                height: "100%",
                borderRadius: 20,
                width: "50%",
                justifyContent: "center",
              }}
            >
              <Fontisto name="shopping-basket-add" size={24} color="white" />
              <Text className="text-2xl text-white font-bold">Comprar</Text>
            </TouchableOpacity>
          </View>
        </View >
      )
      }
    </>

  );
}
