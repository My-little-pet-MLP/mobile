// HandlerRandomListProductsByCategory.tsx
import React, { useEffect } from "react";
import { ScrollView, Text, View, ActivityIndicator } from "react-native";
import { ProductComponent } from "./product-component";

interface HandlerListProductsByCategoryProps {
    onLoadingChange?: (isLoading: boolean) => void;
}
import { useFetchProductByRandomCategory } from "@/libs/react-query/products-queries-and-mutations";

export function useRandomProductsByCategory() {
    const { data, isLoading, error } = useFetchProductByRandomCategory(1, 8);
    
    return {
        products: data?.products || [],
        categoryTitle: data?.category?.title || "Categoria",
        isLoading,
        error,
    };
}

export function HandlerRandomListProductsByCategory({
    onLoadingChange,
}: HandlerListProductsByCategoryProps) {
    const { products, categoryTitle, isLoading, error } = useRandomProductsByCategory();

    // Notifica o componente pai sobre o estado de carregamento
    useEffect(() => {
        if (onLoadingChange) {
            onLoadingChange(isLoading);
        }
    }, [isLoading, onLoadingChange]);

    if (error) {
        return (
            <View className="w-full h-auto mt-20">
                <Text className="text-red-500">Error loading products: {error.message}</Text>
            </View>
        );
    }

    if (products.length === 0) {
        return (
            <View className="w-full h-auto mt-20">
                <Text className="text-gray-500">Nenhum produto encontrado.</Text>
            </View>
        );
    }

    return (
        <View className="w-full h-auto mt-20">
            <Text className="font-bold text-2xl ml-6 mb-6 text-orage-theme">
                {categoryTitle}
            </Text>
            <ScrollView horizontal>
                {products.map((product) => (
                    <ProductComponent
                        key={product.id}
                        id={product.id}
                        price={product.priceInCents}
                        title={product.title}
                        image_url={product.imageUrl}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
