import { Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

interface ProductComponentProps {
    id: string;
    image_url: string;
    title: string;
    price: number;
}

export function ProductComponent({ id, image_url, title, price }: ProductComponentProps) {
    function NavigationProductId(id: string) {
        router.push(`/shopping/product/${id}`);
    }

    const formattedPrice = (price / 100).toFixed(2);

    return (
        <TouchableOpacity onPress={() => NavigationProductId(id)} style={{ marginRight: 16 }}>
            <View
                style={{
                    borderColor: "#E5E7EB", // Cor cinza clara (equivalente ao border-gray-200)
                    borderWidth: 1,
                    padding: 16,
                    width: 172,
                    borderRadius: 16,
                    alignItems: "center",
                    gap: 8,
                }}
            >
                <Image
                    style={{ width: 144, height: 144 }}
                    source={{ uri: image_url }}
                />

                <View style={{ width: "100%", minHeight: 60 }}>
                    <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{
                            fontWeight: "bold",
                            fontSize: 18, // text-lg
                            color: "#F97316", // Cor personalizada (laranja)
                            textAlign: "center",
                            overflow: "hidden",
                            lineHeight: 22, // Ajuste conforme necessário
                        }}
                    >
                        {title}
                    </Text>
                </View>

                {/* Preço formatado */}
                <Text
                    style={{
                        color: "#F97316", // Cor laranja
                        fontSize: 16, // text-base
                        width: "100%",
                        textAlign: "right",
                    }}
                >
                    R${formattedPrice}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
