import { Image, Pressable, View } from "react-native";
import PagerView from "react-native-pager-view";


export function BannerHome(){
    return(
        <View className="w-full h-56 rounded-2xl mt-5 mb-4 border-black border-2">
        <PagerView style={{flex:1}} initialPage={0} pageMargin={14}>
            <Pressable className="w-full h-56 rounded-2xl" key="1" onPress={()=> console.log("clicou no primeiro banner")}>
                <Image source={require("@/assets/banner1.png")} className="w-full h-56 rounded"/>
            </Pressable>
        </PagerView>
        </View>
    )
}