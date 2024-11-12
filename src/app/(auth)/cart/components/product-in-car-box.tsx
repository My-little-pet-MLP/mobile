import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useUpdateProductInOrder } from "@/libs/react-query/product-in-orders-queries.and-mutations";
import { router } from "expo-router";

interface ProductInCarBoxProps {
  product: {
    id: string;
    image: string;
    name: string;
    quantity: number;
    price: number;
    productInOrderId: string;
  };
}

export function ProductInCarBox({
  product,
}: ProductInCarBoxProps) {
  const { id, image, name, quantity, price, productInOrderId } = product;
  const priceUnitary = price / quantity;

  const { mutate: updateProductInOrder, isPending: isUpdatingProduct } = useUpdateProductInOrder();

  const handleQuantityChange = (newQuantity: number) => {
    updateProductInOrder({
      id: productInOrderId,
      quantity: newQuantity,
    });
  };

  const handleIncreaseQuantity = () => {
    handleQuantityChange(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) {
      Alert.alert(
        "Confirmação",
        "Tem certeza de que deseja remover o produto do pedido?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Excluir",
            onPress: () => handleQuantityChange(0),
            style: "destructive",
          },
        ]
      );
    } else {
      handleQuantityChange(quantity - 1);
    }
  };

  function NavigationProductId(id: string) {
    router.push(`/shopping/product/${id}`);
  }

  return (
    <View key={id} className="mt-2 flex flex-row gap-2">
      <TouchableOpacity onPress={() => NavigationProductId(product.id)}>
        <Image source={{ uri: image }} className="h-24 w-24 rounded" />
      </TouchableOpacity>
      <View className="flex flex-col text-base">
        <Text className="text-white">{name}</Text>

        <Text className="text-white">
          Preço unitário: R$ {(priceUnitary / 100).toFixed(2)}
        </Text>

        <Text className="text-white">
          Preço total: R$ {(price / 100).toFixed(2)}
        </Text>

        <View className="flex flex-row mt-2 items-center">
          <Text className="pr-4 text-white">Quantidade:</Text>
          <TouchableOpacity
            onPress={handleDecreaseQuantity}
            className="bg-gray-300 p-2 rounded"
          >
            <Text className="text-white text-lg">-</Text>
          </TouchableOpacity>
          <Text className="mx-2 text-white text-lg">{quantity}</Text>
          <TouchableOpacity
            onPress={handleIncreaseQuantity}
            className="bg-gray-300 p-2 rounded"
          >
            <Text className="text-white text-lg">+</Text>
          </TouchableOpacity>
        </View>

        {isUpdatingProduct && <Text className="text-yellow-500">Atualizando...</Text>}
      </View>
    </View>
  );
}
