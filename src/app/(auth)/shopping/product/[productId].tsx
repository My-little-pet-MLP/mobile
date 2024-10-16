import { useFetchProductById } from "@/libs/react-query/products-queries-and-mutations";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, ActivityIndicator, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BuyButton } from "@/components/buy-button";
import { StoreComponent } from "@/components/store-component";

export default function ProductDetail() {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const router = useRouter();

  const { data, isLoading: isLoadingProducts } = useFetchProductById(productId ?? "");

  function NavigationCategoryList(categoryId: string) {
    router.push(`/shopping/list-product-by-category/${categoryId}`);
  }

  return (
    <>
      {isLoadingProducts ? (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </SafeAreaView>
      ) : (
        <View className="flex-1">
          <ScrollView className="flex-1 p-6 flex-col gap-4">
            <Text className="w-full text-start text-gray-700">
              -
              <TouchableOpacity onPress={() => NavigationCategoryList(data?.category?.id ?? "")}>
                <Text>{data?.category?.slug}</Text>
              </TouchableOpacity>
              -
              <TouchableOpacity>
                <Text>{data?.slug}</Text>
              </TouchableOpacity>
            </Text>
            <Image
              source={{ uri: data?.imageUrl }}
              className="h-[380px] w-[380px] rounded-xl"
            />
            <View className="w-full h-fit flex flex-col gap-6">
              <Text className="font-bold text-2xl">{data?.title}</Text>
              <View className="bg-blue-theme rounded-lg min-h-48 p-4">
                <Text className="font-bold text-2xl text-white text-start">Descrição</Text>
                <Text className="font-normal text-xl text-white text-start">
                  {data?.description}
                </Text>
              </View>
            </View>

           <StoreComponent id={data?.store.id!} imageUrl={data?.store.imageUrl!} title={data?.store.title!} description={data?.store.description!} />

          </ScrollView>

          <BuyButton priceInCents={data?.priceInCents!} product_id={data?.id!} key={data?.id!}/>
        </View>
      )}
    </>
  );
}
