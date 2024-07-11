import { BannerHome } from "@/components/BannerHome";
import { Button } from "@/components/Button";
import { useAuth, useUser } from "@clerk/clerk-expo";
import {  Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen(){
    const {user} = useUser()
    const {signOut} = useAuth()
    return(
      <SafeAreaView style={{flex:1}}>
        <View className="flex-1 p-8 justify-center items-center gap-3">
          <BannerHome/>
        </View>
        </SafeAreaView>
    )
}
