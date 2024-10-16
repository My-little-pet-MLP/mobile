import React from "react";
import { ScrollView, Text, View } from "react-native";
import { ProductComponent } from "../product-component";
import { ProductSkeleton } from "../product-component/skeleton";
import { useFetchProductByRandomCategory } from "@/libs/react-query/products-queries-and-mutations";

export function HandlerRandomListProductsByCategory() {
    const { data: products, isLoading, error } = useFetchProductByRandomCategory(1, 8);

    return (
        <View className="w-full h-auto mt-20">
            {isLoading ? (
                <ScrollView horizontal className="flex-row px-4">
                    {[...Array(8)].map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))}
                </ScrollView>
            ) : error ? (
                <Text className="text-red-500">Error loading products: {error.message}</Text>
            ) : (
                <>
                    <Text className="font-bold text-2xl ml-6 mb-6 text-orange-theme">
                        {products?.category.title}
                    </Text>
                    <ScrollView horizontal className="flex-row px-4">
                        {products?.products.map((product) => (
                            <ProductComponent
                                key={product.id}
                                id={product.id}
                                price={product.priceInCents}
                                title={product.title}
                                image_url={product.imageUrl}
                            />
                        ))}
                    </ScrollView>
                </>
            )}
        </View>
    );
}
