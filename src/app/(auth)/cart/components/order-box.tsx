import { useGetStoreById } from "@/libs/react-query/store-queries-and-mutations";
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ProductInCarBox } from "./product-in-car-box";
import { Order } from "../../../../../@types/orders";
import { router } from "expo-router";
import { useListProductInOrderByOrder } from "@/libs/react-query/product-in-orders-queries.and-mutations";

export function StoreInfo({
  storeId,
  order,
}: {
  storeId: string;
  order: Order;
}) {
  const { data: products, isLoading: isLoadingProducts, error } = useListProductInOrderByOrder(order.id);
  const { data: store, isLoading: isLoadingStore } = useGetStoreById(storeId);



  function HadlerFinalizeOrderScreen() {
    router.push(`/(auth)/cart/finalize-order/${order.id}`);
  }

  function handleFinalizeOrder() {
      HadlerFinalizeOrderScreen();
  }

  return (
    <View>
      {(isLoadingStore || isLoadingProducts) ? (
        <ActivityIndicator size="small" />
      ) : error ? (
        <View>
          <Text className="text-lg">Ocorreu um erro ao carregar os dados.</Text>
          <Text>{error.message}</Text>
        </View>
      ) : !store || products!.length === 0 ? (
        <View>
          <Text className="text-lg">Loja não encontrada ou nenhum produto disponível.</Text>
        </View>
      ) : (
        <View className="bg-blue-theme rounded-lg p-6">
          <View className="flex-row items-center gap-4">
            <Image source={{ uri: store.imageUrl }} className="h-16 w-16 rounded-full" alt="logo-store" />
            <Text className="text-white text-lg font-bold">{store.title}</Text>
          </View>

          <ScrollView className="mt-4">
            {products!.map((product) => (
              <ProductInCarBox
                key={product.id}
                product={product}
              />
            ))}
          </ScrollView>

          <View className="flex flex-row justify-between items-center mt-12">
            <View className="p-3">
              <Text className="text-white font-bold text-base">
                Valor Total: R$ {(order.fullPriceOrderInCents / 100).toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity onPress={handleFinalizeOrder}>
              <View className="bg-green-500 rounded-lg p-3">
                <Text className="text-white font-bold text-lg">
                  Finalizar pedido
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
