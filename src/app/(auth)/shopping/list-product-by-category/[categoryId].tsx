import { ProductComponent } from "@/components/product-component";
import { Product } from "@/hooks/products/list-products-by-category";
import { useFetchCategoryById } from "@/libs/react-query/categories-queries-and-mutation";
import { useFetchProductByCategoryId } from "@/libs/react-query/products-queries-and-mutations";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, SafeAreaView, View, Text, FlatList } from "react-native";

export default function ListProductByCategory() {
  const { categoryId } = useLocalSearchParams();
  const categoryIdFetch = Array.isArray(categoryId) ? categoryId[0] : categoryId;
  const { data, isLoading: isLoadingProducts, error: errorProducts } = useFetchProductByCategoryId(categoryIdFetch ?? "", 1);
  const { data: categoryData, isLoading: isLoadingCategory, error: errorFeatchCategory } = useFetchCategoryById(categoryIdFetch ?? "");
  if (isLoadingProducts || isLoadingCategory) {
    return (
      <View className="w-full h-auto mt-6">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (errorProducts) {
    return (
      <View className="w-full h-auto mt-6">
        <Text className="text-red-500">Erro ao carregar os produtos: {errorProducts.message}</Text>
      </View>
    );
  }
  if (errorFeatchCategory) {
    return (
      <View className="w-full h-auto mt-6">
        <Text className="text-red-500">Erro ao carregar a categoria: {errorFeatchCategory.message}</Text>
      </View>
    );
  }


  if (!data || data.products.length === 0) {
    return (
      <View className="w-full h-auto mt-6">
        <Text className="text-gray-500">Nenhum produto encontrado.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingRight: 16, paddingLeft: 16 }}>
      <View className="w-full h-auto mt-6">
        <Text className="font-roboto font-bold text-2xl ml-6 mb-6">{categoryData?.title}</Text>
        <FlatList
          className="mb-24"
          data={data.products}
          numColumns={2} // Definido para duas colunas
          keyExtractor={(item: Product) => item.id}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }} // Centralizando os itens
          renderItem={({ item }) => (
            <ProductComponent
              id={item.id}
              price={item.priceInCents}
              title={item.title}
              image_url={item.imageUrl}

            />
          )}
          ListEmptyComponent={() => (
            <Text className="text-gray-500">Nenhum produto encontrado.</Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
