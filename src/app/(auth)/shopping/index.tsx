import React from "react";
import { Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
import { HandlerRandomListProductsByCategory } from "@/components/handler-random-list-product-by-category";

export default function ShoppingScreen() {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingRight: 16, paddingLeft: 16 }}>
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <PagerView style={{ width: "100%", height: 160, borderRadius: 16 }} initialPage={0}>
                        <Image
                            key="1"
                            className="w-full h-[160px] bg-gray-200 rounded-2xl"
                            source={{ uri: "https://jfwzshiyyvxklcuuzueu.supabase.co/storage/v1/object/sign/my-little-pet-banners/banner1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJteS1saXR0bGUtcGV0LWJhbm5lcnMvYmFubmVyMS5wbmciLCJpYXQiOjE3MjU0OTQwMzQsImV4cCI6MTc1NzAzMDAzNH0.i1SiSzjmO6s_XnKMlulwUGXK8X_eJQfacMSYlaOdUpk&t=2024-09-04T23%3A54%3A09.213Z" }}
                        />
                        <Image
                            key="2"
                            className="w-full h-[160px] bg-gray-200 rounded-2xl"
                            source={{ uri: "https://jfwzshiyyvxklcuuzueu.supabase.co/storage/v1/object/sign/my-little-pet-banners/banner2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJteS1saXR0bGUtcGV0LWJhbm5lcnMvYmFubmVyMi5wbmciLCJpYXQiOjE3MjU0OTQzMDgsImV4cCI6MTc1NzAzMDMwOH0.cwzC07Mti86uavuInOnqNk2dtcDIV8ymMcYddAkZpVk&t=2024-09-04T23%3A58%3A43.939Z" }}
                        />
                    </PagerView>

                    <HandlerRandomListProductsByCategory />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}