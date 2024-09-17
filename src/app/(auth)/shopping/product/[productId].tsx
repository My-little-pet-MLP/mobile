import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, Button } from "react-native";

export default function ProductDetail() {
  const { productId } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View>
      <Text>Detalhes do Produto {productId}</Text>
      <Button title="Voltar" onPress={() => router.navigate("shopping")} />
    </View>
  );
}
