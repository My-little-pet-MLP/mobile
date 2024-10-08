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
        <TouchableOpacity onPress={() => NavigationProductId(id)} style={{marginRight:16}}>
            <View className="border-gray-200 border p-6 w-[172px] gap-2 rounded-2xl items-center">
                <Text></Text>
                <Image className="w-[144px] h-[144px]" source={{ uri: image_url }} />
                
                <View className="w-full min-h-[60px]"> 
                    <Text
                        className="font-bold text-lg text-orage-theme text-center"
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{ 
                            overflow: 'hidden',
                            lineHeight: 22, // Ajuste conforme necessário
                        }}
                    >
                        {title}
                    </Text>
                </View>

                {/* Preço formatado */}
                <Text className="text-orage-theme text-base w-full text-right">
                    R${formattedPrice}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
