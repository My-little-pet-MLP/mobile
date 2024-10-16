import { ScrollView, Text, ActivityIndicator, View } from "react-native";
import { ProductComponent } from "../product-component";
import { useFetchProductByStoreId } from "@/libs/react-query/products-queries-and-mutations";
import { Product } from "@/hooks/products/list-products-by-category";

interface HandlerListProductsByStoreProps {
    store_id: string;
}

export function HandlerListProductsByStore({ store_id }: HandlerListProductsByStoreProps) {
    const { data, isLoading: isLoadingProducts, error: errorProducts } = useFetchProductByStoreId(store_id ?? "", 1);

    return (
        <View className="flex-1 bg-transparent"> 
            {isLoadingProducts ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : errorProducts ? (
                <Text className="text-red-500 text-center mt-5">Error: {errorProducts.message}</Text>
            ) : !data || !data.products || data.products.length === 0 ? (
                <Text className="text-gray-500 text-center mt-5">Nenhum produto encontrado.</Text>
            ) : (
                <ScrollView
                    horizontal
                    contentContainerStyle={{ gap: 16, paddingHorizontal: 8 }}
                    showsHorizontalScrollIndicator={false}
                >
                    {data.products.map((product: Product) => (
                        <ProductComponent
                            key={product.id}
                            id={product.id}
                            price={product.priceInCents}
                            title={product.title}
                            image_url={product.imageUrl}
                            variant="white"
                        />
                    ))}
                </ScrollView>
            )}
        </View>
    );
}
