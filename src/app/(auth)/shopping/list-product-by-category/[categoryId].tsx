import { ProductComponent } from "@/components/product-component";
import {
  Product,
  ProductsData,
} from "@/hooks/products/list-products-by-category";
import { useFetchCategoryById } from "@/libs/react-query/categories-queries-and-mutation";
import { useInfiniteFetchProductByCategoryId } from "@/libs/react-query/products-queries-and-mutations";
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  Text,
  FlatList,
} from "react-native";
import React from "react";
import { InfiniteData } from "@tanstack/react-query";


export default function ListProductByCategory() {
  const { categoryId } = useLocalSearchParams();
  const categoryIdFetch = Array.isArray(categoryId)
    ? categoryId[0]
    : categoryId;

  // Buscar dados da categoria
  const {
    data: categoryData,
    isLoading: isLoadingCategory,
    error: errorFetchCategory,
  } = useFetchCategoryById(categoryIdFetch ?? "");

  // Buscar produtos com paginação infinita
  const {
    data,
    isLoading: isLoadingProducts,
    error: errorProducts,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteFetchProductByCategoryId(categoryIdFetch ?? "");
  console.log(data)
  // Garantir que os dados estão corretamente tipados
  const productsData = data as InfiniteData<ProductsData> | undefined;

  // Extrair produtos das páginas com as anotações de tipo apropriadas
  const products =
    productsData?.pages.flatMap((page: ProductsData) => page.products) ?? [];

  // Conteúdo consolidado em um único retorno
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingRight: 16,
        paddingLeft: 16,
      }}
    >
      {isLoadingProducts || isLoadingCategory ? (
        <View style={{ width: "100%", marginTop: 24 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : errorProducts ? (
        <View style={{ width: "100%", marginTop: 24 }}>
          <Text style={{ color: "red" }}>
            Erro ao carregar os produtos: {errorProducts.message}
          </Text>
        </View>
      ) : errorFetchCategory ? (
        <View style={{ width: "100%", marginTop: 24 }}>
          <Text style={{ color: "red" }}>
            Erro ao carregar a categoria: {errorFetchCategory.message}
          </Text>
        </View>
      ) : products.length === 0 ? (
        <View style={{ width: "100%", marginTop: 24 }}>
          <Text style={{ color: "gray" }}>Nenhum produto encontrado.</Text>
        </View>
      ) : (
        <View style={{ width: "100%", marginTop: 24 }}>
          <Text
            style={{
              fontFamily: "Roboto",
              fontWeight: "bold",
              fontSize: 24,
              marginLeft: 24,
              marginBottom: 24,
            }}
          >
            {categoryData?.title}
          </Text>
          <FlatList
            style={{ marginBottom: 96 }}
            data={products}
            numColumns={2}
            keyExtractor={(item: Product) => item.id}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            renderItem={({ item }: { item: Product }) => (
              <ProductComponent
                id={item.id}
                price={item.priceInCents}
                title={item.title}
                image_url={item.imageUrl}
              />
            )}
            ListEmptyComponent={() => (
              <Text style={{ color: "gray" }}>Nenhum produto encontrado.</Text>
            )}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingNextPage ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : !hasNextPage ? (
                <Text style={{ color: "gray", marginVertical: 16 }}>
                  Não há mais produtos nesta categoria.
                </Text>
              ) : null
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
}
