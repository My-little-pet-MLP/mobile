import React from 'react';
import { useListCouponByCustomerId } from "@/libs/react-query/cupom-queries-and-mutations";
import { useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ActivityIndicator, FlatList, SafeAreaView, Text, Button } from "react-native";
import { CupomCard } from '../../components/cupom-card';

export default function ApplyCupomScreen() {
    const { user } = useUser();
    const { storeId, orderId } = useLocalSearchParams(); // Adiciona o orderId ao search params
    const storeIdFetch = Array.isArray(storeId) ? storeId[0] : storeId;
    const orderIdDisplay = Array.isArray(orderId) ? orderId[0] : orderId;
    const navigation = useNavigation();

    const { data: ListCupons, error, isLoading } = useListCouponByCustomerId(user?.id ?? "", storeIdFetch);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0CCBFF" style={{ marginTop: 14 }} />
            ) : error ? (
                <>
                    <Text style={{ color: "red", fontSize: 16, margin: 14 }}>
                        Ocorreu um erro ao carregar os cupons.
                    </Text>
                    <Button title="Voltar" onPress={() => navigation.goBack()} />
                </>
            ) : ListCupons && ListCupons.length > 0 ? (
                <FlatList
                    data={ListCupons}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CupomCard cupom={item} orderId={orderIdDisplay} />}
                    contentContainerStyle={{ padding: 14, gap: 24 }}
                />
            ) : (
                <>
                    <Text style={{ color: "red", fontSize: 16, margin: 14 }}>
                        Nenhum cupom encontrado.
                    </Text>
                    <Button title="Voltar" onPress={() => navigation.goBack()} />
                </>
            )}
        </SafeAreaView>
    );
}
