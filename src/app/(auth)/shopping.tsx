import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ShoppingScreen (){
    return(
        <SafeAreaView style={{flex:1}}>
        <View className="flex-1 p-8 justify-center items-center gap-3">
            <Text>
                Shopping
            </Text>
        </View>
        </SafeAreaView>
    )
}