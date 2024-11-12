import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { ProductComponent } from "../product-component";
import { ProductSkeleton } from "../product-component/skeleton";
import { useFetchProductByRandomCategory } from "@/libs/react-query/products-queries-and-mutations";

export function HandlerRandomListProductsByCategory() {
    // Cria uma única chave aleatória para cada montagem do componente
    const [randomKey, setRandomKey] = useState(Math.random());

    // Passa a chave aleatória como parte da queryKey para garantir uma nova query por montagem
    const { data: products, isLoading, error, refetch } = useFetchProductByRandomCategory(1, 8, randomKey);

    const productList = products?.products ?? [];

    // Refetch ao montar o componente
    useEffect(() => {
        refetch();
    }, []); // Executa refetch uma vez ao montar o componente

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
                        {products?.category?.title ?? "Categoria desconhecida"}
                    </Text>
                    <ScrollView horizontal className="flex-row px-4">
                        {productList.length > 0 ? (
                            productList.map((product) => (
                                <ProductComponent
                                    key={product.id}
                                    id={product.id}
                                    price={product.priceInCents}
                                    title={product.title}
                                    image_url={product.imageUrl}
                                />
                            ))
                        ) : (
                            <Text className="text-gray-500">Nenhum produto encontrado.</Text>
                        )}
                    </ScrollView>
                </>
            )}
        </View>
    );
}
