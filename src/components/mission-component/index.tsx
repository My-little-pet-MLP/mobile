import { View, Text, TouchableOpacity } from "react-native";
import { Mission } from "../../../@types/mission";
import { useCompleteMission } from "@/libs/react-query/missions-queries-and-mutations";


export function MissionCard({ mission }: { mission: Mission }) {
    const { mutateAsync: CompleteMissionFunction, isPending: isPendingCompleteMission } = useCompleteMission();


    async function logMissionCompletion(missionId: string) {
        await CompleteMissionFunction(missionId);
    }

    return (
        <View className={`w-full h-fit p-4 rounded-lg mt-4 shadow-md ${mission.concluido ? 'bg-gray-300' : 'bg-white'}`}>
            <Text className={`text-xl font-bold mb-2 ${mission.concluido ? 'text-gray-500' : 'text-black'}`}>
                {mission.descricao}
            </Text>
            {!mission.concluido && (
                <TouchableOpacity className="mt-2 p-2 bg-blue-500 rounded-md" onPress={() => logMissionCompletion(mission.id)}>
                    <Text className="text-black text-center">Concluir Missão</Text>
                </TouchableOpacity>
            )}
            {mission.concluido && (
                <Text className="text-center text-gray-500 font-bold mt-2">Missão Concluída</Text>
            )}
        </View>
    );
}
