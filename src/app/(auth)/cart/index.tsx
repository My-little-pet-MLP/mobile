import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";
import { useListOrdersByCustomer } from "@/libs/react-query/orders-queries.and.mutations";
import React from "react";
import { StoreInfo } from "./components/order-box";

export default function CartShopping() {
    const { userId } = useAuth();

    // Garante que a consulta só é feita se `userId` estiver definido
    const { data: orders, error: listOrderError, isLoading: isLoadingListOrders } =
        useListOrdersByCustomer(userId ?? "", 1, 8);

    // Tratamento de erro para pedidos
    if (axios.isAxiosError(listOrderError)) {
        const statusCode = listOrderError.response?.status;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", padding: 14, gap: 24 }}>
                <ScrollView>
                    <View>
                        <Text style={{ fontSize: 18, textAlign: "center" }}>
                            {statusCode === 404
                                ? "Você não adicionou nada ao carrinho ainda"
                                : "Erro ao carregar os pedidos. Tente novamente mais tarde."}
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    // Exibe indicador de carregamento enquanto busca pedidos
    if (isLoadingListOrders) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", padding: 14, gap: 24 }}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }

    // Verifica se não há pedidos
    if (!orders?.orders || orders.orders.length === 0) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", padding: 14, gap: 24 }}>
                <ScrollView>
                    <View>
                        <Text style={{ fontSize: 18, textAlign: "center" }}>
                            Você não adicionou nada ao carrinho ainda
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    // Renderiza os pedidos com informações das lojas
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", padding: 14, gap: 24 }}>
            <ScrollView>
                {orders.orders.map((order) => (
                    <View key={order?.id || Math.random().toString()} style={{ marginBottom: 16 }}>
                        {order && order.storeId ? (
                            <StoreInfo storeId={order.storeId} order={order} />
                        ) : (
                            <Text>Informação do pedido não disponível.</Text>
                        )}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
