import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export function MissionBoxHome() {
    function HandlerMissionScreen() {
        router.push("/(auth)/challangers")
    }
    return (
        <View className="w-full h-fit bg-blue-theme p-6 rounded-lg mt-20">
            <View className="flex flex-row justify-between">
                <Text className="font-bold text-white text-2xl">Missões</Text>
                <TouchableOpacity style={{ width: "50%" }} onPress={() => HandlerMissionScreen()}>
                    <View className="h-auto w-full items-end justify-center flex">
                        <Text className="text-white font-bold text-lg">Saiba mais</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View className="w-full min-h-48 flex items-center justify-center">
                <Text className="text-lg text-white font-bold text-center break-words w-64">você completou todas as suas missões</Text>
            </View>
        </View>
    )
}