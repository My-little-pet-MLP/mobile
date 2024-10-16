// HomeScreen.tsx
import React, { useState } from "react";
import {
    ScrollView,
    View,
    Image,
    ActivityIndicator,
    StyleSheet
} from "react-native";
import PagerView from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { HandlerRandomListProductsByCategory } from "@/components/handler-random-list-product-by-category";
import { MissionBoxHome } from "@/components/mission-box-home";

export default function HomeScreen() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            {isLoading ? (
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.container}>

                        <View style={styles.loadingOverlay}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    </View>
                </SafeAreaView>
            ) : (
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.container}>
                        <ScrollView
                            style={styles.scrollView}
                            keyboardShouldPersistTaps="handled"
                        >
                            <PagerView
                                style={styles.pagerView}
                                initialPage={0}
                            >
                                <Image
                                    key="1"
                                    style={styles.image}
                                    source={{
                                        uri: "https://jfwzshiyyvxklcuuzueu.supabase.co/storage/v1/object/sign/my-little-pet-banners/banner1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJteS1saXR0bGUtcGV0LWJhbm5lcnMvYmFubmVyMS5wbmciLCJpYXQiOjE3MjU0OTQwMzQsImV4cCI6MTc1NzAzMDAzNH0.i1SiSzjmO6s_XnKMlulwUGXK8X_eJQfacMSYlaOdUpk&t=2024-09-04T23%3A54%3A09.213Z"
                                    }}
                                    resizeMode="cover"
                                    accessibilityLabel="Banner promocional 1"
                                />
                                <Image
                                    key="2"
                                    style={styles.image}
                                    source={{
                                        uri: "https://jfwzshiyyvxklcuuzueu.supabase.co/storage/v1/object/sign/my-little-pet-banners/banner2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJteS1saXR0bGUtcGV0LWJhbm5lcnMvYmFubmVyMi5wbmciLCJpYXQiOjE3MjU0OTQzMDgsImV4cCI6MTc1NzAzMDMwOH0.cwzC07Mti86uavuInOnqNk2dtcDIV8ymMcYddAkZpVk&t=2024-09-04T23%3A58%3A43.939Z"
                                    }}
                                    resizeMode="cover"
                                    accessibilityLabel="Banner promocional 2"
                                />
                            </PagerView>

                            <HandlerRandomListProductsByCategory/>
                            <MissionBoxHome />
                          
                        </ScrollView>
                    </View >
                </SafeAreaView >
            )}
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
    },
    container: {
        flex: 1,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "transparent", // Sem fundo
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
    scrollView: {
        flex: 1,
    },
    pagerView: {
        width: "100%",
        height: 160,
        borderRadius: 16,
        marginBottom: 16,
    },
    image: {
        width: "100%",
        height: 160,
        backgroundColor: "#e0e0e0",
        borderRadius: 16,
    },
});
