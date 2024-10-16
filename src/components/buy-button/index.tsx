import { useRegisterProductInOrder } from "@/libs/react-query/product-in-orders-queries.and-mutations";
import { useAuth } from "@clerk/clerk-expo";
import { Fontisto } from "@expo/vector-icons";
import { 
    ActivityIndicator, 
    TouchableOpacity, 
    View, 
    Text, 
    TextInput, 
    StyleSheet 
} from "react-native";
import { useState } from "react";

interface BuyButtonProps {
    priceInCents: number;
    product_id: string;
}

export function BuyButton({ priceInCents, product_id }: BuyButtonProps) {
    const { userId } = useAuth();
    const { mutateAsync: registerProductInOrders, isPending } = useRegisterProductInOrder();
    const [quantity, setQuantity] = useState(1); // Usando número diretamente para facilidade

    function incrementQuantity() {
        setQuantity((prev) => prev + 1);
    }

    function decrementQuantity() {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Limite mínimo de 1
    }

    async function HandlerRegisterProductInOrders() {
        await registerProductInOrders({
            customer_id: userId!,
            product_id,
            quantity,
        });
    }

    return (
        <View className="bg-white w-full flex-row justify-between items-center absolute bottom-0 rounded-3xl h-40 p-8 mb-6">
            <View className="flex-1 items-center justify-center">
                <Text className="text-orange-500 font-bold text-2xl">
                    R$ {((priceInCents * quantity) / 100).toFixed(2)}
                </Text>
            </View>

            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>

                <Text style={styles.quantityText}>{quantity}</Text>

                <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={HandlerRegisterProductInOrders}
                disabled={isPending}
                style={[
                    styles.buyButton,
                    { backgroundColor: isPending ? "#ffd966" : "#ffb800" },
                ]}
            >
                {isPending ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <>
                        <Fontisto name="shopping-basket-add" size={24} color="white" />
                        <Text style={styles.buyButtonText}>Comprar</Text>
                    </>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    quantityContainer: {
        flexDirection: "column", // Alinha verticalmente
        alignItems: "center",
        justifyContent: "space-between",
        height: 100, // Espaço suficiente para evitar cliques acidentais
        marginRight: 20, // Espaçamento lateral em relação ao botão de compra
    },
    quantityButton: {
        backgroundColor: "#E5E7EB",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    quantityButtonText: {
        fontSize: 24,
        fontWeight: "bold",
    },
    quantityText: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 8,
    },
    buyButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        borderRadius: 20,
        width: "50%",
        gap: 8,
    },
    buyButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginLeft: 8,
    },
});
