import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function ShoppingLayout() {
  const router = useRouter();

  return (
    <Stack>
      {/* Tela inicial de Shopping */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="list-product-by-category/[categoryId]" options={{headerShown: false}}/>
      {/* Tela de Produto */}
      <Stack.Screen
        name="product/[productId]"
        options={{
          headerShown: true,  // Mostra o header nesta tela
          headerTitle: "Detalhes do produto",  // Título personalizado
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.navigate("/shopping")}>
              {/* Botão de voltar */}
              <Ionicons name="arrow-back" size={32} color="white" style={{ marginLeft: 16 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/cart")}>
              {/* Ícone de carrinho */}
              <MaterialCommunityIcons
                name="cart"
                size={32}
                color="white"
                style={{ marginRight: 16 }}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#F7AB2A",

          },
          headerTitleStyle: {
            color: "#fff",
            fontWeight: "700",
            fontSize: 18,
          },
          headerTitleAlign: "center",  // Alinha o título no centro
          headerShadowVisible: false,  // Remove a sombra
        }}
      />
    </Stack>
  );
}
