import { useAuth } from "@clerk/clerk-expo";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen (){
    const {signOut} = useAuth()
    return(
        <SafeAreaView style={{flex:1}}>
        <View className="flex-1 p-6 flex-col items-center">
            <Text>
                Profile Screen
            </Text>
            <Button  title="Sair" onPress={()=> signOut()}/>
        </View>
        </SafeAreaView>
    )
}
