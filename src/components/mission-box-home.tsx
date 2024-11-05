import { useListMissions } from "@/libs/react-query/missions-queries-and-mutations";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { MissionCard } from "./mission-component";

export function MissionBoxHome() {
    const { user } = useUser();
    const { data: listMissions = [], error: errorListMissions, isLoading: isLoadingListMissions } = useListMissions(user?.id ?? "");

    function HandlerMissionScreen() {
        router.push("/(auth)/challangers");
    }

    const allMissionsCompleted = listMissions.length > 0 && listMissions.every((mission) => mission.concluido);

    return (
        <>
            {isLoadingListMissions ? (
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
                        <ActivityIndicator size="large" color="#FFB800" />
                    </View>
                </View>
            ) : (
                <View className="w-full h-fit bg-blue-theme p-6 rounded-lg mt-20">
                    <View className="flex flex-row justify-between">
                        <Text className="font-bold text-white text-2xl">Missões</Text>
                        <TouchableOpacity style={{ width: "50%" }} onPress={() => HandlerMissionScreen()}>
                            <View className="h-auto w-full items-end justify-center flex">
                                <Text className="text-white font-bold text-lg">Saiba mais</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View className="w-full min-h-48 flex flex-col items-center justify-center mt-4">
                        {allMissionsCompleted ? (
                            <TouchableOpacity
                                style={{
                                    marginTop: 16,
                                    padding: 24,
                                    backgroundColor: "#22C55E", // Verde (#22C55E) equivalente ao 'bg-green-500' em Tailwind CSS
                                    borderRadius: 8,
                                }}
                            >
                                <Text className="text-white font-bold text-xl text-center">Pegar Cupom</Text>
                            </TouchableOpacity>

                        ) : (
                            listMissions.map((mission) => (
                                <MissionCard key={mission.id} mission={mission} />
                            ))
                        )}
                        {errorListMissions && <Text className="text-red-500 text-center mt-2">Erro ao carregar as missões. Tente novamente.</Text>}
                    </View>
                </View>
            )}
        </>
    );
}
