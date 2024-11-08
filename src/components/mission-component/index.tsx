import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Mission } from "../../../@types/mission";
import { useCompleteMission } from "@/libs/react-query/missions-queries-and-mutations";
import { router } from "expo-router";


export function MissionCard({ mission }: { mission: Mission }) {
   
    async function HandlerMissionDetailScreen(missionid: string) {
        router.push(`/challangers/mission/${missionid}`);
    }

 

    return (
        <>
                     <View className={`w-full h-fit p-4 rounded-lg mt-4 shadow-md ${mission.concluido ? 'bg-gray-300' : 'bg-white'}`}>
                    <Text className={`text-xl font-bold mb-2 ${mission.concluido ? 'text-gray-500' : 'text-black'}`}>
                        {mission.descricao}
                    </Text>
                    {!mission.concluido && (
                        <TouchableOpacity className="mt-2 p-2 bg-blue-500 rounded-md" onPress={() => HandlerMissionDetailScreen(mission.id)}>
                            <Text className="text-black text-center">iniciar missão</Text>
                        </TouchableOpacity>
                    )}
                    {mission.concluido && (
                        <Text className="text-center text-gray-500 font-bold mt-2">Missão Concluída</Text>
                    )}
                </View>

         
        </>

    );
}
