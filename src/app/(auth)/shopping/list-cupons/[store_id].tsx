import { useListCouponByCustomerId } from "@/libs/react-query/cupom-queries-and-mutations";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

    export default function ListCuponsScreen() {
        const { store_id } = useLocalSearchParams();
        const store_idFetch = Array.isArray(store_id)
          ? store_id[0]
          : store_id;
      
    const { userId } = useAuth()
    const { data: couponList, error, isLoading } = useListCouponByCustomerId(userId ?? "",store_idFetch ?? "")
    console.log(couponList)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingRight: 16, paddingLeft: 16 }}>
            <Text>ListCuponsScreen</Text>
        </SafeAreaView>
    )
}