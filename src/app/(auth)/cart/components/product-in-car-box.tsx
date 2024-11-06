import { View, Text, Image, TouchableOpacity } from "react-native";
import { useUpdateProductInOrder } from "@/libs/react-query/product-in-orders-queries.and-mutations";
import { router } from "expo-router";

interface ProductInCarBoxProps {
  product: {
    id: string; // O id do produto, também será passado como "id" na atualização
    image: string;
    name: string;
    quantity: number;
    price: number; // preço unitário em centavos
    productInOrderId: string;
  };
}

export function ProductInCarBox({
  product,
}: ProductInCarBoxProps) {
  const { id, image, name, quantity, price, productInOrderId } = product;
  const priceUnitary = price / quantity; // Total baseado na quantidade

  const { mutate: updateProductInOrder, isPending: isUpdatingProduct } = useUpdateProductInOrder();

  const handleQuantityChange = (newQuantity: number) => {
    updateProductInOrder({
      id: productInOrderId, // Utiliza productInOrderId para a atualização
      quantity: newQuantity,
    });
  };

  const handleIncreaseQuantity = () => {
    handleQuantityChange(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      handleQuantityChange(quantity - 1);
    }
  };
  function NavigationProductId(id: string) {
    router.push(`/shopping/product/${id}`);
}
  return (
    <View key={id} className="mt-2 flex flex-row gap-2">
      <TouchableOpacity onPress={()=>NavigationProductId(product.id)}>
      <Image source={{ uri: image }} className="h-24 w-24 rounded" />
      </TouchableOpacity>
      <View className="flex flex-col text-base">
        <Text className="text-white">{name}</Text>

        {/* Exibe o preço unitário fixo */}
        <Text className="text-white">
          Preço unitário: R$ {(priceUnitary / 100).toFixed(2)}
        </Text>

        {/* Exibe o preço total que muda conforme a quantidade */}
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

        {/* Exibe um feedback visual de atualização */}
        {isUpdatingProduct && <Text className="text-yellow-500">Atualizando...</Text>}
      </View>
    </View>
  );
}
