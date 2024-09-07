import { Button, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PagerView from 'react-native-pager-view';
import { Ionicons } from "@expo/vector-icons";
export default function ShoppingScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingRight: 14, paddingLeft: 14, gap: 24 }}>
            <ScrollView className="">
                <PagerView style={{ width: "100%", height: 280, borderRadius: 8 }} initialPage={0}>
                    <Image key="1" className="w-full h-[160px] bg-gray-200" source={{ uri: "https://jfwzshiyyvxklcuuzueu.supabase.co/storage/v1/object/sign/my-little-pet-banners/banner1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJteS1saXR0bGUtcGV0LWJhbm5lcnMvYmFubmVyMS5wbmciLCJpYXQiOjE3MjU0OTQwMzQsImV4cCI6MTc1NzAzMDAzNH0.i1SiSzjmO6s_XnKMlulwUGXK8X_eJQfacMSYlaOdUpk&t=2024-09-04T23%3A54%3A09.213Z" }} />
                    <Image key="2" className="w-full h-[160px]" source={{ uri: "https://jfwzshiyyvxklcuuzueu.supabase.co/storage/v1/object/sign/my-little-pet-banners/banner2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJteS1saXR0bGUtcGV0LWJhbm5lcnMvYmFubmVyMi5wbmciLCJpYXQiOjE3MjU0OTQzMDgsImV4cCI6MTc1NzAzMDMwOH0.cwzC07Mti86uavuInOnqNk2dtcDIV8ymMcYddAkZpVk&t=2024-09-04T23%3A58%3A43.939Z" }} />
                </PagerView>

                <View className="w-full h-auto">
                    <Text className="font-roboto font-bold text-2xl ml-6 mb-6">Mais vendidos</Text>
                    <ScrollView>
                        <View className="border-gray-200 border p-6 w-[240px] gap-2 rounded-2xl">
                            <Image className="w-[200px] h-[200px]" source={{ uri: "https://jfwzshiyyvxklcuuzueu.supabase.co/storage/v1/object/sign/my-little-pet-products/product1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJteS1saXR0bGUtcGV0LXByb2R1Y3RzL3Byb2R1Y3QxLnBuZyIsImlhdCI6MTcyNTU4NDY2MCwiZXhwIjoxNzU3MTIwNjYwfQ.62bydRduaj88hb_NdD-xhWGj89ibxDVH31ILKzGM_9c&t=2024-09-06T01%3A04%3A36.645Z" }} />
                            <Text className="text-orage-theme text-lg font-bold">Nome do produto</Text>
                            <View className="flex justify-between flex-row items-center">
                                <Text className="text-orage-theme text-lg">R$ 30.00</Text>
                                <TouchableOpacity style={{ borderRadius: 24 }}>
                                    <View className="border border-orage-theme rounded-3xl">
                                        <Ionicons name="add" size={18} color="#ffb800" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}