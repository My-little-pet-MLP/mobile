import {  Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen(){
    return(
      <SafeAreaView style={{flex:1}}>
        <View className="flex-1 p-6 flex-col items-center">
            <Text>
                Home Screen
            </Text>
        </View>
        </SafeAreaView>
    )
}
