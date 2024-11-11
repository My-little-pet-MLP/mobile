import { useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFetchOrderById } from "@/libs/react-query/orders-queries.and.mutations";
import { useGetStoreById } from "@/libs/react-query/store-queries-and-mutations";
import { useListProductInOrderByOrder } from "@/libs/react-query/product-in-orders-queries.and-mutations";
import { useConfirmOrder } from "@/libs/react-query/orders-queries.and.mutations";
import { ProductInCarBoxMini } from "../components/product-in-order-mini";
import { CupomDisplay } from "@/components/cupom-display";

export default function FinalizeOrderScreen() {
  const { user } = useUser();
  const { orderId } = useLocalSearchParams();
  const orderIdFetch = Array.isArray(orderId) ? orderId[0] : orderId;

  const { data: order, isLoading } = useFetchOrderById(orderIdFetch ?? "");
  const { data: products, isLoading: isLoadingProducts } = useListProductInOrderByOrder(orderIdFetch ?? "");
  const { data: store, isLoading: isLoadingStore } = useGetStoreById(order?.storeId ?? "");

  const { mutate: confirmOrder, isPending: isConfirmingOrder } = useConfirmOrder();

  const handleFinalizeOrder = () => {
    if (order?.cupomId === null) {
      Alert.alert(
        "Finalizar pedido",
        "Tem certeza que deseja finalizar sem adicionar um cupom?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Sim",
            onPress: () => finalizeOrder(),
          },
        ]
      );
    } else {
      finalizeOrder();
    }
  };

  const finalizeOrder = () => {
    confirmOrder(orderIdFetch, {
      onSuccess: () => {
        Alert.alert("Parabéns", "Pedido finalizado com sucesso!", [
          {
            text: "OK",
            onPress: () => router.push("/shopping"), // Redireciona para a tela inicial de shopping
          },
        ]);
      },
      onError: (error: any) => {
        Alert.alert("Erro", error.message || "Erro ao finalizar o pedido.");
      },
    });
  };

  function handleApplyCupomScreen() {
    router.push(`/(auth)/cart/cupom-screen/${order?.storeId}/${order?.id}`);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {(isLoading || isLoadingProducts || isLoadingStore) ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <View style={{ backgroundColor: "#1E3A8A", borderRadius: 10, padding: 16, margin: 16 }}>
          {/* Informações da Loja */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <Image source={{ uri: store?.imageUrl }} style={{ height: 64, width: 64, borderRadius: 32 }} alt="logo-store" />
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFFFFF", marginLeft: 8 }}>{store?.title}</Text>
          </View>

          {/* Lista de Produtos */}
          <ScrollView style={{ marginTop: 16, maxHeight: 320 }}>
            {products?.map((product) => (
              <ProductInCarBoxMini key={product.id} product={product} />
            ))}
          </ScrollView>

          {/* Exibir Cupom ou Botão de Adicionar Cupom */}
          {order?.cupomId ? (
            <View style={{ backgroundColor: "#DFF7DF", borderRadius: 10, padding: 12, marginTop: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#2D7A2E", textAlign: "center" }}>
                Cupom aplicado com sucesso!
              </Text>
              <CupomDisplay cupomId={order.cupomId} />
            </View>
          ) : (
            <TouchableOpacity onPress={handleApplyCupomScreen} style={{ backgroundColor: "#FFC107", borderRadius: 10, padding: 12, marginTop: 16 }}>
              <Text style={{ color: "#1E3A8A", fontWeight: "bold", fontSize: 18, textAlign: "center" }}>
                Adicionar cupom
              </Text>
            </TouchableOpacity>
          )}

          {/* Total e Finalização */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 24 }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFFFFF" }}>
                Valor Total: R$ {(order?.fullPriceOrderInCents! / 100).toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity onPress={handleFinalizeOrder} disabled={isConfirmingOrder}>
              <View style={{ backgroundColor: isConfirmingOrder ? "#ccc" : "#4CAF50", borderRadius: 10, padding: 12 }}>
                <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 18 }}>
                  {isConfirmingOrder ? "Finalizando..." : "Finalizar pedido"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
