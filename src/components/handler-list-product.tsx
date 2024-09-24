import { ScrollView, Text, View, ActivityIndicator } from "react-native";
import { ProductComponent } from "./product-component";
import { useFetchProductByCategoryId } from "@/libs/react-query/products-queries-and-mutations";


interface HandlerListProductsByCategoryProps {
    category_id: string;
}
export interface Product {
    id: string;
    title: string;
    slug: string;
    imageUrl: string;
    description: string;
    priceInCents: number;
    stock: number;
    categoryId: string;
    storeId: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export function HandlerListProducts({ category_id }: HandlerListProductsByCategoryProps) {
    const { data, isLoading: isLoadingProducts, error: errorProducts } = useFetchProductByCategoryId(category_id ?? "");

    console.log(data);

    if (isLoadingProducts) {
        return (
            <View className="w-full h-auto mt-6">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (errorProducts) {
        return (
            <View className="w-full h-auto mt-6">
                <Text className="text-red-500">Error loading products: {errorProducts.message}</Text>
            </View>
        );
    }

    // Verificar se "data" existe e tem produtos
    if (!data || data.length === 0) {
        return (
            <View className="w-full h-auto mt-6">
                <Text className="text-gray-500">Nenhum produto encontrado.</Text>
            </View>
        );
    }

    return (
        <View className="w-full h-auto mt-6">
            <Text className="font-roboto font-bold text-2xl ml-6 mb-6">Mais vendidos</Text>
            <ScrollView horizontal>
                {data.map((product: Product) => (
                    <ProductComponent
                        key={product.id} // Use o id do produto como chave
                        id={product.id}
                        price={product.priceInCents} // Convertendo de centavos para reais, se necessário
                        title={product.title}
                        image_url={product.imageUrl} // Corrigindo o nome da propriedade
                    />
                ))}
            </ScrollView>
        </View>
    );
}
