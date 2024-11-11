import { View, Text, Image } from "react-native";

interface ProductInCarBoxProps {
  product: {
    id: string;
    image: string;
    name: string;
    quantity: number;
    price: number; // preço unitário em centavos
  };
}

export function ProductInCarBoxMini({ product }: ProductInCarBoxProps) {
  const { image, name, quantity, price } = product;
  const priceUnitary = price / quantity;

  return (
    <View key={product.id} className="mt-2 flex flex-row gap-2">
      <Image source={{ uri: image }} className="h-24 w-24 rounded" />
      <View className="flex flex-col text-base">
        <Text className="text-white">{name}</Text>

        {/* Exibe o preço unitário fixo */}
        <Text className="text-white">
          Preço unitário: R$ {(priceUnitary / 100).toFixed(2)}
        </Text>

        {/* Exibe o preço total baseado na quantidade */}
        <Text className="text-white">
          Preço total: R$ {(price / 100).toFixed(2)}
        </Text>

        {/* Exibe a quantidade fixa */}
        <View className="flex flex-row mt-2 items-center">
          <Text className="pr-4 text-white">Quantidade:</Text>
          <Text className="mx-2 text-white text-lg">{quantity}</Text>
        </View>
      </View>
    </View>
  );
}
