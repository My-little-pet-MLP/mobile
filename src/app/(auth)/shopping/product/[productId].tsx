import { useFetchProductById } from "@/libs/react-query/products-queries-and-mutations";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { View, Text, Button, ActivityIndicator, Image, TouchableOpacity, ScrollView } from "react-native";
import Fontisto from '@expo/vector-icons/Fontisto';
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { QUERYKEYS } from "@/libs/react-query/query-is";
import { useFetchCategoryById } from "@/libs/react-query/categories-queries-and-mutation";
import { useGetStoreById } from "@/libs/react-query/store-queries-and-mutations";

export default function ProductDetail() {
  const { productId } = useLocalSearchParams();
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);
  const [previousProductId, setPreviousProductId] = useState<string | undefined>(undefined);

  // Garantir que seja sempre uma string
  const productIdFetch = Array.isArray(productId) ? productId[0] : productId;

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading: isLoadingProducts, error: errorProducts } = useFetchProductById(productIdFetch ?? "");
  const { data: categoryData, isLoading: isLoadingCategory, error: errorCategory } = useFetchCategoryById(data?.categoryId ?? "");
  const { data: storeData, isLoading: isLoadingStore, error: errorStore } = useGetStoreById(data?.storeId ?? "");

  const MINIMUM_LOADING_TIME = 500;

  useFocusEffect(
    useCallback(() => {
      console.log(productIdFetch);
      setIsLoadingScreen(true);

      // Invalida queries se o productIdFetch mudar
      if (productIdFetch !== previousProductId) {
        queryClient.invalidateQueries({
          queryKey: [
            [QUERYKEYS.getProductById, productIdFetch],
            [QUERYKEYS.getCategoryById, data?.categoryId],
            [QUERYKEYS.getStoreById, data?.storeId],
          ].filter(Boolean), // Apenas chaves não nulas
        });
      }

      // Atualiza o productId anterior
      setPreviousProductId(productIdFetch);

      return () => {
        // Você pode optar por invalidar as queries ao sair da tela, se necessário
        // queryClient.invalidateQueries({ queryKey: [QUERYKEYS.getProductById, QUERYKEYS.getCategoryById, QUERYKEYS.getStoreById] });
      };
    }, [productIdFetch, data?.categoryId, data?.storeId]) // Dependência dos valores dinâmicos
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | number;

    // Controla o estado de carregamento
    if (!isLoadingProducts && !isLoadingStore && !isLoadingCategory) {
      timeoutId = setTimeout(() => {
        setIsLoadingScreen(false); // Desativa o carregamento quando todas as queries estiverem prontas
      }, MINIMUM_LOADING_TIME);
    } else if (data && categoryData && storeData) {
      // Se os dados já existirem, desativa imediatamente o carregamento
      setIsLoadingScreen(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId as number);
      }
    };
  }, [isLoadingProducts, isLoadingStore, isLoadingCategory, data, categoryData, storeData]); // Monitora o estado de carregamento de todas as queries

  // Função de navegação para a lista de produtos por categoria
  function NavigationCategoryList(categoryId: string) {
    router.push(`/shopping/list-product-by-category/${categoryId}`);
  }

  // Função de navegação para a página da loja
  function NavigationStoreScreen(storeId: string) {
    router.push(`/(auth)/shopping/list-product-by-store/${storeId}`);
  }

  // Tela de carregamento
  if (isLoadingScreen) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Tratamento de erro ao carregar a loja
  if (errorStore) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Erro ao carregar a loja: {errorStore.message}</Text>
        <Button title="Voltar" onPress={() => router.navigate("/(auth)/shopping")} />
      </View>
    );
  }

  // Tratamento de erro ao carregar o produto
  if (errorProducts) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Erro ao carregar o produto: {errorProducts.message}</Text>
        <Button title="Voltar" onPress={() => router.navigate("/(auth)/shopping")} />
      </View>
    );
  }

  // Tratamento de erro ao carregar a categoria
  if (errorCategory) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Erro ao carregar os dados da categoria: {errorCategory.message}</Text>
        <Button title="Voltar" onPress={() => router.navigate("/(auth)/shopping")} />
      </View>
    );
  }

  // Verificação se os dados estão carregados
  if (!data || !categoryData || !storeData) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Produto não encontrado.</Text>
        <Button title="Voltar" onPress={() => router.navigate("/(auth)/shopping")} />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 p-6 flex-col gap-4">
        <Text className="w-full text-start text-gray-700">
          -
          <TouchableOpacity onPress={() => NavigationCategoryList(categoryData.id)}>
            <Text>{categoryData.title}</Text>
          </TouchableOpacity>
          -
          <TouchableOpacity>
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

        <View className="w-full h-96 flex flex-col gap-6 mt-20 mb-64 bg-blue-theme rounded-lg p-6">
          <Image src={storeData?.imageUrl} alt="logo-loja" className="w-16 h-16 rounded-full" />
          <View className="w-full h-full flex flex-row justify-between">
            <Text className="text-white font-bold text-lg">{storeData?.title}</Text>
            <TouchableOpacity onPress={() => NavigationStoreScreen(storeData?.id ?? "")}>
              <View><Text className="text-white font-bold text-lg">Visite a loja</Text></View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View className="bg-white w-full flex flex-row justify-between absolute bottom-0 rounded-3xl h-28">
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
