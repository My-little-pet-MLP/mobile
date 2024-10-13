import { useQuery } from '@tanstack/react-query';
import { listOrdersByCustomer } from "@/hooks/orders/list-all-by-customer-id"; // Exemplo de importação da função de requisição
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@clerk/clerk-expo";
import axios from 'axios';
import { useListOrdersByCustomer } from '@/libs/react-query/orders-queries.and.mutations';

export default function CartShopping() {
    const { userId } = useAuth();
    const { data: orders, error: listOrderError, isLoading: isLoadingListOrders } = useListOrdersByCustomer(userId ?? "",1,8)

    // Verifica se há um erro e se o erro vem de uma requisição Axios
    if (axios.isAxiosError(listOrderError)) {
        const statusCode = listOrderError.response?.status;
        
        // Se o status for 404 (não encontrado), exibe a tela personalizada
        if (statusCode === 404) {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingRight: 14, paddingLeft: 14, gap: 24 }}>
                    <Text>Você não adicionou nada ao carrinho ainda</Text>
                </SafeAreaView>
            );
        }

        // Para outros erros
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingRight: 14, paddingLeft: 14, gap: 24 }}>
                <Text>Erro ao carregar os pedidos. Tente novamente mais tarde.</Text>
            </SafeAreaView>
        );
    }

    // Exibe o carregamento
    if (isLoadingListOrders) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingRight: 14, paddingLeft: 14, gap: 24 }}>
                <Text>Carregando...</Text>
            </SafeAreaView>
        );
    }
    if(orders?.orders.length === 0 ){
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingRight: 14, paddingLeft: 14, gap: 24 }}>
        <ScrollView>
            <Text>
              Voce nao adicionou nada ao carrinho ainda
            </Text>
        </ScrollView>
    </SafeAreaView>
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingRight: 14, paddingLeft: 14, gap: 24 }}>
            <ScrollView>
                <Text>
                   {orders?.orders.length === 0}
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
