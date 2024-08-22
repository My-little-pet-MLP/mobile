import { ActivityIndicator, View } from "react-native";

export function SplashScreen(){
    return(
        <View className="flex-1 justify-center items-center bg-blue-theme">
            <ActivityIndicator color="#fff"/>
        </View>
    )
    
}