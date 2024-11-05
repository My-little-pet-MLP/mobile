import { useState, useEffect } from "react";
import { useListProductInOrderByOrder } from "@/libs/react-query/product-in-orders-queries.and-mutations";
import { useGetStoreById } from "@/libs/react-query/store-queries-and-mutations";
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ProductInCarBox } from "./product-in-car-box";

export function StoreInfo({
  storeId,
  orderId,
}: {
  storeId: string;
  orderId: string;
}) {
  const {
    data: products = [],
    isLoading: isLoadingProducts,
    error,
  } = useListProductInOrderByOrder(orderId);
  const { data: store, isLoading: isLoadingStore } = useGetStoreById(storeId);

  const [productList, setProductList] = useState(products);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const handleIncreaseQuantity = (id: string) => {
    setProductList((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const handleDecreaseQuantity = (id: string) => {
    setProductList((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const fullPrice = productList.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <View>
      {isLoadingStore || isLoadingProducts ? (
        <ActivityIndicator size="small" />
      ) : error ? (
        <View>
          <Text className="text-lg">Ocorreu um erro ao carregar os dados.</Text>
          <Text>{error.message}</Text>
        </View>
      ) : !store || productList.length === 0 ? (
        <View>
          <Text className="text-lg">
            Loja não encontrada ou nenhum produto disponível.
          </Text>
        </View>
      ) : (
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
            {productList.map((product) => (
              <ProductInCarBox
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
              />
            ))}
          </ScrollView>
          <View className="flex flex-row justify-between items-center">
            <View className="p-3">
              <Text className="text-white font-bold text-base">
                Valor Total: R$ {(fullPrice / 100).toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity>
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
