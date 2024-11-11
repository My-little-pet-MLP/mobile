import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Cupom } from '../../../../../@types/cupom';
import { router } from 'expo-router';
import { useApplyCupomInOrder } from '@/libs/react-query/orders-queries.and.mutations';

interface CupomCardProps {
    cupom: Cupom;
    orderId: string;
}

export function CupomCard({ cupom, orderId }: CupomCardProps) {
    const { mutate: applyCupomInOrder, isPending } = useApplyCupomInOrder();


    const handleApplyCupom = () => {
        applyCupomInOrder(
            { cupom_id: cupom.id, order_id: orderId },
            {
                onSuccess: () => {
                    Alert.alert("Sucesso", "Cupom aplicado com sucesso!");
                    router.push(`/(auth)/cart/finalize-order/${orderId}`);
                },
                onError: (error: any) => {
                    Alert.alert("Erro", error.message || "Erro ao aplicar o cupom.");
                },
            }
        );
    };

    return (
        <TouchableOpacity onPress={handleApplyCupom} disabled={isPending}>
            <View style={{ backgroundColor: "#f3f3f3", padding: 16, borderRadius: 10, marginBottom: 16, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 4 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 8 }}>
                    {cupom.description}
                </Text>
                <Text style={{ fontSize: 14, color: "#666", marginBottom: 4 }}>
                    Desconto: {cupom.porcentagem}%
                </Text>
                <Text style={{ fontSize: 14, color: "#666", marginBottom: 4 }}>
                    Válido até: {new Date(cupom.ValidateAt).toLocaleDateString()}
                </Text>
                <Text style={{ fontSize: 14, color: "#666" }}>
                    Status: {cupom.isValid ? "Válido" : "Expirado"}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
