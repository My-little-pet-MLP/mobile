import { Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

interface ProductComponentProps {
    id: string;
    image_url: string;
    title: string;
    price: number;
    variant?: "default" | "white"; // Adicionando variante
}

export function ProductComponent({
    id,
    image_url,
    title,
    price,
    variant = "default", // Valor padrão é "default"
}: ProductComponentProps) {
    function NavigationProductId(id: string) {
        router.push(`/shopping/product/${id}`);
    }

    const formattedPrice = (price / 100).toFixed(2);

    const textColor = variant === "white" ? "#FFFFFF" : "#F97316"; // Cor do texto com base na variante

    return (
        <TouchableOpacity onPress={() => NavigationProductId(id)} style={{ marginRight: 16 }}>
            <View
                style={{
                    borderColor: "#E5E7EB", // Cor cinza clara
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
                            color: textColor, // Cor com base na variante
                            textAlign: "center",
                            overflow: "hidden",
                            lineHeight: 22,
                        }}
                    >
                        {title}
                    </Text>
                </View>

                <Text
                    style={{
                        color: textColor, // Cor do preço também com base na variante
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
