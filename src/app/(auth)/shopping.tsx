import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ShoppingScreen (){
    return(
        <SafeAreaView style={{flex:1}}>
        <View className="flex-1 px-6 flex-col gap-3 items-center">
         <Text>Shopping screen</Text>
      
        </View>
        </SafeAreaView>
    )
}